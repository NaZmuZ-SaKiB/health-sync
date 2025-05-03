import { cn } from "@/lib/utils";

type TProps = { count: number; rounded?: boolean };

const SelectedCount = ({ count, rounded = false }: TProps) => {
  return (
    <div
      className={cn(
        "flex h-8 items-center justify-center gap-1 border px-3 text-sm text-slate-700",
        {
          "rounded-md": rounded,
        },
      )}
    >
      <span className="font-medium">{count}</span> Selected
    </div>
  );
};

export default SelectedCount;
