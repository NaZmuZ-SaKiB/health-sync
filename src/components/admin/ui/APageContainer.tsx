import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

type TProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

const APageContainer = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "xs:gap-5 xs:p-4 @container flex h-[calc(100svh-60px)] flex-col gap-3 overflow-auto overflow-x-hidden p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default APageContainer;
