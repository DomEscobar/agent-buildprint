# Project Setup

## Setup defaults

Blueprint mode

- Primary: mixed
- Phase style: mixed_contract
- Why this mode fits: MiroFish is a browser product workbench, but the selected scope includes dataflow, automation, integration, and infrastructure obligations that need their own proof language. Every phase declares a specific non-mixed mode.

Default to a production-grade portable implementation. Source frameworks are replaceable; product-defining systems such as MiroFish, OASIS, Zep, LLM provider boundaries, Twitter, Reddit, simulation, report agent, and agent interviews remain mapped obligations.

Missing credentials block only live proof. They do not remove provider adapters, config contracts, deterministic tests, runtime wiring, UI blocked-provider states, or evidence rows.

Do not downgrade to a local MVP unless the user explicitly scopes a prototype-only build. A static shell, deterministic-only provider, in-memory-only state, mock-only simulation, or local MVP substitute is invalid as production behavior unless it is explicitly labeled prototype-only and paired with preserved production adapter, durable persistence, runtime, browser, and evidence obligations.

## Product / capability shape

MiroFish is a source-independent AI swarm simulation workbench with:

- source intake and ontology/graph setup;
- Zep-backed graph memory and entity/stat reads;
- OASIS-ready profile/config generation;
- Twitter, Reddit, and parallel simulation runtime paths;
- action, post, comment, timeline, stats, report, chat, and interview readbacks;
- lifecycle operations for projects, simulations, reports, runtime artifacts, graph delete, close-env, force restart, and cleanup;
- product-grade browser workbench flows, not generic local MVP screens.

## Architecture decisions

- Use replaceable browser workbench, API service, domain/application services, repositories, provider adapters, worker/runtime, and observability boundaries.
- Provider adapters own OASIS, Zep, and LLM config, error mapping, retry, deterministic local tests, sandbox/live split, and live-proof blockers.
- Persistence owns project files/text/metadata, task state, simulation state/config/profiles/logs, per-platform SQLite data, report sections/logs, and interview history with restart/readback.
- Worker/runtime owns async task lifecycle, progress, cancellation/force, subprocess stop/close-env, retries, and cleanup.
- Browser routes own first useful viewport workflows, graph/workbench split mode, timeline/report/chat surfaces, and blocked/error/partial states.

## Production readiness contract

- Auth/session/tenant boundary: local-only is allowed for first implementation, but public or multi-user deployment is blocked until owner/session/tenant and denied-path tests exist.
- Provider integration contract: OASIS, Zep, and LLM adapters must fail closed, expose missing-config states, provide deterministic tests, and record live-provider blockers/proof separately.
- Durable persistence contract: all project, simulation, report, log, generated artifact, and DB-backed surfaces need schema/version ownership, restart/readback, cleanup, export/download, delete/reset semantics.
- Worker/runtime contract: async jobs and OASIS subprocesses need status, progress, timeout, retry/error mapping, stop, force restart, close-env, and recovery.
- Deployment and operations contract: define local and deploy/apply entrypoints, health/readiness, rollback, drift checks, observability, log redaction, and cleanup on shutdown.
- Browser/e2e contract: UI-bearing phases need repeatable_browser_e2e, screenshot set, Screenshot critique, accessibility, responsive proof, and visual_quality_gate.
- Security contract: uploads, provider keys, destructive delete/reset/force/close actions, logs, reports, and evidence need validation, confirmation, redaction, and denied-path tests.

## Experience quality contract

- UI architecture: main workbench first, with graph/workbench split mode, setup pipeline, simulation timeline, report reader, and interaction panel.
- Product composition: each visible control must reach API/runtime behavior or show a disabled reason/blocker.
- Domain-specific affordances: graph details, ontology tags, profile/config previews, dual-platform action timeline, report section progress, tool logs, chat/interview history.
- Visual system: dense, restrained analyst cockpit with stable dimensions, readable timeline/report/chat layouts, not default forms or generic SaaS card grids.
- Screenshot critique: every UI-bearing phase must capture desktop and mobile states, critique hierarchy/density/contrast/responsiveness, and reject default-control shells or raw text-list substitutes.

