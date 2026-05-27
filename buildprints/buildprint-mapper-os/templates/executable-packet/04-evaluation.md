# Evaluation

## Claim upgrade rules

Claims upgrade only after the relevant phase proof gate passes and evidence is recorded.

Required proof concepts:

- provider_live: real provider/API behavior is proven. If credentials or paid-service approval are missing, the blocker may apply only to live proof after provider adapters, config contracts, deterministic test doubles, error handling, and integration tests exist.
- durable_persistence: state survives readback/reload where durability is claimed.
- security_boundary: auth, tenant/privacy, secrets, destructive actions, and unsafe input paths are reviewed.
- no_fake: no static shell, fake green test, placeholder provider, no-op control, or in-memory-only demo is claimed as production behavior.
- clean_room_implementation_trace: implementation does not depend on opening the original source repo as implementation input.
- production_readiness: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e gates, and security controls are implemented or explicitly blocked without downgrading scope.
- visual_quality_gate: UI-bearing phases look and behave like product-grade domain software. Passing browser assertions is insufficient if screenshots show default browser controls, stacked forms, generic cards, weak hierarchy, raw text-list substitutes for domain interactions, or missing responsive/focus/blocked-state polish.

## Loop completion rule

A phase is complete only when:

- observe/plan/execute/verify/reflect/record loop completed at least once
- verification evidence exists
- phase proof gate passes, or an honest blocker is recorded only for unavailable live credentials, external services, paid-service approval, or deployment authorization
- blocker/unknowns are not hidden
- failed gates are repaired or routed correctly

## Phase state model

- `checkpoint_recorded`: at least one valid runtime evidence row exists for the phase. This proves evidence discipline only.
- `phase_core_passed`: the phase-owned local vertical path works end to end with matching tests/proof, including UI action/state-transition proof for UI-bearing phases.
- `claim_qualified`: the specific live-provider, browser/e2e, screenshot, deployment, security, worker, or data-lifecycle claim has matching executable proof and may upgrade.

Do not treat `checkpoint_recorded` as `phase_core_passed`. Do not treat `phase_core_passed` as `claim_qualified`.

## Evidence requirements

Each evidence row must include phase id, proof type, provider mode, status, source/command summary, claim proven or blocker, and whether it upgrades a claim.

## Blocker honesty

A blocker preserves scope. Do not silently downgrade the product, hide missing proof, skip required UI states, or call deterministic adapters live providers.

## Continuation versus qualification

Some blockers prevent claim qualification without blocking later implementation. Missing live credentials, unavailable browser/e2e tooling, screenshot tooling, deployment authorization, or external services should be recorded as non-upgrading blocker rows and may set `blocks_continuation: false` when the phase's core local implementation path, persistence, safety checks, and runtime/API proof passed.

Do not use `blocks_continuation: false` for failed core implementation, failed owned persistence, failed local runtime/API proof, unresolved destructive/security ambiguity, missing required project structure, or any condition that makes downstream phases unsafe or invalid.
