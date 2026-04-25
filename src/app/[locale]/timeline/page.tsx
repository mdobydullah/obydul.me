import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/badge";
import { TIMELINE } from "../../../../content/timeline";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "From first curiosity in 2007 to current production work. The arc, in dots.",
};

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <Eyebrow>◷ {t("nav.timeline")}</Eyebrow>
        <h1 className="display mt-5 text-4xl sm:text-5xl md:text-6xl">
          The long <span className="headline-gradient">version</span>.
        </h1>
        <p className="mono-body text-muted-foreground mx-auto mt-5 max-w-lg">
          From first curiosity to current production work. The arc, in dots.
        </p>
      </div>

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div
          aria-hidden
          className="bg-border absolute inset-y-0 left-4 w-px -translate-x-1/2 sm:left-1/2"
        />
        <ol className="space-y-12">
          {TIMELINE.map((entry, i) => {
            const isRight = i % 2 === 1;
            return (
              <li
                key={`${entry.year}-${entry.title}`}
                className="relative grid grid-cols-1 sm:grid-cols-2 sm:gap-12"
              >
                <span
                  aria-hidden
                  className="border-foreground bg-background absolute top-3 left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 sm:left-1/2"
                />
                <div
                  className={cn(
                    "ms-10 space-y-3 sm:ms-0",
                    isRight
                      ? "sm:col-start-2 sm:ps-8 sm:text-start"
                      : "sm:col-start-1 sm:pe-8 sm:text-end",
                  )}
                >
                  <span className="border-border bg-muted text-foreground/70 inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                    {entry.year}
                  </span>
                  <div className="border-border bg-card hover:border-foreground/30 rounded-2xl border p-5 transition">
                    <h3
                      className={cn(
                        "text-lg font-bold tracking-tight",
                        isRight ? "" : "sm:text-end",
                      )}
                    >
                      {entry.title}
                    </h3>
                    <p
                      className={cn(
                        "text-foreground/85 mt-2 text-sm leading-relaxed",
                        isRight ? "" : "sm:text-end",
                      )}
                    >
                      {entry.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
