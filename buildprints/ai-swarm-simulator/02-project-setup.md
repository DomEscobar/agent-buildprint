# Project Setup

This packet file is the project constitution for implementation. Keep it compact. It contains mode-specific decisions an agent needs before phase work, while packet files `BUILDPRINT.md`, `03-phases/phase-flow.md`, `04-evaluation.md`, and role contracts under packet directory `06-contracts/` own execution protocol.

## Setup defaults

- Human answers come from packet file `01-questions.md`.
- Blank answers authorize AI best-fit decisions grounded in mapped obligations.
- Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- This full-suite packet defaults to production-grade architecture, not a local MVP.
- Do not downgrade to a local MVP unless the selected scope explicitly says prototype-only.
- Missing credentials block only live proof. They do not remove provider adapters, config contracts, deterministic test doubles, sandbox/fake-provider tests, blocked-provider UX/API states, or runtime wiring.

## Product / capability shape

- Blueprint mode:
  - Primary: product
  - Secondary: ui, api, worker, provider, data, deployment
  - Phase style: outcome_flow
  - Why this mode fits: source path `README.md` lines 27-33 define a user-facing AI prediction engine where seed uploads and natural-language requirements produce a prediction report plus interactive simulated world. Source path `README.md` lines 86-92 define five product workflow steps.
- Product / capability: MiroFish Swarm Prediction Workbench.
- For product / mixed: Primary user jobs are seed intake, ontology preview, GraphRAG memory build, simulation environment preparation, dual-platform simulation, report generation, and deep interaction with report/agent perspectives.
- Frontend/UI surfaces: landing intake console, workflow workbench, graph explorer, simulation preparation panel, simulation run dashboard, report reader, interaction chat, history database, language switcher, and blocked/error/progress states.
- Backend/API surfaces: project lifecycle, ontology generation, graph build/status/data/delete, entity lookup, simulation create/prepare/status/profile/config/start/stop/run-status/actions/timeline/posts/comments/interview/env-close, report generate/status/sections/download/chat/log/tool endpoints.
- State/runtime surfaces: project metadata, uploaded files, extracted text, ontology JSON, Zep graph id, in-memory task progress, simulation state, profiles, simulation config, run state, OASIS action logs, SQLite simulation DBs, report folders, report progress, agent logs, console logs, IPC command/response artifacts.
- External providers/runtime: OpenAI-compatible LLM, Zep Cloud graph memory, OASIS social simulation runtime, filesystem/object storage, worker/queue runtime, browser runtime.
- Proof source: derive from packet file `04-evaluation.md` and each active phase proof gate.

## Architecture decisions

Record concrete decisions the implementation project must follow:

- Framework/runtime:
  - Decision: implement as a modular browser workbench plus API service plus worker/runtime processes. Concrete framework choices are replaceable implementation details.
  - Why this fits: the mapped product has long-running provider and simulation jobs, graph visualization, report logs, and chat interactions that need separated UI/controller, domain, provider, persistence, worker, and proof boundaries.
- Package/build system:
  - Decision: use one repository with frontend, API, worker/runtime, shared contracts, tests, e2e, infra, and scripts. CI must run typecheck/lint/unit/integration/build/e2e gates with deterministic exits.
  - Why this fits: source path `package.json` lines 5-12 exposes root setup/dev/build scripts for coordinated frontend/backend operation.
- Module topology:
  - Decision: name frontend/UI, API/controller, application service, domain model, schema/validation, provider adapter, repository/store, worker/runtime, security, observability, and test boundaries. Routes/controllers may not hold product logic directly.
  - Why this prevents local-MVP collapse: every phase must prove a real vertical path through UI or API into domain, persistence/provider/runtime, readback, negative cases, and evidence.
- Data/storage:
  - Decision: durable database for projects/simulations/reports/tasks plus object/file storage for uploaded documents and runtime artifacts. Local files may be used only behind repository/storage adapters with schema/version ownership, restart/readback proof, retention, export, delete/reset, and backup plan.
  - Restart/readback requirement: every phase-owned state write must be readable after process restart or produce a non-upgrading blocker.
- Auth/providers/deployment:
  - Decision: implement local owner/session boundary first, with upgrade path to authenticated private deployment. Provider keys remain server-side env/config values. Deployment must expose health/readiness, logs, metrics/tracing, and rate/request-size controls.
  - Live-proof blockers: LLM, Zep, and OASIS live behavior require credentials/runtime approval; missing access blocks only live proof after adapter/config/test/runtime wiring exists.

