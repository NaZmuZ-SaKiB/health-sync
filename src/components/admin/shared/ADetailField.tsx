import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type TProps = {
  title: string;
  value?: string | number;
  className?: ClassValue;
};

const ADetailField = ({ title, value, className }: TProps) => {
  return (
    <div className={cn(className)}>
      <h3 className="mb-2 text-sm font-medium text-slate-700">{title}:</h3>
      <div className="bg-slate-100 px-4 py-2">{value ?? ""}</div>
    </div>
  );
};

export default ADetailField;
