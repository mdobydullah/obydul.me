import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge, Eyebrow } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listWriting } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Stories from real systems. Outages, breaches, weird bugs, and what they taught me.",
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const cases = listWriting();

  return (
    <div className="font-prose mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <Eyebrow>◆ {t("nav.stories")}</Eyebrow>
        <h1 className="display mt-5 text-4xl sm:text-5xl md:text-6xl">
          Stories from <span className="headline-gradient">Real Systems</span>
        </h1>
        <p className="mono-body text-muted-foreground mx-auto mt-5 max-w-lg">
          Outages, breaches, weird bugs, and what they taught me.
        </p>
      </div>

      {cases.length === 0 ? (
        <p className="text-muted-foreground mt-16 text-center font-mono text-sm">
          Writing coming soon. Add Markdown files to{" "}
          <code className="bg-muted rounded px-1.5 py-0.5">
            content/writing/
          </code>
          .
        </p>
      ) : (
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/writing/${c.slug}`}
              className="block focus:outline-none"
            >
              <Card className="h-full">
                <CardHeader>
                  <span className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                    {c.tags[0] ?? "case study"}
                  </span>
                  <CardTitle className="text-xl">{c.title}</CardTitle>
                  <CardDescription>{c.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  {c.metrics && c.metrics.length > 0 && (
                    <ul className="mb-4 space-y-1 font-mono text-xs">
                      {c.metrics.map((m, i) => (
                        <li key={i} className="text-foreground/85">
                          <span className="text-muted-foreground me-1.5">
                            →
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="text-foreground mt-5 inline-flex items-center gap-1 font-mono text-xs font-medium transition group-hover:gap-2">
                    {t("actions.readMore")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
