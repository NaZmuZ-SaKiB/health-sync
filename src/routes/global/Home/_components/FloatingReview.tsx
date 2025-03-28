import { Images } from "@/constants";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Star } from "lucide-react";

type TProps = {
  className?: ClassValue;
};

const FloatingReview = ({ className }: TProps) => {
  return (
    <div
      className={cn(
        "floating-up-down absolute z-10 w-72 max-w-[260px] rounded-3xl bg-white p-4",
        className,
      )}
    >
      <div className="flex gap-3">
        <img
          className="rounded-full"
          src={Images.DummyProfile3}
          width={45}
          height={45}
          alt="dummy prifile 3"
        />
        <div>
          <p className="font-semibold text-slate-700">Thomas Welch</p>
          <div className="flex">
            <Star className="size-5 fill-yellow-500 text-transparent" />
            <Star className="size-5 fill-yellow-500 text-transparent" />
            <Star className="size-5 fill-yellow-500 text-transparent" />
            <Star className="size-5 fill-yellow-500 text-transparent" />
            <Star className="size-5 fill-yellow-500 text-transparent" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 font-medium text-gray-500">
        "Dr. Chloe is very kind. She took the time to listen and explain
        clearly. I felt truly cared for throughout my visit.""
      </p>
    </div>
  );
};

export default FloatingReview;
