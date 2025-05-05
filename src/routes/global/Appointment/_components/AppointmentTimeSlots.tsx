import { TDoctorSchedule } from "@/lib/modules/doctor-schedule/doctor-schedule.type";
import { cn } from "@/lib/utils";
import calculateTimeSlots from "@/utils/calculateTimeSlots";
import formatTime from "@/utils/formatTime";
import { useState } from "react";
import { TAppointmentFormData } from "../Appointment";
import HSButton from "@/components/global/shared/HSButton";
import { MoveLeft, MoveRight } from "lucide-react";

type TProps = {
  schedule: TDoctorSchedule;
  formData: Partial<TAppointmentFormData>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: any;
};

type TTimeSlot = {
  startTime: string;
  endTime: string;
  slotDate: string;
};

const AppointmentTimeSlots = ({
  schedule,
  formData,
  setFormData,
  setStep,
}: TProps) => {
  const [selected, setSelected] = useState<TTimeSlot | null>(
    formData?.appointment?.timeSlot || null,
  );

  const timeSlots = calculateTimeSlots(
    schedule.startTime,
    schedule.endTime,
    schedule.sessionLength,
  );

  const handleSelect = (slot: Pick<TTimeSlot, "startTime" | "endTime">) => {
    setSelected({ ...slot, slotDate: "" });

    setFormData((prev: any) => ({
      ...prev,
      appointment: {
        ...prev?.appointment,
        timeSlot: {
          ...prev?.appointment?.timeSlot,
          startTime: slot?.startTime,
          endTime: slot?.endTime,
        },
      },
    }));
  };

  return (
    <div>
      <p className="mb-3 font-semibold text-slate-50">Time Slot</p>

      <div className="flex flex-wrap justify-center gap-3">
        {timeSlots.map((item) => (
          <div
            key={`time-slot-${item.startTime}`}
            onClick={() => handleSelect(item)}
            className={cn(
              "max-w-[170px] flex-1 shrink-0 basis-[170px] cursor-pointer rounded-md border border-slate-50 p-3 text-center text-sm hover:border-yellow-300",
              {
                "border-yellow-300 bg-yellow-300 font-semibold text-slate-900":
                  selected?.startTime === item.startTime,
              },
            )}
          >
            {formatTime(item.startTime)} - {formatTime(item.endTime)}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-5">
        <HSButton
          className="text-secondary h-auto bg-white py-2 pr-5 pl-2 text-lg hover:bg-slate-100"
          onClick={() => setStep(1)}
        >
          <span className="bg-secondary grid size-10 place-items-center rounded-md">
            <MoveLeft className="size-5 text-slate-50" />
          </span>
          Go Back
        </HSButton>
        {selected?.startTime && selected?.endTime && (
          <HSButton
            variant={"secondary"}
            className="h-auto py-2 pr-2 pl-5 text-lg"
            onClick={() => setStep(3)}
          >
            Continue
            <span className="grid size-10 place-items-center rounded-md bg-white">
              <MoveRight className="text-btn-primary size-5" />
            </span>
          </HSButton>
        )}
      </div>
    </div>
  );
};

export default AppointmentTimeSlots;
