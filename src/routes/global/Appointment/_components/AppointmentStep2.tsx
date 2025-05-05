import HSCalendar from "@/components/global/shared/HSCalendar";
import { TAppointmentFormData } from "../Appointment";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { DoctorScheduleQueries } from "@/lib/modules/doctor-schedule/doctor-schedule.queries";
import AppointmentTimeSlots from "./AppointmentTimeSlots";
import moment from "moment";

type TProps = {
  formData: Partial<TAppointmentFormData>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: any;
};

const AppointmentStep2 = ({ formData, setFormData, setStep }: TProps) => {
  const [date, setDate] = useState<Date>(
    formData?.appointment?.timeSlot?.slotDate
      ? new Date(formData?.appointment?.timeSlot?.slotDate)
      : new Date(),
  );

  useEffect(() => {
    const formattedDate = moment(date).format("DD-MM-YYYY");

    if (formData?.appointment?.timeSlot?.slotDate !== formattedDate) {
      setFormData((prev: any) => ({
        ...prev,
        appointment: {
          ...prev?.appointment,
          timeSlot: {
            slotDate: moment(formattedDate).format("DD-MM-YYYY"),
          },
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const { data: scheduleData, loading } = useQuery(
    DoctorScheduleQueries.GET_DOCTOR_SCHEDULE_BY_DATE,
    {
      variables: {
        doctorId: formData?.appointment?.doctorId,
        date: date.toDateString(),
      },
      skip: !date,
    },
  );

  console.log("schedule", scheduleData?.getDoctorScheduleByDate);

  return (
    <div className="bg-primary-hover mx-auto mb-10 w-full max-w-[800px] space-y-10 rounded-3xl p-10 text-slate-50 shadow-2xl shadow-slate-300">
      <div>
        <label>
          <p className="mb-2 font-semibold">Appointment Date</p>
          <HSCalendar
            defaultValue={date}
            setDate={setDate}
            fromDate={new Date()}
            toDate={new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)}
            className="max-w-[300px]"
          />
        </label>
      </div>

      {!loading && scheduleData?.getDoctorScheduleByDate && (
        <AppointmentTimeSlots
          schedule={scheduleData?.getDoctorScheduleByDate}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default AppointmentStep2;
