import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  options: {
    label: string;
    value: string;
  }[];
};

const HSDSelect = ({
  name,
  label,
  required = true,
  disabled = false,
  className,
  description,
  options,
}: TProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="focus-within:[&>label]:text-primary-hover flex w-full flex-col gap-1">
          <FormLabel className="gap-0.5 text-xs font-medium text-nowrap">
            {label}
            {required && "*"}
          </FormLabel>
          <Select
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "focus-visible:border-primary !mt-1 w-full focus-visible:ring-0 focus-visible:ring-offset-0",
                  className,
                )}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="rounded-none border-none [&>div]:p-0">
              {options.map((option) => (
                <SelectItem
                  key={`${name}-${option.value}`}
                  value={option.value}
                  className="hover:!text-primary-hover data-[state=checked]:text-primary-hover !m-0 cursor-pointer rounded-none !px-3.5 data-[state=checked]:font-semibold"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HSDSelect;
