# Phase 11 — Deployment and operability

requires_roles: [integration-runtime, security-boundary, product-architect]

## Product intention

Define and validate a repeatable deployment shape with safe defaults, startup checks, and recovery behavior.

## Mapped obligations

- Define process supervision and startup order.
- Define configuration validation and fail-fast behavior.
- Define rollback/recovery expectations and operator runbook entrypoints.

## Stable vs free

- Stable: deployment safety invariants, startup validation, and operator recovery path.
- Free: container/orchestration vendor, infra-as-code tool, and environment-specific scripting.

## Implementation scope

- Provide deployable runtime shape (service, worker, storage, queue where applicable).
- Add startup config validation for required secrets and runtime contracts.
- Document deploy/start/stop/rollback commands with expected outcomes.
- Add health/readiness checks tied to deployment gates.

## Interfaces touched

- Deployment manifests/scripts and environment contracts.
- Startup and shutdown hooks.
- Runtime health surfaces consumed by orchestrators.

## State / runtime touched

- Runtime config registry and env var contract.
- Worker ownership and restart semantics.
- Recovery and rollback metadata.

## UX / DX / operator requirements

- Operators can deploy and recover without hidden tribal knowledge.
- Blocked deployment states are explicit and actionable.

## Required output (integration-runtime)

- Runtime boundaries, retries, failures, and status semantics are explicit.
- External side effects are controlled with safe defaults.

## Blocks (integration-runtime)

- Runtime success claimed without actual runtime execution path.
- Long-running processes without ownership and status transitions.

## Required output (security-boundary)

- Secret handling, destructive controls, and denied-path behavior are documented and tested.

## Blocks (security-boundary)

- Plaintext secrets in deploy logs/config output.
- Destructive controls without permission and confirmation.

## Required output (product-architect)

- Deployment boundary appears in context/component/data-flow views.

## Blocks (product-architect)

- Deployment path that depends on hidden manual edits.
- No rollback story for failed releases.

## Quality bar

A clean environment can deploy, start, run health checks, and recover from common failures using documented commands.

## Do not ship

- "Works on my machine" deploy-only path.
- Missing config validation with late runtime crashes.
- No process supervision for long-running tasks.

## Repair routing

- deployment contradiction -> `02-project-setup.md`
- missing startup/rollback checks -> current phase
- unresolved operability blocker -> `05-handover.md`

## Unlock condition

Documented deployment path, startup validation, and recovery path are executable and observable.
