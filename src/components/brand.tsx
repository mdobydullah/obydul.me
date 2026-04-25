import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

export function Brand() {
  return (
    <Link
      href="/"
      className="text-foreground inline-flex items-center"
      aria-label={SITE.name}
    >
      <span className="font-mono text-base font-semibold tracking-tight">
        <span className="text-foreground/40">/</span>
        obydul
      </span>
    </Link>
  );
}
