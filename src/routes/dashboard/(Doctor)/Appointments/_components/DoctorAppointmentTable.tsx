import DBox from "@/components/dashboard/ui/DBox";
import HSPagination from "@/components/global/shared/HSPagination";
import RefreshButton from "@/components/global/shared/RefreshButton";
import TableLoader from "@/components/global/shared/TableLoader";
import { Button } from "@/components/ui/button";
import { APPOINTMENT_STATUS, AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { TAppointment } from "@/lib/modules/appointment/appointment.type";
import CancelAppointmentButton from "@/routes/dashboard/(Patient)/My-Appointments/_components/CancelAppointmentButton";
import { TMeta } from "@/types";
import formatTime from "@/utils/formatTime";
import { useQuery } from "@apollo/client";
import { Eye } from "lucide-react";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router";
import UpdateAppointmentStatus from "./UpdateAppointmentStatus";
import AddNotesButton from "./AddNotesButton";

const DoctorAppointmentTable = () => {
  const [cookies] = useCookies([AUTH_KEY]);

  const [searchParams] = useSearchParams();

  const {
    data: appointmentsData,
    loading,
    refetch,
  } = useQuery(AppointmentQueries.DOCTOR_APPOINTMENTS, {
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
            <th>Date</th>
            <th>Patient</th>
            <th>Phone Number</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointmentsData?.getAllAppointments?.appointments.map(
            (appointment: TAppointment) => (
              <tr key={appointment.id}>
                <td>{appointment.timeSlot.slotDate}</td>
                <td>
                  {appointment.patient.user.firstName}{" "}
                  {appointment.patient.user.lastName}
                </td>
                <td>{appointment.patient.user.phoneNumber}</td>
                <td className="capitalize">
                  {appointment.timeSlot.day.toLowerCase()}
                </td>
                <td>{formatTime(appointment.timeSlot.startTime)}</td>
                <td>{formatTime(appointment.timeSlot.endTime)}</td>
                <td>
                  <UpdateAppointmentStatus
                    id={appointment.id}
                    defaultValue={appointment.status}
                  />
                </td>
                <td>
                  <div className="flex items-center justify-center gap-1.5">
                    <Link to={`/dashboard/appointments/${appointment.id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <Eye />
                      </Button>
                    </Link>

                    {appointment.status === APPOINTMENT_STATUS.COMPLETED && (
                      <AddNotesButton
                        id={appointment.id}
                        defaultValue={appointment?.notes}
                      />
                    )}

                    {(appointment.status === APPOINTMENT_STATUS.SCHEDULED ||
                      appointment.status === APPOINTMENT_STATUS.CANCELLED) && (
                      <CancelAppointmentButton
                        id={appointment.id}
                        isCancelled={
                          appointment.status === APPOINTMENT_STATUS.CANCELLED
                        }
                        hideIfCancelled
                      />
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

export default DoctorAppointmentTable;
