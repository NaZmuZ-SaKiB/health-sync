import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type TProps = {
  children?: React.ReactNode;
  className?: ClassValue;
};

const DFormH2 = ({ children, className }: TProps) => {
  return (
    <h2
      className={cn("text-primary-hover mb-5 text-lg font-semibold", className)}
    >
      {children}
    </h2>
  );
};

export default DFormH2;
