# Project Setup

This setup contract is completed before phase implementation. It turns human alignment and mapped RAG obligations into concrete architecture, team rules, quality gates, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from the target project and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks such as paid live providers, public deployment, destructive re-indexing, or legal/compliance answer policy.

## Blueprint mode

- Primary: product
- Phase style: outcome_flow
- Why this mode fits: the selected scope is a user/API-facing RAG retrieval product with ingestion, permission-safe query outcomes, grounded answer workflows, durable or honestly blocked state, and operational evaluation surfaces.

## Product shape

- Product: Perfect RAG Retrieval, a source-independent retrieval and grounded-answer system with deterministic proof mode and production adapter boundaries.
- Frontend/UI surfaces: corpus/source management if the host app has admin UI; query/answer screen or API client surface; citation display; insufficient-evidence/refusal state; blocked provider/credential state; trace/eval report views for admins or developers.
- Backend/API surfaces: source ingestion/update/delete endpoints or jobs; chunking/index build jobs; query endpoint; trace endpoint or log sink; eval-run endpoint or command; provider adapter contracts for lexical search, dense search, embeddings, reranking, generation, and cost/latency collection.
- State/runtime surfaces: durable document sources, chunk records, access scopes, lexical/sparse index, dense/vector index, query traces, eval cases, eval run results, generated report outputs, job state, provider config, and runtime artifacts for proof reports.
- Tests/evaluation: deterministic fixture tests plus production corpus evals from `04-evaluation.md` and phase proof gates.

## Architecture decisions

- Framework/runtime:
  - Decision: use the host project's existing backend and frontend conventions; if starting fresh, TypeScript/Node or Python/FastAPI are appropriate defaults for provider ecosystems.
  - Evidence: RAG contracts are stack-adaptable and phase gates focus on behavior, not route parity.
- Package manager:
  - Decision: use the host project's package manager and lockfile; if fresh TypeScript, use npm unless the project already standardizes pnpm/yarn.
  - Evidence: deterministic proof mode must run locally and in CI without provider credentials.
- Data/storage:
  - Decision: production mode needs durable source, chunk, trace, and eval state; proof mode may use fixture memory only when evidence is labeled as deterministic proof.
  - Evidence: source ingestion/update, permission filtering, trace, and eval retention are product obligations.
- Auth/providers/deployment:
  - Decision: integrate with existing auth and deployment; live embeddings, vector search, reranker, and LLM generation require explicit env config and human approval for paid/external writes.
  - Evidence: provider-live behavior cannot be claimed from mocks or adapter shapes.

## Production readiness contract

Production-grade architecture is the default for the selected full-suite packet. Do not downgrade to a local MVP unless the user explicitly reduces selected scope. Missing credentials block only live proof; they do not block implementation of provider adapters, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, deployment/ops shape, or browser/e2e proof plans.

- Auth/session/tenant boundary: define tenant id, user id, public/private access scope, deny-by-default behavior, and permission filtering before context packing, answer generation, citations, traces, and eval answers.
- Provider integration contract: implement embedding/search/reranker/generator adapter interfaces, deterministic proof adapters, live config validation, fail-closed missing-credential behavior, latency/cost labels, and tests proving adapters do not masquerade as live providers.
- Durable persistence contract: define source, chunk, index metadata, access scopes, trace, eval run, report, import/export, delete/reset, retention, migration, and restart/readback ownership before claiming production durability.
- Worker/runtime contract: define ingestion, update, re-index, eval, report, retry, cancel, failure recovery, progress state, and restart behavior; synchronous proof paths are allowed only when labeled as proof mode.
- Deployment and operations contract: document local dev, production target, env/config, health/readiness, structured logs, metrics/traces, rate/request limits, CI/eval gates, and release blockers.
- Browser/e2e contract: UI-bearing work must have repeatable browser/e2e proof plans for corpus setup, query/refusal/citation states, provider-blocked states, traces, eval reports, responsive behavior, and accessibility.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with the concrete choices above. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

## Foundation scaffold gate

Before Phase 01, create the selected stack real base project structure plus implementation-project root `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` because this packet is UI-bearing whenever the host app exposes corpus, query, trace, or eval screens.

Root `AGENTS.md` must explicitly list `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` as mandatory reads for coding agents before code edits. It must also identify this Buildprint as the scope governor and tell agents not to broaden the current phase.

`architecture.md` must require Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map. It must name module families for UI/controllers, API/routes or services, domain contracts, repositories, provider adapters, workers/jobs, security middleware, observability, and tests.

`engineering-standards.md` must require Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards when UI-bearing, and Test standards with deterministic blocker/e2e/runtime exit behavior.

`test-strategy.md` must define deterministic proof mode, provider-live blocker handling, permission/security tests, persistence readback tests, no-fake scan expectations, browser/e2e and screenshot proof for UI-bearing work, and evidence-row discipline. `ui-identity.md` must define the operational retrieval workbench visual system, citation and trace interaction model, responsive behavior, accessibility expectations, and `visual_quality_gate` Screenshot critique criteria.

