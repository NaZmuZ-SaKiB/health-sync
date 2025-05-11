import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  vertical?: boolean;
  required?: boolean;
  description?: string;
};

const HSRatingInput = ({
  name,
  label,
  description,
  vertical = false,
  required = true,
}: TProps) => {
  const { control, getValues, setValue } = useFormContext();

  const [rating, setRating] = useState<number>(getValues(name) || 1);

  const handleChange = (value: number) => {
    setRating(value);
    setValue(name, value);
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
            <div className="flex gap-1">
              {Array(5)
                .fill(0)
                .map((_, i: number) => (
                  <span key={`${name}-rating-${i}`} className="">
                    {rating >= i + 1 ? (
                      <Star
                        className="cursor-pointer fill-yellow-500 stroke-yellow-500"
                        onClick={() => handleChange(i + 1)}
                      />
                    ) : (
                      <Star
                        className="cursor-pointer stroke-slate-500 hover:stroke-yellow-500"
                        onClick={() => handleChange(i + 1)}
                      />
                    )}
                  </span>
                ))}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HSRatingInput;
