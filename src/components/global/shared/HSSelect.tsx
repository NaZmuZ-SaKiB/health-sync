import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ClassValue } from "clsx";

type TProps = {
  className?: ClassValue;
  options: {
    label: string;
    value: string;
  }[];
} & React.ComponentProps<typeof SelectPrimitive.Root>;

const HSSelect = ({ className, options, ...props }: TProps) => {
  return (
    <Select {...props}>
      <SelectTrigger
        className={cn(
          "w-full rounded-none border-0 border-b-2 px-0 text-slate-50 shadow-none focus-visible:border-yellow-300 focus-visible:ring-0 [&>*]:!text-slate-50",
          className,
        )}
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent className="rounded-none border-none [&>div]:p-0">
        {options.map((option) => (
          <SelectItem
            key={`select-${option.value}`}
            value={option.value}
            className="hover:!text-primary-hover data-[state=checked]:text-primary-hover !m-0 cursor-pointer rounded-none !px-3.5 data-[state=checked]:font-semibold"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default HSSelect;
