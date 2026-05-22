import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/social";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: SITE.github, Icon: GithubIcon },
    { label: "LinkedIn", href: SITE.linkedin, Icon: LinkedinIcon },
    { label: "X", href: SITE.twitter, Icon: XIcon },
  ];

  return (
    <footer data-site-footer className="border-border mt-24 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 font-mono text-xs sm:flex-row sm:items-center sm:px-8">
        <p>
          © {year} {SITE.name}
        </p>
        <ul className="flex items-center gap-1">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full transition"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
