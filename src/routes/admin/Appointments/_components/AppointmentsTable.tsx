import ABox from "@/components/admin/ui/ABox";
import UpdateAppointmentStatus from "@/components/dashboard/shared/UpdateAppointmentStatus";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { TAppointment } from "@/lib/modules/appointment/appointment.type";
import { TMeta } from "@/types";
import copyToClipboard from "@/utils/copyToClipboard";
import formatTime from "@/utils/formatTime";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router";

const AppointmentsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: appointmentsData,
    loading,
    refetch,
  } = useQuery(AppointmentQueries.ALL_APPOINTMENTS, {
    variables: { ...Object.fromEntries(searchParams), all: true },
    context: {
      headers: {
        Authorization: cookies[AUTH_KEY] || "",
      },
    },
  });

  if (loading) return <TableLoader />;

  const meta: TMeta = appointmentsData?.getAllAppointments?.meta;
  const totalPages = Math.ceil(meta?.total / meta?.limit);
  return (
    <ABox>
      <RefreshButton fn={refetch} className="mb-2" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Patient</th>
            <th>Phone</th>
            <th>Doctor/ Service</th>
            <th>Time Slot</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData?.getAllAppointments?.appointments.map(
            (appointment: TAppointment) => (
              <tr key={appointment.id}>
                <td
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(appointment?.id)}
                >
                  {appointment?.id?.slice(0, 4)}...
                </td>
                <td>{appointment.timeSlot.slotDate}</td>
                <td>
                  {appointment.patient.user.firstName}{" "}
                  {appointment.patient.user.lastName}
                </td>
                <td>{appointment.patient.user.phoneNumber}</td>
                {appointment?.doctor && (
                  <td>
                    {appointment.doctor.user.firstName}{" "}
                    {appointment.doctor.user.lastName}
                  </td>
                )}
                {appointment?.service && <td>{appointment?.service.name}</td>}
                <td>
                  {formatTime(appointment.timeSlot.startTime)} -{" "}
                  {formatTime(appointment.timeSlot.endTime)}
                </td>
                <td>{appointment?.location?.name}</td>
                <td>
                  <UpdateAppointmentStatus
                    id={appointment.id}
                    defaultValue={appointment.status}
                  />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>

      <div className="mt-2">
        <div className="text-sm text-slate-700">
          Showing {meta.limit < meta.total ? meta.limit : meta.total} of{" "}
          {meta.total}. ({totalPages} page
          {totalPages > 1 ? "s" : ""}.)
        </div>
        {totalPages !== 1 && (
          <HSPagination
            admin
            page={meta?.page || 1}
            limit={meta?.limit || 10}
            total={meta?.total}
          />
        )}
      </div>
    </ABox>
  );
};

export default AppointmentsTable;
