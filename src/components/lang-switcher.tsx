"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, routing } from "@/i18n/routing";

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("language");

  const change = (next: (typeof routing.locales)[number]) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={t("label")}
          className="border-border bg-card text-foreground hover:border-foreground/30 hover:bg-muted inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition disabled:opacity-50"
          disabled={isPending}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>
            {localeLabels[locale as (typeof routing.locales)[number]]}
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="border-border bg-card z-50 min-w-[8rem] overflow-hidden rounded-xl border p-1 shadow-lg"
        >
          {routing.locales.map((l) => (
            <DropdownMenu.Item
              key={l}
              onSelect={() => change(l)}
              className="data-[highlighted]:bg-muted cursor-pointer rounded-lg px-2.5 py-1.5 text-sm outline-none"
              data-active={l === locale}
            >
              {localeLabels[l]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
