# BUILDPRINT: Secure Hybrid RAG MCP Capability

You are applying one strict Capability Buildprint to an existing host project. Your job is to add a secure, measurable Retrieval-Augmented Generation capability exposed through MCP-compatible tools and host-app integration points.

This is not a generic vector-search recipe. It is a bounded capability packet for grafting rights-aware hybrid RAG into a compatible host app that already has or can expose user identity, authorization state, durable storage, and document ingestion surfaces.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-goal.md`
5. `01-host.md`
6. `loops/` (see `loops/loop-flow.md`)
7. `review.md`
8. `verify.md`

No source edits before `00-goal.md` hard stops and `01-host.md` assessment/plan. Kernel: goal → bare agentic loop → optional independent fan-out → contract review.


## Capability promise

Add a Secure Hybrid RAG MCP capability that can ingest documents, parse and chunk them structurally, attach access-control metadata, index them with vector and keyword retrieval, retrieve only from an authorized corpus, rerank evidence, generate cited structured answers or domain outputs, and prove behavior through evaluation and receipts.

## Security posture

The capability is deny-by-default. Unknown identity, unknown tenant, missing permissions, missing ACL metadata, or unresolved host authorization boundaries must block retrieval and generation.

Access control must happen before retrieval. It is invalid to search the whole corpus and filter forbidden chunks afterward. Dense vector retrieval, keyword/full-text retrieval, fusion, reranking, citations, generation, logs, and evaluation fixtures must share the same authorization boundary.

## Baseline stack

Use the host stack when it already provides equivalent primitives. Otherwise prefer:

- parser: Docling
- durable data: PostgreSQL
- vector search: pgvector
- keyword search: PostgreSQL full-text search
- fusion: Reciprocal Rank Fusion
- reranking: feature-flagged provider or local reranker
- evaluation: golden set plus RAG metrics such as context precision, context recall, faithfulness, answer relevance, field accuracy, and permission-leak tests

Do not hard-code these vendors when the host already has a compatible parser, database, search engine, or evaluation framework. The durable architecture is the contract, not the specific provider.

## Local checkpoints

The applying agent must create these files in the host repo before or during implementation:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/rag-security-plan.md
.buildprint/rag-evaluation-plan.md
.buildprint/capability-receipt.md
```

No source edits before host assessment and capability plan exist.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes user identity, tenant boundaries, project membership, document ownership, authorization policy, data retention, provider side effects, migration strategy, parser privacy, model/provider choice, or destructive operations.

Verification must reconcile against the assessment and plan. If proof exposes a broken baseline, missing permission source, weak parse quality, empty retrieval, missing citations, or failed denial test, downgrade the claim instead of reporting success.

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable user/session model
- the host has no reliable tenant/project/customer permission source
- documents or chunks cannot be assigned ACL metadata at ingestion time
- dense and keyword retrieval cannot share the same authorization pre-filter
- the implementation would send private documents to an external parser/model without explicit approval
- existing data migrations are destructive or irreversible
- offer/pricing/legal outputs would be generated without source evidence or user confirmation
- baseline build/test commands cannot run enough to make the proof trustworthy

## Success standard

Do not claim Secure Hybrid RAG MCP is installed unless verification proves:

- authorized users can retrieve allowed evidence
- unauthorized users are denied before retrieval
- vector and keyword paths enforce the same authorization filter
- retrieved answers include citations and uncertainty when evidence is weak
- ingestion records parser, chunker, embedding, ACL, and index versions
- evaluation includes retrieval quality, generation quality, and permission-leak tests
- logs and receipts do not expose forbidden raw content by default
