import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

type TProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

const DPageContainer = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "xs:pr-3 max-xs:p-2 @container flex h-[calc(100svh-72px)] flex-col gap-4 overflow-auto overflow-x-hidden max-lg:px-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DPageContainer;