The Foundation scaffold gate is not satisfied by empty files. It must name the actual base project structure, commands, and runtime boundaries that Phase 01 can extend without inventing architecture.

## Workbench UX quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for any user-facing phase.
- Product composition: start from the primary workflow surface, not a generic dashboard, default form, or marketing shell.
- Domain-specific affordances: represent domain objects with appropriate workbench affordances instead of raw text-list substitutes.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

## Mapped contract anchors

Promote these observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: implementation project should expose source ingestion/update, query/answer, trace/eval, and index rebuild surfaces through the existing API/job style.
- Request/response payloads and validation errors: document source, chunk, query plan, candidate, reranked context, answer, trace, and eval case records must include stable ids, source metadata, access scopes, citation metadata, and explicit refusal/error fields.
- Provider/runtime boundaries and env var names only: embedding, lexical/sparse search, dense/vector search, reranker, generator, queue, trace sink, and cost/latency labels must sit behind adapters; actual env names are chosen in the implementation project and documented in root/local `AGENTS.md` or env examples.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: production stores documents/chunks/index metadata/traces/eval runs durably; generated output: eval reports; runtime artifact: query traces; runtime artifact: provider latency/cost logs; destructive reset/re-index needs confirmation.
- UI flow/state anchors including empty/loading/error/blocked/success states: query UI or API client must distinguish no corpus, indexing, provider blocked, insufficient evidence, cited answer, permission-filtered result, and eval failure.

## Product obligation/surface matrix

- Source evidence values cite the legacy checked-in packet/spec only because no origin repo URL was provided.
- The obligation matrix column is labeled Mapped obligation; every high-signal mapped surface is owned exactly once by one primary owning phase.
- No mapped surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Generic proof such as "tests pass", "app builds", or "feature preserved" is insufficient. Required proof must name the surface-specific schema, permission, runtime, UI, provider, persistence, eval, or blocker proof.

- Surface id: corpus-alignment-threat-model
  - Source evidence: mapped observations from legacy Buildprint phase gate for corpus, tenants, permissions, freshness, answer risk, citations, refusal policy, latency, cost, target stack, and search infrastructure.
  - Mapped obligation: prevent unsafe generic RAG implementation by establishing corpus, identity, permission, freshness, citation, refusal, latency, cost, stack, and provider constraints.
  - Source capability: prevents unsafe generic RAG implementation and establishes product constraints.
  - Target disposition: preserve
  - Target contract: capture the choices in setup, project config, eval cases, and safety rules before retrieval implementation.
  - Required proof: setup artifact review, domain schema tests, permission fixture tests, and provider-live blocker rows where credentials are unavailable.
  - Compatibility impact: none; ordinary blanks become AI defaults, but live providers/cost/destructive operations remain human-gated.
  - Owning phase: `03-phases/01-corpus-contracts.md`

- Surface id: data-contracts-fixtures
  - Source evidence: mapped observations from legacy contracts for source, chunk, query, candidate, reranked context, answer, trace, and eval case records.
  - Mapped obligation: define typed records and fixtures for source identity, chunk spans, access scopes, query plans, candidates, reranked contexts, cited answers, traces, and eval cases.
  - Source capability: makes RAG behavior typed, testable, citeable, and permission-aware.
  - Target disposition: preserve
  - Target contract: implement equivalent domain contracts in the host stack with deterministic public/private fixtures.
  - Required proof: schema/type tests parsing deterministic public/private fixture records plus unauthorized fixture exclusion.
  - Compatibility impact: field names may adapt to local style, but stable ids, spans, access scopes, citations, trace, and eval semantics must remain.
  - Owning phase: `03-phases/01-corpus-contracts.md`

- Surface id: ingestion-chunking-indexing
  - Source evidence: mapped observations from legacy spec requiring normalization, checksum, updated timestamp, stable chunk ids, spans, token estimates, contextual text, lexical/sparse and dense index surfaces.
  - Mapped obligation: implement source normalization/update/delete, stable chunks, access propagation, lexical/sparse index readback, dense/vector index readback, and durable persistence or honest blocker.
  - Source capability: turns corpus material into retrievable, citeable, updateable evidence.
  - Target disposition: preserve
  - Target contract: add ingestion/update/delete or rebuild path with stable chunks and both retrieval channels; proof mode may use deterministic in-memory fixtures only as proof-mode evidence.
  - Required proof: ingestion/update test, chunk span/access test, lexical index readback, dense index readback, persistence readback or blocker, and destructive action confirmation proof or blocker.
  - Compatibility impact: target storage/search technology can replace the source proof implementation when behavior is equivalent.
  - Owning phase: `03-phases/02-ingestion-indexing.md`

