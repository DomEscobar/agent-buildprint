# 01 - Integration Plan

Write `.buildprint/capability-plan.md`, `.buildprint/rag-security-plan.md`, and `.buildprint/rag-evaluation-plan.md` before source edits.

## Capability plan

The plan must name:

- exact MCP tools or internal service methods to add
- database tables or collections to add/change
- migration strategy and rollback path
- parser and fallback parser boundary
- embedding model and versioning strategy
- vector and keyword index strategy
- reranker strategy and feature flag
- generation model/output schemas
- tests to add
- host surfaces to wire

## Security plan

The security plan must define:

- `RetrievalSubject` fields
- document/chunk ACL fields
- authorization helper or policy engine to use
- how allowed corpus is computed
- how dense and keyword queries share the same filter
- how denied retrieval is tested
- which logs may contain raw content
- deletion and permission-change reindex behavior

The plan must explicitly reject post-retrieval filtering as the primary security mechanism.

## Evaluation plan

The evaluation plan must define a small golden set:

- representative documents or synthetic fixtures
- retrieval questions
- extraction tasks
- generation tasks
- expected sources/pages/fields
- permission-leak scenarios
- metrics and pass/fail thresholds

Minimum metrics:

- context precision
- context recall
- faithfulness
- answer relevance
- unsupported-claim rate
- extraction field accuracy
- domain-output accuracy
- allowed/denied retrieval correctness

## Scope control

Keep the first implementation small but real:

- one ingestion path
- one parser adapter
- one vector path
- one keyword path
- one fusion path
- one cited generation path
- one evaluation fixture set

Do not add a dashboard, admin UI, or broad provider marketplace until the core security and retrieval proof passes.

