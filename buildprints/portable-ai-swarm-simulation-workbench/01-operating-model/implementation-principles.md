# Implementation Principles

- Build capability by capability in dependency order.
- Keep provider adapters explicit: deterministic, sandbox live, or production live.
- Never show static sample graphs, reports, or no-op controls as completed behavior.
- Treat in-memory-only state as insufficient for lifecycle qualification.
- Every async operation needs visible pending, completed, failed, retry, and stale/recovery states.
- Every destructive action needs confirmation and observable result.
