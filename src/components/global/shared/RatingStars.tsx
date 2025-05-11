import { Star } from "lucide-react";

type TProps = {
  rating: number;
};

const RatingStars = ({ rating }: TProps) => {
  return (
    <div className="flex gap-1">
      {Array(5)
        .fill(0)
        .map((_, i: number) => (
          <span key={`rating-${i}-${Math.random().toFixed(2)}`} className="">
            {rating >= i + 1 ? (
              <Star className="cursor-pointer fill-yellow-500 stroke-yellow-500" />
            ) : (
              <Star className="cursor-pointer fill-slate-300 stroke-slate-300" />
            )}
          </span>
        ))}
    </div>
  );
};

export default RatingStars;
