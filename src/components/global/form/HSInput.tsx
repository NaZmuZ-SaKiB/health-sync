import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  className?: ClassValue;
  description?: string;
};

const HSInput = ({
  name,
  label,
  type,
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
      render={({ field }) => (
        <FormItem className="group relative pt-5">
          <FormLabel className="absolute top-7 text-base font-normal text-slate-50 transition-all duration-300 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:top-0">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={disabled}
              placeholder={""}
              className={cn(
                "rounded-none border-0 border-b-2 px-0 text-slate-50 shadow-none focus-visible:border-yellow-300 focus-visible:ring-0",
                className,
              )}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HSInput;
