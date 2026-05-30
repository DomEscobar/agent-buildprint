# Project Setup

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers authorize AI best-fit decisions grounded in mapped obligations.
- Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Full-suite packets default to production-grade architecture, not a local MVP.
- Do not downgrade to a local MVP unless the selected scope explicitly says prototype-only.
- `PRODUCT.md` is optional by default. Require it only for large, complex, full-suite, or product-contract-heavy packets; otherwise keep the product contract compact in `BUILDPRINT.md`, this file, and phase-local checks.
- Setup tier must be explicit: `compact_setup` for small/single-phase packets; `full_setup` for this provider-backed, UI-bearing, stateful, runtime-heavy packet.

# Project Setup

## Blueprint Classification

blueprint_mode.primary: mixed
blueprint_mode.secondary: [product, data-pipeline, automation, integration]
phase_style: mixed_contract
qualification_status: PROOF_REQUIRED

This is a UI-bearing, provider-backed, stateful, runtime-heavy product packet. Treat the canvas webapp as first-class scope.

## Foundation Scaffold Gate

Before Phase 01, create the real implementation project structure. It must include:

- Root AGENTS.md that names this Buildprint as scope authority and requires agents to read .buildprint/setup.md, architecture.md, engineering-standards.md, test-strategy.md, ui-identity.md, 03-phases/phase-flow.md, and the active phase before editing code.
- .buildprint/setup.md with chosen stack, provider mode, storage mode, env vars, local run commands, and unanswered question defaults.
- architecture.md with Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map.
- engineering-standards.md with Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards.
- test-strategy.md with unit, contract, browser, worker/runtime, provider-adapter, persistence, security, and regression proof plans.
- ui-identity.md with visual identity, interaction principles, layout standards, empty/loading/error/blocked/success states, responsive behavior, screenshot critique workflow, and MiroFish-specific anti-generic failure patterns.

The implementation may use any stack that can satisfy the contract. It must support a browser-rendered graph canvas, API routes, durable state, background jobs, provider adapters, streaming/polling logs, and runtime process control.

## Architecture Decisions

- Webapp shell: single-page or routed browser app with Home, Process/Workbench, Simulation Setup, Simulation Run, Report, Interaction, and History surfaces.
- Graph canvas: interactive force-directed graph or equivalent canvas/SVG surface with zoom, drag, selection, node/edge details, legend, refresh, loading, empty, and error states.
- API boundary: typed request/response contracts for graph, simulation, report, interaction, history, and destructive controls.
- Persistence: durable project metadata, upload metadata, extracted text pointers, graph ids, job state, simulation state, report state, action streams, logs, and audit events. File/object storage may hold bulky documents, generated reports, and JSONL logs.
- Providers: OpenAI-compatible LLM adapter, graph memory adapter, and simulation runtime adapter. Provider adapters require sandbox/live split, retry/error mapping, timeout, and fake-provider proof that cannot be counted as live proof.
- Runtime: worker/job runner for ontology, graph build, profile/config generation, simulation start/stop, graph memory updates, report generation, and interviews. Every long-running job needs cancel/timeout/recovery behavior.
- Security posture: upload type/size validation, secret redaction, auth/roles for destructive controls, idempotent stop/close/delete, audit logs, and public deployment hardening.

## Mapped Obligation/Surface Matrix

