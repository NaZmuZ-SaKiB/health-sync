import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Star } from "lucide-react";

type TProps = {
  rating: number;
  className?: ClassValue;
};

const RatingStars = ({ rating, className }: TProps) => {
  return (
    <div className="flex gap-1">
      {Array(5)
        .fill(0)
        .map((_, i: number) => (
          <span key={`rating-${i}-${Math.random().toFixed(2)}`} className="">
            {rating >= i + 1 ? (
              <Star
                className={cn(
                  "cursor-pointer fill-yellow-500 stroke-yellow-500",
                  className,
                )}
              />
            ) : (
              <Star
                className={cn(
                  "cursor-pointer fill-slate-300 stroke-slate-300",
                  className,
                )}
              />
            )}
          </span>
        ))}
    </div>
  );
};

export default RatingStars;
