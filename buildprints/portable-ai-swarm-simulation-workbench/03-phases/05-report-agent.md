# Phase 05 - Report Generation, Export, and Report Chat

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: create the phase-flow required artifacts, resolve every role through `06-contracts/<role>.md`, write handoff and return artifacts for every role, implement, verify, review, write proof, and only then append runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`. The packet seed ledger `05-evidence/evidence-ledger.jsonl` is read-only context.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

A user can generate a report from a completed simulation and graph, monitor report-agent progress and section artifacts, read/list/download/delete reports, and chat with the report agent using deterministic tool-call proof or live LLM proof when credentials are available.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: agent worker, report artifact lifecycle, chat/tool integration, and UI report reader.
- Shared proof spine: simulation/graph -> report agent task -> durable sections/logs/report -> download/delete -> report chat transcript -> UI readback.

## Mapped product obligations

- Own `report.generate`: async report generation through Report Agent with progress.
- Own `report.read-list-download-delete`: report lifecycle, Markdown download, delete confirmation, denied paths.
- Own `report.sections-progress-log`: realtime progress, section polling, single section reads, agent logs.
- Own `report.chat-tools`: report chat with retrieval/tool calls and source reporting.
- Own `ui.report-view`: Step 4 report generation/read UI.

## Behavior compatibility contract

- Target disposition values are preserve for report generation, report lifecycle, section/log progress, chat tools, and report UI.
- Equivalent target behavior preserves report-agent and export capability without route/function parity.
- Compatibility impact: deterministic agent tests prove local agent/tool contract only; live LLM proof requires authorized credentials and redacted artifacts.

## Implementation scope

- Implement report generation worker with progress, sections, logs, errors, retry/failure, and deterministic agent mode.
- Persist report metadata, Markdown, sections, logs, chat transcripts, tool calls, sources, owner/simulation relation.
- Implement get/by-simulation/list/download/delete with confirmation and denied paths.
- Implement report chat using tool/retrieval adapter with deterministic and live modes.
- Build report UI with progress, section reader, logs, download, delete, chat, errors, and completed states.

## Interfaces touched

- Report API/controllers, report worker, report repository/artifact store, LLM/report-agent adapter, retrieval/tool adapter, report UI, owner/session guard.

## State/runtime touched

- Durable report records, section artifacts, logs, Markdown exports, chat/tool transcripts, provider config, progress/errors. Missing live LLM credentials block live proof only after adapter/config/test/runtime wiring exists.

## UX/UI requirements

- UI must be a report reader/workbench with section navigation, progress/log panels, download/delete controls, chat plus source/tool trace, blocked-provider state, responsive layout, and Screenshot critique against `02-project-setup.md`.

## Safety/security constraints

- Owner checks on report read/download/delete/chat, destructive confirmation, secret redaction, report/export privacy review, bounded tool calls, provider error redaction.

## Quality gates

- Async report task/progress tests, deterministic agent test, section/log polling tests, lifecycle tests for read/list/download/delete and denied paths.
- Chat tool-call transcript proof with deterministic adapter; live LLM blocker row if credentials absent.
- Browser e2e for report progress, sections, download, error, chat, and completed states.

## Proof gate

Proof id: proof-05-report-agent

- phase_id: 05-report-agent
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- report_artifact_lifecycle
- persistence_roundtrip
- security_denied_path_test
- no_fake_scan_pass

## Repair routing

- current phase: failed report worker, lifecycle, sections/logs, chat tools, UI, or proof.
- `02-project-setup.md`: report artifact/provider architecture contradiction.
- `01-questions.md`: live provider/tool-call product fork.
- `.buildprint/evidence/evidence-ledger.jsonl`: non-upgrading live LLM/browser/deployment blockers.
