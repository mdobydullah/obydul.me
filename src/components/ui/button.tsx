import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    "[&>svg]:transition-transform [&>svg]:duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-accent-foreground",
          "shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.22),inset_0_-1px_0_0_hsl(0_0%_0%/0.15),0_1px_2px_hsl(0_0%_0%/0.1),0_8px_24px_-8px_hsl(var(--accent)/0.55)]",
          "ring-1 ring-white/10 ring-inset",
          "hover:-translate-y-[1px] hover:brightness-110",
          "hover:shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.28),inset_0_-1px_0_0_hsl(0_0%_0%/0.18),0_2px_4px_hsl(0_0%_0%/0.15),0_14px_32px_-8px_hsl(var(--accent)/0.7)]",
          "active:translate-y-0 active:brightness-95",
          "[&>svg:last-child]:group-hover/btn:translate-x-0.5",
          "[&>svg:first-child]:group-hover/btn:scale-110",
        ].join(" "),
        outline: [
          "border-foreground/15 bg-card/70 text-foreground border backdrop-blur-sm",
          "shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.04),0_1px_2px_hsl(0_0%_0%/0.04)]",
          "hover:border-foreground/30 hover:bg-card hover:-translate-y-[1px]",
          "hover:shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.06),0_4px_12px_-4px_hsl(0_0%_0%/0.12)]",
          "active:translate-y-0",
          "[&>svg:last-child]:group-hover/btn:translate-x-0.5",
        ].join(" "),
        ghost: "text-foreground hover:bg-foreground/5",
      },
      size: {
        default: "h-10 rounded-full px-5 text-sm",
        sm: "h-8 rounded-full px-3.5 text-xs",
        lg: "h-12 rounded-full px-7 text-[0.95rem] font-semibold tracking-tight",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
