import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WRITING_DIR = path.resolve(process.cwd(), "content", "writing");

export type WritingMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  metrics?: string[];
  featured?: boolean;
};

export type Writing = WritingMeta & { content: string };

function ensureDir() {
  if (!fs.existsSync(WRITING_DIR)) fs.mkdirSync(WRITING_DIR, { recursive: true });
}

export function listWriting(): WritingMeta[] {
  ensureDir();
  const files = fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf8");
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
      } satisfies WritingMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWriting(slug: string): Writing | null {
  ensureDir();
  for (const ext of ["md", "mdx"]) {
    const file = path.join(WRITING_DIR, `${slug}.${ext}`);
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
