import HSButton from "@/components/global/shared/HSButton";
import { Images } from "@/constants";
import { TDoctorSchedule } from "@/lib/modules/doctor-schedule/doctor-schedule.type";
import { TDoctor } from "@/lib/modules/doctor/doctor.type";
import { formatCurrency } from "@/utils/formatCurrency";
import formatTime from "@/utils/formatTime";
import { gql, useQuery } from "@apollo/client";
import { MoveRight } from "lucide-react";

const SINGLE_DOCTOR = gql`
  query Doctor($id: String!) {
    doctor(id: $id) {
      id
      qualification
      experienceYears
      fee
      user {
        id
        firstName
        lastName
        profilePicture {
          publicId
          secureUrl
        }
      }
      specialty {
        name
      }
      location {
        name
      }
      schedules {
        day
        startTime
        endTime
        sessionLength
        isAvailable
      }
    }
  }
`;

type TProps = {
  id: string;
  setStep: any;
};

const AppointmentDoctorInfo = ({ id, setStep }: TProps) => {
  const { data: doctorData, loading } = useQuery(SINGLE_DOCTOR, {
    variables: { id },
    skip: !id,
  });

  if (loading) return null;
  // TODO: Loader

  const doctor: TDoctor = doctorData?.doctor;

  return (
    <div className="mx-auto max-w-[900px] rounded-3xl bg-slate-50 p-10 shadow-2xl shadow-slate-200">
      <div className="mb-5 flex items-start gap-5">
        <img
          src={
            doctor?.user?.profilePicture?.secureUrl || Images.PlaceholderImage
          }
          width={200}
          height={200}
          className="size-[200px] rounded-2xl object-cover object-center"
        />

        <div>
          <h2 className="text-primary-hover text-3xl font-semibold">
            {doctor?.user?.firstName} {doctor?.user?.lastName}
          </h2>
          <p className="">
            {doctor?.experienceYears} Year
            {doctor?.experienceYears > 1 ? "s" : ""} of Experience in
          </p>
          <h3 className="mb-3 text-xl font-semibold text-slate-700">
            {doctor?.specialty?.name}
          </h3>
          <p className="text-sm">
            <span className="font-medium text-slate-700">Location: </span>
            {doctor?.location?.name}
          </p>
          <p className="text-sm">
            <span className="font-medium text-slate-700">Qualifications: </span>
            {doctor?.qualification}
          </p>
          <p className="">
            <span className="font-medium text-slate-700">Fee: </span>
            {formatCurrency(doctor?.fee || 0)}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xl font-semibold text-slate-700">Schedule</h3>
      </div>

      <table className="doctor-schedule-table primary-table table table-auto">
        <thead>
          <tr>
            <th hidden></th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Session Length</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {doctor?.schedules?.map((item: TDoctorSchedule) => (
            <tr key={`schedule-${item.id}`}>
              <td hidden></td>
              <td className="capitalize">
                {item.day.slice(0, 3).toLowerCase()}
              </td>
              <td>{formatTime(item.startTime)}</td>
              <td>{formatTime(item.endTime)}</td>
              <td>{item.sessionLength} Minutes</td>
              <td>
                {item.isAvailable ? (
                  <span className="bg-green-100 p-0.5 text-green-700">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-100 p-0.5 text-red-700">
                    Not Available
                  </span>
                )}
              </td>
            </tr>
          ))}
          {doctor?.schedules?.length === 0 && (
            <tr>
              <td colSpan={6} className="p-5 text-base text-slate-50">
                Doctor is not available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {doctor?.schedules?.length > 0 && (
        <div className="mt-10 flex justify-center">
          <HSButton
            className="h-auto py-2 pr-2 pl-5 text-lg"
            onClick={() => setStep(2)}
          >
            Continue{" "}
            <span className="grid size-10 place-items-center rounded-md bg-white">
              <MoveRight className="text-primary size-5" />
            </span>
          </HSButton>
        </div>
      )}
    </div>
  );
};

export default AppointmentDoctorInfo;
