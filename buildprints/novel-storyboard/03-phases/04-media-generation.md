# Phase 04 - Async Media Generation And Provider Boundaries

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, implement the first real provider/job/status path inside the scaffold, verify, write `.buildprint/phase-runs/<phase-id>/proof.md`, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Glance surfaces delivered: Media generation paneling.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The user triggers asset, storyboard frame, or video workbench generation, sees frame-level pending/success/failure/blocked states, polls or receives updates, retries safe failures, and never mistakes fake-provider output for live provider proof.

## Mapped product obligations

- Source path `tools.ts` mapped asset, storyboard, and video-generation tool surfaces.
- `02-project-setup.md` requires provider adapter split, fake/no-network tests, media records, worker/runtime ownership, and explicit live-provider blockers.
- Prior phases provide persisted storyboard frames that media state attaches to.

## Behavior compatibility contract

- media-generation-jobs: preserve. Equivalent target behavior: async jobs for derived assets, storyboard images, and video prompts with pending/success/failure/blocked states.
- provider-boundary: preserve. Equivalent target behavior: fake-provider tests and live-provider adapter/config split. Compatibility impact: fake output never upgrades live claim.
- frame-media-review: replace. Equivalent target behavior: generated media previews appear in stable storyboard frame containers and inspector.
- destructive-media-delete: merge. Equivalent target behavior: deletes require authorization and confirmation.

## Implementation scope

Define provider interfaces and fake-provider adapter, job records, media storage path and URL resolver. Implement generation APIs, polling, retry/failure handling, blocked credential states, frame regeneration inputs, and UI polling/readback.

## Interfaces touched

- Provider adapter interfaces.
- Asset/storyboard/workbench generation APIs.
- Polling APIs and client polling store.
- Media storage path and URL resolver.

## State/runtime touched

Generation records need durable state: pending, success, failure, error reason, media URL/path and associated project/episode/storyboard/asset IDs. Provider job IDs and errors must be auditable.

## UX/UI requirements

For UI-bearing work, apply `02-project-setup.md` visual and Screenshot critique requirements. Pending, failed, blocked, retry, approved and selected-for-video states must be legible at a glance across the shot strip/grid. Selected/generated media previews must appear inside stable frame containers and inspector.

## Safety/security constraints

Provider secrets remain server-side. Uploads and generated media must be path-safe. Destructive deletes require confirmation and authorization. Fake-provider results must be visibly test/demo only.

## Quality gates

- Fake-provider tests for pending, success, failure, timeout/retry and cancellation where supported.
- API tests for unauthorized access, missing credentials and invalid IDs.
- Browser test triggering generation from a storyboard frame, polling to success/failure/retry/blocked state, and confirming persistence.
- Secret redaction and no-fake scan.

## Proof gate

Additional production proof tracks:
- visual_quality_gate

Proof id: proof-04-media-generation
Required proof types:
- provider_mock_no_network_gate
- provider_integration_proof
- worker_retry_cancel_recovery
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

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, storage, and deployment paths.

Required runtime evidence row must use `phase_id: 04-media-generation` for the current phase and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
