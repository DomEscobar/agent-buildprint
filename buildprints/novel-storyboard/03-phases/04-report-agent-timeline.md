# Phase 04 - Report Agent Timeline

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

## Capability outcome

This phase delivers report_agent_timeline for the MiroFish canvas simulation workbench without claiming live-provider, deployment, security, worker, visual, or lifecycle qualification beyond direct matching proof.

## Phase mode contract

```yaml
phase_contract:
  phase_id: 04-report-agent-timeline
  blueprint_mode: integration
  phase_style: boundary_transaction_contract
  glance_surfaces:
    - report_agent_timeline
  owned_surface_ids:
    - surface-report-agent-timeline
  core_pass_required:
    - criterion-provider-fake
    - criterion-report-artifact-readback
    - criterion-security-boundary
  claim_upgrade_tracks:
    - criterion-live-provider-proof
    - criterion-deployment-operations-proof
    - criterion-visual-quality-gate
```

- blueprint_mode: integration
- phase_style: boundary_transaction_contract
- Glance surfaces delivered: report_agent_timeline.
- Shared proof spine: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped obligations

- Preserve the mapped MiroFish behavior for report_agent_timeline.
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
- `verify:phase-artifacts` with `PHASE_ID=04-report-agent-timeline`.
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

## Capability outcome

Deliver report_agent_timeline. A completed or sufficiently advanced simulation can generate a prediction report through a report agent, stream agent/tool/console logs, expose report sections, and support report retrieval/download.

## Phase mode contract

blueprint_mode: integration
phase_style: boundary_transaction_contract
Glance surfaces delivered: report_agent_timeline

This phase uses an integration lens because it coordinates webapp, report worker, LLM provider, graph memory provider, logs, and report storage. It must define webhook/callback or polling semantics, idempotency, sandbox/live split, retry/error mapping, and fake-provider proof limits.

## Mapped capability obligations

- Support report generation requests with simulation lookup, force-regeneration policies, and idempotency.
- Coordinate a background report worker with log/console stream support and section-level progress.
- Establish robust report retrieval, download, and storage with error and timeout mapping.
- Decouple LLM/Graph provider logic through adapters, enforcing sandbox boundaries.

## Implementation scope

- Generate report request with simulation_id, force_regenerate policy, idempotency key, and existing-report reuse behavior.
- Report worker with durable status, retry/error mapping, section-level progress, and provider mode.
- Polling or callback channel for report logs and console logs; streaming is optional but log ordering and from_line resume are required.
- Report storage with metadata, Markdown or structured sections, downloadable artifact, and report-by-simulation lookup.
- UI report page with report header, section progress, timeline logs, tool-call detail expansion, empty/loading/failed states, and next action to deep interaction.

## Interfaces touched

- API: report generate/status/get/by-simulation/list/download/delete/chat/progress/sections/agent-log/console-log/tools/search/tools/statistics.
- State: report metadata, progress, sections, logs, console logs, provider trace, report artifacts.

## Proof gate

- report_generation_contract_test: report request creates durable report_id and status record before worker completion.
- provider_adapter_config_test_required: LLM and graph memory adapters prove config validation, retry, timeout, and typed error mapping.
- repeatable_browser_e2e: report page shows progress/logs/sections and handles failed/blocked states.
- persistence_roundtrip: report metadata, sections, logs, and download artifact reload after restart.
- live_provider_proof_blocker_only: live report content generation requires provider credentials and cannot be faked.

## Repair routing

If live LLM/Zep are unavailable, keep report worker, storage, log streaming, and UI behavior real, then block live content proof explicitly.

## Unlock condition

Unlock Phase 05 only after report retrieval and logs are durable and the report page can navigate into deep interaction.
