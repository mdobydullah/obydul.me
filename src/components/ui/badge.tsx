import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wider uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-border bg-muted text-foreground/70 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] font-medium tracking-[0.16em] uppercase",
        className,
      )}
      {...props}
    />
  );
}
