import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type TProps = {
  radius?: number;
  stroke?: number;
  fullArc?: number;
  percentage?: number;
  textClass?: ClassValue;
};

const CircularProgress = ({
  radius = 60,
  stroke = 10,
  fullArc = 270,
  percentage = 50,
  textClass,
}: TProps) => {
  const normalizedRadius = radius - stroke / 2;
  const maxStrokeLength = (fullArc / 360) * (2 * Math.PI * normalizedRadius);
  const strokeLength = (percentage / 100) * maxStrokeLength;
  const circumference = 2 * Math.PI * normalizedRadius;

  return (
    <div className="relative flex justify-center">
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        style={{ transform: "rotate(-225deg)" }}
      >
        {/* Background Track */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          stroke="#E0F7FA"
          strokeWidth={stroke}
          strokeDasharray={`${maxStrokeLength} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          stroke="#00bde0"
          strokeWidth={stroke}
          strokeDasharray={`${strokeLength} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
        />
      </svg>

      {/* Centered Percentage Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]">
        <span className={cn("text-primary text-2xl font-bold", textClass)}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
