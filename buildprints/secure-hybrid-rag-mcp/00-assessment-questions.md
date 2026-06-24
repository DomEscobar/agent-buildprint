# 00 - Assessment Questions

Run this question gate after `00-host-assessment.md` and before `01-integration-plan.md`.

Capability questions are assessment-led. Inspect the host first, then ask only what blocks safe rights-aware RAG.

## Hard-stop questions

Ask and stop when the host assessment cannot resolve:

- authoritative user/session/service-principal identity
- tenant, project, customer, document, or workspace boundary source
- permission source for document and chunk access
- whether ACL metadata can be assigned at ingestion time
- whether vector and keyword retrieval can share the same authorization pre-filter
- parser, embedding, reranker, or model provider approval for private documents
- retention/deletion behavior for raw documents, chunks, embeddings, keyword indexes, and summaries
- whether offer, pricing, legal, safety, or customer-facing outputs require additional confirmation
- migration strategy for document, chunk, vector, keyword, receipt, and evaluation tables

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.

## Assumable defaults

The agent may infer reversible details from host patterns:

- module placement
- test fixture names
- non-sensitive UI/debug copy
- feature-flag names
- local receipt formatting
- evaluation fixture filenames

Record meaningful assumptions in `.buildprint/capability-plan.md`.

## Deferrable questions

Do not block on:

- a full RAG dashboard
- provider marketplace support
- advanced reranker tuning
- large-scale sharding
- non-MVP document types
- admin analytics beyond required receipts

Move deferrable items to `.buildprint/capability-receipt.md`.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.

