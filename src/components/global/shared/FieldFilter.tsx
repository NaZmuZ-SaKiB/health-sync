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
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: ClassValue;
  disabled?: boolean;
};

const FieldFilter = ({
  name,
  label,
  options,
  className,
  disabled = false,
}: TProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [value, setValue] = useState<"all" | string>(params.get(name) || "all");

  const handleChange = (v: string) => {
    setValue(v);

    params.delete(name);
    params.delete("page");

    if (v !== "all") {
      params.append(name, v);
    }

    setSearchParams(params);
  };

  const allOptions = [
    {
      label: "All",
      value: "all",
    },
    ...options,
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          disabled={disabled}
          className={cn(
            "focus-visible:border-primary cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 focus-visible:text-slate-900 focus-visible:ring-0",
            className,
          )}
          variant="outline"
          size="sm"
        >
          {label} :{" "}
          {options.find((item) => item.value === value)?.label?.toLowerCase() ||
            "All"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none p-0">
        <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
          {allOptions.map((option) => (
            <DropdownMenuRadioItem
              className="cursor-pointer rounded-none text-slate-700 capitalize hover:bg-slate-50 hover:text-slate-900"
              key={`${name}-filter-${option.value}`}
              value={option.value}
            >
              {option.label.toLowerCase()}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FieldFilter;
