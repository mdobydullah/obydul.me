# Gaps — info still to fill in

Answered items have been migrated into [experience.md](experience.md) and [highlights.md](highlights.md). This file only tracks what's still open.

## Still open — quantified impact
- **Dollar cost savings** on AWS from the cache/query/log-offload work. A ballpark before/after monthly AWS spend figure would be gold. Even "cut the RDS class from X to Y" or "avoided a Z-sized upgrade" works.
- **Before/after performance numbers** on the N+1 query fixes: p95 latency, query time, RPS, anything concrete. One or two benchmarks for one or two specific endpoints is enough.
- **DDoS / bot attack scale in numbers**: peak requests/sec absorbed, attacker IP counts, duration — whatever you logged in Cloudflare.
- **Full list of security vulns found & fixed.** You said "many, I'll share later" — when you do, pick the 3 best ones and write them up as STAR stories.

## Still open — EF Provider Price Sync
_Answered: Go service on EKS, two K8s CronJobs, syncs cheapest price across Gamivo / Incentive Digital / Rokky / Kinguin, webhook-driven updates, Loki observability, GitHub Actions CI/CD. Captured in [experience.md](experience.md) and [highlights.md](highlights.md)._
- **Business impact in dollars.** This is the single most important question: how much does "always route to cheapest supplier" save EF per month, or how much does it add in margin? Even a rough estimate makes this project a top-tier story.
- **Catalog size touched by this service.** How many products have multi-provider mappings? How many price changes / webhooks per day on average?
- **Repo visibility.** Internal only, or extractable?
_Solo build confirmed — all EF microservices are Obydul's work._

## Still open — EF Merchant Center Feeds
_Answered: Go microservice, ~520K entries, EKS, read replica, SQS, HTTP batching, ~8,000× query reduction, 7d → 5–10 min, **in production**, **solo build**. Captured in [experience.md](experience.md) and [highlights.md](highlights.md)._
- **Are the 5–10 minute full syncs measured in prod,** or were the architecture-doc numbers projected before shipping? Want to make sure the interview story uses measured numbers, not projections.
- **Cost impact.** Did this translate into a measurable AWS bill change (smaller RDS? fewer PHP-FPM workers? EKS node count shift?).
- **Is the repo open-source or internal-only?** If internal, the architecture docs you wrote are already 80% of a blog post — publishing a sanitized version on vizly.dev before Oct 2026 would be one of the strongest portfolio moves possible.

## Still open — AI work at EF (EF Pulse)
_Answered: name = EF Pulse; OpenAI tool-use agent loop; adapter pattern (Discord live, Telegram/WhatsApp planned); TypeScript Node 22+; natural-language + slash commands; tools for sales, products, tickets, combos, check-ins, supplier balances (Ezpin/Incenti/Kinguin/Mintroute). Captured in [experience.md](experience.md) and [highlights.md](highlights.md)._
- **How many active users** at EF today, and how often do they use it? (DAU, queries/week — anything concrete makes the story hit harder in interviews.)
- **When did it ship?** First Discord slash command live → first natural-language query working → today. Rough dates.
- **Any production wins** from it? (e.g. "saved the ops team N hours/week", "replaced a daily manual report", "caught a supplier balance issue before it broke checkout".)
- **Is it open-source or internal-only?** If internal, is there any chance of extracting a sanitized version or a blog post about the architecture? Huge portfolio piece if yes.
- **Next on the roadmap** that you're driving personally?

## Still open — certifications / learning
_Answered: self-taught by preference, no certs today, will pick up AWS / others only if a specific Saudi role requires it. Captured in [goals.md](goals.md)._

## Still open — visibility
- vizly.dev — post count, traffic, top posts?
- Any conference talks, meetups, podcast appearances?
- OSS contributions beyond JetShift?
- Your strongest **3–5 public GitHub repos** (links). The tracker's Month 6 week wants polished public projects — need to know what's already out there vs. what needs to be built.

## Still open — personal / logistics
_Answered: no formal English score but daily work in English with London-based leadership; current salary ~$3K USD/month; married with a 3-month-old; **Saudi relocation is the top priority, remote is fallback only**; salary targets captured in [goals.md](goals.md)._
- Any **dates you can't work around** in the next 12 months (family obligations, existing travel)?

## Still open — interview stories (STAR)
Draft STAR answers for at least 5 situations. Suggested themes, now that we have real material to draw from:
1. **Hiring & scaling the team.** Going from 2 devs to 9, 400+ CVs reviewed, 7 hires.
2. **A production security save.** The cart session hijack fix or the DDoS defense — pick the more dramatic one.
3. **Cost optimization under pressure.** The moment you chose to offload logs to S3/ClickHouse instead of upsizing RDS, and what it saved.
4. **The WordPress → Laravel rebuild.** You solo-rebuilt a live e-commerce platform. That's a *great* story: risk, parallel-running, cutover, what you'd do differently.
5. **Shipping your first internal AI tool.** The reporting chatbot — problem, approach, stack, adoption. Good bridge story between "senior SWE" and "AI engineer."
