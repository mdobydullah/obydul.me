import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { MermaidProvider } from "@/components/mermaid-provider";
import { getWriting, listWriting } from "@/lib/writing";
import { mdToHtml } from "@/lib/md";

export async function generateStaticParams() {
  return listWriting().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getWriting(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
    },
    twitter: {
      title: study.title,
      description: study.summary,
    },
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const study = getWriting(slug);
  if (!study) notFound();

  const html = mdToHtml(study.content);

  return (
    <article className="font-prose mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/writing"
        className="text-muted-foreground hover:text-foreground font-mono text-xs tracking-[0.16em] uppercase transition"
      >
        ← {t("actions.back")}
      </Link>
      <div className="mt-6">
        <Eyebrow>◆ {study.tags[0] ?? "case study"}</Eyebrow>
      </div>
      <h1 className="display mt-5 text-4xl sm:text-5xl">{study.title}</h1>
      <p className="mono-body text-muted-foreground mt-5">{study.summary}</p>
      {study.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
      {study.metrics && study.metrics.length > 0 && (
        <div className="border-border bg-card mt-8 rounded-2xl border p-5">
          <span className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.16em] uppercase">
            Outcome
          </span>
          <ul className="mt-3 grid gap-2 font-mono text-sm sm:grid-cols-2">
            {study.metrics.map((m, i) => (
              <li key={i} className="text-foreground/85">
                <span className="text-muted-foreground me-1.5">→</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        className="prose-content mt-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <MermaidProvider />
    </article>
  );
}
