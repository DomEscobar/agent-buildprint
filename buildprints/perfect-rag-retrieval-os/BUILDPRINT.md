# BUILDPRINT: Perfect RAG / Retrieval OS

This is the canonical starting point and execution contract for building a stack-adaptable retrieval augmented generation system that retrieves permission-safe evidence and produces citation-grounded answers with measurable quality gates.

Do not treat this as a prompt template. Do not call vector database search plus a prompt a complete RAG system. The product shape includes corpus alignment, source ingestion, stable chunks, hybrid lexical/sparse and dense retrieval, fusion, permission filtering, reranking or late interaction, context packing, citation-grounded generation, refusal behavior, traces, evals, provider boundaries, and optional advanced modules only when evals justify them.

## Required read order

1. Read this `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read `01-questions.md`.
3. Read and complete `02-project-setup.md`.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Read only the active phase file named by the phase index.
8. Read `04-evaluation.md`.
9. Treat `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to `.buildprint/evidence/evidence-ledger.jsonl`.
10. Read `05-evidence/evidence-ledger.schema.json` before writing any runtime evidence rows.

## Project setup gate

Do not start `03-phases/*` until `02-project-setup.md` has enough explicit architecture, team rules, provider boundaries, quality gates, safety rules, and `AGENTS.md` plan to prevent agents from inventing project structure.

Blank answers in `01-questions.md` are not blockers. They authorize AI best-fit decisions unless the choice is irreversible, expensive, credentialed, destructive, or product-defining.

## Implementation loop

Every phase must repeat this loop until the proof gate passes or a real blocker is recorded:

1. Observe: inspect the implementation project, nearest `AGENTS.md`, current behavior, runtime configuration, and constraints.
2. Plan: state the smallest coherent product slice, likely files, provider mode, state boundary, and verification gate.
3. Execute: make scoped changes without silently shrinking the RAG system into a toy vector-only demo.
4. Verify: run the planned test, build, API, browser, runtime, or eval gate and inspect output.
5. Reflect: compare results against the phase proof gate and acceptance criteria.
6. Record: append evidence or blocker rows before claiming progress.

A phase cannot be marked done from code edits alone.

## Product boundaries

Preserve these boundaries throughout implementation:

- Security: tenant and permission filtering happen before context packing, answer generation, traces exposed to users, and eval answer checks.
- Provider: deterministic local proof mode must work without network, model, vector database, reranker, or provider credentials; live embeddings, search, reranking, and generation require explicit configuration and separate evidence.
- Browser/API: user-facing or API surfaces must expose loading, blocked, refusal, insufficient-evidence, cited answer, trace, and eval result states appropriate to the target stack.
- Persistence: source documents, chunk metadata, access scopes, index state, trace records, eval runs, and generated reports need durable ownership in production mode; in-memory fixtures may only prove deterministic proof mode.
- Billing/cost: live provider calls must expose latency and cost fields labeled as measured, estimated, or unavailable; paid services require human approval.
- Publishing/media: user-visible citations must include stable source and chunk identifiers, titles, and source URIs when available; generated eval reports are runtime artifacts, not packet files.
- Memory/retrieval: query rewriting, HyDE, RAPTOR, GraphRAG, Self-RAG/CRAG, SPLADE, and ColBERT are optional modules gated by eval improvement, not default complexity.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase
- external provider, credential, network, browser, or sandbox blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md` and `.buildprint/phase-runs/<phase-id>/team.md`, dispatch or explicitly simulate bounded role work, collect returns/reviews/proof, and only then append runtime evidence.

A phase is a proof-gated product slice. Each phase defines product outcome, source evidence, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, quality gates, proof gate, and repair routing.
