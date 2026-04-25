---
title: "Production Cloud Platform"
summary: "Six years owning a production AWS environment end-to-end. Architecture, deploys, cost, scaling, security. The platform behind everything else on this page."
year: "2019 to today"
launch_date: "2019-01-01"
role: "Learning & Practicing"
status: "Live"
stack: ["AWS", "EKS", "RDS", "ECR", "Cloudflare", "Argo CD", "Terraform"]
tags: ["devops", "aws", "scale", "security"]
metrics:
  - "Serves ~1.56M unique visitors, 87M+ requests, 2 TB of traffic per 30 days"
  - "RDS Multi-AZ, RDS Proxy connection pooling, auto-scaling groups"
  - "Cost-first: offload logs to S3 + ClickHouse instead of upsizing RDS"
  - "Defended against multi-million-hit bot / DDoS attacks via Cloudflare WAF"
github: ""
live: ""
---

## Context

The platform isn't just the application. It's the cloud underneath. I've owned a production AWS environment end-to-end for 6+ years: architecture, deploys, cost, scaling, security.

## Scope

- **Application layer:** Laravel + NestJS + Next.js (see [E-commerce Platform Rebuild](/projects/ecommerce-rebuild))
- **Microservices on EKS:** the Go services (Merchant Center Feeds, Provider Price Sync, Product Feeds Generator) run here
- **Data:** RDS Multi-AZ writer + read replicas, RDS Proxy for connection pooling, ClickHouse for log/analytics offload
- **Edge:** Cloudflare in front, WAF tuned by hand, custom rules for bot defense
- **CI/CD:** GitHub Actions, ECR, Argo CD, Terraform for infra

## Cost-first mindset

The default reaction to load is to upsize. I prefer attacking the workload. A few examples:

- **Logs to S3 + ClickHouse** instead of bigger RDS storage
- **Redis cache for hot paths** to keep the DB out of the request loop where possible
- **N+1 fixes at code level** as the first lever, hardware as the last

## Security

- Defended the platform against multi-million-hit bot / DDoS attacks. Cloudflare WAF set up and tuned myself.
- Run my own pentests against the platform. Real findings: cart session hijacking, missing rate limits on forgot-password and DB-heavy endpoints. All fixed.
- CEH v12 course completed (EC-Council). Applied mindset, not just paper.

## Stack

AWS (EKS, RDS, S3, SQS, ECR), Cloudflare, Argo CD, Terraform, GitHub Actions.

## Outcome

Same scale, same reliability, smaller AWS bill. The default reaction to load is to upsize. I prefer attacking the workload first.

:::row

```mermaid
flowchart TB
  title["⚠ Default reaction"]
  L1[High DB load] --> U1[Upsize RDS]
  U1 --> $[Bigger bill]
  $ -.->|"recurring"| MORE[More upsizing]
  style title fill:transparent,stroke:transparent
```

```mermaid
flowchart TB
  title["✓ Cost-first"]
  L2[High DB load] --> A1[Logs to S3 + ClickHouse]
  L2 --> A2[Redis cache hot paths]
  L2 --> A3[Fix N+1 in code]
  A1 --> SAVE[Same RDS, lower bill]
  A2 --> SAVE
  A3 --> SAVE
  style title fill:transparent,stroke:transparent
```

:::
