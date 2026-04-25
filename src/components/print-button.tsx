"use client";

import { Printer } from "lucide-react";

export function PrintButton({
  label = "Print / Save PDF",
}: {
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border-border bg-muted text-foreground/70 hover:border-foreground/30 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.18em] uppercase transition print:hidden"
    >
      <Printer className="h-3 w-3" />
      {label}
    </button>
  );
}
