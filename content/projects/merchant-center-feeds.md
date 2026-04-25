---
title: "Merchant Center Feeds Sync"
summary: "Go microservice on AWS EKS that syncs ~520K product entries to Google Merchant Center. Replaced a slow Laravel cron with a quota-aware, batched, real-time pipeline."
year: "2024"
launch_date: "2024-01-01"
role: "Solo build"
status: "Live"
featured: true
stack: ["Go", "AWS EKS", "SQS", "Distroless", "Google Merchant API"]
tags: ["backend", "performance", "go", "aws"]
metrics:
  - "Queries per full sync: ~2,000,000 → ~240"
  - "Full-sync time: ~7 days → ~5–10 minutes"
  - "Container size: ~200 MB PHP-FPM → ~20 MB distroless"
  - "Real-time updates via SQS with at-least-once delivery + DLQ"
github: ""
live: ""
---

## Context

A digital-goods storefront with ~520K SKUs has to stay in sync with Google Merchant Center for paid traffic. The legacy pipeline was a Laravel cron hitting the writer DB with N+1 queries and taking days per full sync.

## Problem

- Full sync was running for a week and never finished cleanly
- Every run hammered the primary RDS writer
- No real-time updates. A price change on the storefront could wait days to reach Google.
- Laravel container image was ~200 MB, slow to roll

## What I built

A Go microservice on AWS EKS that owns the full sync lifecycle.

### Architecture

- **Read replica path:** all Merchant Center reads hit the read replica, not the writer
- **Batch queries:** rewrote the N+1 loop into ~240 batch queries per full sync
- **HTTP batching:** uses Google Merchant API multipart/mixed batching, 100 sub-requests per call
- **Real-time path:** SQS consumer with at-least-once delivery + DLQ for retry
- **Quota-aware scheduler:** 12-hour full sync + on-demand SQS, tuned to stay under Merchant API limits
- **Authenticated control API:** health, metrics, quota state, manual trigger

### Stack

- Go for the service
- AWS EKS for orchestration
- SQS for the event bus
- Distroless base image (~20 MB)
- GitHub Actions → ECR → EKS pipeline

## Outcome

The full sync that took a week now takes minutes. The writer DB is no longer in the path. Storefront price changes propagate to Google in seconds via SQS instead of waiting on the next cron tick.

:::row

```mermaid
flowchart TB
  title["⚠ Before"]
  A1[Laravel cron] --> A2[(Writer DB)]
  A2 -->|"~2M queries"| A3[Google Merchant API]
  style title fill:transparent,stroke:transparent
```

```mermaid
flowchart TB
  title["✓ After"]
  B4[SQS realtime] --> B1[Go service on EKS]
  B1 --> B2[(Read replica)]
  B2 -->|"~240 batched queries"| B3[Google Merchant API]
  style title fill:transparent,stroke:transparent
```

:::

```mermaid
xychart-beta
    title "Full sync time"
    x-axis ["Before", "After"]
    y-axis "Minutes" 0 --> 10080
    bar [10080, 10]
```

:::stats

### 99.99%

fewer queries · 2M → 240 per sync

### 1000×

faster full sync · 7 days → 10 min

### 10×

smaller image · 200MB → 20MB

:::
