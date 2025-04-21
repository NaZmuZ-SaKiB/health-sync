"use client";

import { ClassValue } from "clsx";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import ABox from "./ABox";
import { useNavigate } from "react-router";

type TProps = {
  title: string;
  className?: ClassValue;
  children?: React.ReactNode;
  backButton?: boolean;
};

const APageHeader = ({
  title,
  className,
  children,
  backButton = false,
}: TProps) => {
  const navigate = useNavigate();
  return (
    <ABox className="flex justify-between">
      <div className="flex items-center">
        {backButton && (
          <span className="cursor-pointer pr-2" onClick={() => navigate(-1)}>
            <ChevronLeft className="size-7" />
          </span>
        )}
        <h1 className={cn("text-xl font-bold text-slate-700", className)}>
          {title}
        </h1>
      </div>
      {children}
    </ABox>
  );
};

export default APageHeader;
