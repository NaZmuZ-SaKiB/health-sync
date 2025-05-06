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
import { useState } from "react";

type TProps = {
  defaultValue?: Date;
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
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          onSelect={handleSelect}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default HSCalendar;
