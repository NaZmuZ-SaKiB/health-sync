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
import { Eye, EyeOff } from "lucide-react";
import { HTMLInputTypeAttribute, useState } from "react";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: ClassValue;
  description?: string;
};

const HSSecretInput = ({
  name,
  label,
  required = true,
  disabled = false,
  className,
  description,
}: TProps) => {
  const [type, setType] = useState<HTMLInputTypeAttribute>("password");
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="group relative pt-5">
          <FormLabel className="absolute top-7 text-base font-normal text-slate-50 transition-all duration-300 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:font-medium group-focus-within:text-yellow-300 has-[+div>input:not(:placeholder-shown)]:top-0 has-[+div>input:not(:placeholder-shown)]:text-sm has-[+div>input:not(:placeholder-shown)]:font-medium has-[+div>input:not(:placeholder-shown)]:text-yellow-300">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={type}
                disabled={disabled}
                placeholder={""}
                className={cn(
                  "rounded-none border-0 border-b-2 px-0 pr-6 text-slate-50 shadow-none focus-visible:border-yellow-300 focus-visible:ring-0",
                  className,
                )}
              />
              <div
                className="absolute top-1/2 right-0 -translate-y-1/2 text-slate-50"
                onClick={() =>
                  setType(type === "password" ? "text" : "password")
                }
              >
                {type === "password" ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HSSecretInput;
