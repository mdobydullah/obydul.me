@AGENTS.md

# Claude Code instructions — obydul.me

Personal portfolio for **Md Obydullah**, targeting Saudi Arabia senior SWE / AI Engineer roles. Multilingual (English / Arabic / Bengali), light/dark themes, Markdown case studies.

## Stack

- **Next.js 16** (App Router, Turbopack) — read `node_modules/next/dist/docs/` before assuming behavior; conventions have changed (e.g. `proxy.ts` replaces `middleware.ts`)
- **React 19**, TypeScript strict
- **Tailwind CSS v4** (no config file — uses `@theme inline` in `src/app/globals.css`)
- **next-intl v4** for i18n
- **next-themes** for light/dark
- **Radix primitives** + custom shadcn-style components in `src/components/ui/`
- **gray-matter** for Markdown frontmatter
- Custom tiny Markdown renderer in `src/lib/md.ts` (no MDX runtime — keep dependencies small)

## Routing

Locale-prefixed via next-intl. Default locale `en` is shown without prefix (`localePrefix: "as-needed"`).

```
/                  → English (default)
/ar/...            → Arabic (RTL)
/bn/...            → Bengali
```

`src/app/layout.tsx` is a pass-through; the real root layout lives at `src/app/[locale]/layout.tsx` and owns `<html lang dir>`.

`src/proxy.ts` (NOT `middleware.ts`) handles locale redirects via next-intl.

## Content sources

There are two content sources — keep this clean:

### Privacy: sanitize before rendering

`career-hub/profile/*.md` is the user's private prep document. It contains things that must NOT appear on the public site: salary numbers, family details, walk-away thresholds, hiring strategy.

`src/lib/profile.ts` exports `sanitizeForPublic(md)`. **Every public page that renders profile content must run it through this filter.** It strips:

- H2 sections named `Compensation`, `Family`, `Non-negotiables`, `Explicit non-goals`, `Current constraint` (and anything that follows them up to the next H2)
- Bullet lines starting with `**Family:**`, `**Spouse:**`, `**Children:**`
- Sub-clauses with private metrics: em-dash-led tails like ` — across 330K MAU driving $10K/day` get cut, leaving the public part of the sentence (and the trailing period) intact
- Whole sentences with private narrative: `Daily sales went from X to Y, next target Z.` is dropped wholesale
- Bullet lines that _still_ contain private tokens after the above — dropped entirely (defense in depth, no `[redacted]` artifacts ever leak)

Goal: zero `[redacted]` markers in the rendered output. The site reads as if the private text was never there.

When adding a new public page that reads `loadProfile()`:

1. Run each doc through `sanitizeForPublic`.
2. If the section list might pull a private slug (e.g. `goals`), exclude it explicitly.
3. If you find new private patterns in the content, add them to `PRIVATE_SECTION_RE` / `PRIVATE_BULLET_RES` in `profile.ts` rather than handling per-page.

The `goals` slug is currently fully private — don't render it on any public page.

### 1. Profile data — synced from career-hub

**SSOT:** `../career-hub/profile/*.md` (sibling repo at `/Users/obydul/Workspace/personal/career-hub`).

**Local snapshot:** `content/profile/*.md` — committed to this repo so Vercel builds work without the sibling.

**Sync flow:**

1. `npm run dev` and `npm run build` both run `npm run sync-profile` first.
2. `scripts/sync-profile.mjs` copies `../career-hub/profile/*.md` → `content/profile/*.md`. If the sibling is missing (e.g. on Vercel), it logs a warning and keeps the existing snapshot — never fails the build.
3. `src/lib/profile.ts` reads from `content/profile/`.

Slugs: `identity`, `experience`, `skills`, `highlights`, `goals`, `gaps`.

**Rules:**

