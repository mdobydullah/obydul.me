import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CASE_DIR = path.resolve(process.cwd(), "content", "case-studies");

export type CaseStudyMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  metrics?: string[];
  featured?: boolean;
};

export type CaseStudy = CaseStudyMeta & { content: string };

function ensureDir() {
  if (!fs.existsSync(CASE_DIR)) fs.mkdirSync(CASE_DIR, { recursive: true });
}

export function listCaseStudies(): CaseStudyMeta[] {
  ensureDir();
  const files = fs
    .readdirSync(CASE_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CASE_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.(md|mdx)$/, ""),
        title: String(data.title ?? "Untitled"),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        date: String(data.date ?? ""),
        metrics: Array.isArray(data.metrics)
          ? data.metrics.map(String)
          : undefined,
        featured: Boolean(data.featured),
      } satisfies CaseStudyMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  ensureDir();
  for (const ext of ["md", "mdx"]) {
    const file = path.join(CASE_DIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        date: String(data.date ?? ""),
        metrics: Array.isArray(data.metrics)
          ? data.metrics.map(String)
          : undefined,
        featured: Boolean(data.featured),
        content,
      };
    }
  }
  return null;
}
