# Phase 05 - Report Generation And Deep Interaction

## How to implement this phase

Before writing code, read: packet file `03-phases/phase-flow.md`, runtime continuity file `.buildprint/next-agent.md`, and current project `AGENTS.md`. Then resolve requires_roles through `06-contracts/<role>.md`, create phase-flow required artifacts, and block runtime evidence until plan, team-gates, handoffs, returns, reviews, and proof exist.

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence]

## Product outcome

A user can generate a prediction report from a completed simulation, watch report progress and sections stream in, inspect report-agent tool calls and console logs, download/export the report, then use deep interaction to chat with the report agent or interview simulated agents when the environment is alive.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this outcome flow turns simulation results into readable analysis and interactive inquiry.
- Shared proof spine:
  - Preconditions/inputs: Phase 04 simulation exists with graph id, run artifacts, and project requirement.
  - Entrypoint/use site: user starts report generation or opens an existing report.
  - Execution behavior: create report task, run ReportAgent with graph/simulation tools, persist sections/logs, expose progress, handle chat/interview.
  - State/artifact effects: report id, status, outline, sections, markdown/export, progress, agent log, console log, chat transcript, sources/tool calls.
  - Observable proof: report generation trace, section/read/download APIs, browser report reader, chat/interview path, redacted logs.
  - Failure/recovery: missing graph/simulation/requirement, provider blocked, report already exists, report failed, env not alive for interview, timeout, denied access.
  - Non-goals: changing simulation results or running new simulations.

## Mapped product obligations

- Preserve async report generation and existing-report reuse.
- Preserve report get/list/download/delete, progress, section streaming, agent log, console log, tool debug/search/statistics where retained.
- Preserve ReportAgent chat with graph/simulation tools and simulation-agent interview path via runtime IPC.
- Missing live provider or live environment blocks live proof only after adapter/config/test/runtime wiring exists.

## Behavior compatibility contract

- preserve: report generation/status/progress/sections/download/delete, agent/console logs, report-agent chat, interview unlock and env checks.
- replace: report storage format, exact section schema, tool registry internals, and chat UI may change when equivalent target behavior and compatibility impact are explicit.
- merge: report reader and deep interaction may share one analysis workspace if report export, logs, chat, and interview remain distinct states.
- defer: none for full-suite selected scope; remaining gaps must be blockers, not hidden omissions.
- drop: raw unredacted provider/tool logs in user-visible report are forbidden.

## Implementation scope

Implement report task worker, ReportAgent adapter with deterministic/fake and live provider modes, graph/simulation tool services, report store, progress/section/log APIs, download/export, report reader UI, agent log viewer, console log viewer, chat UI, interview UI, env-alive checks, transcript/source/tool-call rendering, blocked-provider/runtime states, and delete/export controls.

## Interfaces touched

- API/controller contracts: report generate/status/get/list/by-simulation/download/delete/progress/sections/agent-log/console-log/chat/tools.
- Provider/tool/runtime contracts: LLM report adapter, graph search/statistics tools, simulation context tools, interview IPC.
- UI/controller contracts: report generation panel, section reader, logs, download/delete, chat target selection, transcript, tool/source display.
- Resolve required roles through `06-contracts/<role>.md`; write handoff and return artifacts before phase_core_passed.

## State/runtime touched

- Durable state: reports, outlines, sections, markdown/export, progress, agent logs, console logs, chat transcripts, tool-call sources, report delete state.
- Runtime artifact paths for report markdown/export files, `agent_log.jsonl`, `console_log.txt`, downloaded reports, chat/interview traces are implementation runtime artifacts.
- Runtime state: report generation worker, provider calls, tool invocations, log streaming, interview IPC timeout.
- Upstream inputs: simulation run artifacts and graph memory are read-only. This phase owns final user-facing analysis and interaction.

## UX/UI requirements

This phase is UI-bearing. The report and interaction surface must feel like an analysis console/report reader, not a static Markdown dump or generic chat. Required states: report absent, generating, section partial, completed, failed, already generated, download ready, delete confirmation, log streaming, chat empty, chat loading, tool-call visible, sources visible, env not alive, interview timeout, provider blocked, mobile/desktop. Screenshot critique must reject raw text-list substitutes for report/tools, default chat boxes disconnected from state, generic dashboard cards, and local MVP report pages.

## Safety/security constraints

Owner/session checks guard reports/logs/download/chat/interview/delete; provider secrets stay server-side; uploaded content and simulation-private data must be redacted from logs/evidence; report delete requires confirmation; chat/interview tools must not execute arbitrary commands or expose unapproved external data; evidence must avoid raw private report content unless approved.

## Quality gates

Required: unit tests for report schema/store/tool registry/chat validation; fake-provider report generation integration test; API tests for report lifecycle, progress, sections, logs, download, delete, chat, env-not-alive, missing graph/simulation; browser/e2e for report generation/read/download/chat; no_fake_scan_pass; redaction checks.

## Proof gate

Proof id: proof-05-report-and-interaction

Runtime evidence must use `phase_id: 05-report-and-interaction` and append only to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`; packet file `05-evidence/evidence-ledger.jsonl` remains seed-only.

Core tracks: provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, persistence_roundtrip, security_denied_path_test, repeatable_browser_e2e, visual_quality_gate, no_fake_scan_pass.

## Repair routing

If verification fails, route back to the current phase before editing again.

- Current phase: report/chat/interview/API/UI/log/export/evidence failures.
- Packet file `02-project-setup.md`: missing report persistence, provider, runtime, or security boundary.
- Packet file `01-questions.md`: paid live-provider proof, export policy, or privacy fork.
- Required prior phase: `04-simulation-run-observability` if simulation artifacts or env status are missing.
- Runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`: live LLM, live env, browser tooling, or deployment blocker.