## Mapped contract anchors

- Packet file `03-phases/phase-flow.md` owns delegation, handoff/return artifacts, and runtime evidence ordering.
- Packet file `06-contracts/product-architect.md` owns topology and First vertical slice review.
- Packet file `06-contracts/ux-ui-craft.md` owns UI craft, visual_quality_gate, and Screenshot critique.
- Packet file `06-contracts/integration-runtime.md` owns provider/runtime contracts and the rule that missing credentials block live proof only.
- Packet file `06-contracts/data-persistence.md` owns restart/readback and migration_retention_backup_upload_limits.
- Packet file `06-contracts/security-boundary.md` owns denied-path, upload, destructive, secret, and evidence redaction proof.
- Packet file `06-contracts/test-and-verification.md` owns no_fake_scan_pass and evidence ceiling rules.

## Mapped obligation/surface matrix

Disposition vocabulary: preserve | replace | merge | defer | drop. Target contract means equivalent target behavior, not route/function parity. Required proof must be surface-specific; generic "tests pass", "app builds", or "feature preserved" does not qualify.

| Source evidence | Mapped obligation | Target disposition | Owning phase | Target contract | Required proof |
|---|---|---|---|---|---|
| `README.md:27-32,86-92` source path | MiroFish five-step swarm prediction workbench | preserve | 01 and all phases | Keep product identity and end-to-end flow | Browser path completes local pipeline with provider blockers labeled |
| `.env.example:1-16`, `config.py:30-74` source path | LLM/Zep/OASIS config and fail-closed provider states | preserve/replace | 01,02,03,05,07 | Env names and adapters, not secret values | Config/adapter tests plus live_provider blocker/proof |
| `graph.py:120-248`, `project.py:241-290` source path | Upload files, parse text, persist project/text, generate ontology | preserve | 01 | Upload/source intake and ontology output | Valid/invalid upload, persisted text readback, deterministic LLM adapter |
| `graph.py:280-523` source path | Async Zep graph build, chunking, progress, graph id/stat result | preserve | 01 | Graph build task and graph readback | Fake Zep graph build/status proof; live Zep blocker/proof |
| `graph.py:567-620` source path | Graph data read and graph delete | preserve/harden | 07 | Read/delete lifecycle with destructive controls | Read proof; delete denied-path/confirmation/audit proof |
| `simulation.py:46-160` source path | Entity list/detail/by-type with Zep enrichment | preserve | 02 | Filtered entity API and graph context | Entity filter/detail/not-found tests and paging/retry |
| `simulation.py:163-229` source path | Create simulation from project/graph and platform flags | preserve | 02 | Durable simulation state creation | Create/readback/missing graph tests |
| `simulation.py:359-625`, `simulation_manager.py:230-448` source path | Zep entities/document context -> OASIS profiles/config | preserve | 02 | Dataflow schema/transform/lineage/data quality | Schema validation, transform lineage, idempotency/backfill on force_regenerate |
| `simulation.py:990-1292` source path | Realtime profile/config partial/final reads | preserve | 02 | Partial-data and final artifact API/UI | Concurrent/partial read tests, profile/config summary UI |
| `simulation.py:1451-1623`, `simulation_runner.py:313-479` source path | OASIS start with Twitter/Reddit/parallel, max_rounds, force, memory update | preserve | 03 | Automation task loop and runtime subprocess | Trace with start, max_rounds, force approval, process state, graph memory adapter |
| `simulation_runner.py:482-691` source path | Action log monitor, completion, graph memory update | preserve | 03 | Runtime trace and state updates | Action JSONL fixture updates counters/completion and Zep memory calls/blocker |
| `simulation.py:1644-1687`, `simulation_runner.py:720-822,1102-1285` source path | Stop, cleanup, shutdown process tree | preserve/harden | 07 | Operations readiness, rollback, cleanup | Stop/cleanup/readiness/rollback/drift/observability tests |
| `simulation.py:1864-2125`, `simulation_runner.py:893-1101` source path | Actions/timeline/stats/posts/comments reads | preserve | 04 | Observable simulated world read models | Pagination/filter/SQLite/readback and browser timeline proof |
| `report.py:25-192` source path | Async report generation and force_regenerate | preserve | 05 | Report agent task loop | Trace with plan/tool/section/report persistence and force semantics |
| `report.py:203-468,567-754` source path | Report status, sections, download, unlock interaction | preserve | 05 | Report artifact reader/export | Section progress/readback/download proof |
| `report.py:470-556,933-980` source path | Report-agent chat and graph search tool | preserve | 06 | Chat/tool provider integration | Chat transcript/tool-call test and provider blocker/proof |
| `report.py:756-930` source path | Agent/console logs incremental/stream reads | preserve | 05 | Structured and console log readbacks | from_line/stream/missing log tests with redaction |
| `simulation_ipc.py:1-285`, `simulation.py:2140-2690` source path | Interview single/batch/all, env status, close-env | preserve | 06 | IPC boundary transaction with timeout/error mapping | Filesystem callback/response, idempotency, timeout, close-env proof |
| `simulation.py:2512-2581` source path | Interview history from platform DBs | preserve | 06 | Platform/agent filtered history | DB readback and missing DB empty state |
| `MainView.vue:1-111`, `Step1GraphBuild.vue:1-170` source path | Workbench shell and graph setup UI | preserve/replace | 01 | Product-grade graph/setup browser flow | repeatable_browser_e2e and visual_quality_gate |
| `Step2EnvSetup.vue:1-300` source path | Environment setup UI with profile/config previews | preserve/replace | 02 | Product-grade prep flow | Browser proof for progress, partial/final artifacts, blocked states |
| `Step3Simulation.vue:1-695` source path | Simulation monitor UI and automatic parallel start | preserve/replace | 03/04 | Product-grade timeline/runtime monitor | Browser proof for start/running/completed/action feed |
| `Step4Report.vue:1-320` source path | Report reader and tool/log timeline | preserve/replace | 05 | Product-grade report generation/readback | Browser proof for sections/logs/download/no raw text-list substitute |
| `Step5Interaction.vue:1-300` source path | Report-agent chat, agent chat, surveys/interviews | preserve/replace | 06 | Product-grade interaction surface | Browser proof for report chat, agent interview, history, loading/error states |

