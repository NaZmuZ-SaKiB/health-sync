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
import moment from "moment";
import { useSearchParams } from "react-router";

type TProps = {
  fromDate?: Date;
  toDate?: Date;
  className?: ClassValue;
};

const DateFilter = ({ fromDate, toDate, className }: TProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [open, setOpen] = useState(false);

  let defaultValue: Date | undefined = undefined;

  const isDateExist = params.get("date");
  if (isDateExist) {
    defaultValue = new Date(
      moment(isDateExist, "DD-MM-YYYY").format("YYYY-MM-DD"),
    );
  }

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultValue,
  );

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);

    params.delete("date");
    params.delete("page");

    if (date) {
      params.append("date", moment(date).format("DD-MM-YYYY"));
    }

    setSearchParams(params);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "focus-visible:border-primary justify-start rounded-none border bg-transparent text-left font-normal focus-visible:ring-0",
            className,
          )}
        >
          <CalendarIcon />
          {selectedDate ? (
            moment(selectedDate).format("DD-MM-YYYY")
          ) : (
            <span>Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
