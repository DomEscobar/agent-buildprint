# Phase 02 - Episode Flow Persistence

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, implement the first real durable storyboard path inside the scaffold, verify, write `.buildprint/phase-runs/<phase-id>/proof.md`, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Glance surfaces delivered: Episode flow state.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The user selects an episode, loads board data, edits storyboard order or selected-frame metadata, saves, reloads or restarts the backend, and sees the same script, plan, assets, frame order, notes, continuity tags, media state, and workbench metadata restored.

## Mapped product obligations

- Source paths `getFlowData.ts` and `saveFlowData.ts` mapped episode-scoped board load/save behavior.
- `02-project-setup.md` requires durable persistence for storyboard order, frame metadata, media records, and restart/readback ownership.
- Phase 01 FlowData becomes the persisted contract.

## Behavior compatibility contract

- episode-flow-load-save: preserve. Equivalent target behavior: authenticated project/episode flow API loads and saves canonical FlowData. Compatibility impact: route names may change, but behavior must survive reload and restart.
- frame-metadata: replace. Equivalent target behavior: source storyboard items become richer storyboard frames with shot number, prompt, notes, status, media state and continuity tags.
- destructive-overwrite: merge. Equivalent target behavior: saves are deliberate, authorized, and errors are visible.
- live-provider-state: defer. Equivalent target behavior: provider job fields exist, but live media generation proof is Phase 04.

## Implementation scope

Define database schema/migrations and repositories for users, projects, episodes, scripts, assets, storyboard frames, media records, and workbench metadata. Implement authenticated load/save APIs and client store methods. Preserve storyboard ordering and frame metadata through reload and restart.

## Interfaces touched

- API endpoints for flow load and save.
- Database schema/migrations.
- Client store methods for `getFlowData` and `saveFlowData`.
- Browser episode selector and save/load error states.

## State/runtime touched

Use durable database-backed persistence. In-memory state is allowed only as request-local cache. Board data must survive browser reload and backend restart.

## UX/UI requirements

For UI-bearing work, apply `02-project-setup.md` visual and Screenshot critique requirements. Episode selector loads available episodes; save/load failures show visible errors; persisted frame metadata rehydrates into the storyboard strip/grid and selected-frame inspector without dropping notes, status or continuity tags.

## Safety/security constraints

API routes must require authenticated session. Project/episode IDs must be authorized for the current user/session. Destructive overwrite must be deliberate and tested.

## Quality gates

- API contract tests for initial load, saved load, missing episode and invalid auth.
- Persistence restart/readback test comparing canonical state.
- Browser test editing storyboard order and selected-frame metadata, then reload.
- Denied-path security proof for wrong auth or wrong project/episode.

## Proof gate

Additional production proof tracks:
- visual_quality_gate

Proof id: proof-02-flow-persistence
Required proof types:
- unit_or_integration_test
- persistence_roundtrip
- security_boundary
- repeatable_browser_e2e
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, persistence, and deployment paths.

Required runtime evidence row must use `phase_id: 02-flow-persistence` for the current phase and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
