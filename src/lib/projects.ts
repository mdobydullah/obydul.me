import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECT_DIR = path.resolve(process.cwd(), "content", "projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  launchDate?: string;
  role?: string;
  status?: string;
  stack: string[];
  tags: string[];
  metrics?: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  order?: number;
};

export type Project = ProjectMeta & { content: string };

function ensureDir() {
  if (!fs.existsSync(PROJECT_DIR))
    fs.mkdirSync(PROJECT_DIR, { recursive: true });
}

function parse(file: string, raw: string): ProjectMeta {
  const { data } = matter(raw);
  return {
    slug: file.replace(/\.(md|mdx)$/, ""),
    title: String(data.title ?? "Untitled"),
    summary: String(data.summary ?? ""),
    year: String(data.year ?? ""),
    launchDate: data.launch_date ? String(data.launch_date) : undefined,
    role: data.role ? String(data.role) : undefined,
    status: data.status ? String(data.status) : undefined,
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    metrics: Array.isArray(data.metrics) ? data.metrics.map(String) : undefined,
    github: data.github ? String(data.github) : undefined,
    live: data.live ? String(data.live) : undefined,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : undefined,
  };
}

export function listProjects(): ProjectMeta[] {
  ensureDir();
  return fs
    .readdirSync(PROJECT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) =>
      parse(file, fs.readFileSync(path.join(PROJECT_DIR, file), "utf8")),
    )
    .sort((a, b) => {
      // explicit `order` field always wins (manual override)
      if (a.order != null && b.order != null) return a.order - b.order;
      if (a.order != null) return -1;
      if (b.order != null) return 1;
      // otherwise sort by launchDate desc, falling back to year
      const ad = a.launchDate || a.year;
      const bd = b.launchDate || b.year;
      return ad < bd ? 1 : -1;
    });
}

export function listFeaturedProjects(limit?: number): ProjectMeta[] {
  const sorted = [...listProjects()].sort((a, b) => {
    // featured first
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }
    // then by launchDate desc (with year fallback)
    const ad = a.launchDate || a.year;
    const bd = b.launchDate || b.year;
    return ad < bd ? 1 : -1;
  });
  return limit != null ? sorted.slice(0, limit) : sorted;
}

export function getProject(slug: string): Project | null {
  ensureDir();
  for (const ext of ["md", "mdx"]) {
    const file = path.join(PROJECT_DIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      const { content } = matter(raw);
      return { ...parse(`${slug}.${ext}`, raw), content };
    }
  }
  return null;
}
