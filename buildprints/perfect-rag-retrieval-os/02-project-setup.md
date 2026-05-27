# Project Setup

This setup contract is completed before phase implementation. It turns human alignment and mapped RAG obligations into concrete architecture, team rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from the target project and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks such as paid live providers, public deployment, destructive re-indexing, or legal/compliance answer policy.

## Inferred project shape

- Product: Perfect RAG / Retrieval OS, a portable retrieval and grounded-answer system with deterministic proof mode and production adapter boundaries.
- Frontend/UI surfaces: corpus/source management if the host app has admin UI; query/answer screen or API client surface; citation display; insufficient-evidence/refusal state; blocked provider/credential state; trace/eval report views for admins or developers.
- Backend/API surfaces: source ingestion/update/delete endpoints or jobs; chunking/index build jobs; query endpoint; trace endpoint or log sink; eval-run endpoint or command; provider adapter contracts for lexical search, dense search, embeddings, reranking, generation, and cost/latency collection.
- State/runtime surfaces: durable document sources, chunk records, access scopes, lexical/sparse index, dense/vector index, query traces, eval cases, eval run results, generated report outputs, job state, provider config, and runtime artifacts for proof reports.
- Tests/evaluation: deterministic fixture tests plus production corpus evals from `04-evaluation.md` and phase proof gates.

## Stack decisions

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

## Source contract anchors

Promote these observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: implementation project should expose source ingestion/update, query/answer, trace/eval, and index rebuild surfaces through the existing API/job style.
- Request/response payloads and validation errors: document source, chunk, query plan, candidate, reranked context, answer, trace, and eval case records must include stable ids, source metadata, access scopes, citation metadata, and explicit refusal/error fields.
- Provider/runtime boundaries and env var names only: embedding, lexical/sparse search, dense/vector search, reranker, generator, queue, trace sink, and cost/latency labels must sit behind adapters; actual env names are chosen in the implementation project and documented in root/local `AGENTS.md` or env examples.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: production stores documents/chunks/index metadata/traces/eval runs durably; generated output: eval reports; runtime artifact: query traces; runtime artifact: provider latency/cost logs; destructive reset/re-index needs confirmation.
- UI flow/state anchors including empty/loading/error/blocked/success states: query UI or API client must distinguish no corpus, indexing, provider blocked, insufficient evidence, cited answer, permission-filtered result, and eval failure.

## Source capability/surface ledger

- Surface id: corpus-alignment-threat-model
  - Source anchor: source evidence from legacy Buildprint phase gate for corpus, tenants, permissions, freshness, answer risk, citations, refusal policy, latency, cost, target stack, and search infrastructure.
  - Source capability: prevents unsafe generic RAG implementation and establishes product constraints.
  - Target disposition: preserve
  - Target contract: capture the choices in setup, project config, eval cases, and safety rules before retrieval implementation.
  - Compatibility impact: none; ordinary blanks become AI defaults, but live providers/cost/destructive operations remain human-gated.
  - Phase(s): `03-phases/01-corpus-contracts.md`

- Surface id: data-contracts-fixtures
  - Source anchor: source evidence from legacy contracts for source, chunk, query, candidate, reranked context, answer, trace, and eval case records.
  - Source capability: makes RAG behavior typed, testable, citeable, and permission-aware.
  - Target disposition: preserve
  - Target contract: implement equivalent domain contracts in the host stack with deterministic public/private fixtures.
  - Compatibility impact: field names may adapt to local style, but stable ids, spans, access scopes, citations, trace, and eval semantics must remain.
  - Phase(s): `03-phases/01-corpus-contracts.md`

- Surface id: ingestion-chunking-indexing
  - Source anchor: source evidence from legacy spec requiring normalization, checksum, updated timestamp, stable chunk ids, spans, token estimates, contextual text, lexical/sparse and dense index surfaces.
  - Source capability: turns corpus material into retrievable, citeable, updateable evidence.
  - Target disposition: preserve
  - Target contract: add ingestion/update/delete or rebuild path with stable chunks and both retrieval channels; proof mode may use deterministic in-memory fixtures only as proof-mode evidence.
  - Compatibility impact: target storage/search technology can replace the source proof implementation when behavior is equivalent.
  - Phase(s): `03-phases/02-ingestion-indexing.md`

- Surface id: hybrid-retrieval-fusion-permissions-rerank
  - Source anchor: source evidence from legacy acceptance gates for lexical/dense retrieval, fusion, dedupe, permission filtering before context packing, and reranking or late interaction.
  - Source capability: returns high-quality, permission-safe contexts instead of vector-only false confidence.
  - Target disposition: preserve
  - Target contract: implement lexical/sparse and dense channels, score normalization/fusion, dedupe, access filtering, reranking, and permission-drop trace fields.
  - Compatibility impact: provider-specific scoring can differ, but evals must prove target chunks and blocked private chunks.
  - Phase(s): `03-phases/03-retrieval-answering.md`

- Surface id: grounded-answer-refusal-context-pack
  - Source anchor: source evidence from legacy answer requirements and acceptance gates for citations, insufficient-evidence refusal, token budget, and answer behavior.
  - Source capability: prevents hallucinated uncited answers and citation laundering.
  - Target disposition: preserve
  - Target contract: pack selected context within a token budget, answer only from selected evidence, cite selected chunks, and refuse unsupported queries.
  - Compatibility impact: answer wording can adapt to product tone, but every factual answer must be grounded in selected contexts.
  - Phase(s): `03-phases/03-retrieval-answering.md`

