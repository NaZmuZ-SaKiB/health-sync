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
  options: string[];
  defaultValueIndex: number;
  className?: ClassValue;
};

const SortByFilter = ({ options, defaultValueIndex, className }: TProps) => {
  const [sortBy, setSortBy] = useState(options[defaultValueIndex]);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    setSortBy(value);

    params.delete("sortBy");
    params.delete("page");
    params.append("page", "1");
    params.append("sortBy", value);

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
          Sort By : {sortBy}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none p-0">
        <DropdownMenuRadioGroup value={sortBy} onValueChange={handleChange}>
          {options.map((option) => (
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

export default SortByFilter;
