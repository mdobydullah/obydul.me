import { ArrowRight, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroPanel } from "@/components/hero-panel";
import { listWriting } from "@/lib/writing";
import { listFeaturedProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const projects = listFeaturedProjects(3);
  const cases = listWriting().slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-bg grid-fade absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-x-12 gap-y-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="border-border bg-muted text-foreground/70 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.7rem] font-medium tracking-[0.16em] uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--status))]/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--status))]" />
              </span>
              {t("hero.status")}
            </span>
            <p className="text-muted-foreground mt-7 font-mono text-sm tracking-[0.18em] uppercase">
              {t("hero.greeting")}
            </p>
            <h1 className="display mt-2 text-5xl sm:text-6xl md:text-7xl">
              Md Obydullah
            </h1>
            <p className="text-foreground/85 mt-6 max-w-xl font-serif text-lg leading-relaxed italic sm:text-xl">
              {SITE.oneLiner}
            </p>
            <p className="mono-body text-muted-foreground mt-5 max-w-xl">
              {SITE.pitch}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/resume">
                  <FileText className="h-4 w-4" />
                  {t("nav.resume")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">
                  {t("hero.viewProjects")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroPanel />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {projects.length > 0 && (
          <section className="py-16 sm:py-20">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>◆ {t("nav.projects")}</Eyebrow>
              <h2 className="display mt-5 text-3xl sm:text-4xl">
                Latest projects
              </h2>
              <p className="mono-body text-muted-foreground mt-4 max-w-md">
                Production systems, not side-project demos. The stack, the
                constraints, the numbers.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="block focus:outline-none"
                >
                  <Card className="h-full">
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
                      <CardTitle className="text-xl">{p.title}</CardTitle>
                      <CardDescription>{p.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <Badge key={s}>{s}</Badge>
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
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/projects">
                  Show more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        <section className="py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>◆ {t("sections.stories")}</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              Stories from Real Systems
            </h2>
            <p className="mono-body text-muted-foreground mt-4 max-w-md">
              Outages, breaches, weird bugs, and what they taught me.
            </p>
          </div>
          {cases.length === 0 ? (
            <p className="text-muted-foreground mt-10 text-center font-mono text-sm">
              Case studies coming soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      <div className="flex flex-wrap gap-1.5">
                        {c.tags.slice(0, 4).map((tag) => (
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
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/writing">
                {t("actions.viewWork")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
