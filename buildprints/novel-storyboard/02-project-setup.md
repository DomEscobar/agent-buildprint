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
