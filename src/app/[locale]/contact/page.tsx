import type { Metadata } from "next";
import { ArrowUpRight, MailIcon } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/social";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${SITE.email} or reach out on LinkedIn.`,
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const links = [
    { icon: LinkedinIcon, label: "LinkedIn", href: SITE.linkedin },
    { icon: GithubIcon, label: "GitHub", href: SITE.github },
    { icon: XIcon, label: "X", href: SITE.twitter },
    { icon: MailIcon, label: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Eyebrow>✉ {t("nav.contact")}</Eyebrow>
      <h1 className="display mt-5 text-4xl sm:text-5xl">
        Let&apos;s <span className="headline-gradient">talk</span>.
      </h1>
      <p className="mono-body text-muted-foreground mt-5 max-w-xl">
        Fastest reply by email or LinkedIn.
      </p>
      <ul className="mt-10 space-y-3">
        {links.map(({ icon: Icon, label, href }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group border-border bg-card hover:border-foreground/30 flex items-center justify-between rounded-2xl border px-5 py-4 transition"
            >
              <span className="inline-flex items-center gap-3 font-medium">
                <Icon className="text-accent h-4 w-4" />
                {label}
              </span>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
