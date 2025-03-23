import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    React.ComponentProps<"button"> {
  asChild?: boolean;
}

const HSButton = ({ className, children, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn(
        "cursor-pointer rounded-lg duration-300 active:scale-90",
        {
          "bg-primary hover:bg-primary-hover":
            props.variant === "default" || !props.variant,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default HSButton;
