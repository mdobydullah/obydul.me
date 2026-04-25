#!/usr/bin/env node
// Sync profile/*.md from sibling career-hub repo into ./content/profile/
// Career-hub is the SSOT; this site reads a local snapshot so the build is hermetic.
import { existsSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "..", "career-hub", "profile");
const dest = resolve(root, "content", "profile");

if (!existsSync(src)) {
  console.warn(
    `[sync-profile] career-hub/profile not found at ${src} — keeping existing snapshot`,
  );
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

const files = readdirSync(src).filter((f) => f.endsWith(".md"));
if (files.length === 0) {
  console.warn(`[sync-profile] no .md files in ${src}`);
  process.exit(0);
}

for (const file of files) {
  copyFileSync(join(src, file), join(dest, file));
}

console.log(
  `[sync-profile] copied ${files.length} file(s) from career-hub/profile → content/profile`,
);
