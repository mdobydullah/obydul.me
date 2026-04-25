export function HeroPanel() {
  const lines: Array<
    | { type: "prompt"; text: string }
    | { type: "kv"; k: string; v: string; accent?: boolean }
    | { type: "comment"; text: string }
    | { type: "blank" }
  > = [
    { type: "prompt", text: "whoami --verbose" },
    { type: "blank" },
    { type: "kv", k: "name", v: "Md Obydullah" },
    { type: "kv", k: "nickname", v: "Obydul/Saad" },
    { type: "kv", k: "role", v: "Senior Software Engineer" },
    { type: "kv", k: "focus", v: "ai · backend · scale", accent: true },
    { type: "kv", k: "years", v: "9+" },
    { type: "kv", k: "ships", v: "production systems" },
    { type: "kv", k: "status", v: "available", accent: true },
    { type: "blank" },
    { type: "prompt", text: "ls ./recent" },
    { type: "comment", text: "→ AI features at scale" },
    { type: "comment", text: "→ payment + checkout systems" },
    { type: "comment", text: "→ security & infra hardening" },
  ];

  return (
    <div
      aria-hidden
      className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_8px_24px_-12px_hsl(var(--foreground)/0.12)]"
    >
      <div className="border-border flex items-center gap-1.5 border-b px-4 py-3">
        <span className="bg-foreground/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-foreground/15 h-2.5 w-2.5 rounded-full" />
        <span className="bg-foreground/15 h-2.5 w-2.5 rounded-full" />
        <span
          className="text-muted-foreground ms-3 text-[0.7rem] tracking-[0.16em] uppercase"
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          }}
        >
          ~/obydul.me
        </span>
      </div>
      <pre
        className="text-foreground/90 overflow-x-auto p-5 text-[0.82rem] leading-relaxed sm:text-sm"
        style={{
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        }}
      >
        {lines.map((line, i) => {
          if (line.type === "prompt") {
            return (
              <div key={i} className="flex gap-2">
                <span className="text-muted-foreground">$</span>
                <span className="text-foreground">{line.text}</span>
              </div>
            );
          }
          if (line.type === "kv") {
            return (
              <div key={i} className="flex gap-3">
                <span className="text-muted-foreground w-16">{line.k}</span>
                <span className="text-muted-foreground">:</span>
                <span
                  className={
                    line.accent
                      ? "text-foreground font-semibold"
                      : "text-foreground"
                  }
                >
                  {line.v}
                </span>
              </div>
            );
          }
          if (line.type === "comment") {
            return (
              <div key={i} className="text-muted-foreground">
                {line.text}
              </div>
            );
          }
          return <div key={i}>&nbsp;</div>;
        })}
      </pre>
    </div>
  );
}
