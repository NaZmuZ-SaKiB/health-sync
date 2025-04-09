// Link: https://21st.dev/originui/input/date-input

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ClassValue } from "clsx";
import {
  DateField,
  DateInput,
  DateSegment,
  Label,
} from "react-aria-components";
import { useFormContext } from "react-hook-form";
import { parseDate } from "@internationalized/date";
import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: ClassValue;
  description?: string;
};

const HSDateInput = ({
  name,
  label,
  required = true,
  disabled = false,
  className,
  description,
}: TProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const calendarDateValue = field.value
          ? parseDate(field.value)
          : undefined;

        return (
          <FormItem>
            <FormControl>
              <DateField
                className={cn(
                  "w-full space-y-2 border-b-2 focus-within:border-yellow-300",
                  className,
                )}
                defaultValue={calendarDateValue}
                onChange={(val) => {
                  field.onChange(val?.toString());
                }}
                isDisabled={disabled}
              >
                <FormLabel className="text-sm text-yellow-300">
                  <Label>
                    {label}
                    {required && "*"}
                  </Label>
                </FormLabel>
                <DateInput className="">
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className="data-[invalid]:data-[focused]:bg-destructive data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive inline rounded p-0.5 text-slate-50 caret-transparent outline-0 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focused]:bg-yellow-300 data-[placeholder]:text-slate-50/70 data-[type=literal]:px-0 data-[type=literal]:text-slate-50/70"
                    />
                  )}
                </DateInput>
              </DateField>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default HSDateInput;
