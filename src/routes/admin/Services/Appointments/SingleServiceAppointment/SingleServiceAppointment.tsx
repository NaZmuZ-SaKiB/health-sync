import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import APageContainer from "@/components/admin/ui/APageContainer";
import APageHeader from "@/components/admin/ui/APageHeader";
import CancelAppointmentButton from "@/components/dashboard/shared/CancelAppointmentButton";
import DetailField from "@/components/global/shared/DetailField";
import { APPOINTMENT_STATUS, AUTH_KEY } from "@/constants";
import { AppointmentQueries } from "@/lib/modules/appointment/appointment.queries";
import { TAppointment } from "@/lib/modules/appointment/appointment.type";
import formatTime from "@/utils/formatTime";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";

const SingleServiceAppointmentPage = () => {
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
    <APageContainer>
      <APageHeader title="Appointment Details">
        <CancelAppointmentButton
          id={appointment.id}
          isCancelled={appointment.status === APPOINTMENT_STATUS.CANCELLED}
          hideIfCancelled
          admin
        />
      </APageHeader>

      <ABox>
        <AFormH2 className="">Appointment Info</AFormH2>

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
      </ABox>

      <ABox>
        <AFormH2 className="">Patient Info</AFormH2>

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
      </ABox>

      <ABox>
        <AFormH2 className="">Notes</AFormH2>
        <p className="text-sm text-slate-700">{appointment.notes || "N/A"}</p>
      </ABox>
    </APageContainer>
  );
};

export default SingleServiceAppointmentPage;
