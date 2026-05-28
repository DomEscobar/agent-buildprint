# Project Setup

This file is the project constitution for implementation. Keep it compact. It contains product-specific decisions an agent needs before phase work, not the global execution protocol.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers authorize AI best-fit decisions grounded in mapped product obligations.
- Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Full-suite packets default to production-grade architecture, not a local MVP.
- Do not downgrade to a local MVP unless the selected scope explicitly says prototype-only.

## Product / capability shape

- Blueprint mode:
  - Primary: mixed
  - Secondary: ui, api, worker, provider, agent, data, deployment
  - Phase style: mixed_contract
  - Why this mode fits: source evidence combines product workflow UI, provider integrations, worker/subprocess runtime, automation/IPC, generated artifacts, and deployment surfaces.
- Product: MiroFish full-suite prediction workbench.
- Primary user jobs: upload seed evidence, generate ontology and graph, prepare social agents/config, run OASIS simulations, inspect actions/posts/comments, generate/download reports, chat with report tools, interview simulated agents, revisit history.
- Frontend/UI surfaces: intake, graph/split/workbench views, graph visualization, environment setup, simulation run, report, interaction, history, language switcher.
- Backend/API surfaces: graph/project, simulation/entity/runtime/interview, report generation/read/download/chat/logs.
- State/runtime surfaces: projects/uploads/extracted text/ontology, graph ids, tasks, simulation state/config/profiles/run state/action logs/posts/comments, report metadata/sections/logs, IPC commands/responses.
- External providers/runtime: OpenAI-compatible LLM, Zep Cloud graph/memory, OASIS Twitter/Reddit/parallel scripts.
- Tests/evaluation source: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

- Framework/runtime:
  - Decision: implementation may choose stack, but must maintain separate browser workbench, API/service layer, provider adapters, durable repositories, workers, OASIS runtime boundary, and tests.
  - Why this fits: source behavior crosses UI, API, providers, filesystem artifacts, subprocesses, and reports.
- Package/build system:
  - Decision: use a reproducible workspace with lint, unit, API, worker, browser e2e, visual, schema, secret, and no-fake commands.
  - Why this fits: full-suite proof cannot rely on one smoke command.
- Module topology:
  - Decision: define frontend, API/controllers, domain services, provider adapters, repositories/stores, worker/runtime, security, and tests/e2e.
  - Why this prevents local-MVP collapse: every mapped surface has a proof path and one owning phase.
- Data/storage:
  - Decision: replace source file-only persistence with durable DB/object storage unless explicitly building a local-only product; still preserve import/export/delete/reset semantics.
  - Restart/readback requirement: all project, simulation, runtime, report, and history records must survive restart.
- Auth/providers/deployment:
  - Decision: add owner/session boundaries before production claims; use deterministic provider test doubles plus live adapters.
  - Live-proof blockers: missing LLM, Zep, OASIS, browser, or deployment environment blocks only live proof after local contracts exist.

## Production readiness contract

- Auth/session/tenant boundary: implement at minimum authenticated or local-owner project/simulation/report ownership, denied cross-owner tests, audit for delete/reset/stop/close/download.
- Provider integration contract: define env names, adapters, deterministic tests, live/sandbox modes, redacted logs, request/response/error contracts.
- Durable persistence contract: schema migrations, restart/readback, backup/export/delete, retention, quotas, upload limits, sensitive data handling.
- Worker/runtime contract: graph build, simulation prep, OASIS run, report generation, progress, retries, cancellation/stop/close, timeouts, failure recovery, idempotency.
- Deployment and operations contract: local dev, production build/run, container/hosting shape, health/readiness, structured logs, metrics/tracing, rate and request-size limits, CI.
- Browser/e2e contract: repeatable flows for intake, graph, environment setup, runtime, reports, interaction, history, destructive confirmations, responsive states.
- Screenshot critique: reject generic dashboards, static-only graph shells, unpolished report readers, default forms, or hidden blocked-provider states.

## Experience quality contract

- UI architecture: full browser workbench with graph/split/workbench modes; not a single page form.
- Product composition: five-step workflow with clear next actions and safe back/stop/close behavior.
- Domain-specific affordances: graph visualization/detail panels, profile/config previews, action timeline, posts/comments tables, report sections/logs, chat/interview panels.
- Visual system: technical, dense, readable, responsive, accessible, with stable empty/loading/error/blocked/success states.
- State quality: every provider/runtime surface needs blocked-provider, failure, retry, progress, completed, and stale/history states.
- Screenshot critique: desktop and mobile screenshots must inspect text fit, graph framing, modal/confirmation clarity, and timeline/report readability.

