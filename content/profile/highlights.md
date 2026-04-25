# Highlights — the "so what" list

The things worth leading with on a CV, in a cover letter, or in an interview. Converted into STAR-friendly talking points later.

## Leadership & scale
- **Lead Software Engineer at Electronic First for 5+ years**, inside a company where I've been for ~9 years total — long-tenure, trusted operator.
- **Grew the engineering team from 2 devs to 9** (6 BD + 3 India). Reviewed **400+ CVs** and **hired 7 developers** personally.
- **Multi-country workforce experience**: UK, UAE, Pakistan, Bangladesh, India, Philippines, Egypt. Run weekly leadership syncs in English with senior management.
- **Drove business outcomes, not just code.** Daily sales went from **130–160 orders/day when I joined (2017)** to **~1,000 orders/day today**, next internal target 1.5K–2K. Built Google Merchant API integration and auto-shipping for low-risk orders — **~60% of orders now ship automatically**.

## Cloud, scale & cost
- **6+ years running production AWS** for Electronic First. End-to-end owner: architecture, deploys, cost, scaling, security.
- Platform I run serves **~1.56M unique visitors, 87M+ requests, and 2 TB of traffic every 30 days** — across ~330K monthly active users driving $10K+/day in revenue at a minimum.
- Standard production hardening: auto-scaling groups, load balancer, RDS Multi-AZ, RDS Proxy for connection pooling.
- **Cost-first mindset.** Instead of upsizing RDS under load, I offload logs to S3 + ClickHouse, push hot paths through Redis cache, and attack N+1 queries at the code level. Keep the bill small by design, not by throwing hardware at the problem.
- **Concrete example of the above:** the EF Merchant Center Feeds rewrite (see Flagship projects) replaced a Laravel cron hitting the writer DB with ~2M queries per full sync with a Go service doing ~240 batch queries against a read replica — eliminating most of that workload from the primary database entirely.
- DevOps fluency: Kubernetes, Argo CD, Terraform, CI/CD pipelines; comfortable shipping Go services to EKS in a Distroless image pattern.

## Security
- **CEH v12 course completed** (EC-Council). Applied mindset, not just paper — security reviews are part of my daily work.
- **Defended EF against multi-million-hit bot / DDoS attacks** — set up Cloudflare WAF and tuned it myself.
- **Run my own pentests** against the platform. Real finds: cart session hijacking, missing rate limits on forgot-password and DB-heavy endpoints, and more. All fixed.
- Hardened both AWS infra and Laravel apps in production. "Can secure any app" is a reasonable elevator pitch.

## AI (shipped, not just studied)
- **Designed and shipped EF Pulse** — an internal AI agent for Electronic First built on OpenAI's tool-use API. Business users ask natural-language questions in Discord ("top 5 products this week by revenue", "tickets opened today", "upsell performance last month") and the agent maps them to EF's internal API via typed tools.
- **Proper AI-engineering architecture**, not a prompt-in / text-out toy: agent loop in `core/agent.ts`, typed EF API client in `core/efApi.ts`, tool definitions per capability, adapter pattern for Discord (live) + Telegram / WhatsApp (planned). TypeScript, Node 22+.
- Also serves supplier-balance checks across Ezpin, Incenti, Kinguin, and Mintroute from the same bot — real multi-system integration inside one agent.
- Hands-on with the broader modern stack: LangChain, LlamaIndex, vector DBs (pgvector, Pinecone, Qdrant), MCP / FastMCP, Hugging Face.
- Actively leveling up deeper ML fundamentals — this is the current growth bet, not the starting point.

## Flagship projects
- **electronicfirst.com** — solo-rebuilt the whole platform from WordPress to Laravel in 2019 (ran WP in parallel for ~1 year during the migration). Today I lead the team that maintains and extends it; stack is Laravel + NestJS backend, Next.js frontend (Blade legacy).
- **EF Merchant Center Feeds** — Go microservice on AWS EKS syncing ~520K product entries to Google Merchant Center. Replaces a legacy Laravel cron. Cut queries per full sync from **~2,000,000 to ~240** by rewriting N+1 patterns as batch queries against a read replica, dropped full-sync time from **~7 days to ~5–10 minutes**, and container image from **~200 MB PHP-FPM to ~20 MB distroless**. Real-time updates via SQS consumer with at-least-once delivery + DLQ; authenticated HTTP control API for health / metrics / quota / manual triggers; quota-aware scheduling (12 h full sync + SQS on-demand) to stay under Google's Merchant API limits. Uses Merchant API HTTP batching (multipart/mixed, 100 sub-requests per call).
- **EF Provider Price Sync** — Go microservice on AWS EKS that keeps EF's storefront showing the cheapest available price per SKU across multiple external digital-goods suppliers (Gamivo, Incentive Digital, Rokky, Kinguin). Runs as two K8s CronJobs (main price-checker every 5 min, Rokky CDN decrypt-and-cache every 30 min); cursor-based batch processing; dry-run and single-product debug modes; JSON structured logging wired into Grafana/Loki; GitHub Actions → ECR → EKS pipeline. **Direct revenue impact** — always routes customers to the cheapest supplier automatically.
- **EF Product Feeds Generator** — Go microservice that generates affiliate XML feeds (3 formats, ~50K products) every 10 minutes and uploads them to S3 for **200+ affiliates**. Replaced a Laravel job that was taking **60+ seconds per feed and pegging the RDS CPU at 99%**. After rewrite: **under 20 seconds per feed, negligible DB load** — from query optimization plus a Go-native pipeline. Ships with a companion `feedreader` binary that can pull any feed from S3 / CDN and re-export as CSV for debugging and affiliate support. Built solo, in production.
- **EF Pulse** — internal multi-platform AI chatbot, OpenAI tool-use agent, TypeScript. See AI section above.

## Open source / side work
- **JetShift** — open-sourced ETL tool originally built at EF to move data from RDS → ClickHouse. Not actively developed now, but public on GitHub as proof of earlier independent work.
- Active blog at vizly.dev.
- Ex top-rated Upwork seller and Fiverr Level 2 seller (freelance track record before going full-time).

## Founder experience
- **Co-founded Makpie**, Bangladesh's first blood-donor search engine. Shipped, ran, and sunset a real product.
