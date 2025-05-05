import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClassValue } from "clsx";

type TProps = {
  defaultValue: Date;
  setDate: any;
  fromDate?: Date;
  toDate?: Date;
  className?: ClassValue;
};

const HSCalendar = ({
  defaultValue,
  setDate,
  fromDate,
  toDate,
  className,
}: TProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start rounded-none border-0 border-b-2 bg-transparent !px-0 text-left font-normal text-slate-50 hover:bg-transparent hover:text-slate-50 focus-visible:border-yellow-300 focus-visible:ring-0",
            className,
          )}
        >
          <CalendarIcon />
          {defaultValue ? (
            format(defaultValue, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={defaultValue}
          onSelect={setDate}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default HSCalendar;