- Surface id: hybrid-retrieval-fusion-permissions-rerank
  - Source evidence: mapped observations from legacy acceptance gates for lexical/dense retrieval, fusion, dedupe, permission filtering before context packing, and reranking or late interaction.
  - Mapped obligation: combine lexical/sparse and dense candidates, normalize/fuse scores, dedupe by chunk identity, filter access before context packing, rerank hard distractors, and trace dropped/selected candidates.
  - Source capability: returns high-quality, permission-safe contexts instead of vector-only false confidence.
  - Target disposition: preserve
  - Target contract: implement lexical/sparse and dense channels, score normalization/fusion, dedupe, access filtering, reranking, and permission-drop trace fields.
  - Required proof: exact identifier retrieval test, semantic paraphrase retrieval test, hybrid/dedupe test, hard distractor rerank test, permission drop test, and runtime/API trace proof.
  - Compatibility impact: provider-specific scoring can differ, but evals must prove target chunks and blocked private chunks.
  - Owning phase: `03-phases/03-retrieval-answering.md`

- Surface id: grounded-answer-refusal-context-pack
  - Source evidence: mapped observations from legacy answer requirements and acceptance gates for citations, insufficient-evidence refusal, token budget, and answer behavior.
  - Mapped obligation: pack selected context within token budget, generate answers only from selected context, cite selected chunks/sources, refuse unsupported questions, and expose safe UI/API states.
  - Source capability: prevents hallucinated uncited answers and citation laundering.
  - Target disposition: preserve
  - Target contract: pack selected context within a token budget, answer only from selected evidence, cite selected chunks, and refuse unsupported queries.
  - Required proof: grounded answer citation test, unsupported refusal test, token budget test, provider config/live blocker, and UI/API cited/refusal state proof.
  - Compatibility impact: answer wording can adapt to product tone, but every factual answer must be grounded in selected contexts.
  - Owning phase: `03-phases/03-retrieval-answering.md`

- Surface id: eval-harness-traces-operations
  - Source evidence: mapped observations from legacy eval harness and test matrix for recall@k, MRR/nDCG-like ordering, faithfulness, answer correctness, refusal, citation precision, noise sensitivity, latency, cost, token budget, permission drops, and fixture cases.
  - Mapped obligation: run fixture and real-corpus eval formats, emit machine-readable reports, capture retrieval/answer/operation metrics, publish CI or release gates, and record provider readiness.
  - Source capability: makes retrieval quality measurable and regressions visible.
  - Target disposition: preserve
  - Target contract: add machine-readable eval output, trace fields, CI checks, and production corpus launch thresholds.
  - Required proof: eval report with required cases/metrics, negative seeded failure where practical, trace report, CI command proof or blocker, and provider readiness report.
  - Compatibility impact: metric implementations may be merged into existing test/eval infrastructure.
  - Owning phase: `03-phases/04-evaluation-operations.md`

- Surface id: advanced-retrieval-modules
  - Source evidence: mapped observations from legacy advanced guidance for HyDE, query rewriting, SPLADE, ColBERT, RAPTOR, GraphRAG, Self-RAG/CRAG, contextual retrieval, cross-encoder or BGE reranking.
  - Mapped obligation: defer advanced retrieval modules until baseline evals show a gap and measured improvement justifies cost, complexity, trace, and safety impact.
  - Source capability: offers quality upgrades without default hype or unnecessary complexity.
  - Target disposition: defer
  - Target contract: optional modules are implemented only after baseline evals identify a gap and prove improvement; trace generated queries/summaries/graphs.
  - Required proof: advanced-module decision log with baseline gap, measured improvement, safety review, and cost/latency impact before enablement.
  - Compatibility impact: not required for baseline launch unless user requirements or eval failures demand them.
  - Owning phase: `03-phases/04-evaluation-operations.md`

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- Target disposition values are `preserve | replace | merge | defer | drop`.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: eval-report.json` or `generated output: trace export`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this Buildprint packet.

If a source-backed contract cannot be made self-contained, record the blocker before phase work instead of relying on any original source checkout.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

For each unresolved choice, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Initial assumptions:

- Assumption: deterministic proof mode is required even when live providers are planned.
  - Evidence: product requires tests without live model, vector database, reranker, or provider credentials.
  - Risk: proof metrics do not prove provider quality.
  - Blocks phase work: no
- Assumption: multi-tenant plus per-user private access is the safe default.
  - Evidence: permission and tenant leakage are explicit product risks.
  - Risk: implementation may need to adapt to a simpler single-tenant app.
  - Blocks phase work: no
- Assumption: optional advanced modules are deferred until evals justify them.
  - Evidence: source guidance says to enable HyDE/RAPTOR/GraphRAG/Self-RAG/CRAG/SPLADE/ColBERT only when eval cases show benefit.
  - Risk: a product requiring global corpus summaries may need GraphRAG/RAPTOR earlier.
  - Blocks phase work: no unless user explicitly requires those modules for baseline.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-corpus-contracts.md`
- `03-phases/02-ingestion-indexing.md`
- `03-phases/03-retrieval-answering.md`
- `03-phases/04-evaluation-operations.md`
