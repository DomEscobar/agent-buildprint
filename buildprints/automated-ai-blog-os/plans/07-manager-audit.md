# Phase 07 — Manager Audit

## Goal

Produce an operator audit that surfaces stale, weak, repeated, broken, and blocked work.

## Required actions

1. Read sources, ideas, drafts, approvals, SEO reports, publish reports, and content memory.
2. Report stale drafts, weak sources, repeated angles, ungrounded claims, SEO failures, broken sitemap/RSS/llms outputs, failed builds, and blocked publish attempts.
3. Include severity, affected IDs, evidence, recommended action, and whether human review is required.
4. Flag missing or contradictory storage records instead of skipping them.
5. Keep audit output in a durable report file and summarize it in `VALIDATION.md`.

## Done when

- Tests cover stale draft detection, weak source detection, repeated angle detection, SEO/feed failure detection, and blocked publish attempts.
- Audit output references concrete record IDs and reasons.
- Manager audit cannot report green when required storage or reports are missing.
