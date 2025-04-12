import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

type TProps = {
  children?: React.ReactNode;
  className?: ClassValue;
};

const ABox = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "xs:p-4 bg-white p-2 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ABox;
