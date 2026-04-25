import type { Metadata } from "next";
import { ArrowUpRight, MailIcon, MapPin } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { PrintButton } from "@/components/print-button";
import { RESUME } from "../../../../content/resume";
import { listProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: `${RESUME.name}, ${RESUME.headline}. ${RESUME.summary}`,
};

function iconForLink(label: string) {
  const l = label.toLowerCase();
  if (l.includes("github")) return GithubIcon;
  if (l.includes("linkedin")) return LinkedinIcon;
  return null;
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allProjects = listProjects();
  const featured = RESUME.featuredProjects
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="resume mx-auto max-w-3xl px-5 py-12 font-sans sm:px-8 sm:py-16 print:max-w-none print:px-10 print:py-6">
      <div className="mb-6 flex justify-end print:hidden">
        <PrintButton />
      </div>

      <header className="border-border border-b pb-6 print:pb-4">
        <h1 className="display text-3xl sm:text-4xl print:text-3xl">
          {RESUME.name}
        </h1>
        <p className="text-foreground/80 mt-1 text-base sm:text-lg print:text-sm">
          {RESUME.headline}
        </p>
        <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs print:text-[10px]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            {RESUME.location}
          </span>
          <a
            href={`mailto:${RESUME.email}`}
            className="hover:text-foreground inline-flex items-center gap-1.5"
          >
            <MailIcon className="h-3 w-3" />
            {RESUME.email}
          </a>
          {RESUME.links.map((link) => {
            const Icon = iconForLink(link.label);
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1.5"
              >
                {Icon ? (
                  <Icon className="h-3 w-3" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                )}
                {link.label}
              </a>
            );
          })}
        </div>
      </header>

      <Section title="Summary">
        <p className="text-foreground/85 leading-relaxed print:text-[12px]">
          {RESUME.summary}
        </p>
      </Section>

      <Section title="Experience">
        <div className="space-y-7 print:space-y-5">
          {RESUME.experience.map((c) => (
            <CompanyBlock key={c.company} company={c} />
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="grid gap-3 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-2.5">
          {RESUME.skills.map((g) => (
            <div key={g.group} className="contents">
              <dt className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.16em] uppercase sm:pt-1 print:text-[10px]">
                {g.group}
              </dt>
              <dd className="flex flex-wrap gap-1.5 print:gap-1">
                {g.items.map((s) => (
                  <Badge
                    key={s}
                    className="print:border-foreground/30 print:text-foreground print:bg-transparent print:py-0"
                  >
                    {s}
                  </Badge>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        <div className="space-y-3">
          {RESUME.education.map((e) => (
            <div
              key={e.institution}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <div>
                <h3 className="font-semibold tracking-tight">
                  {e.institution}
                </h3>
                <p className="text-foreground/85 text-sm print:text-[12px]">
                  {e.degree}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
              </div>
              <span className="text-muted-foreground font-mono text-xs print:text-[10px]">
                {e.period}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 print:mt-6 print:gap-6">
        <Section title="Languages" inline>
          <ul className="space-y-1.5">
            {RESUME.languages.map((l) => (
              <li
                key={l.name}
                className="text-foreground/85 text-sm print:text-[12px]"
              >
                <span className="font-semibold">{l.name}</span>
                <span className="text-muted-foreground"> · {l.level}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Certifications" inline>
          <ul className="space-y-1.5">
            {RESUME.certifications.map((c) => (
              <li
                key={c.name}
                className="text-foreground/85 text-sm print:text-[12px]"
              >
                <span className="font-semibold">{c.name}</span>
                <span className="text-muted-foreground"> · {c.issuer}</span>
                {c.note && (
                  <span className="text-muted-foreground block text-xs print:text-[11px]">
                    {c.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Selected projects">
        <ul className="space-y-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="border-border bg-card hover:border-foreground/30 print:border-foreground/30 block break-inside-avoid rounded-xl border p-4 transition print:bg-transparent print:p-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold tracking-tight">{p.title}</h3>
                  <span className="text-muted-foreground font-mono text-xs print:text-[10px]">
                    {p.year}
                  </span>
                </div>
                <p className="text-foreground/85 mt-1 text-sm print:text-[11px]">
                  {p.summary}
                </p>
                {p.metrics && p.metrics.length > 0 && (
                  <ul className="mt-2 space-y-0.5 font-mono text-xs print:text-[10px]">
                    {p.metrics.slice(0, 2).map((m, i) => (
                      <li key={i} className="text-foreground/85">
                        <span className="text-muted-foreground me-1.5">→</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-14 flex justify-center print:hidden">
        <PrintButton />
      </div>
    </article>
  );
}

function Section({
  title,
  children,
  inline = false,
}: {
  title: string;
  children: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <section className={inline ? "" : "mt-10 break-inside-avoid print:mt-6"}>
      <h2 className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase print:text-[10px]">
        {title}
      </h2>
      <div className="mt-3 print:mt-2">{children}</div>
    </section>
  );
}

function CompanyBlock({
  company,
}: {
  company: (typeof RESUME.experience)[number];
}) {
  const isMultiRole = company.roles.length > 1;
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          {company.link ? (
            <a
              href={company.link}
              target="_blank"
              rel="noreferrer"
              className="text-base font-semibold tracking-tight hover:opacity-80 print:text-sm"
            >
              {company.company}
            </a>
          ) : (
            <h3 className="text-base font-semibold tracking-tight print:text-sm">
              {company.company}
            </h3>
          )}
          {(company.location || company.type) && (
            <p className="text-muted-foreground text-xs print:text-[10px]">
              {[company.location, company.type].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <span className="text-muted-foreground font-mono text-xs print:text-[10px]">
          {company.period}
        </span>
      </div>

      <div className={isMultiRole ? "mt-3 space-y-4 print:space-y-3" : "mt-3"}>
        {company.roles.map((r, i) => (
          <div key={i} className="break-inside-avoid">
            {isMultiRole && (
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h4 className="text-foreground/90 text-sm font-medium print:text-[12px]">
                  {r.title}
                  {r.tenure && (
                    <span className="text-muted-foreground font-mono text-xs font-normal print:text-[10px]">
                      {" "}
                      · {r.tenure}
                    </span>
                  )}
                </h4>
                <span className="text-muted-foreground font-mono text-xs print:text-[10px]">
                  {r.period}
                </span>
              </div>
            )}
            <ul className="mt-1.5 space-y-1.5 print:space-y-1">
              {r.highlights.map((h, j) => (
                <li
                  key={j}
                  className="text-foreground/85 flex gap-2 text-sm print:text-[11.5px]"
                >
                  <span
                    aria-hidden
                    className="bg-muted-foreground mt-2 h-1 w-1 shrink-0 rounded-full print:mt-1.5"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
