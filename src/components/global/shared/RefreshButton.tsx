import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { RefreshCcw } from "lucide-react";

type TPorps = {
  type?: "default" | "icon";
  fn: any;
  className?: ClassValue;
};

const RefreshButton = ({ type = "default", fn, className }: TPorps) => {
  return (
    <Button
      className={cn(
        "cursor-pointer rounded-none text-slate-700 hover:bg-slate-50 hover:text-slate-900",
        className,
      )}
      variant="outline"
      onClick={() => fn()}
      size="sm"
    >
      <RefreshCcw />{" "}
      <span
        className={cn({
          hidden: type === "icon",
        })}
      >
        Refresh
      </span>
    </Button>
  );
};

export default RefreshButton;
