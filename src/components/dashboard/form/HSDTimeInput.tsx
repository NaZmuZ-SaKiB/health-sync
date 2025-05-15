import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  vertical?: boolean;
  admin?: boolean;
};

const hoursArray = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const minutesArray = ["00", "15", "30", "45", "60"];

const HSDTimeInput = ({
  name,
  label,
  required = true,
  disabled = false,
  vertical = false,
  description,
  admin = false,
}: TProps) => {
  const [loading, setLoading] = useState(true);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const { control, getValues, setValue } = useFormContext();
  const currentValue = getValues(name);

  useEffect(() => {
    if (!currentValue) return;

    // Extrct time from 24hr format to 12hr format
    const timeObj = moment(currentValue, "HH:mm");
    setHour(timeObj.format("hh"));
    setMinute(timeObj.format("mm"));
    setAmpm(timeObj.format("A"));
    setLoading(false);
  }, [currentValue]);

  if (loading) return null;

  const handleChange = (type: "h" | "m" | "a", value: string) => {
    if (type === "h") setHour(value);
    if (type === "m") setMinute(value);
    if (type === "a") setAmpm(value);

    const h = type === "h" ? value : hour;
    const m = type === "m" ? value : minute;
    const a = type === "a" ? value : ampm;

    const newValue = `${h}:${m} ${a}`;
    const newTime = moment(newValue, "hh:mm A").format("HH:mm");

    setValue(name, newTime);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem
          className={cn(
            "focus-within:[&>label]:text-primary-hover flex w-full flex-col gap-1",
            {
              "grid grid-cols-[1fr_2fr] items-center gap-x-2": vertical,
            },
          )}
        >
          <FormLabel className={"gap-0.5 text-xs font-medium text-nowrap"}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-1">
              <Select
                defaultValue={hour}
                onValueChange={(v) => handleChange("h", v)}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    "focus-visible:border-primary focus-visible:text-primary-hover !h-auto px-2 py-1 focus-visible:ring-0",
                    {
                      "rounded-none": admin,
                    },
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-0">
                  {hoursArray.map((item) => (
                    <SelectItem key={`${name}-hour-input-${item}`} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                defaultValue={minute}
                onValueChange={(v) => handleChange("m", v)}
                disabled={disabled}
              >
                <SelectTrigger className="focus-visible:border-primary focus-visible:text-primary-hover !h-auto px-2 py-1 focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-0">
                  {minutesArray.map((item) => (
                    <SelectItem
                      key={`${name}-minute-input-${item}`}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                defaultValue={ampm}
                onValueChange={(v) => handleChange("a", v)}
                disabled={disabled}
              >
                <SelectTrigger className="focus-visible:border-primary focus-visible:text-primary-hover !h-auto px-2 py-1 focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-0">
                  {["AM", "PM"].map((item) => (
                    <SelectItem key={`${name}-ampm-input-${item}`} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          {description && (
            <FormDescription className="col-span-2">
              {description}
            </FormDescription>
          )}
          <FormMessage className="col-span-2 !mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default HSDTimeInput;
