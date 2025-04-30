import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type TProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  vertical?: boolean;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

const HSDTextarea = ({
  name,
  label,
  placeholder,
  className,
  description,
  vertical = false,
  required = true,
  disabled = false,
  readOnly = false,
}: TProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
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
            <Textarea
              placeholder={placeholder || label}
              className={cn(
                "focus-visible:border-primary !mt-1 max-h-60 focus-visible:ring-0 focus-visible:ring-offset-0",
                {
                  "!mt-0": vertical,
                },
                className,
              )}
              disabled={disabled}
              readOnly={readOnly}
              {...field}
            />
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

export default HSDTextarea;