## Production readiness contract

Complete these decisions before phase work. Missing credentials block only live proof after implementation includes adapters, config contracts, tests, and runtime wiring. Paid-service approval or deployment authorization can also block only the matching live/deployment proof track after the local boundary exists.

- Auth/session/tenant boundary: define owner/session for projects, uploaded seed files, simulations, reports, chat history, report exports, destructive delete/reset/stop/close actions, provider config status, and cross-owner denied-path tests. If deployed publicly, require authentication before user data exists.
- Provider integration contract: define LLM, Zep, and OASIS adapters, env/config names only, request/response/error contracts, deterministic test doubles, sandbox/live mode disclosure, fake-provider tests, blocked-provider UI/API state, and live-proof blocker rows.
- Durable persistence contract: define schema ownership for projects, uploaded files, extracted text, ontology, graph id, task/job state, simulation state, profiles, configs, run state, actions/timeline/posts/comments, reports, report sections, logs, chat transcripts, migrations, restart/readback proof, backup/export/delete semantics, retention, quotas, and sensitive data handling.
- Worker/runtime contract: define queues/jobs for ontology generation when long-running, graph build, simulation prepare, simulation run, report generation, progress, retries, cancellation, timeout behavior, failure recovery, idempotency, and dead-letter or repair handling.
- Deployment and operations contract: define local dev, production build/run command, container or hosting shape, health/readiness checks, structured logging, metrics/tracing, rate/request-size limits, upload limits, provider redaction, graceful shutdown, and CI gates.
- Browser/e2e contract: define repeatable browser flows for seed intake, ontology preview, graph build status, graph explorer, simulation setup, simulation run dashboard, report generation, report reader, chat/interview, history, errors, provider-blocked states, responsive layouts, and destructive confirmations.
- Screenshot critique: UI/browser proof must inspect visual hierarchy, responsive behavior, accessibility, domain-fit graph/simulation/report affordances, and local-MVP risk. Screenshots support evidence but do not replace automated e2e coverage.

## Experience quality contract

- UI architecture: this packet is UI-bearing. Define a real frontend/UI boundary; a full-suite browser product cannot pass as one server file, embedded HTML/CSS/JS, static shell, or disconnected demo.
- Product composition: implement a first-viewport workbench with a workflow rail, graph/canvas surface, inspector/detail panels, upload/progress controls, simulation timeline/dashboard, report reader, history, and chat/interview surface. Do not lead with a marketing hero once inside the product workbench.
- Domain-specific affordances: graph nodes/edges need selection, legends, filters, details, loading/progress, and refresh; simulation needs run controls, platform split, action feed, timeline, progress, stop/close states, and graph-memory update signals; reports need section streaming, agent/tool logs, export/download, and source/tool-call disclosure; chat needs target selection, transcript, tool status, blocked runtime state, and recovery.
- Visual system: define typography, spacing, color, density, surface hierarchy, focus/disabled states, alerts, bilingual text fit, desktop/mobile behavior, and a domain-specific identity. Avoid generic SaaS card grids, default browser controls, raw text-list substitutes, one-note palettes, and local MVP screenshots.
- State quality: every major surface needs empty, loading, running, progress, error, blocked-provider, partial-data, success, retry, cancellation, destructive-confirmation, deleted/stopped, and recovery states with stable layout or mode-equivalent states.
- Screenshot critique: screenshots must reject quick local MVP, admin form, generic dashboard, raw list standing in for graph/timeline/report/chat, default browser-control pages, overlapping text, clipped controls, and missing mobile/desktop states.

## Mapped contract anchors

