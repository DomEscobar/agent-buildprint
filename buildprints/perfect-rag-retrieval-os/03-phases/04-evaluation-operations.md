# Phase 04 — Evaluation And Operations

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. declare phase objective
2. assemble required roles
3. dispatch bounded subagent tasks or simulate them explicitly if subagents are unavailable
4. collect reviews
5. integrate
6. verify
7. record evidence

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - ux-ui-craft
  - security-boundary
  - test-and-verification

## Product outcome

The RAG system has a repeatable evaluation harness, machine-readable reports, trace and operational metrics, CI or release gates, and honest provider/live-readiness boundaries. Optional advanced retrieval modules are evaluated as measured upgrades, not enabled by default hype.

## Source evidence

- Legacy eval harness required retrieval metrics, answer metrics, operational metrics, and fixture cases for exact identifiers, semantic paraphrase, contextualized chunks, private mismatch, unsupported refusal, and rerank distractors.
- Legacy test matrix covered vector-only misses, lexical-only misses, bad ordering, hallucinated answers, citation laundering, tenant leaks, chunk context loss, eval-free drift, and live-provider dependence.
- Legacy operational requirements included latency by stage, candidate counts, token budget used, provider cost fields labeled measured/estimated/unavailable, and permission filter drops.
- Legacy advanced guidance said HyDE, query rewriting, SPLADE, ColBERT, RAPTOR, GraphRAG, Self-RAG/CRAG, contextual retrieval, cross-encoder, and BGE rerankers should be added only when evals justify complexity.

## Source surface dispositions

- Retrieval eval harness: preserve. Equivalent target behavior emits recall@k, MRR, and nDCG-like or ordering metric where available. Compatibility impact: metric names can adapt but must be machine-readable.
- Answer eval harness: preserve. Equivalent target behavior checks faithfulness, answer correctness, refusal quality, citation precision, and noise sensitivity. Compatibility impact: LLM-as-judge may be blocked unless provider use is approved; deterministic checks still required.
- Operational trace metrics: preserve. Equivalent target behavior records latency, candidate counts, token budget, cost labels, and permission drops. Compatibility impact: live cost may be unavailable in proof mode but must be labeled.
- CI/release gates: preserve. Equivalent target behavior integrates eval checks into the host project's test/release process. Compatibility impact: launch thresholds are product-owned and can be blockers if absent.
- Advanced modules: defer. Equivalent target behavior adds HyDE/query rewrite/SPLADE/ColBERT/RAPTOR/GraphRAG/Self-RAG/CRAG only when a baseline eval gap and improvement proof exist. Compatibility impact: optional modules must not weaken baseline trace, permission, or cost controls.

## Implementation scope

Implement the evaluation and operations layer:

- fixture eval cases and real-corpus eval case format;
- machine-readable eval runner/report;
- retrieval, answer, refusal, citation, permission, latency, cost, and token-budget metrics;
- CI/release command or documented blocked gate;
- trace retention/export policy;
- provider-live readiness checks and blocker rows for unavailable credentials/network/cost approval;
- optional advanced-module decision log tied to eval evidence.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: eval-run command/endpoint, report download or admin view, trace lookup, provider readiness/status.
- Provider/tool contracts: evaluator, metric collectors, optional judge model, provider cost/latency collector, trace sink.
- None — reason: if the target project is CLI/library-only, expose eval commands and generated reports instead of UI/API.

## State/runtime touched

- Database/persistence: eval cases, eval runs, metric reports, traces, provider readiness status, optional advanced-module experiment records.
- Env/config: eval thresholds, provider mode, judge provider config if approved, latency/cost budgets, report retention.
- Jobs/workers/runtime: scheduled or manual eval run, report generation, trace cleanup/retention, provider readiness check.
- Runtime artifacts/generated outputs: generated output: eval report; runtime artifact: trace export; runtime artifact: provider readiness report; runtime artifact: advanced-module decision log.
- None — reason: if persistent eval history is not available, record a blocker and keep generated reports as proof-mode artifacts.

## UX/UI requirements

If UI exists, expose eval status, last run, pass/fail/blocker states, metric deltas, provider readiness, and trace inspection without leaking private content to unauthorized users. Reports must distinguish deterministic proof, sandbox, blocked, and live evidence. If no UI exists, document CLI/API output and downstream UI obligations in the UX review.

## Safety/security constraints

Eval fixtures must not contain real private data unless storage, access, and retention are approved. Trace exports must redact secrets and unauthorized/private content. Live judge/provider calls require approval, credentials, timeouts, and cost limits. Advanced modules that generate queries, summaries, graphs, or critiques must trace generated artifacts and avoid leaking hidden/private context.

## Quality gates

- Typecheck/build.
- Eval command produces machine-readable report with required fixture cases.
- Tests fail on at least one seeded bad behavior where practical, or record why mutation/negative testing is blocked.
- Trace report includes latency/cost labels, token budget, selected contexts, permission drops, and provider mode or explicit blocker.
- CI/release gate documented and runnable, or blocker recorded.
- Optional module decision log shows baseline gap, measured improvement, cost/latency impact, and safety review before enabling.

## Proof gate

Proof id: proof-evaluation-operations
Required proof types:
- eval_report
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- durable_persistence_or_blocker
- provider_live_or_deterministic_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: evaluation-operations` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
