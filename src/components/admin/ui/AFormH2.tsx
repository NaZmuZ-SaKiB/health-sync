import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type TProps = {
  children?: React.ReactNode;
  className?: ClassValue;
};

const AFormH2 = ({ children, className }: TProps) => {
  return (
    <h2 className={cn("mb-5 text-lg font-medium text-slate-700", className)}>
      {children}
    </h2>
  );
};

export default AFormH2;
