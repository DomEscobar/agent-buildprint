# Phase 05 - Verification and Receipt

## Objective

Implement proof and operating visibility.

## Required inputs

- completed phases 01-04
- `.buildprint/rag-evaluation-plan.md`
- available host test commands

## Evaluation

Create a small golden set with:

- allowed retrieval examples
- denied retrieval examples
- cross-tenant leak attempts
- extraction tasks
- generation tasks
- expected source documents/pages/chunks
- expected fields

Track at least:

- context precision
- context recall
- faithfulness
- answer relevance
- unsupported-claim rate
- field accuracy
- permission-leak pass/fail

## Observability

Log retrieval receipts:

- query intent
- subject scope summary
- filters applied
- retriever counts
- final evidence IDs
- model/provider IDs
- parser/chunker/embedding versions
- latency
- cost or token usage when available
- denial reason category

Do not log sensitive raw chunks by default. If debug logging is added, gate it behind explicit config and redact where possible.

## Lifecycle

Implement or document:

- reindex after document update
- reindex after ACL change
- embedding model migration path
- delete/invalidate chunks, embeddings, keyword entries, derived summaries, and caches
- stale index detection

## Receipt

Write `.buildprint/capability-receipt.md` with:

- files changed
- commands run
- proof results
- remaining risks
- blocked items
- exact claim status: installed, partial, or blocked

## Proof before moving on

- golden set exists
- permission-leak tests pass or block the claim
- retrieval/generation metrics are recorded or explicitly unavailable
- lifecycle delete/reindex behavior is tested or blocked
- `.buildprint/capability-receipt.md` reconciles every blocker and assumption
