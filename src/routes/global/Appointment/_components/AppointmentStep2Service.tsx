import { useEffect, useState } from "react";
import { TAppointmentFormData } from "../Appointment";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { ServiceSettingsQueries } from "@/lib/modules/service-settings/service-settings.queries";
import HSCalendar from "@/components/global/shared/HSCalendar";
import AppointmentTimeSlots from "./AppointmentTimeSlots";

type TProps = {
  formData: Partial<TAppointmentFormData>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: any;
};

const AppointmentStep2Service = ({
  formData,
  setFormData,
  setStep,
}: TProps) => {
  const [date, setDate] = useState<Date>(
    formData?.appointment?.timeSlot?.slotDate
      ? new Date(
          moment(
            formData?.appointment?.timeSlot?.slotDate,
            "DD-MM-YYYY",
          ).format("YYYY-MM-DD"),
        )
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
            slotDate: formattedDate,
          },
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const { data: serviceSettingsData, loading } = useQuery(
    ServiceSettingsQueries.SINGLE_SERVICE_SETTINGS,
    {
      variables: {
        serviceId: formData?.appointment?.serviceId,
      },
    },
  );

  return (
    <div className="bg-primary-hover mx-auto mb-10 w-full max-w-[800px] space-y-10 rounded-3xl p-10 text-slate-50 shadow-2xl shadow-slate-300">
      <div>
        <label>
          <p className="mb-2 font-semibold">Appointment Date</p>
          <HSCalendar
            defaultValue={date}
            setDate={setDate}
            fromDate={new Date()}
            toDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
            className="max-w-[300px]"
          />
        </label>
      </div>

      {!loading && serviceSettingsData?.serviceSettings && (
        <AppointmentTimeSlots
          schedule={serviceSettingsData?.serviceSettings}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default AppointmentStep2Service;
