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
import { Switch } from "@/components/ui/switch";

type TProps = {
  name: string;
  label: string;
  className?: string;
  vertical?: boolean;
  description?: string;
  required?: boolean;
  disabled?: boolean;
};

const HSDSwitch = ({
  name,
  label,
  className,
  description,
  vertical = false,
  required = true,
  disabled = false,
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
            <Switch
              className={className}
              disabled={disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
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

export default HSDSwitch;
