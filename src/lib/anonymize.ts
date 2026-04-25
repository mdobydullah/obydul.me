const PROJECT_NAME_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bEF\s+Pulse\b/g, "Pulse"],
  [/\bEF\s+Merchant\s+Center\s+Feeds\b/g, "Merchant Center Feeds"],
  [/\bEF\s+Provider\s+Price\s+Sync\b/g, "Provider Price Sync"],
  [/\bEF\s+Product\s+Feeds\s+Generator\b/g, "Product Feeds Generator"],
  [/\bEF\s+Platform\b/g, "the production platform"],
];

export function anonymizeCompany(md: string): string {
  let out = md;
  for (const [re, replacement] of PROJECT_NAME_REPLACEMENTS) {
    out = out.replace(re, replacement);
  }
  return out;
}