| surface id | source evidence | Mapped obligation | target disposition | target contract | owning phase | required proof |
|---|---|---|---|---|---|---|
| upload_prompt_intake | Home upload and prompt views | Upload seed files and collect prediction requirement before workbench entry | preserve | Validated file picker/dropzone, prompt input, pending upload handoff, blocked empty states | 01-webapp-intake-graph-canvas | repeatable_browser_e2e |
| route_spine | frontend router configuration | Preserve multi-screen workflow routes | preserve | Home, Workbench, Simulation, Run, Report, Interaction, History reachable by durable ids | 01-webapp-intake-graph-canvas | route_contract_test |
| graph_build_pipeline | graph APIs and pipeline | Extract text, generate ontology, build graph memory, expose task status | preserve | Durable project + job state, provider adapter config test, status polling | 01-webapp-intake-graph-canvas | provider_adapter_config_test_required |
| graph_canvas_workbench | MainView layout and GraphPanel canvas | Keep canvas and graph/split/workbench UI | preserve | Zoom/drag/select/detail/legend/refresh plus responsive layout | 01-webapp-intake-graph-canvas | browser_runtime_trace and screenshot critique |
| simulation_create | simulation APIs and step 1 view | Create simulation only from completed project graph | preserve | Requires project_id + graph_id; returns simulation_id; records state | 02-simulation-environment-config | contract and persistence_roundtrip |
| profile_config_generation | Step 2 preparation view and manager | Generate agent profiles and simulation config | preserve | dataflow from graph entities to profiles/config with progress, schema, lineage, data quality checks | 02-simulation-environment-config | data_quality_test and provider blocker |
| dual_platform_runtime | Step 3 run view and runner | Start/stop dual-platform simulation and stream status/actions | preserve | task loop, plan-execute-observe trace, stop condition, cancellation, action timelines | 03-dual-platform-runtime | worker_retry_cancel_recovery |
| graph_memory_update | Zep graph memory updater service | Update graph memory from simulation actions when enabled | preserve | queued graph updates with retry, idempotency, and provider proof blocker | 03-dual-platform-runtime | live_provider_proof_blocker_only |
| report_generation | report generation API and Step 4 view | Generate report and stream logs/sections | preserve | background report agent with timeline logs, section progress, retrieval/download | 04-report-agent-timeline | report_generation_contract_test |
| deep_interaction_console | interaction view and Zep tools | Chat with report agent, select agents, run interviews/surveys | preserve | live provider and simulation-env checks, result attribution, failure states | 05-deep-interaction-console | live_provider_proof_blocker_only |
| history_restore | history views and simulation persistence | Reopen historical simulations/reports | preserve | list, detail, route restoration, report linkage | 05-deep-interaction-console | persistence_roundtrip |
| destructive_controls | API destructive controls and reset operations | Delete/reset/stop/close operations | preserve with hardening | auth, confirmation, idempotency, audit, retention/rollback where possible | all phases | security_boundary_review |

## Production Readiness

The packet is not production-ready by itself. The implementation becomes production-ready only after browser proof, provider proof or explicit blockers, persistence roundtrips, security review, runtime recovery tests, and no-fake review all pass.

## Phase Start Gate

After scaffold creation, open 03-phases/phase-index.yaml and execute the active phase through 03-phases/phase-flow.md. Do not append runtime evidence before phase plan.md and proof.md exist.


## Product / capability shape

- Blueprint mode:
  - Primary: mixed
  - Secondary: ui/api/worker/provider/data/deployment
  - Phase style: mixed_contract
  - Why this mode fits: MiroFish combines product browser flows, data-pipeline graph/report generation, automation runtime loops, and integration/provider boundaries.
- Product / capability: MiroFish canvas simulation workbench
- For product / mixed: Primary user jobs are seed upload, graph canvas workbench, simulation setup/runtime, report generation, and post-report interaction.
- External providers/runtime: OpenAI-compatible LLM boundary, graph memory provider boundary, async simulation/report workers, durable storage.
- Proof source: derive from `04-evaluation.md` and each active phase proof gate.
- Setup tier: full_setup
- Optional product contract: none; compact contract lives in `BUILDPRINT.md`, this file, and phase-local checks.


## Architecture decisions

Record concrete decisions the implementation project must follow:

- Framework/runtime:
  - Decision: production-capable browser app plus API/runtime service.
  - Why this fits: preserves graph canvas, async simulation, report generation, and interaction surfaces.
- Package/build system:
  - Decision: use scripts for test/build/e2e/no-fake verification.
  - Why this fits: prevents prose-only completion.
- Module topology:
  - Decision: name frontend, API/controller, service/domain, provider adapter, repository/store, worker/runtime, security, and test boundaries.
  - Why this prevents local-MVP collapse: phase work must extend long-lived boundaries rather than single-file demos.
- Data/storage:
  - Decision: durable project, graph, simulation, report, interaction, and artifact storage.
  - Restart/readback requirement: required before persistence claims upgrade.
- Auth/providers/deployment:
  - Decision: private authenticated by default; missing credentials become blockers only after adapters/config/tests exist.
  - Live-proof blockers: provider credentials and deployment authorization.


## Mapped obligation/surface matrix

