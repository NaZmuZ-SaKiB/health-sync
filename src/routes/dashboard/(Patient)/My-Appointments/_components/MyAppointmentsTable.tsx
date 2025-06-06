import DBox from "@/components/dashboard/ui/DBox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { APPOINTMENT_STATUS, AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { TAppointment } from "@/lib/modules/appointment/appointment.type";
import { TMeta } from "@/types";
import formatTime from "@/utils/formatTime";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";
import AddReviewButton from "./AddReviewButton";
import ViewReviewModal from "@/components/dashboard/shared/ViewReviewModal";
import CancelAppointmentButton from "@/components/dashboard/shared/CancelAppointmentButton";
import PrescriptionDetail from "@/components/dashboard/shared/PrescriptionDetail";
import copyToClipboard from "@/utils/copyToClipboard";

const MyAppointmentsTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: appointmentsData,
    loading,
    refetch,
  } = useQuery(AppointmentQueries.MY_APPOINTMENTS, {
    variables: Object.fromEntries(searchParams),
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
    <DBox>
      <RefreshButton fn={refetch} className="mb-2 rounded-md" />

      <table className="primary-table table table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Doctor/ Service</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Location</th>
            <th>Actions</th>
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
                {appointment?.doctor && (
                  <td>
                    {appointment.doctor.user.firstName}{" "}
                    {appointment.doctor.user.lastName}
                  </td>
                )}
                {appointment?.service && <td>{appointment?.service?.name}</td>}
                <td>{formatTime(appointment.timeSlot.startTime)}</td>
                <td>{formatTime(appointment.timeSlot.endTime)}</td>
                <td>
                  <Link
                    to={appointment?.location?.mapUrl}
                    className="text-sky-600 hover:underline"
                  >
                    {appointment?.location?.name}
                  </Link>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    {(appointment.status === APPOINTMENT_STATUS.SCHEDULED ||
                      appointment.status === APPOINTMENT_STATUS.CANCELLED) && (
                      <CancelAppointmentButton
                        id={appointment.id}
                        isCancelled={
                          appointment.status === APPOINTMENT_STATUS.CANCELLED
                        }
                      />
                    )}
                    {appointment.status === APPOINTMENT_STATUS.COMPLETED &&
                      appointment?.report && (
                        <PrescriptionDetail prescription={appointment.report} />
                      )}

                    {appointment.status === APPOINTMENT_STATUS.COMPLETED &&
                      appointment?.review && (
                        <ViewReviewModal review={appointment.review} />
                      )}

                    {appointment.status === APPOINTMENT_STATUS.COMPLETED &&
                      !appointment?.review && (
                        <AddReviewButton id={appointment.id} />
                      )}
                  </div>
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
            page={meta?.page || 1}
            limit={meta?.limit || 10}
            total={meta?.total}
          />
        )}
      </div>
    </DBox>
  );
};

export default MyAppointmentsTable;
