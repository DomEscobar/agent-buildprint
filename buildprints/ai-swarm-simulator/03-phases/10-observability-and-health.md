# Phase 10 - Observability And Health

requires_roles: [integration-runtime, product-architect]

## Product intention

Block production-shaped operation until the app can explain graph-memory, provider, worker, and storage health.

## Mapped obligations

- Health checks for API, graph-memory backend, storage, worker/runtime, and provider config.
- Structured logs for graph build, simulation, report, and blocked states.
- Operator-visible failure summaries.

## Stable vs free

Stable: health must cover central dependencies.

Free: metrics/logging stack.

## Implementation scope

Included but blocked under trusted-local posture.

## Interfaces touched

Health endpoint, logs, UI status, runbook.

## State / runtime touched

Graph backend status, queue/worker status, provider status.

## UX / DX / operator requirements

A local operator can tell whether graph memory, provider, or simulation runtime is down.

## Required output (integration-runtime)

Health checks and failure injection smoke.

## Blocks (integration-runtime)

Single "ok" health check while graph backend is down.

## Quality bar

Failures name the failing boundary and next action.

## Do not ship

Do not hide provider or graph backend failures behind generic 500s.

## Repair routing

Ops gaps go to this phase.

## Unlock condition

Health and logs cover central runtime dependencies.
