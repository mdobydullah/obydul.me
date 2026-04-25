import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "bn"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  ar: "العربية",
  bn: "বাংলা",
};

export const rtlLocales = new Set<string>(["ar"]);