- Route/API/job prefixes and handlers: source path `backend/app/api/graph.py` lines 36-122 and 260-622; source path `backend/app/api/simulation.py` lines 48-240, 359-760, 1377-1705, 1705-2143, 2142-2695; source path `backend/app/api/report.py` lines 25-203, 472-620, 707-940.
- Request/response payloads and validation errors: multipart seed upload plus `simulation_requirement`; graph build `project_id`, `graph_name`, chunks; simulation `project_id`, `graph_id`, platform flags, prepare options, start/stop, interview prompt; report `simulation_id`, `force_regenerate`, chat history.
- Provider/runtime boundaries and env var names only: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, `LLM_BOOST_API_KEY`, `LLM_BOOST_BASE_URL`, `LLM_BOOST_MODEL_NAME`, `ZEP_API_KEY`, OASIS action/platform config, upload limits.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: runtime artifacts `project.json`, `extracted_text.txt`, uploaded seed files, `state.json`, `reddit_profiles.json`, `twitter_profiles.csv`, `simulation_config.json`, runtime artifact `run_state.json`, runtime artifact `actions.jsonl`, runtime artifact `simulation.log`, SQLite simulation DBs, report Markdown/sections/logs, IPC command/response files, report download artifacts.
- UI flow/state anchors: source path `README.md` lines 86-92; source path `frontend/src/router/index.js` lines 9-44; source path `frontend/src/views/Home.vue` lines 127-203; source path `frontend/src/views/MainView.vue` lines 39-75 and 185-253; source path `frontend/src/components/GraphPanel.vue` lines 17-235.

## Mapped obligation/surface matrix

Account for every high-signal mapped surface according to blueprint mode: product flows, user-facing routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements. This matrix is not route/function parity. The target may replace or merge source routes when equivalent target behavior and compatibility impact are explicit. No mapped surface may disappear silently. Every high-signal mapped surface must appear exactly once with one owning phase or be marked blocked/dropped with rationale. Required proof must not be generic phrases like tests pass, app builds, or feature preserved. Target disposition values are exactly: preserve | replace | merge | defer | drop | blocked.

