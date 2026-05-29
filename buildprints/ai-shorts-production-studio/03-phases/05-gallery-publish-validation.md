# Phase 05 - Gallery Publish And Validation

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, then

1. declare phase objective
2. write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` with required roles
3. create handoff/return files only for real delegation
4. collect reviews
5. integrate
6. verify
7. record evidence

Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Shared proof spine: preconditions/inputs, entrypoint or use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The completed studio has private-by-default gallery and video detail behavior, consent-gated mock/manual publish handoff payloads, final validation report, claim wording controls, and evidence that the full product scope is implemented or honestly blocked without shrinking the product.

## Mapped product obligations

- Source path `app.py` rendered gallery and video detail pages with metadata and served output videos.
- Source path `app.py` Upload-Post handler built platform-specific social handoff payloads.
- Source path `s3_uploader.py` showed optional public storage and gallery metadata behavior.
- Source validation docs required browser QA, MP4 probe, provider mode, screenshots, and safe claim wording.

## Behavior compatibility contract

- gallery-and-video-pages: preserve. Equivalent target behavior: gallery API/page and video detail render only consented metadata and playable local video refs. Compatibility impact: public SEO exposure is blocked by default until privacy/access controls are proven.
- social-publish-handoff: preserve. Equivalent target behavior: selected platforms, title, description, schedule, timezone, consent, mock/manual handoff result, provider request record. Compatibility impact: no direct official platform publishing claim.
- validation-reporting: preserve. Equivalent target behavior: final report records commands, screenshots, MP4 probe, provider mode, gaps, and status.
- public-storage-and-live-submit: defer. Equivalent target behavior: optional live S3/Upload-Post requires credentials, sandbox target, request IDs, sanitized responses, costs, moderation notes, and explicit approval.

## Implementation scope

Implement gallery metadata persistence, consent checks, gallery and video detail surfaces, publish handoff payload construction, consent-blocked states, final validation report generation, claim wording scan, secret scan, no-network proof, and final acceptance checklist. Ensure browser tests prove consented and unconsented gallery behavior plus publish blocked/allowed handoff behavior.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: gallery list, video detail, publish handoff, validation/report endpoint or generated output.
- Provider/tool contracts: gallery storage adapter, Upload-Post adapter, optional S3 live blocker, no-network default.
- None - reason: all required interfaces are consumed by browser and validation flows in this phase.

## State/runtime touched

- Database/persistence: consented gallery metadata, video detail metadata, publish handoff records, validation reports.
- Env/config: public gallery disabled by default, Upload-Post/S3 live credentials blocked unless approved.
- Jobs/workers/runtime: completed job/output manifest used as gallery/publish input.
- Runtime artifacts/generated outputs: runtime artifact: validation report; runtime artifact: final screenshots; runtime artifact: gallery metadata; runtime artifact: publish handoff record; runtime artifact: evidence ledger rows.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Gallery must communicate private-by-default behavior and show only consented videos. Video detail must show metadata and player only when consent allows it. Publish handoff must use platform checkboxes, title/description fields, schedule/timezone inputs, consent gate, blocked reason without consent, and mock/manual prepared result with limitations. Final UI must not bury limitations or make publishing appear automatic.

## Safety/security constraints

No public gallery exposure without explicit consent. No live publish or storage writes without approval and credentials. Do not store or display secret values. Publish payloads must not claim official platform API publishing. Unconsented actor/video metadata must not leak through gallery or detail routes.

## Quality gates

- Gallery privacy tests for consented and unconsented metadata.
- Publish handoff tests for blocked without consent and prepared with consent.
- Browser paths for gallery and publish surfaces.
- Secret scan and claim wording scan.
- Final validation report including commands, screenshots, MP4 probe, provider mode, limitations, gaps, and ready/blocker status.
- Production build and relevant full test suite.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-05-gallery-publish-validation
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- provider_live_or_blocker
- durable_persistence_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, gallery, and publish handoff paths.

Required runtime evidence row must use `phase_id: 05-gallery-publish-validation` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