## Mapped contract anchors

- Route/API/job prefixes and handlers: graph project/ontology/build/task/data/delete; simulation entities/create/prepare/status/profiles/config/start/stop/run-status/actions/timeline/posts/comments/interview/env/history; report generate/status/read/list/download/delete/chat/progress/sections/logs/check.
- Request/response payloads and validation errors: preserve success/data/error envelopes while adding typed validation and authorization errors.
- Provider/runtime boundaries and env var names only: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, `ZEP_API_KEY`, `OASIS_DEFAULT_MAX_ROUNDS`, `REPORT_AGENT_MAX_TOOL_CALLS`, `REPORT_AGENT_MAX_REFLECTION_ROUNDS`, `REPORT_AGENT_TEMPERATURE`, `LLM_BOOST_API_KEY`, `LLM_BOOST_BASE_URL`, `LLM_BOOST_MODEL_NAME`, `SECRET_KEY`, `FLASK_DEBUG`.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: project metadata, uploaded seed files, extracted text, ontology, graph ids, simulation profiles/config/state/run_state, action logs, OASIS DB posts/comments, IPC commands/responses, report markdown/sections/logs.
- UI flow/state anchors: intake, graph build, environment setup, simulation run, report, interaction, history, language switching.

## Mapped obligation/surface matrix

Matrix rules:

- Target disposition values: preserve | replace | merge | defer | drop | blocked.
- Every high-signal mapped surface must appear exactly once with one owning phase; this is exactly-one ownership semantics, not shared bucket ownership.
- If a surface is split, name one primary owning phase and describe support in Target contract; No mapped surface may disappear silently.
- Required proof must reject generic proof such as "tests pass", "app builds", or "feature preserved"; every row needs surface-specific proof.
- This matrix is not route/function parity; target architecture may improve internals when the mapped product obligation remains covered.
- Missing credentials block only live proof after adapter/config/test/runtime wiring exists.

