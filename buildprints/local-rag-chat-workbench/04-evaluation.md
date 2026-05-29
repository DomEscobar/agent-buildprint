# Evaluation

## Claim upgrade rules

Claims upgrade only after the relevant phase proof gate passes and evidence is recorded.

Required proof concepts:

- provider_live: real provider/API behavior is proven. If credentials, local runtime, media permission, sidecar, or paid-service approval are missing, the blocker may apply only to live proof after provider adapters, config contracts, deterministic test doubles, error handling, and integration tests exist.
- durable_persistence: state survives readback/reload/restart where durability is claimed.
- security_boundary: auth, tenant/privacy, secrets, uploads, URL fetches, tool calls, local paths, media input, destructive actions, and unsafe input paths are reviewed.
- no_fake: no static shell, fake green test, placeholder provider, no-op control, hardcoded citation, mock-only provider, or in-memory-only demo is claimed as production behavior.
- clean_room_implementation_trace: implementation does not depend on opening or copying the original source repo as implementation input.
- production_readiness: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e gates, and security controls are implemented or explicitly blocked without downgrading scope.

## Loop completion rule

A phase is complete only when:

- observe/plan/execute/verify/reflect/record loop completed at least once
- role handoffs, returns, reviews, proof, and evidence rows exist
- verification evidence exists
- phase proof gate passes, or an honest blocker is recorded only for unavailable live credentials, external services, paid-service approval, browser media permission, sidecar runtime, Docker, or deployment authorization
- blocker/unknowns are not hidden
- failed gates are repaired or routed correctly

## Phase state model

- `checkpoint_recorded`: at least one valid runtime evidence row exists for the phase. This proves evidence discipline only.
- `phase_core_passed`: the phase-owned local vertical path works end to end with matching tests/proof, including UI action/state-transition proof for UI-bearing phases.
- `claim_qualified`: the specific live-provider, browser/e2e, screenshot, deployment, security, worker, data-lifecycle, voice, or provider claim has matching executable proof and may upgrade.

Do not treat `checkpoint_recorded` as `phase_core_passed`. Do not treat `phase_core_passed` as `claim_qualified`.

## Evidence requirements

Each evidence row must include phase id, proof type, provider mode, status, source/command summary, claim proven or blocker, and whether it upgrades a claim.

Separate proof rows or explicit blocker rows are required for browser/e2e, visual quality, live provider, worker recovery, persistence, security, data lifecycle, voice/media, deployment, and no-fake claims.

## Blocker honesty

A blocker preserves scope. Do not silently downgrade the product, hide missing proof, skip required UI states, or call deterministic adapters live providers.

## Continuation versus qualification

Some blockers prevent claim qualification without blocking later implementation. Missing live credentials, unavailable browser/e2e tooling, screenshots, voice sidecar, microphone permission, deployment authorization, Docker, or external services should be recorded as non-upgrading blocker rows and may set `blocks_continuation: false` when the phase's core local implementation path, persistence, safety checks, and runtime/API proof passed.

Do not use `blocks_continuation: false` for failed core implementation, failed owned persistence, failed local runtime/API proof, unresolved destructive/security ambiguity, missing required project structure, unsafe upload/tool/URL behavior, or any condition that makes downstream phases unsafe or invalid.

## Visual quality gate

`visual_quality_gate` upgrades only after browser/screenshot evidence is reviewed against the active UX contract and no blocking local-MVP, default-control, generic dashboard, raw text-list, inaccessible, clipped, or unresponsive defect remains.
