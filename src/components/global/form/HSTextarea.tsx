import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: ClassValue;
  description?: string;
};

const HSTextarea = ({
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
      render={({ field }) => (
        <FormItem className="group relative pt-5">
          <FormLabel className="absolute top-7 text-base font-normal text-slate-50 transition-all duration-300 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:font-medium group-focus-within:text-yellow-300 has-[+textarea:not(:placeholder-shown)]:top-0 has-[+textarea:not(:placeholder-shown)]:text-sm has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-yellow-300">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              disabled={disabled}
              placeholder={""}
              className={cn(
                "max-h-32 min-h-20 resize-y overflow-y-scroll rounded-none border-0 border-b-2 px-0 text-base text-slate-50 shadow-none focus-visible:border-yellow-300 focus-visible:ring-0",
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

export default HSTextarea;
