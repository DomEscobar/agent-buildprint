# Phase 10 — Observability and health

requires_roles: [integration-runtime, product-architect]

## Product intention

Make runtime behavior inspectable so operators can detect failures, triage incidents, and confirm recovery.

## Mapped obligations

- Define logs, metrics, traces, and task lifecycle visibility.
- Define health/readiness checks for service startup and dependencies.
- Define failure, retry, timeout, and cancellation observability.

## Stable vs free

- Stable: observable runtime states, health semantics, and operator troubleshooting path.
- Free: telemetry vendor, metric library, and internal logger implementation.

## Implementation scope

- Add structured logs with correlation ids across API, worker, and provider paths.
- Add `/health` and `/ready` checks with dependency visibility.
- Expose task states: queued, running, failed, retrying, canceled, done.
- Add actionable error messages for common runtime failures.

## Interfaces touched

- API endpoints for health/status.
- Worker/task orchestration surfaces.
- Provider adapter error/reporting surfaces.

## State / runtime touched

- Runtime task status store and retry metadata.
- Log pipeline and retention settings.
- Health check dependency probes.

## UX / DX / operator requirements

- Status surfaces should show what failed, why, and next action.
- Operator can map a user error to backend log evidence quickly.

## Required output (integration-runtime)

- Provider/runtime boundary contract includes retries, error behavior, and config.
- Long-running jobs expose status/progress/log/cancel/failure semantics.

## Blocks (integration-runtime)

- Runtime behavior claimed without runtime proof or blocker.
- External writes without failure semantics and idempotency handling.

## Required output (product-architect)

- Context/component/data-flow views include runtime boundaries and ownership.

## Blocks (product-architect)

- Diagram-only architecture without a real vertical path.
- Runtime paths that bypass domain/service boundaries.

## Quality bar

An operator can answer what is running, what failed, and how to recover without source-level debugging.

## Do not ship

- Health endpoint that always returns healthy.
- Background jobs with no visible state transitions.
- Logs that leak secrets or omit request/task correlation.

## Repair routing

- runtime observability gap -> current phase
- health-check contradiction -> `02-project-setup.md`
- operator recovery gap -> `04-review.md`

## Unlock condition

Health endpoints, task lifecycle visibility, and actionable runtime diagnostics are demonstrably available.