| Surface id | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
| docs.workflow | source path `README.md` lines 27-33 and 86-92 | Five-step prediction workflow from seed upload to graph, simulation, report, and interaction | preserve | Build as outcome-flow product suite, not static docs | `03-phases/01-seed-ontology-workbench.md` with later phases | Browser path starts at upload and later phases unlock sequentially |
| ui.home-upload | source path `frontend/src/views/Home.vue` lines 127-203 | Landing console accepts seed files and prediction prompt, disables submit until both exist | replace | Workbench-grade intake with drag/drop, selected-file review, validation, loading, error, and next-action states | `03-phases/01-seed-ontology-workbench.md` | repeatable_browser_e2e upload -> ontology request plus visual_quality_gate |
| api.ontology | source path `backend/app/api/graph.py` lines 122-255 | Multipart upload validates files and requirement, extracts text, calls LLM ontology generator, persists project | preserve | API/controller -> validation -> extraction -> LLM adapter -> durable project readback | `03-phases/01-seed-ontology-workbench.md` | provider_adapter_config_test_required, persistence_roundtrip, invalid upload tests |
| state.project-files | source path `backend/app/models/project.py` lines 101-304 | Project metadata, uploaded files, extracted text, ontology, graph id, delete/reset | replace | Durable DB/object storage with owner/session, retention, reset/delete confirmation, restart/readback | `03-phases/01-seed-ontology-workbench.md` | restart/readback, delete/reset denied-path, migration_retention_backup_upload_limits |
| api.graph-build | source path `backend/app/api/graph.py` lines 260-522 | Build Zep GraphRAG from extracted text chunks and ontology with async progress | preserve | Worker job with Zep adapter, chunking, progress, retry/error mapping, graph id persistence | `03-phases/02-graph-memory-build.md` | worker_retry_cancel_recovery, Zep fake/sandbox proof, graph readback |
| api.graph-data | source path `backend/app/api/graph.py` lines 534-622 | Task status, graph data retrieval, graph delete | preserve | Status/read/delete APIs with owner checks, blocked-provider states, and graph data contract | `03-phases/02-graph-memory-build.md` | API trace for status/data/delete and security_denied_path_test |
| ui.graph-panel | source path `frontend/src/components/GraphPanel.vue` lines 17-235 | Interactive graph visualization with refresh, maximize, legend, edge label toggle, node/edge detail | replace | Product-grade graph explorer with D3/canvas equivalent, detail inspector, responsive states | `03-phases/02-graph-memory-build.md` | repeatable_browser_e2e graph selection plus screenshot critique |
| api.entities | source path `backend/app/api/simulation.py` lines 48-162 | Read filtered graph entities and details from graph memory | merge | Entity browsing supports simulation setup and graph inspector | `03-phases/02-graph-memory-build.md` | entity list/detail API tests with blocked Zep config path |
| api.sim-create | source path `backend/app/api/simulation.py` lines 165-240 | Create simulation from project/graph with platform flags | preserve | Simulation state created only after graph exists; project ownership enforced | `03-phases/03-simulation-environment.md` | API create tests, missing graph tests, persistence_roundtrip |
| api.sim-prepare | source path `backend/app/api/simulation.py` lines 359-760 | Prepare environment asynchronously: read entities, generate profiles, generate config, save files | preserve | Worker with progress detail, idempotent prepared check, force regenerate, profile/config artifacts | `03-phases/03-simulation-environment.md` | worker_retry_cancel_recovery, runtime artifact readback, provider blocker rows |
| state.sim-artifacts | source path `backend/app/services/simulation_manager.py` lines 230-527 | Persist simulation state, profiles, config, script commands under simulation runtime dir | replace | Durable simulation store with generated output classification, restart/readback, retention/export/delete | `03-phases/03-simulation-environment.md` | migration_retention_backup_upload_limits and artifact readback |
| api.sim-start-stop | source path `backend/app/api/simulation.py` lines 1451-1705 | Start and stop OASIS simulation with platform/memory settings | preserve | Runtime launches approved local/sandbox process, exposes status, stop, close, timeout, and logs | `03-phases/04-simulation-run-observability.md` | worker_retry_cancel_recovery, process lifecycle tests, live-proof blocker only |
| api.sim-observe | source path `backend/app/api/simulation.py` lines 1705-2138 | Run status, detailed actions, timeline, agent stats, posts, comments | preserve | Observable simulation dashboard APIs backed by logs/DBs and stable pagination/filtering | `03-phases/04-simulation-run-observability.md` | runtime_or_browser_trace and persistence/readback for action/log/DB paths |
| runtime.ipc | source path `backend/app/services/simulation_ipc.py` lines 25-392 | IPC command/response protocol for interview and close-env | preserve | Runtime command queue with timeout, response status, failure, cleanup, and env health | `03-phases/04-simulation-run-observability.md` | IPC trace with timeout/failure and close-env proof |
| ui.simulation | source path `frontend/src/views/SimulationView.vue` lines 38-63 and 180-240 | Simulation setup view closes/forces running env when returning, shows status and graph context | replace | Control-room UI with graph sidecar, platform/config panels, logs, blocked states, stop/close actions | `03-phases/03-simulation-environment.md` | browser setup path plus destructive/close confirmation tests |
| api.report-generate | source path `backend/app/api/report.py` lines 25-203 | Generate report asynchronously with ReportAgent and progress | preserve | Worker-backed report generation with section streaming, logs, provider adapters, report persistence | `03-phases/05-report-and-interaction.md` | report generation trace, agent log readback, provider_adapter_config_test_required |
| api.report-reader | source path `backend/app/api/report.py` lines 277-472 and 569-940 | Report get/list/download/delete, progress, sections, agent/console logs, tool debug endpoints | preserve | Report reader and export APIs with retention/delete, redacted logs, and tool-call transparency | `03-phases/05-report-and-interaction.md` | report section/read/download/delete tests and no_fake_scan_pass |
| api.chat-interview | source path `backend/app/api/report.py` lines 472-564 and source path `backend/app/api/simulation.py` lines 2142-2584 | Chat with ReportAgent and interview simulation agents via IPC | preserve | Chat/interview surface with target selection, transcript, env-alive checks, timeout, provider-blocked states | `03-phases/05-report-and-interaction.md` | browser chat/interview e2e, IPC/provider blocker proof |
| i18n.copy | source path `locales/en.json` lines 35-620 and source path `locales/zh.json` lines 35-620 | Bilingual user-facing workflow, API messages, logs, report copy | preserve | Locale-ready UI/API copy with text-fit, fallback, and no hardcoded English-only core states | all phases | Locale switch/e2e smoke and visual text-fit screenshots |
| deployment.runtime | source path `README.md` lines 94-177, source path `Dockerfile`, source path `docker-compose.yml`, source path `.env.example` lines 1-16 | Local source and container deployment with required LLM/Zep env names | preserve | Setup docs, env validation, container health/readiness, redacted config status | all phases | production build/run, health/readiness, env redaction proof |

## Implementation project setup

