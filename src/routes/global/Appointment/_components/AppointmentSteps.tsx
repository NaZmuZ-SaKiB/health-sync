import { cn } from "@/lib/utils";

const AppointmentSteps = ({ step }: { step: number }) => {
  return (
    <div className="mx-auto flex max-w-[800px] items-center justify-between gap-2">
      {/* //? Step 1  */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="bg-primary-hover grid size-10 place-items-center rounded-full text-slate-50">
          1
        </span>
        <span className="text-primary-hover font-semibold">Select Doctor</span>
      </div>

      <div
        className={cn("h-[2px] w-full", {
          "bg-primary-hover": step >= 2,
          "bg-slate-200": step < 2,
        })}
      />

      {/* //? Step 2  */}
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            "bg-primary-hover grid size-10 place-items-center rounded-full text-slate-50",
            {
              "border border-slate-200 bg-transparent text-slate-400": step < 2,
            },
          )}
        >
          2
        </span>
        <span
          className={cn("text-primary-hover font-semibold", {
            "text-slate-400": step < 2,
          })}
        >
          Pick Time
        </span>
      </div>

      <div
        className={cn("h-[2px] w-full", {
          "bg-primary-hover": step >= 3,
          "bg-slate-200": step < 3,
        })}
      />

      {/* //? Step 3  */}
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            "bg-primary-hover grid size-10 place-items-center rounded-full text-slate-50",
            {
              "border border-slate-200 bg-transparent text-slate-400": step < 3,
            },
          )}
        >
          3
        </span>
        <span
          className={cn("text-primary-hover font-semibold", {
            "text-slate-400": step < 3,
          })}
        >
          Your Information
        </span>
      </div>

      <div
        className={cn("h-[2px] w-full", {
          "bg-primary-hover": step >= 4,
          "bg-slate-200": step < 4,
        })}
      />

      {/* //? Step 4  */}
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            "bg-primary-hover grid size-10 place-items-center rounded-full text-slate-50",
            {
              "border border-slate-200 bg-transparent text-slate-400": step < 4,
            },
          )}
        >
          4
        </span>
        <span
          className={cn("text-primary-hover font-semibold", {
            "text-slate-400": step < 4,
          })}
        >
          Success
        </span>
      </div>
    </div>
  );
};

export default AppointmentSteps;
