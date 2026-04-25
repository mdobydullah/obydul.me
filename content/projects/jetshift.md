---
title: "JetShift"
summary: "Open-source ETL tool to move data from RDS to ClickHouse. Originally built internally for log offload, then released publicly."
year: "2023"
launch_date: "2023-01-01"
role: "Solo build"
status: "Public"
stack: ["ClickHouse", "RDS", "ETL"]
tags: ["data", "open-source", "etl"]
metrics:
  - "Public on GitHub as proof of independent work"
  - "Originally built to support a cost-first log-offload strategy"
github: "https://github.com/mdobydullah/jetshift"
live: ""
---

## Context

A platform I worked on had a cost problem with logs sitting on RDS. The fix was to offload to ClickHouse so the primary DB only carried hot data. The tool that moved the data became JetShift.

## Why open source

The internal use case was the trigger, but the ETL pattern is generic. Open-sourcing it gave back to the community and served as a public artifact of independent work outside the day job.

## Status

Not actively developed today. Lives on GitHub as a working tool. Listed here as part of the portfolio history rather than a current focus.

## Stack

- ClickHouse (target)
- RDS (source)
- ETL pipeline tooling

## Outcome

A usable ETL tool on GitHub for anyone hitting the same RDS-to-ClickHouse pattern.

:::row

```mermaid
flowchart TB
  title["⚠ Before"]
  APP1[Application] --> RDS1[("RDS · logs + hot data")]
  RDS1 -.->|"storage bloat"| BILL[Higher AWS bill]
  style title fill:transparent,stroke:transparent
```

```mermaid
flowchart TB
  title["✓ After"]
  APP2[Application] --> RDS2[("RDS · hot data only")]
  RDS2 -->|"JetShift ETL"| CH[(ClickHouse)]
  CH --> AN[Analytics queries]
  style title fill:transparent,stroke:transparent
```

:::
