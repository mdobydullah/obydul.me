# Work Experience

Total: ~9 years in software engineering.

## Electronic First (Jan 2017 – Present, ~9 years, full-time, remote)
E-commerce / digital goods marketplace. HQ in Fujairah, UAE. Multi-country workforce (UK, UAE, Pakistan, Bangladesh, India, Philippines, Egypt).

### Platform scale (current)
- **~1.56M unique visitors / 30 days** (Cloudflare), **87.28M total requests / 30 days**, 2 TB data served, ~19.67% cached at edge.
- **~330K monthly active users** (GA4), ~47K first-time purchasers / month, top markets US / UK / Germany / France.
- **~1,000 orders / day**, minimum **$10K USD / day** in revenue.
- Sales trajectory: joined at 130–160 orders/day (2017) → ~1K/day today, with next target of 1.5K–2K/day.

### Lead Software Engineer — Jan 2021 – Present (5+ yrs)
- Leading a 9-person distributed engineering team: **6 developers in Bangladesh + 3 in India**.
- When I joined EF there were only **2 developers**. Reviewed **400+ CVs** and **hired 7 developers** to build out the current team.
- Cross-functional work with ads, marketing, and customer support teams (e.g. set up **Google Merchant API integration** and built **auto-shipping for low-value / low-risk orders** — **~60% of orders now ship without human intervention**).
- Weekly meetings with senior leadership on Sundays, conducted in English.
- **Own and manage AWS cloud infrastructure end-to-end (6+ years).** Architecture is auto-scaling + load balancer + RDS Multi-AZ + RDS Proxy for connection pooling.
- **Cost discipline:** route logs from the database to S3 + ClickHouse rather than upsizing RDS; aggressive caching and query optimization to keep instance sizes small.
- **Performance work:** fixed many N+1 queries across the Laravel codebase; material RAM and CPU savings from query-level tuning.
- **Security:** set up Cloudflare to absorb multi-million-hit bot / DDoS attacks. Run own pentests on EF. Found and fixed issues including **cart session hijacking**, missing **rate-limiting on forgot-password and DB-heavy endpoints**, and more (list growing).
- **EF Product Feeds Generator (Go microservice, solo build, in production):** generates affiliate XML product feeds in 3 formats (different currencies / schemas) across the full ~50K-product catalog, uploaded to S3 for **200+ affiliates** to consume. Runs **every 10 minutes** in prod. Replaces a Laravel feed job that was slow and DB-hostile. **Measured wins:** per-feed generation time **dropped from 60+ seconds to under 20 seconds**, and **RDS CPU went from pegged at 99% to effectively no impact** — achieved via query optimization and rewriting the feed pipeline in Go. Ships as two binaries from the same repo: `feedgen` (the generator) and `feedreader` (a utility that can ingest local or remote `.xml.gz` feeds from S3 or the CDN and re-export them as CSV for debugging / affiliate support). Docker-packaged, pushed to ECR via a branch-based CI flow (`git push origin ecr` triggers build → push).
- **EF Provider Price Sync (Go microservice on EKS):** EF sells digital products where a single SKU is often listed on 2–3 external supplier APIs (Gamivo, Incentive Digital, Rokky, Kinguin). Built a Go service that batches through the catalog, fetches live prices from each enabled provider per product, finds the cheapest, and pushes changes back to EF via webhook so the storefront always shows the lowest available price. Runs as two **Kubernetes CronJobs on EKS** (not system cron): a main `price-checker` every 5 minutes and a dedicated `rokky-sync` every 30 minutes that downloads Rokky's encrypted CDN price file, OpenSSL-decrypts it, and caches it as a fast binary `.gob`. Cursor-based batch processing (stores `skip` in `cron_job_settings`, auto-resets at end of catalog) so runs are idempotent and resumable. Operational controls matter here: `dry_run` mode, per-provider enable/disable via a JSON `SERVICE_CONFIG` K8s Secret (no rebuild needed), CLI/env provider filtering, and a single-product debug mode that bypasses the cursor for testing in prod without side effects. Structured logging via `log/slog` — JSON to stdout in prod, parsed by **Grafana/Loki** with per-field queries for price-changed events, batch completions, and errors. CI/CD via GitHub Actions → ECR → EKS.
- **EF Merchant Center Feeds (Go microservice on EKS):** re-architected the Google Merchant Center sync from a single-threaded Laravel cron into a high-performance Go service. Keeps ~520K product entries in sync across Google Merchant Center (40K products × 13 language/country feeds). Three modes: periodic bulk sync from an RDS **read replica** (taking all load off the writer), SQS consumer for real-time product/bundle updates, and an authenticated HTTP control API for health checks, metrics, manual triggers, and quota monitoring. Uses Google's Merchant API **HTTP batching** (multipart/mixed, up to 100 sub-requests per call) and a quota-aware schedule (full sync every 12 h + SQS on-demand). **Measured wins vs the old Laravel cron:** ~2,000,000 queries → ~240 per full sync (**~8,000× fewer**), full sync from 7 days → 5–10 minutes, memory from full Laravel framework → 20–50 MB, container image 200 MB+ → ~20 MB distroless. Deployed to AWS EKS with the rest of the stack.
- **AI work at EF — EF Pulse:** designed and built an internal, multi-platform AI chatbot for the business. Natural-language queries get mapped to EF's internal API via an OpenAI **tool-use agent loop** ("how many tickets opened today?", "top 5 products this week by revenue", "upsell performance last month"). Also supports structured slash commands (`/orderstats`, `/productstats`, `/combostats`, `/checkedin`) and supplier-balance checks across Ezpin, Incenti, Kinguin, and Mintroute. **Adapter-based architecture** — Discord live today, Telegram and WhatsApp planned. TypeScript, Node 22+, cleanly separated into `adapters / commands / core / tools / config` with per-tool documentation.
- Stack: Laravel + NestJS backend, Next.js frontend (Blade legacy in older pages), AWS, Docker/Kubernetes, Argo CD, Terraform, MySQL, Redis, ClickHouse.

### Laravel Developer — Jan 2019 – Dec 2020 (2 yrs)
- **Solo-rebuilt the entire electronicfirst.com platform from WordPress to Laravel in 2019.**
- Ran the legacy WordPress site in parallel for ~1 year during the migration so the business kept selling while the new platform was being built.
- Hired a dedicated front-end team for CSS/layout work (I own backend and system design; front-end CSS is intentionally delegated).

### WordPress Developer — May 2017 – Dec 2018 (1 yr 8 mos)
- Maintained the original WordPress-based EF storefront; theme and plugin work until the Laravel rebuild kicked off.

## Makpie — Co-Founder (Apr 2016 – Dec 2020, 4 yrs 9 mos)
- First blood-donor search engine in Bangladesh. Originally the university final-year project.
- Stack: Java, Android, PHP, MySQLi, REST APIs.

## Upwork — Freelance Web & Android Developer (Sep 2017 – Jan 2020)
- **Top-rated seller.** WordPress, Laravel, Android, Java.

## Fiverr — Freelance Web & Android Developer (Nov 2016 – Jan 2020)
- **Level 2 seller.** Same stack as above.
