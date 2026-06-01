# Phase 05 - Deep Interaction Console

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. Write `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml` with lead decision, user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers.
2. Declare the phase objective in `.buildprint/phase-runs/PHASE_ID/plan.md`.
3. Confirm the implementation scaffold and local guidance files required by `02-project-setup.md` exist.
4. Implement the first real vertical path.
5. Verify with commands and browser/runtime artifacts.
6. Write `.buildprint/phase-runs/PHASE_ID/proof.md` and `.buildprint/phase-runs/PHASE_ID/evidence.json`.
7. Append narrow proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Do not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Product outcome

This phase delivers deep_interaction_console, history_restore for the MiroFish canvas simulation workbench without claiming live-provider, deployment, security, worker, visual, or lifecycle qualification beyond direct matching proof.

## Phase mode contract

```yaml
phase_contract:
  phase_id: 05-deep-interaction-console
  blueprint_mode: product
  phase_style: outcome_flow
  glance_surfaces:
    - deep_interaction_console
    - history_restore
  owned_surface_ids:
    - surface-deep-interaction-console
    - surface-history-restore
  core_pass_required:
    - criterion-browser-runtime-trace
    - criterion-persistence-roundtrip
    - criterion-security-boundary
  claim_upgrade_tracks:
    - criterion-live-provider-proof
    - criterion-deployment-operations-proof
    - criterion-visual-quality-gate
```

- blueprint_mode: product
- phase_style: outcome_flow
- Glance surfaces delivered: deep_interaction_console, history_restore.
- Shared proof spine: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped obligations

- Preserve the mapped MiroFish behavior for deep_interaction_console, history_restore.
- Implement source-independent target behavior; do not require opening the original source repo during implementation.
- Keep deterministic/fake provider proof separate from live provider claim upgrades.

## Stable vs free

Stable: user-visible workflow, provider boundaries, persistence/readback, runtime status, failure states, and evidence ceilings.
Free: exact framework, component names, storage engine, queue implementation, and visual style if the product-grade graph/simulation/report experience is preserved.

## Implementation scope

Implement the smallest real vertical path for this phase. Avoid standalone demos, generic dashboards, raw JSON substitutes, in-memory-only production claims, no-op controls, and route-shaped handlers without service/storage/runtime behavior.

## Interfaces touched

- UI/controller/API boundary for phase-owned surfaces.
- Provider adapter boundary where this phase touches LLM, graph memory, report, or runtime behavior.
- Test/e2e/no-fake verifier boundary.

## State/runtime touched

- Durable project/workflow state and runtime artifacts owned by this phase.
- `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml`, `plan.md`, `proof.md`, and `evidence.json` as runtime proof artifacts.
- `.buildprint/evidence/evidence-ledger.jsonl` for narrow evidence/blocker rows.

## UX / DX / operator requirements

UI-bearing phases must look like a product-grade graph/simulation/report workbench. Non-UI proof must use mode-equivalent API, dataflow, automation, provider, or operations proof. Screenshots alone do not upgrade claims without browser action traces and visual critique.

## Safety constraints

Protect uploads, generated artifacts, provider secrets, destructive actions, chat/report data, and runtime process controls. Missing credentials or deployment authorization may block claim upgrades but must not remove adapters, config contracts, tests, or fail-closed states from scope.

## Quality gates

- Unit/integration tests for phase-owned behavior.
- `verify:no-fake`.
- `verify:phase-artifacts` with `PHASE_ID=05-deep-interaction-console`.
- Browser/runtime/API/provider/dataflow/automation proof matching this phase mode.

## Proof gate

`phase_core_passed` requires the phase-owned local vertical path to run with command output or artifact paths saved under `.buildprint/phase-runs/PHASE_ID/`. Evidence rows must include `phase_id`, `proof_type`, `provider_mode`, `claim_type`, and `upgrades_claim` with narrow `proves` values.

## Repair routing

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase
- external/live-provider/deployment blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

## Source-specific contract notes

## Product outcome

Deliver deep_interaction_console and history_restore. A user can open a generated report, chat with the report agent, select simulated agents, run surveys/interviews, inspect responses, and reopen prior simulations/reports.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
Glance surfaces delivered: deep_interaction_console, history_restore

This phase uses a product lens because the output is a post-report interactive user workflow. The shared proof spine is mandatory: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped product obligations

- Establish an interactive report console with conversational report-agent chat.
- Support deep agent-level interaction, allowing users to select individual simulated profiles and run batch surveys/interviews.
- Maintain a historical record of prior simulations and prediction reports, supporting restoration and deep linkage.
- Harden all destructive controls (reset, delete, close) with explicit user confirmation and role gating.

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