No mapped surface may disappear silently. Every high-signal mapped surface above has one owning phase; supporting phases are named only when a UI flow depends on runtime/data phase output.

## Implementation project setup

Create root/local `AGENTS.md` in the implementation project with scope, safety, verification, provider-secret, and evidence rules. Creating only `AGENTS.md` is not enough.

Runtime setup artifact: create `.buildprint/setup.md` or `.buildprint/setup/` with selected stack, run commands, env var names, local services, deterministic provider modes, test commands, browser tooling, and blocked live-provider/deployment proof.

Do not start `03-phases/*` before setup records:

- frontend/backend/runtime/storage/test/deployment decisions;
- provider adapter names and deterministic modes;
- persistence locations and migration/readback strategy;
- worker/runtime ownership and stop/retry/cleanup behavior;
- browser/e2e screenshot plan.

Phase entry remains governed by `03-phases/phase-flow.md` plus required `06-contracts/*`.

## Open assumptions

- Source frameworks are implementation details and can be replaced.
- OASIS, Zep, LLM provider boundary, Twitter, Reddit, simulation, report, agent, and MiroFish are product-defining terms for the selected scope.
- Missing credentials, paid provider approval, and live OASIS availability block only live proof after adapter/config/test/runtime wiring exists.
- Public hosted deployment requires auth/session/tenant hardening before qualification.

## Phase start gate

Before any phase:

1. Confirm questions are accepted/defaulted.
2. Write implementation-project `AGENTS.md`.
3. Write `.buildprint/setup.md`.
4. Read `03-phases/phase-flow.md`.
5. Read `03-phases/phase-index.yaml` and active phase.
6. Read only required `06-contracts/<role>.md` files.
7. Create phase-run plan/team-gates/handoffs before code.
