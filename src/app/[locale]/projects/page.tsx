import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
import { GithubIcon } from "@/components/icons/social";
import { listProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production systems and side projects. The stack, the constraints, the numbers.",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const projects = listProjects();

  return (
    <div className="font-prose mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <Eyebrow>◆ {t("nav.projects")}</Eyebrow>
        <h1 className="display mt-5 text-4xl sm:text-5xl md:text-6xl">
          Things I&apos;ve <span className="headline-gradient">built</span>.
        </h1>
        <p className="mono-body text-muted-foreground mx-auto mt-5 max-w-lg">
          Production systems, not side-project demos. The stack, the
          constraints, the numbers.
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.slug} className="flex h-full flex-col">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                  {p.year}
                  {p.role ? ` · ${p.role}` : ""}
                </span>
                {p.status && (
                  <span className="border-border bg-muted text-foreground/70 rounded-full border px-2 py-0.5 font-mono text-[0.65rem] tracking-[0.14em] uppercase">
                    {p.status}
                  </span>
                )}
              </div>
              <CardTitle className="text-xl">
                <Link href={`/projects/${p.slug}`} className="hover:opacity-80">
                  {p.title}
                </Link>
              </CardTitle>
              <CardDescription>{p.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              {p.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              )}
              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-foreground inline-flex items-center gap-1 font-mono text-xs font-medium transition group-hover:gap-2"
                >
                  {t("actions.readMore")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex items-center gap-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live`}
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