- Surface id: eval-harness-traces-operations
  - Source anchor: source evidence from legacy eval harness and test matrix for recall@k, MRR/nDCG-like ordering, faithfulness, answer correctness, refusal, citation precision, noise sensitivity, latency, cost, token budget, permission drops, and fixture cases.
  - Source capability: makes retrieval quality measurable and regressions visible.
  - Target disposition: preserve
  - Target contract: add machine-readable eval output, trace fields, CI checks, and production corpus launch thresholds.
  - Compatibility impact: metric implementations may be merged into existing test/eval infrastructure.
  - Phase(s): `03-phases/04-evaluation-operations.md`

- Surface id: advanced-retrieval-modules
  - Source anchor: source evidence from legacy advanced guidance for HyDE, query rewriting, SPLADE, ColBERT, RAPTOR, GraphRAG, Self-RAG/CRAG, contextual retrieval, cross-encoder or BGE reranking.
  - Source capability: offers quality upgrades without default hype or unnecessary complexity.
  - Target disposition: defer
  - Target contract: optional modules are implemented only after baseline evals identify a gap and prove improvement; trace generated queries/summaries/graphs.
  - Compatibility impact: not required for baseline launch unless user requirements or eval failures demand them.
  - Phase(s): `03-phases/04-evaluation-operations.md`

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- Target disposition values are `preserve | replace | merge | defer | drop`.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: eval-report.json` or `generated output: trace export`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this Buildprint packet.

If a source-backed contract cannot be made self-contained, record the blocker before phase work instead of relying on any original source checkout.

## Architecture rules

- Preserve product behavior and source-derived obligations; frameworks are replaceable when behavior and proof remain intact.
- Keep dependency direction explicit: UI/API -> application service -> retrieval domain -> data/search/provider adapters.
- Keep routes/controllers thin; put chunking, retrieval, fusion, permission, rerank, context packing, answer, and eval rules in service/domain layers.
- Put external API/provider/database/search access behind adapters or repositories.
- Do not claim durable behavior from in-memory-only state unless explicitly scoped as proof-mode evidence.
- Generated code and generated eval outputs must be marked and regenerated through documented commands.
- Defaults must be evidence-grounded and no more complex than the target corpus needs.
- Permission filters must run before context packing and answer generation, not as a UI-only or post-answer filter.
- Provider adapters must expose deterministic test doubles and live-mode evidence separately.

## Team operating model

Use these review lenses during every implementation loop:

- Architecture: boundaries, dependency direction, maintainability, source-faithful behavior.
- UX/UI: polished flows, empty/loading/error/blocked/success states, accessibility, responsive behavior.
- Backend/API: validation, auth/tenant/privacy boundaries, provider contracts, error semantics.
- State/runtime: persistence, migrations, indexing jobs, env/config, workers, runtime observability.
- QA/evaluation: tests, build, retrieval metrics, answer metrics, evidence quality, no fake proof.
- Security/infra: secrets, destructive re-index/delete, external writes, live providers, deployment and cost approvals.

## Execution authority model

- Root/local `AGENTS.md` files in the implementation project are scope governors, not product brains. They preserve architecture, safety, quality gates, and local workflow; they do not broaden the current phase.
- `.buildprint/next-agent.md` is continuity for fresh sessions. It must identify current phase, objective, recommended next action, known blockers, and which phase-run artifacts already exist.
- `03-phases/phase-flow.md` is the executable phase-entry constitution. It controls how each phase begins, how roles are assembled, how bounded handoffs are created, and when evidence may be appended.
- Explicit task or handoff text is the only valid source of delegated role, allowed scope, proof command, and evidence requirements. Do not rely on workers guessing their authority.

## Delegation and handoff protocol

For each phase, the orchestrating main session must create bounded assignments before delegating or simulating specialist work. Each assignment includes phase id, proof gate, files to read, allowed edit scope, non-goals, success criteria, verification command, evidence row requirements, and risks/blockers. Specialist workers return changed files, proof results, an evidence row draft, and risks. The orchestrator reviews and integrates their output, runs the phase proof gate, appends runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`, and updates `.buildprint/progress.md` plus `.buildprint/next-agent.md` before moving on. Vague global delegation is invalid.

## AGENTS.md plan

The blueprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` after this setup is resolved.

- Root `AGENTS.md`: product scope, RAG architecture rules, provider modes, quality gates, safety/permissions, workflow, and local instruction map.
- Local `AGENTS.md` files: create only at real architectural boundaries such as frontend/app, backend/API, retrieval/domain, data/db/search, jobs/workers, providers, or tests/eval.
- Local files may narrow rules for their subtree but must not weaken root safety, quality, evidence, or architecture invariants.

## Quality gates

Before claiming any phase done:

- Run the smallest meaningful typecheck/lint/test/build gate for changed code.
- Run deterministic fixture retrieval/answer/eval checks without live credentials.
- For UI-facing work, verify user-visible behavior with browser/screenshot evidence when possible.
- For backend/provider/state work, verify real request/path, persistence/readback, index update/readback, or record an honest blocker.
- For live providers, record credentials/config availability, provider mode, latency/cost labels, and whether evidence is live or deterministic proof.
- Do not skip tests, hide failures, or upgrade claims without proof.

## Safety and permissions

Ask before destructive actions, external writes/publishes/deploys, secret handling, paid services, irreversible migrations, public data changes, or corpus deletion/re-indexing that could lose data.

Never commit secrets, private logs, credentials, raw private corpus data, provider tokens, or traces that reveal unauthorized content.

Permission and tenant filters must be server-side and must run before context packing, answer generation, citation exposure, and user-visible traces.

## Open questions and assumptions

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
