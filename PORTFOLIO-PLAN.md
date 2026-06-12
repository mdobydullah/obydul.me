# Portfolio content plan

Internal roadmap. What to publish on obydul.me (and cross-post to vizly.dev) before the Oct/Nov 2026 application wave. Timed to the career-hub Saudi tracker weeks. Not rendered on the site.

## Ground rules

- No revenue, MAU, or order-volume numbers in public content (sanitizer-private tokens: $10K/day, 330K MAU, 1K orders/day). Technical metrics are fine: 8,000x query reduction, 60s to 20s, 99% CPU to flat, 520K entries.
- No salary, family, or relocation-urgency signals anywhere public.
- Anything naming EF internals (architecture docs, sanitized forks) needs manager/legal OK first (tracker W10 task).
- Voice rules from CLAUDE.md apply: no em dashes, no marketing fluff.

## Already live

**Projects (8):** cloud-platform, ecommerce-rebuild, jetshift, makpie, merchant-center-feeds, product-feeds-generator, provider-price-sync, pulse-ai-agent.

**Writing (2):** a-hack-15-sleepless-nights (2020 PHPMyAdmin attack), moving-reports-off-mariadb (ClickHouse migration).

## To add: projects

| Priority | Item | Source | When |
| --- | --- | --- | --- |
| 1 | **Pulse v2 public fork** (sanitized repo + eval layer + guardrails + live demo URL) | Tracker M3, W10-13 | Jul 2026. The single highest-value portfolio item. Gates the stretch salary band. Update pulse-ai-agent.md with repo + demo links when shipped. |
| 2 | **Auto-shipping engine** (~60% of orders ship with no human touch, risk-scored) | experience.md | Anytime, small. New project page. Good "business impact" story without revenue numbers. |
| 3 | **LLM eval suite** as standalone page IF it grows beyond a Pulse feature | Tracker W11 | Only if it becomes its own repo. Otherwise it lives inside Pulse v2. |

## To add: war stories (content/writing/)

Ordered by story strength. One per week-ish keeps momentum; tracker W23 says schedule 4 weekly posts.

| Priority | Story | Hook | Source |
| --- | --- | --- | --- |
| 1 | **Cart session hijacking find + fix** | Found it pentesting my own production app | experience.md, gaps.md STAR #2 |
| 2 | **The multi-million-hit DDoS** | Cloudflare config under live fire | experience.md (get numbers from gaps.md "still open" first: peak RPS, duration) |
| 3 | **WordPress to Laravel solo rebuild** | Rebuilt a live store while it kept selling, 1 year parallel run | gaps.md STAR #4. Project page exists; the story (risk, cutover, what I'd redo) does not. |
| 4 | **RDS at 99% CPU: the feed job that ate the database** | Why I rewrote a Laravel cron in Go | experience.md (product-feeds-generator backstory) |
| 5 | **2M queries to 240** | Merchant Center re-architecture writeup, sanitized from internal arch doc | Tracker W23. Needs EF OK. |
| 6 | **Adding evaluation to an LLM agent** | Measured accuracy + hallucination rate on a real agent | Tracker W11 deliverable |
| 7 | **System design for LLM apps at e-commerce scale** | Cost, caching, guardrails | Tracker W17 deliverable |
| 8 | **2 devs to 9: reviewing 400 CVs** | Hiring story, leadership signal | gaps.md STAR #1. Lower priority: recruiters like it, engineers skim it. |

## Open questions (blockers)

- EF approval for Pulse fork + Merchant Center writeup (W10).
- DDoS numbers, vuln list, before/after benchmarks: still open in gaps.md. Stories 2 and 1 need them to land.
- gaps.md "strongest 3-5 public GitHub repos" still unanswered; needed for the projects' github links and W23 polish pass.

## Sequencing vs tracker

- **Now to W13 (Jun-Jul):** Pulse v2 fork + eval post (#6). Stories 1, 3, 4 need no approval and no new work: write whenever a week has slack.
- **W17 (Aug):** system design post (#7).
- **W22-23 (Sep):** Merchant Center writeup (#5), repo polish, walkthrough videos, update all project pages with final links.
- **W26 (Oct):** LinkedIn article repurposes whichever story performed best.

Everything public by end of W23. Nothing new ships during the application wave; that time is for interviews.
