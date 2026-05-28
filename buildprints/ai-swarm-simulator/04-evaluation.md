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
- visual_quality_gate: applies only to UI-bearing phases (product mode or UI-bearing mixed phases). UI-bearing phases look and behave like product-grade domain software. Passing browser assertions is insufficient if screenshots show default browser controls, stacked forms, generic cards, weak hierarchy, raw text-list substitutes for domain interactions, or missing responsive/focus/blocked-state polish. Non-UI phases (framework, library, integration, automation, data-pipeline, infrastructure) use mode-equivalent proof instead; see below.

Mode-equivalent proof concepts for non-UI modes:

- import_api_contract_trace: framework / library phases prove the callable import/API surface, invariants, composition, and consumer patterns through import/API/CLI tests or reference examples.
- fake_provider_proof: integration phases prove fake-provider behavior, webhook/callback dispatch, idempotency, and retry/error mapping with a fake or sandbox provider before claiming live proof.
- automation_trace_proof: automation phases prove task loop execution, stop condition triggering, and tool/action evidence through an observable trace.
- dataflow_quality_proof: data-pipeline phases prove transform semantics, schema validation, lineage, backfill/idempotency, and at least one data quality assertion.
- operations_health_rollback_proof: infrastructure phases prove health/readiness checks and rollback behavior in the target environment.

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

For non-UI modes, `phase_core_passed` requires the mode-appropriate proof: import/API/CLI contract tests for framework/library; fake-provider and boundary tests for integration; trace-based loop proof for automation; schema/transform/lineage proof for data-pipeline; health/readiness/rollback proof for infrastructure. Do not use UI-browser proof requirements as a blocker for non-UI phases.

## Evidence requirements

Each evidence row must include phase id, proof type, provider mode, status, source/command summary, claim proven or blocker, and whether it upgrades a claim.

## Blocker honesty

A blocker preserves scope. Do not silently downgrade the product, hide missing proof, skip required UI states, or call deterministic adapters live providers.

## Continuation versus qualification

Some blockers prevent claim qualification without blocking later implementation. Missing live credentials, unavailable browser/e2e tooling, screenshot tooling, deployment authorization, or external services should be recorded as non-upgrading blocker rows and may set `blocks_continuation: false` when the phase's core local implementation path, persistence, safety checks, and runtime/API proof passed.

Do not use `blocks_continuation: false` for failed core implementation, failed owned persistence, failed local runtime/API proof, unresolved destructive/security ambiguity, missing required project structure, or any condition that makes downstream phases unsafe or invalid.
