import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons/social";
import { MermaidProvider } from "@/components/mermaid-provider";
import { getProject, listProjects } from "@/lib/projects";
import { mdToHtml } from "@/lib/md";

export async function generateStaticParams() {
  return listProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
    twitter: {
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="font-prose mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground font-mono text-xs tracking-[0.16em] uppercase transition"
      >
        ← {t("actions.back")}
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <Eyebrow>◆ {t("nav.projects")}</Eyebrow>
        {project.status && (
          <span className="border-border bg-muted text-foreground/70 rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] tracking-[0.14em] uppercase">
            {project.status}
          </span>
        )}
      </div>
      <p className="text-muted-foreground mt-5 font-mono text-[0.75rem] tracking-[0.16em] uppercase">
        {[project.year, project.role].filter(Boolean).join(" · ")}
      </p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">{project.title}</h1>
      <p className="mono-body text-muted-foreground mt-5">{project.summary}</p>

      {project.stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      )}

      {(project.github || project.live) && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="border-border bg-muted text-foreground/80 hover:border-foreground/30 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition"
            >
              <GithubIcon className="h-3 w-3" /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="border-border bg-muted text-foreground/80 hover:border-foreground/30 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition"
            >
              Live <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      )}

      <div
        className="prose-content mt-10"
        dangerouslySetInnerHTML={{ __html: mdToHtml(project.content) }}
      />
      <MermaidProvider />
    </article>
  );
}