- **Edit profile facts in `career-hub/profile/*.md`, never in `content/profile/`.** The local copy gets overwritten on every sync.
- After editing in career-hub, run `npm run sync-profile` here (or just `npm run dev` / `npm run build`) and commit the updated `content/profile/` snapshot.
- If the user adds new raw material to `career-hub/my-raw-info/`, update `career-hub/profile/*.md` first (see that repo's `CLAUDE.md`), then sync.
- To add a new profile section: create `career-hub/profile/<slug>.md`, add the slug to `ProfileSlug` and `loadProfile()` in `src/lib/profile.ts`, sync.
- If `content/profile/` is missing (or a slug file is missing), `loadProfile()` returns `null` and the UI degrades gracefully.

### 2. Projects — local Markdown

Path: `content/projects/*.md`.

Frontmatter shape:

```yaml
---
title: "..."
summary: "..."
year: "2024"
role: "Solo build, in production"
status: "Live"
order: 1 # lower = higher in the listing
featured: true
stack: ["Go", "AWS EKS"]
tags: ["backend", "go"]
metrics:
  - "Queries: 2M → 240"
github: "https://github.com/..."
live: "https://..."
---
```

Loader: `src/lib/projects.ts`. Listed on `/projects`, rendered at `/projects/[slug]`. Use these for portfolio items: things built that you'd put on a CV.

**Resume auto-links into projects.** `src/lib/project-links.ts` defines a slug→regex map. When the resume renders `experience.md` / `highlights.md`, any bullet starting with `**EF Merchant Center Feeds**`, `**EF Pulse**`, etc. gets compressed to `**Title** — summary [Read more →](/projects/slug)`. To add a new project to this auto-link map, add an entry to `PATTERNS` in `project-links.ts`.

### 3. Writing / war stories — local Markdown

Path: `content/writing/*.md` (or `.mdx`).

Frontmatter shape:

```yaml
---
title: "..."
summary: "..."
date: "YYYY-MM-DD"
tags: ["..."]
metrics: ["..."]
featured: true
---
```

Loader: `src/lib/writing.ts`. Listed on `/writing`, rendered at `/writing/[slug]`. Use these for war stories, hacking writeups, personal narratives — the _story_ of solving something, not the _spec_ of what was built. **These live in this repo**, not in career-hub.

**Difference from projects:** projects = portfolio item ("here's what I shipped"), writing = narrative ("here's how it broke at 3am"). A given EF service might have a project page _and_ a war-story page about the day it caught fire.

## i18n discipline

- Translate **chrome only**: nav labels, button text, section headings, hero availability line.
- Do **not** translate case study content, profile data, or long prose — English is canonical.
- Message files: `src/i18n/messages/{en,ar,bn}.json`. Keep keys parallel across all three.
- When adding new UI text, add the key to all three locales. If Arabic/Bengali strings aren't ready, copy English as a placeholder and flag in `gaps.md`.
- RTL is handled by `<html dir>` in the locale layout. Use logical Tailwind utilities (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`) — not `ml-`/`mr-`/`pl-`/`pr-`.

## Theming

- CSS variables in `globals.css` (`:root` and `.dark`). HSL channels.
- `next-themes` toggles the `dark` class on `<html>`.
- Use Tailwind tokens like `bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-card`, `text-accent` — they all map to the CSS vars.

## Conventions

- All pages live under `src/app/[locale]/`. Never create routes outside `[locale]`.
- Every page calls `setRequestLocale(locale)` after destructuring params (next-intl static rendering requirement).
- Use `Link` from `@/i18n/navigation` (locale-aware), never the bare `next/link`.
- For dynamic routes, pass href as a string: `href={`/work/${slug}`}` — not the object form.
- Use `cn()` from `@/lib/utils` for merging Tailwind classes.
- Keep components small. UI primitives in `src/components/ui/`. App-specific components flat in `src/components/`.
- No backend for v1. Static export-friendly: no DB, no API routes (except future things like OG images).
- GitHub/LinkedIn/WhatsApp icons live in `src/components/icons/social.tsx` (lucide-react no longer ships brand icons).

## Deployment

Vercel. `obydul.me` domain. The `career-hub` sibling is **not** required at deploy time — `content/profile/` is committed.

## Voice & copy

User-facing copy in this repo (hero, section intros, button text, descriptions, metadata) must sound like a senior engineer talking, not marketing.

**Hard rules:**

- **No em dashes (`—`).** Period. Use plain periods, commas, or colons. Em dashes read as AI-generated.
- **No en dashes (`–`)** in prose either, except in numeric ranges if absolutely needed (e.g. "2017–2020"). Prefer "to": "2017 to 2020".
- **No marketing fluff.** Drop hedges and hype: "leverage", "passionate about", "world-class", "cutting-edge", "seamlessly", "robust", "innovative", "synergy", "next-generation".
- **No tricolons of abstract nouns** ("security, scale, and judgment over hype" style). Pick one concrete thing or rewrite as a real sentence.
- **No tagline-listing with em dash + comma series.** That pattern is a tell.

**Do:**

- Vary sentence length. Short sentences are fine. Fragments are fine if they sound natural.
- Use specifics: years, numbers, names of systems, real outcomes.
- Allow mild opinion — "I care about what works, not what looks good in a deck" reads as a person, not a brand.
- Read the line aloud. If it sounds like a LinkedIn bio or a SaaS landing page, rewrite it.

**Scope:** these rules apply to copy _I write_ in `src/`, message files (`src/i18n/messages/*.json`), and component literals. Do not edit `content/profile/*.md` to enforce these — that's the user's own writing, synced from career-hub. Same for `content/writing/*.md` once the user populates them.

## Git commits

Use **Conventional Commits**. Subject line format:

```
<type>(<optional-scope>): <subject>
```

**Types** (always lowercase, never invent new ones):

- `feat` — new user-facing feature or page
- `fix` — bug fix
- `chore` — maintenance, deps, config, tooling (no behavior change for users)
- `docs` — README, CLAUDE.md, comments, JSDoc
- `refactor` — code change that doesn't add a feature or fix a bug
- `style` — formatting, prettier, whitespace (no logic change)
- `perf` — performance improvement
- `test` — adding or updating tests
- `ci` — GitHub Actions, Vercel config, build pipelines
- `build` — Next.js config, package.json scripts, build tooling
- `revert` — revert a previous commit

**Subject rules:**

- Imperative mood, present tense: `add`, not `added` or `adds`.
- Lowercase first word.
- No trailing period.
- ≤ 72 chars when possible. Hard cap at 100.
- Be specific: `fix: handle empty career-hub sibling on Vercel build` beats `fix: build issue`.

**Scope** is optional. Use it when the diff touches one clear area: `feat(resume):`, `chore(deps):`, `fix(i18n):`, `style(timeline):`. Skip it when the change spans multiple areas.

**Body** (optional, after blank line):

- Explain _why_, not _what_. Diff shows the what.
- Wrap at 72 chars.
- Reference issues with `Closes #N` or `Refs #N` if applicable.

**Examples (good):**

```
feat(timeline): add /timeline page with alternating entries
fix(sanitizer): drop "Current constraint" H2 even at end of file
chore: add prettier and prettier-plugin-tailwindcss
docs(claude): document commit conventions
refactor(projects): replace order field with launch_date sort
```

**Examples (bad):**

```
Update stuff               ← no type, vague
feat: Added new page.      ← past tense, capitalized, trailing period
fix: bug                   ← not specific
WIP                        ← no type, no info, do not commit
```

**Don't** mix unrelated changes in one commit. If the diff has feature work + style fixes + docs, split into three commits.

## Don't do

- Don't add a CMS, database, or auth — this is a static site.
- Don't translate prose content into Arabic/Bengali. UI chrome only.
- Don't put profile facts in this repo. Edit `career-hub/profile/*.md` and re-sync.
- Don't introduce a different theme system. Use CSS vars + `next-themes`.
- Don't add `ml-`/`mr-`/etc. directional utilities — break RTL. Use logical equivalents.
- Don't rename `src/proxy.ts` to `middleware.ts` — Next 16 deprecated middleware.
