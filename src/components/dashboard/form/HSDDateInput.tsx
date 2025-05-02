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

const HSDDateInput = ({
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
          <FormItem className="">
            <FormControl>
              <DateField
                className={cn(
                  "focus-within:[&>label]:text-primary-hover flex w-full flex-col gap-1 space-y-2",
                  className,
                )}
                defaultValue={calendarDateValue}
                onChange={(val) => {
                  field.onChange(val?.toString());
                }}
                isDisabled={disabled}
              >
                <FormLabel className="gap-0.5 text-xs font-medium text-nowrap">
                  <Label>
                    {label}
                    {required && "*"}
                  </Label>
                </FormLabel>
                <DateInput className="focus-within:border-primary rounded-md border px-2.5 py-1">
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className="data-[invalid]:data-[focused]:bg-destructive data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[focused]:bg-primary-hover inline rounded p-0.5 text-slate-900 caret-transparent outline-0 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focused]:text-slate-50 data-[placeholder]:text-slate-500 data-[focused]:data-[placeholder]:text-slate-50 data-[type=literal]:px-0 data-[type=literal]:text-slate-50/70"
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

export default HSDDateInput;