| Surface id | Source evidence | Product obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
| home.intake-upload | mapped note: source path `frontend/src/views/Home.vue:136`-`203` | Browser seed upload plus requirement. | preserve | Multipart UI, validation, loading/error, project transition. | `03-phases/01-intake-ontology.md` | Browser e2e upload to project readback. |
| api.ontology-generate | mapped note: source path `backend/app/api/graph.py:122`-`248` | Upload, extract, ontology, persist project. | preserve | API/domain/persistence path with typed errors. | `03-phases/01-intake-ontology.md` | API success and validation tests. |
| service.file-extraction | mapped note: source path `backend/app/api/graph.py:180`-`213`; `backend/app/config.py:38`-`41` | PDF/MD/TXT extraction and limits. | preserve | Safe parser/storage, unsupported/malformed failure states. | `03-phases/01-intake-ontology.md` | Parser, upload limit, traversal tests. |
| provider.llm-ontology | mapped note: source path `backend/app/services/ontology_generator.py:29`-`88`; `backend/app/utils/llm_client.py:14`-`103` | LLM ontology JSON adapter. | preserve | Deterministic and live modes with blocked config. | `03-phases/01-intake-ontology.md` | Provider config test; live proof blocker. |
| data.project-persistence | mapped note: source path `backend/app/models/project.py:26`-`303` | Project/upload/text/ontology state. | replace | Durable DB/object store with restart/readback. | `03-phases/01-intake-ontology.md` | Migration and restart/readback proof. |
| admin.project-list-delete-reset | mapped note: source path `backend/app/api/graph.py:36`-`117` | Project get/list/delete/reset. | preserve | Ownership, confirmation, cleanup. | `03-phases/01-intake-ontology.md` | Denied-path and destructive cleanup tests. |
| api.graph-build-task | mapped note: source path `backend/app/api/graph.py:260`-`522` | Async graph build task. | preserve | Worker progress, force rebuild, failure states. | `03-phases/02-graph-memory.md` | Worker progress/completion/failure proof. |
| provider.zep-graph-write | mapped note: source path `backend/app/services/graph_builder.py:193`-`345` | Zep graph create/ontology/batches/wait. | preserve | Zep adapter with fake/sandbox/live modes. | `03-phases/02-graph-memory.md` | Adapter test; live Zep blocker. |
| api.graph-read-delete | mapped note: source path `backend/app/api/graph.py:569`-`622` | Graph read and delete. | preserve | Safe read/delete with authorization. | `03-phases/02-graph-memory.md` | Read/delete tests and live blocker. |
| ui.graph-visualization | mapped note: source path `frontend/src/views/Process.vue:21`-`221` | Graph view, legend, detail, fullscreen. | preserve | Responsive graph UI and state panels. | `03-phases/02-graph-memory.md` | Browser e2e plus screenshots. |
| api.entities-filter | mapped note: source path `backend/app/api/simulation.py:48`-`152`; `backend/app/services/zep_entity_reader.py:215`-`260` | Entity list/detail/by-type filtering. | preserve | Adapter/API with enrichment and errors. | `03-phases/03-simulation-prep.md` | Entity filtering tests. |
| api.simulation-create | mapped note: source path `backend/app/api/simulation.py:165`-`229` | Simulation creation with platforms. | preserve | Create/list/get state and graph dependency. | `03-phases/03-simulation-prep.md` | API/state tests. |
| worker.simulation-prepare | mapped note: source path `backend/app/api/simulation.py:359`-`625`; `backend/app/services/simulation_manager.py:230`-`448` | Prepare entities, profiles, config, artifacts. | preserve | Async progress, retry/failure, force regenerate. | `03-phases/03-simulation-prep.md` | Progress and artifact schema proof. |
| provider.oasis-profiles-twitter | mapped note: source path `backend/app/services/simulation_manager.py:368`-`374` | Twitter CSV profiles. | preserve | CSV profile artifact and preview. | `03-phases/03-simulation-prep.md` | Schema and UI proof. |
| provider.oasis-profiles-reddit | mapped note: source path `backend/app/services/simulation_manager.py:329`-`366` | Reddit JSON profiles. | preserve | JSON profile artifact and preview. | `03-phases/03-simulation-prep.md` | Schema and UI proof. |
| config.simulation-config | mapped note: source path `backend/app/api/simulation.py:1138`-`1312` | Simulation config preview/download. | preserve | Config schema, realtime partial states, download. | `03-phases/03-simulation-prep.md` | Schema/download/browser proof. |
| ui.env-setup | mapped note: source path `frontend/src/components/Step2EnvSetup.vue:44`-`360` | Step 2 profile/config UI. | preserve | Progress, profile cards, config cards, next action. | `03-phases/03-simulation-prep.md` | Browser e2e for states. |
| runtime.oasis-start | mapped note: source path `backend/app/api/simulation.py:1451`-`1621`; `backend/app/services/simulation_runner.py:313`-`479` | Start OASIS subprocess. | preserve | Twitter/Reddit/parallel runner, max rounds, logs. | `03-phases/04-simulation-runtime.md` | Subprocess/log/run-state proof; live blocker. |
| runtime.oasis-stop-close | mapped note: source path `backend/app/api/simulation.py:1644`-`1685`; `backend/app/api/simulation.py:2584`-`2656` | Stop process and close env. | preserve | Force stop and graceful IPC close. | `03-phases/04-simulation-runtime.md` | Process cleanup and timeout tests. |
| data.run-state-progress | mapped note: source path `backend/app/services/simulation_runner.py:101`-`193`; `backend/app/api/simulation.py:1705`-`1848` | Runtime progress and state. | preserve | Durable run_state and polling. | `03-phases/04-simulation-runtime.md` | Restart/readback and progress tests. |
| data.action-logs | mapped note: source path `backend/app/services/simulation_runner.py:482`-`986`; `backend/app/api/simulation.py:1864`-`1958` | Actions, timeline, stats. | preserve | JSONL parser/API/UI. | `03-phases/04-simulation-runtime.md` | Parser/filter/timeline proof. |
| data.posts-comments | mapped note: source path `backend/app/api/simulation.py:1987`-`2127` | Posts/comments from OASIS DB. | preserve | Platform DB reader with empty/error states. | `03-phases/04-simulation-runtime.md` | DB read tests. |
| provider.graph-memory-update | mapped note: source path `backend/app/services/zep_graph_memory_updater.py:202`-`360` | Optional action-to-Zep memory update. | preserve | Queue/batch/retry/live blocker. | `03-phases/04-simulation-runtime.md` | Queue tests; live Zep blocker. |
| ui.simulation-run | mapped note: source path `frontend/src/views/SimulationRunView.vue:52`-`198` | Step 3 runtime UI. | preserve | Start/progress/stop/back/graph refresh. | `03-phases/04-simulation-runtime.md` | Browser e2e. |
| report.generate | mapped note: source path `backend/app/api/report.py:25`-`200` | Async report generation. | preserve | Report agent worker with progress and failures. | `03-phases/05-report-agent.md` | Async/report proof; live LLM blocker. |
| report.read-list-download-delete | mapped note: source path `backend/app/api/report.py:277`-`467` | Report lifecycle and Markdown export. | preserve | Durable report store, download, delete confirmation. | `03-phases/05-report-agent.md` | Download/delete/read tests. |
| report.sections-progress-log | mapped note: source path `backend/app/api/report.py:567`-`820` | Sections, progress, logs. | preserve | Section artifacts and incremental log read. | `03-phases/05-report-agent.md` | Section/log polling proof. |
| report.chat-tools | mapped note: source path `backend/app/api/report.py:470`-`556` | Report Agent chat/tool calls. | preserve | Chat adapter with tool transcript and sources. | `03-phases/05-report-agent.md` | Tool transcript test; live blocker. |
| ui.report-view | mapped note: source path `frontend/src/views/ReportView.vue:52`-`60` | Step 4 report UI. | preserve | Workbench report reader/progress/download. | `03-phases/05-report-agent.md` | Browser e2e. |
| ipc.interview-single | mapped note: source path `backend/app/api/simulation.py:2142`-`2260` | Single-agent interview. | preserve | IPC command/response with platform selection. | `03-phases/06-interaction-history-admin.md` | IPC timeout/success tests. |
| ipc.interview-batch-all | mapped note: source path `backend/app/api/simulation.py:2271`-`2508` | Batch/all-agent interviews. | preserve | Validation, batch response, partial failure. | `03-phases/06-interaction-history-admin.md` | Batch tests. |
| data.interview-history | mapped note: source path `backend/app/api/simulation.py:2512`-`2584` | Interview history. | preserve | DB-backed query by sim/platform/agent. | `03-phases/06-interaction-history-admin.md` | History query/browser proof. |
| ui.interaction-view | mapped note: source path `frontend/src/views/InteractionView.vue:52`-`60` | Step 5 deep interaction UI. | preserve | Report chat and simulation interview panels. | `03-phases/06-interaction-history-admin.md` | Browser e2e. |
| history.database | mapped note: source path `frontend/src/views/Home.vue:208`-`209`; `backend/app/api/simulation.py:876`-`980` | Past-run history database. | preserve | Enriched history with project/report/run state. | `03-phases/06-interaction-history-admin.md` | API/browser history proof. |
| i18n.localization | mapped note: source path `frontend/src/App.vue:17`-`23`; `backend/app/api/graph.py:18` | English/Chinese UI/API messages. | preserve | Locale switch and localized errors. | `03-phases/06-interaction-history-admin.md` | Locale browser/API tests. |
| security.public-local-posture | mapped note: source path `backend/app/config.py:23`-`25`; no auth routes observed | Add production security boundary. | replace | Session/owner/tenant, denied paths, audit. | `03-phases/06-interaction-history-admin.md` | Security boundary e2e. |
| config.env-runtime | mapped note: source path `.env.example:1`-`16`; `backend/app/config.py:30`-`64` | Env/config names and fail-closed providers. | preserve | Config status, redaction, secret scan. | `03-phases/06-interaction-history-admin.md` | Secret scan/config tests. |
| deployment.local-docker | mapped note: source path `README.md:94`-`177` | Local/Docker build and run posture. | preserve | Build/run/health/readiness/CI. | `03-phases/06-interaction-history-admin.md` | Build/run/health proof. |

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write downstream runtime artifact `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

- Assumption: production implementation adds auth/session/ownership even though source appears local/public. Evidence: source path `backend/app/config.py:23`-`25` and no auth routes observed. Risk: unauthorized data/destructive actions. Blocks phase work: no, but blocks production readiness.
- Assumption: durable database/object storage replaces file-only persistence. Evidence: source path `backend/app/models/project.py:101`-`303`. Risk: migration design needed. Blocks phase work: no.
- Assumption: missing LLM/Zep credentials block live proof only. Evidence: source path `.env.example:1`-`16`. Risk: provider behavior remains unqualified. Blocks phase work: no.
- Assumption: OASIS runtime may require local/container environment. Evidence: source path `backend/app/services/simulation_runner.py:416`-`448`. Risk: subprocess proof may be blocked. Blocks phase work: no.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to create implementation-project `AGENTS.md` and downstream runtime artifact `.buildprint/setup.md` without inventing architecture.

Initial phase set:

- `03-phases/01-intake-ontology.md`
- `03-phases/02-graph-memory.md`
- `03-phases/03-simulation-prep.md`
- `03-phases/04-simulation-runtime.md`
- `03-phases/05-report-agent.md`
- `03-phases/06-interaction-history-admin.md`
