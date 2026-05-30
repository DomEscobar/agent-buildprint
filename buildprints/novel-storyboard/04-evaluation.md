# Evaluation

## Claim upgrade rules

All claims must be typed: `target`, `core_pass`, `claim_upgrade`, or `blocker`. A target claim is not proof. A core-pass claim needs local executable proof. A claim-upgrade needs direct matching evidence. A blocker preserves scope and must not be converted into exclusion without user approval.

Required proof concepts:

- provider_live: real provider/API behavior is proven. Missing credentials block only live proof after adapters/config/contracts/tests exist.
- durable_persistence: state survives readback/reload where durability is claimed.
- security_boundary: auth, tenant/privacy, secrets, uploads, destructive actions, file serving, and unsafe input paths are reviewed.
- no_fake: no static shell, fake green test, placeholder provider, no-op control, or in-memory-only demo is claimed as production behavior.
- clean_room_implementation_trace: implementation does not depend on opening the original source repo as implementation input.
- production_readiness: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e gates, and security controls are implemented or explicitly blocked without downgrading scope.
- visual_quality_gate: UI-bearing phases look and behave like product-grade graph/simulation/report software, not generic dashboards or raw JSON lists.
- dataflow_quality_proof: simulation environment/report dataflows prove schema, transform, lineage, idempotency, and quality assertions.
- automation_trace_proof: runtime phases prove task loop execution, stop condition triggering, recovery, and tool/action evidence.
- fake_provider_proof: provider-backed phases prove fake/sandbox behavior before live proof.

## Loop completion rule

A phase is complete only when observe/plan/execute/verify/reflect/record ran, verification evidence exists, proof gate passes or honest blocker is recorded, blockers are not hidden, and failed gates are repaired or routed correctly.

## Phase state model

- `checkpoint_recorded`: at least one valid runtime evidence row exists for the phase.
- `phase_core_passed`: the phase-owned local vertical path works end to end with matching proof-fixtures/proof.
- `claim_qualified`: the specific live-provider, browser/e2e, screenshot, deployment, security, worker, or lifecycle claim has matching executable proof and may upgrade.

## Evidence requirements

Each evidence row must include phase id, proof type, provider mode, status, source/command summary, claim proven or blocker, and whether it upgrades a claim.

Each phase must maintain `.buildprint/phase-runs/PHASE_ID/evidence.json` as the command/artifact manifest. Upgrading rows must point to a command result or artifact listed there; review prose alone cannot upgrade runtime, provider, browser, persistence, security, worker, deployment, or lifecycle claims.

## Blocker honesty

A blocker preserves scope. Do not silently downgrade the product, hide missing proof, skip required UI states, or call deterministic adapters live providers.

## Continuation versus qualification

Missing live credentials, unavailable browser/e2e tooling, screenshot tooling, deployment authorization, or external services should be recorded as non-upgrading blocker rows and may set `blocks_continuation: false` only when the phase's core local implementation path, persistence, safety checks, and runtime/API proof passed.
