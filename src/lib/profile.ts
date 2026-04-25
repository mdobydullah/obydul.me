import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROFILE_DIR = path.resolve(process.cwd(), "content", "profile");

export type ProfileSlug =
  | "identity"
  | "experience"
  | "skills"
  | "highlights"
  | "goals"
  | "gaps";

export type ProfileDoc = {
  slug: ProfileSlug;
  data: Record<string, unknown>;
  content: string;
};

function readDoc(slug: ProfileSlug): ProfileDoc | null {
  const file = path.join(PROFILE_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return { slug, data: parsed.data, content: parsed.content };
}

export function loadProfile(): Record<ProfileSlug, ProfileDoc | null> {
  return {
    identity: readDoc("identity"),
    experience: readDoc("experience"),
    skills: readDoc("skills"),
    highlights: readDoc("highlights"),
    goals: readDoc("goals"),
    gaps: readDoc("gaps"),
  };
}

export function loadProfileDoc(slug: ProfileSlug) {
  return readDoc(slug);
}

const PRIVATE_SECTIONS = new Set([
  "compensation",
  "family",
  "non-negotiables",
  "non-negotiables / preferences",
  "explicit non-goals",
  "current constraint",
]);

const PRIVATE_BULLET_LINE_RES: RegExp[] = [
  /^\s*[-*]\s+\*\*Family:?\*\*.*$/gim,
  /^\s*[-*]\s+\*\*Spouse:?\*\*.*$/gim,
  /^\s*[-*]\s+\*\*Children:?\*\*.*$/gim,
];

const PRIVATE_CLAUSE_RES: RegExp[] = [
  /\s*[—–]\s+across\s+(?:[^.\n]|\.\d)*?(?:monthly\s+active|daily\s+active|active\s+users|MAU|DAU)(?:[^.\n]|\.\d)*?(?=\.|$)/gi,
  /\s*[—–]\s+(?:earning|driving|generating)\s+\$\d(?:[^.\n]|\.\d)*?(?=\.|$)/gi,
  /,\s+(?:driving|earning|generating)\s+\$\d(?:[^.\n]|\.\d)*?(?=\.|$)/gi,
  /,\s+next\s+(?:internal\s+)?target\s+\S+(?:\s*[–-]\s*\S+)?/gi,
];

const PRIVATE_SENTENCE_RES: RegExp[] = [
  /\b(?:Daily|Weekly|Monthly)\s+sales\s+went\s+from(?:[^.\n]|\.\d)*?(?:\.\s|\.$|$)/gi,
  /\bDaily\s+(?:orders?|sales)\s+(?:are|hit|reached)(?:[^.\n]|\.\d)*?(?:orders?|sales|transactions?)\s*\/?\s*(?:day|week|month)(?:[^.\n]|\.\d)*?(?:\.\s|\.$|$)/gi,
];

const PRIVATE_INLINE_TOKEN_RES: RegExp[] = [
  /\$\d[\d,.]*[KkMm]?\+?(?:\s*(?:USD|SAR|EUR|GBP|\/(?:month|year|mo|yr|day|wk|hour)))?/g,
  /\b(?:SAR|EUR|GBP)\s*\d[\d,.]*[KkMm]?(?:\s*\/\s*(?:month|year|mo|yr|day|wk|hour))?/g,
  /~?\d[\d,.\s]*[KkMm]?(?:\s*[–-]\s*\d[\d,.\s]*[KkMm]?)?\s*(?:orders?|sales|transactions?|tickets?)\s*\/?\s*(?:day|week|month|d|wk|mo)\b/gi,
  /\b\d[\d,.]*[KkMm]?\+?\s*(?:monthly\s+active\s+users|daily\s+active\s+users|active\s+users|MAU|DAU)\b/gi,
];

function cleanupPunctuation(s: string): string {
  return s
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/,\s*\./g, ".")
    .replace(/\s{2,}/g, " ")
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/\(\s*\)/g, "")
    .trim();
}

export function sanitizeForPublic(md: string): string {
  const lines = md.split("\n");
  const sectionFiltered: string[] = [];
  let skipping = false;
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      const name = h2[1].toLowerCase().trim();
      skipping = PRIVATE_SECTIONS.has(name);
      if (skipping) continue;
    }
    if (skipping) continue;
    sectionFiltered.push(line);
  }

  const out: string[] = [];
  for (let line of sectionFiltered) {
    if (PRIVATE_BULLET_LINE_RES.some((re) => re.test(line))) continue;

    for (const re of PRIVATE_CLAUSE_RES) line = line.replace(re, "");
    for (const re of PRIVATE_SENTENCE_RES) line = line.replace(re, "");

    const stillHasPrivate = PRIVATE_INLINE_TOKEN_RES.some((re) =>
      re.test(line),
    );
    if (stillHasPrivate) {
      const trimmed = line.trim();
      if (/^[-*]\s/.test(trimmed)) continue;
    }

    line = cleanupPunctuation(line);
    if (/^\s*[-*]\s*$/.test(line)) continue;
    out.push(line);
  }

  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
