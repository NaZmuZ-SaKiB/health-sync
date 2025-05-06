import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useState } from "react";
import { useSearchParams } from "react-router";

type TProps = {
  defaultValue?: TLimit;
  className?: ClassValue;
};

type TLimit = "10" | "25" | "50" | "75" | "100";

const limitOptions: TLimit[] = ["10", "25", "50", "75", "100"];

const LimitFilter = ({ defaultValue, className }: TProps) => {
  const [limit, setLimit] = useState<TLimit>(defaultValue ?? "10");

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: TLimit) => {
    setLimit(value);

    params.delete("limit");
    params.delete("page");
    params.append("page", "1");
    params.append("limit", value);

    setSearchParams(params);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "focus-visible:border-primary cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 focus-visible:text-slate-900 focus-visible:ring-0",
            className,
          )}
          variant="outline"
          size="sm"
        >
          Show : {limit}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none p-0">
        <DropdownMenuRadioGroup
          value={limit}
          onValueChange={handleChange as any}
        >
          {limitOptions.map((option) => (
            <DropdownMenuRadioItem
              className="cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 hover:text-slate-900"
              key={option}
              value={option}
            >
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LimitFilter;
