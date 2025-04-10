import { cn } from "@/lib/utils";

const DoctorRegistrationSteps = ({ step }: { step: number }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex shrink-0 items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-yellow-300">
          1
        </span>
        <span className="font-semibold text-yellow-300">Personal Info</span>
      </div>

      <div
        className={cn("h-[2px] w-full", {
          "bg-yellow-300": step >= 2,
          "bg-slate-200": step < 2,
        })}
      />

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn("grid size-6 place-items-center rounded-full", {
            "bg-yellow-300": step >= 2,
            "bg-slate-200": step < 2,
          })}
        >
          2
        </span>
        <span
          className={cn({
            "font-semibold text-yellow-300": step >= 2,
            "text-slate-200": step < 2,
          })}
        >
          Professional Info
        </span>
      </div>

      <div
        className={cn("h-[2px] w-full", {
          "bg-yellow-300": step === 3,
          "bg-slate-200": step < 3,
        })}
      />

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn("grid size-6 place-items-center rounded-full", {
            "bg-yellow-300": step === 3,
            "bg-slate-200": step < 3,
          })}
        >
          3
        </span>
        <span
          className={cn({
            "font-semibold text-yellow-300": step === 3,
            "text-slate-200": step < 3,
          })}
        >
          Success
        </span>
      </div>
    </div>
  );
};

export default DoctorRegistrationSteps;
