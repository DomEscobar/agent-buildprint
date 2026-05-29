# Phase 04 - Browser Studio

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
  - security-boundary

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Shared proof spine: preconditions/inputs, entrypoint or use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

A browser-accessible studio workbench lets a user enter a product URL or manual description, receive product analysis and scripts, select/edit a script, configure voice/actor/video/narration/consent, start generation, observe pollable progress/logs, review a playable completed MP4, inspect limitations and provider details, and recover from visible negative states.

## Mapped product obligations

- Source path `dashboard/src/components/SaaShortsTab.jsx` showed setup, analysis, configuration, generation, and result steps.
- Source path `dashboard/src/components/UGCGallery.jsx` showed gallery cards and video links.
- Source path `app.py` supplied analyze, generate, status, gallery, video detail, and post surfaces.

## Behavior compatibility contract

- studio-wizard-ui: replace. Equivalent target behavior: production-studio workbench with source input, scripts, configuration, generation, review, gallery entry, publish entry, limitations, and secondary debug drawer. Compatibility impact: cleaner UX is allowed; no user workflow may disappear.
- raw-debug-primary-ui: drop. Equivalent target behavior: logs/manifests/provider refs remain available in a secondary drawer. Compatibility impact: raw JSON cannot be the first useful screen.
- browser-job-status: preserve. Equivalent target behavior: rendered UI observes real job status and completed result from service/runtime state. Compatibility impact: local component-only fake status is invalid.
- negative-paths: preserve. Equivalent target behavior: no input, invalid URL, provider failure, missing live key, cancel, retry, gallery without consent, and publish without consent show visible reasons.

## Implementation scope

Build the studio UI and connect it to the contracts/runtime/media outputs. Include workflow navigation, source mode controls, script cards and edit affordance, voice/actor/video controls, consent gates, generation/cancel/retry controls, progress/log display, video player, manifest summary, limitations/non-claims, debug drawer, responsive desktop/mobile behavior, and browser tests for happy path plus critical negative paths.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: analyze, actor options/upload, voices, generate, status, cancel, retry, review manifest.
- Provider/tool contracts: provider mode badges and structured blocked reasons surfaced from adapters.
- None - reason: gallery and publish finalization are completed in the next phase, but entry points must exist.

## State/runtime touched

- Database/persistence: reads/writes selected project/script/config/consent/job references through the app state or service layer.
- Env/config: provider mode switch, disabled live controls unless approved/configured.
- Jobs/workers/runtime: polling, cancel, retry, completed result consumption.
- Runtime artifacts/generated outputs: runtime artifact: browser screenshots; runtime artifact: browser trace/report; runtime artifact: completed-state DOM or screenshot evidence.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Use a dense production-studio layout: top project/workflow/provider-mode area, primary work column, secondary preview/status column, compact limitations notice, and collapsible debug drawer. Required states: empty, loading/running, error, blocked, success/ready, canceled, retrying. Controls must be accessible, responsive, and non-overlapping on desktop and mobile. Every enabled button must perform a visible action; disabled controls must explain why.

## Safety/security constraints

Live provider controls must be opt-in and credential-gated. Consent controls must gate custom likeness, gallery exposure, and publish handoff. Limitations must avoid clone/parity/live/publishing/durability overclaims. Debug drawer must not expose secret values.

## Quality gates

- UI/unit or integration tests for workflow state.
- Browser happy path clicking rendered controls through completed review/player.
- Browser negative paths for no source input, missing live key, cancel/retry, gallery without consent entry, publish without consent entry.
- Desktop and mobile screenshots showing populated studio, video player, status/log affordance, limitations, and no overlap.
- Production build.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-04-browser-studio
Required proof types:
- runtime_or_browser_trace_or_blocker
- screenshot_desktop_mobile
- production_build_or_blocker
- accessibility_or_dom_check
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, gallery, and publish handoff paths.

Required runtime evidence row must use `phase_id: 04-browser-studio` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
