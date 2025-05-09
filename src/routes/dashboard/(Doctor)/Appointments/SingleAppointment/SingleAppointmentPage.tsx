import DBox from "@/components/dashboard/ui/DBox";
import DFormH2 from "@/components/dashboard/ui/DFormH2";
import DPageContainer from "@/components/dashboard/ui/DPageContainer";
import DPageHeader from "@/components/dashboard/ui/DPageHeader";
import DetailField from "@/components/global/shared/DetailField";
import { APPOINTMENT_STATUS, AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { TAppointment } from "@/lib/modules/appointment/appointment.type";
import CancelAppointmentButton from "@/routes/dashboard/(Patient)/My-Appointments/_components/CancelAppointmentButton";
import formatTime from "@/utils/formatTime";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";

const SingleAppointmentPage = () => {
  const { id } = useParams();

  const [cookies] = useCookies([AUTH_KEY]);

  const { data: appointmentData, loading } = useQuery(
    AppointmentQueries.SINGLE_APPOINTMENT,
    {
      variables: {
        id,
      },
      context: {
        headers: {
          Authorization: cookies[AUTH_KEY] || "",
        },
      },
    },
  );

  if (loading) return <div>Loading...</div>;
  // TODO: Loader

  const appointment: TAppointment = appointmentData?.appointment;

  return (
    <DPageContainer>
      <DPageHeader title="Appointment Details">
        <CancelAppointmentButton
          id={appointment.id}
          isCancelled={appointment.status === APPOINTMENT_STATUS.CANCELLED}
          hideIfCancelled
        />
      </DPageHeader>

      <DBox>
        <DFormH2 className="">Appointment Info</DFormH2>

        <div className="grid grid-cols-6 gap-5">
          <DetailField
            title={"Date"}
            value={appointment.timeSlot.slotDate}
            className="col-span-2"
          />
          <DetailField
            title={"Start Time"}
            value={formatTime(appointment.timeSlot.startTime)}
            className="col-span-2"
          />
          <DetailField
            title={"End Time"}
            value={formatTime(appointment.timeSlot.endTime)}
            className="col-span-2"
          />

          <DetailField
            title={"Day"}
            value={appointment.timeSlot.day.toLowerCase()}
            className="col-span-2 capitalize"
          />
          <DetailField
            title={"Reason"}
            value={appointment.reason}
            className="col-span-4"
          />

          <DetailField
            title={"Status"}
            value={appointment.status.toLowerCase()}
            className="col-span-2 capitalize"
          />
        </div>
      </DBox>

      <DBox>
        <DFormH2 className="">Patient Info</DFormH2>

        <div className="grid grid-cols-6 gap-5">
          <DetailField
            title={"Name"}
            value={`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}
            className="col-span-2"
          />
          <DetailField
            title={"Email"}
            value={appointment.patient.user.email}
            className="col-span-2"
          />
          <DetailField
            title={"Phone"}
            value={appointment.patient.user.phoneNumber}
            className="col-span-2"
          />

          <DetailField
            title={"Gender"}
            value={appointment.patient.user.gender.toLowerCase()}
            className="col-span-2 capitalize"
          />
          <DetailField
            title={"Birth"}
            value={appointment.patient.user.dateOfBirth}
            className="col-span-2"
          />
          <DetailField
            title={"Blood Group"}
            value={appointment.patient.bloodGroup
              .toLowerCase()
              .split("_")
              .join(" ")}
            className="col-span-2 capitalize"
          />
          <DetailField
            title={"Allergies"}
            value={appointment.patient.allergies}
            className="col-span-6"
          />
          <DetailField
            title={"Emergency Contact Name"}
            value={appointment.patient.emergencyContactName || "N/A"}
            className="col-span-3"
          />
          <DetailField
            title={"Emergency Contact Phone"}
            value={appointment.patient.emergencyContactPhone || "N/A"}
            className="col-span-3"
          />
        </div>
      </DBox>

      <DBox>
        <DFormH2 className="">Notes</DFormH2>
        <p className="text-sm text-slate-700">{appointment.notes || "N/A"}</p>
      </DBox>
    </DPageContainer>
  );
};

export default SingleAppointmentPage;