| Surface id | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
| upload_prompt_intake | mapped note: MiroFish upload/prediction workflow | Upload seed files and prediction requirement into a real project/workbench entry | preserve | UI -> API -> persistence -> graph build entry | `03-phases/01-webapp-intake-graph-canvas.md` | proof-browser-runtime-trace |
| graph_canvas_workbench | mapped note: graph API and graph canvas workflow | Build, display, poll, inspect, and delete graph memory through product UI | preserve | graph provider adapter plus durable local state | `03-phases/01-webapp-intake-graph-canvas.md` | proof-persistence-roundtrip |
| env_setup_profiles_config | mapped note: simulation environment setup | Convert graph entities into simulation profiles/config with bounded options | preserve | dataflow with validation and provider fake tests | `03-phases/02-simulation-environment-config.md` | proof-dataflow-quality |
| dual_platform_simulation_runtime | mapped note: simulation runtime workflow | Run, observe, stop, recover, and record dual-platform simulation actions | preserve | task loop with worker/runtime ownership | `03-phases/03-dual-platform-runtime.md` | proof-automation-trace |
| report_agent_timeline | mapped note: report API/report agent workflow | Generate reports, stream logs/sections, retrieve/download/delete artifacts | preserve | provider/report boundary with artifact readback | `03-phases/04-report-agent-timeline.md` | proof-report-artifact-readback |
| deep_interaction_console | mapped note: interaction views | Chat with report/simulated agents and inspect responses tied to simulation state | preserve | UI/API/provider interaction contract | `03-phases/05-deep-interaction-console.md` | proof-browser-runtime-trace |
| history_restore | mapped note: history/database surface | Reopen prior simulations and reports with durable workflow trail | preserve | persistence/readback contract | `03-phases/05-deep-interaction-console.md` | proof-persistence-roundtrip |
| provider_persistence_operability | mapped note: provider/storage/runtime posture | Distinguish local artifacts, live provider credentials, runtime processes, destructive actions, and deployment readiness | blocked until live credentials/deployment authorization | provider/storage/runtime proof ceiling | external_blocker | proof-provider-live-deployment-blocker |


## Implementation project setup

The Buildprint packet must not contain implementation-project files such as `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `ui-identity.md`, or `proof-strategy.md`. The implementation project must create them inside the real project root after this file is resolved and before Phase 01 starts.

## Foundation scaffold gate

Before any `03-phases/*` implementation starts, create the selected stack's real base project structure and local guidance files. Required implementation-project files for `full_setup`:

- Root `AGENTS.md`: short scope governor with mandatory reads for `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` when UI-bearing.
- `architecture.md`: Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map.
- `engineering-standards.md`: Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards.
- `ui-identity.md`: product-specific graph/simulation/report visual identity and generic-dashboard failure criteria.
- `proof-strategy.md`: commands proving each phase-owned surface and blocker/claim ceilings.
- `.buildprint/setup.md` or `.buildprint/setup/`: selected stack, architecture, auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.

### Runnable verification gate (required scripts)

The scaffold must include executable verification the agent cannot satisfy with prose alone:

| Script | Purpose | Must fail when |
|---|---|---|
| `verify:no-fake` | Scan implementation source for placeholder/stub/dead-control/mock-only promotion paths | Dead controls, no-op callbacks, static-shell signatures, or fake success states are present |
| `verify:phase-artifacts` | Given `PHASE_ID`, verify every path cited in `.buildprint/phase-runs/PHASE_ID/evidence.json` exists and phase UI artifacts are fresh | Cited screenshot/trace/log is missing or reused as primary proof from another phase |

Rules: scripts exit non-zero on violation; before appending runtime evidence run `verify:no-fake` and `verify:phase-artifacts`; save output to `.buildprint/phase-runs/PHASE_ID/proof.md` or `.buildprint/phase-runs/PHASE_ID/verify-output.txt`.


## Open assumptions

- Assumption: private authenticated deployment by default.
- Evidence: mapped product handles uploads, provider credentials, generated artifacts, and destructive actions.
- Risk: public deployment without hardening would leak data or create unsafe actions.
- Blocks phase work: no; blocks public/live/deployment claim upgrades.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to create implementation-project `AGENTS.md` and `.buildprint/setup.md` without inventing architecture. Phase entry remains governed by `03-phases/phase-flow.md`.

Initial phase set:

- Packet file `03-phases/01-webapp-intake-graph-canvas.md`
