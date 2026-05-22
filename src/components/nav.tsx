"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Brand } from "./brand";
import { LangSwitcher } from "./lang-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/projects", label: t("projects") },
    { href: "/writing", label: t("writing") },
    { href: "/timeline", label: t("timeline") },
    { href: "/resume", label: t("resume") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // close menu on route change (handles back/forward and locale switch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // close menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-site-nav
      className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 transition",
                  active
                    ? "text-foreground after:bg-foreground after:absolute after:-bottom-[11px] after:left-1/2 after:h-[2px] after:w-8 after:-translate-x-1/2 after:rounded-full"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            <LangSwitcher />
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="border-border bg-card text-foreground hover:border-foreground/30 hover:bg-muted inline-flex h-9 w-9 items-center justify-center rounded-full border transition md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-border overflow-hidden border-t transition-[max-height,opacity] duration-200 md:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 border-t-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3 text-sm">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 transition",
                  active
                    ? "bg-foreground/5 text-foreground"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-border mx-5 flex items-center gap-2 border-t py-3">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
