# Phase 05 - Deep Interaction Console

## Product outcome

Deliver deep_interaction_console and history_restore. A user can open a generated report, chat with the report agent, select simulated agents, run surveys/interviews, inspect responses, and reopen prior simulations/reports.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
Glance surfaces delivered: deep_interaction_console, history_restore

This phase uses a product lens because the output is a post-report interactive user workflow. The shared proof spine is mandatory: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Implementation scope

- Interaction page keyed by report_id with report context, simulation_id lookup, and provider/runtime availability checks.
- Report-agent chat with preserved chat history, loading/error states, and source/provider attribution.
- Agent dropdown/list from realtime profiles with selected-agent profile card, chat target switching, and empty profile state.
- Survey/interview workflow with multi-select, prompt input, batch request, per-agent results, partial failures, and retry.
- History surface with recent simulations, report links, simulation detail modal, and restore navigation to workbench/simulation/report.
- UX/UI requirements: compact two-panel report/interaction layout, visible target selection, no no-op buttons, disabled states while blocked, clear distinction between report-agent and simulated-agent answers.

## Interfaces touched

- API: report chat/get/log, simulation profiles/realtime, interview/batch, interview/history, simulation history, report by simulation.
- State: chat sessions, interview requests/results, profile snapshots, history records, report links, audit events.

## Proof gate

- repeatable_browser_e2e: user can open interaction from report, choose report-agent chat, choose simulated agent, run a survey/interview or see a truthful runtime blocker, and reopen a history item.
- provider_adapter_config_test_required: LLM/report-agent adapter and simulation runtime interview adapter expose config and availability status.
- live_provider_proof_blocker_only: real agent answers require live simulation environment; fake responses do not qualify.
- persistence_roundtrip: history, report links, chat/interview records reload after restart or documented session persistence.
- security_boundary_review: user prompts, uploaded-derived content, report output, and logs are escaped/sanitized and secret-redacted.

## Repair routing

If the simulation environment is closed, the UI must show the close-state and block live interviews. Do not answer as simulated agents through a generic LLM fallback and call it product behavior.

## Completion condition

All selected surfaces have phase ownership. Final qualification remains PROOF_REQUIRED until live provider, runtime, persistence, browser, and security evidence rows pass.
