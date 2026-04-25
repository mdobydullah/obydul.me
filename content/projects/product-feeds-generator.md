---
title: "Product Feeds Generator"
summary: "Go microservice that generates affiliate XML product feeds in 3 formats across a ~50K-product catalog and uploads to S3 every 10 minutes for 200+ affiliates."
year: "2023"
launch_date: "2023-01-01"
role: "Solo build"
status: "Live"
stack: ["Go", "AWS S3", "Docker", "ECR"]
tags: ["backend", "performance", "go", "aws"]
metrics:
  - "Per-feed generation: 60+ seconds → under 20 seconds"
  - "RDS CPU: pegged at 99% → effectively no impact"
  - "Runs every 10 minutes in prod"
  - "Two binaries from one repo: feedgen + feedreader"
github: ""
live: ""
---

## Context

An affiliate program needs XML product feeds in 3 different formats (different currencies, schemas) covering a ~50K-product catalog, fresh every 10 minutes, available to 200+ affiliates via S3.

## Problem

The legacy Laravel feed job was generating each feed in 60+ seconds and pegging the RDS CPU at 99%. Affiliates were getting stale data, and the database was getting hammered every cron tick.

## What I built

A Go service that replaces the Laravel job entirely.

### Architecture

- **`feedgen` binary:** the generator. Pulls catalog data through optimized batch queries, writes 3 XML feeds, uploads to S3
- **`feedreader` binary:** companion utility for debugging. Ingests local or remote `.xml.gz` feeds from S3 or the CDN and re-exports as CSV for affiliate support tickets
- **Single repo, two binaries:** ships from the same Docker image
- **Branch-based CI:** `git push origin ecr` triggers build → ECR push

### Stack

- Go
- AWS S3 for distribution
- Docker, ECR
- Branch-based GitHub Actions deploy

## Outcome

Each feed now generates in under 20 seconds. RDS load went from 99% pegged to negligible. Affiliates get 10-minute-fresh data. The `feedreader` companion eliminated a class of "what's actually in this feed?" support tickets.

:::row

```mermaid
flowchart TB
  title["⚠ Before"]
  L[Laravel cron] --> R[("RDS · 99% CPU")]
  R -->|"60+ sec/feed"| F[3 XML feeds]
  F --> S3[(S3)]
  style title fill:transparent,stroke:transparent
```

```mermaid
flowchart TB
  title["✓ After"]
  G[Go feedgen] --> R2[("RDS · negligible")]
  R2 -->|"under 20 sec/feed"| F2[3 XML feeds]
  F2 --> S32[(S3)]
  S32 --> AFF[200+ affiliates]
  style title fill:transparent,stroke:transparent
```

:::
