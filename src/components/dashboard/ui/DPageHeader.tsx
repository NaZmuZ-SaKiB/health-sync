import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import DBox from "./DBox";

type TProps = {
  title: string;
  className?: ClassValue;
  children?: React.ReactNode;
  backButton?: boolean;
};

const DPageHeader = ({
  title,
  className,
  children,
  backButton = false,
}: TProps) => {
  const navigate = useNavigate();
  return (
    <DBox className="xs:py-3 flex justify-between">
      <div className="flex items-center">
        {backButton && (
          <span className="cursor-pointer pr-2" onClick={() => navigate(-1)}>
            <ChevronLeft className="size-7" />
          </span>
        )}
        <h1 className={cn("text-primary-hover text-xl font-bold", className)}>
          {title}
        </h1>
      </div>
      {children}
    </DBox>
  );
};

export default DPageHeader;
