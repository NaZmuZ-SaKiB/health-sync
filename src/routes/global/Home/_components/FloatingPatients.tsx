import { Images } from "@/constants";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type TProps = {
  className?: ClassValue;
};

const FloatingPatients = ({ className }: TProps) => {
  return (
    <div
      className={cn(
        "floating-up-left-right-down absolute z-10 flex items-center gap-2 rounded-full bg-white p-3.5",
        className,
      )}
    >
      <div className="flex items-center">
        <img
          className="rounded-full border-2 border-white"
          src={Images.DummyProfile1}
          height={42}
          width={42}
          alt="Dummy Profile 1"
        />
        <img
          className="-ml-3 rounded-full border-2 border-white"
          src={Images.DummyProfile2}
          height={42}
          width={42}
          alt="Dummy Profile 2"
        />
        <img
          className="-ml-3 rounded-full border-2 border-white"
          src={Images.DummyProfile3}
          height={42}
          width={42}
          alt="Dummy Profile 3"
        />
        <img
          className="-ml-3 rounded-full border-2 border-white"
          src={Images.DummyProfile4}
          height={42}
          width={42}
          alt="Dummy Profile 4"
        />
      </div>
      <div className="pr-3">
        <p className="text-primary text-lg leading-5 font-semibold">150K</p>
        <p className="text-sm font-light text-slate-500">Patient recovers</p>
      </div>
    </div>
  );
};

export default FloatingPatients;
