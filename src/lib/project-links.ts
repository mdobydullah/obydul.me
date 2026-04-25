import { listProjects } from "./projects";

const PATTERNS: Array<{ slug: string; matchers: RegExp[] }> = [
  {
    slug: "merchant-center-feeds",
    matchers: [
      /\*\*EF Merchant Center Feeds\b/i,
      /\*\*Merchant Center Feeds\b/i,
    ],
  },
  {
    slug: "provider-price-sync",
    matchers: [/\*\*EF Provider Price Sync\b/i, /\*\*Provider Price Sync\b/i],
  },
  {
    slug: "product-feeds-generator",
    matchers: [
      /\*\*EF Product Feeds Generator\b/i,
      /\*\*Product Feeds Generator\b/i,
    ],
  },
  {
    slug: "pulse-ai-agent",
    matchers: [/\*\*[^*]*\bPulse\b[^*]*\*\*/],
  },
  {
    slug: "ecommerce-rebuild",
    matchers: [
      /\*\*electronicfirst\.com\*\*/i,
      /\*\*E-?commerce Platform Rebuild\b/i,
    ],
  },
  { slug: "jetshift", matchers: [/\*\*JetShift\*\*/i] },
  {
    slug: "cloud-platform",
    matchers: [/\*\*EF Platform\b/i, /\*\*Production Cloud Platform\b/i],
  },
  {
    slug: "makpie",
    matchers: [/\*\*[^*]*\bMakpie\b[^*]*\*\*/],
  },
];

export function injectProjectLinks(md: string): string {
  const projects = new Map(listProjects().map((p) => [p.slug, p] as const));
  const lines = md.split("\n");
  return lines
    .map((line) => {
      if (!/^\s*[-*]\s+\*\*/.test(line)) return line;
      for (const { slug, matchers } of PATTERNS) {
        if (!matchers.some((re) => re.test(line))) continue;
        const proj = projects.get(slug);
        if (!proj) return line;
        return `- **${proj.title}.** ${proj.summary} [Read more →](/projects/${slug})`;
      }
      return line;
    })
    .join("\n");
}