The Buildprint packet must not contain implementation-project files such as `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `ui-identity.md`, or `proof-strategy.md`. The implementation project must create them inside the real project root after this file is resolved and before Phase 01 starts.

Root `AGENTS.md` or implementation-project `AGENTS.md` must be a short scope governor with project shape, current phase rule, safety rules, local instruction map, and mandatory reads. It must explicitly require coding agents to read and follow `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` before editing code.

Local `AGENTS.md` files may exist only at real architectural boundaries such as frontend/app, API, provider adapters, workers, data/db, infra, or proof/e2e. Each local file must point back to the root `AGENTS.md` and relevant sections of the implementation-project guidance files.

## Foundation scaffold gate

Before any packet phase file `03-phases/*` implementation starts, create the selected stack's real base project structure and local guidance files. This is a required setup gate, not optional documentation. The scaffold must be concrete enough that Phase 01 adds the first vertical slice inside long-lived boundaries instead of inventing a standalone mini-app.

Required implementation-project files:

- Root `AGENTS.md`: short scope governor with project shape, current phase rule, safety rules, local instruction map, and mandatory reads. It must explicitly require coding agents to read and follow `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` before editing code. If these files are missing or contradicted, agents must stop and repair setup rather than continue.
- `architecture.md`: architecture best practices for this project, including `Architecture principles`, `Base project structure`, `Boundary map`, `Dependency rules`, `Architecture decisions`, and `Downstream phase extension map`. It must name UI, API/controller, domain/use-case, schema/validation, config/env, provider adapter, persistence/repository, worker/runtime, observability, deployment, and test boundaries.
- `engineering-standards.md`: clean coding and implementation standards, including `Clean code rules`, `Validation and schemas`, `Persistence standards`, `Provider standards`, `Worker/runtime standards`, `UI standards`, and `Test standards`. It must define deterministic timeout/exit behavior for blocked browser/e2e/runtime proof.
- `ui-identity.md`: required because this is UI-bearing. It defines product-specific visual identity, interaction principles, layout standards, empty/loading/error/blocked/success states, responsive behavior, and what would count as a generic dashboard/form/raw-list failure for this product.
- `proof-strategy.md`: proof plan for unit, integration, browser/e2e, provider, worker/runtime, security, persistence, and deployment checks. It must state which blockers do not upgrade claims and which commands prove each phase-owned surface.
- Base project directories/files for the chosen stack, including app/source directories, tests, scripts, config/env boundary, provider adapter boundary, persistence/repository boundary, worker/runtime boundary, observability/logging, and e2e/browser proof boundary.

Runtime setup artifact: before starting packet phase files `03-phases/*`, write runtime artifact `.buildprint/setup.md` or runtime artifacts under `.buildprint/setup/` recording the scaffold, selected stack, architecture decisions, auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions. Creating only `AGENTS.md` is not enough to satisfy the setup gate. Phase entry remains governed by packet file `03-phases/phase-flow.md` and role contracts under packet directory `06-contracts/`.

## Open assumptions

- Assumption: The selected scope is the full MiroFish product workflow rather than one smaller candidate.
  - Evidence: user intent says to remap microfish/MiroFish with the Mapper OS copyAgent prompt.
  - Risk: full-suite implementation is multi-phase and provider-heavy.
  - Blocks phase work: no.
- Assumption: Live LLM, Zep, and OASIS runtime credentials are not available during Buildprint extraction.
  - Evidence: source path `.env.example` lines 1-16 contains only env var names and placeholders.
  - Risk: live proof cannot upgrade until credentials/runtime access exists.
  - Blocks phase work: no, after adapters/proof-fixtures/blockers are implemented.
- Assumption: Auth is not explicit in source but production-grade implementation must include owner/session boundary.
  - Evidence: source project persists project/simulation/report state but no auth surface was observed.
  - Risk: public deployment would be unsafe without auth/session/tenant controls.
  - Blocks phase work: no, Phase 01 must establish owner/session boundary.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to create implementation-project `AGENTS.md` and runtime artifact `.buildprint/setup.md` without inventing architecture.

Initial phase set:

- Packet file `03-phases/01-seed-ontology-workbench.md`
- Packet file `03-phases/02-graph-memory-build.md`
- Packet file `03-phases/03-simulation-environment.md`
- Packet file `03-phases/04-simulation-run-observability.md`
- Packet file `03-phases/05-report-and-interaction.md`
