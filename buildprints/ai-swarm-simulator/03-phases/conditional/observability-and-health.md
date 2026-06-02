# Phase 10 - Observability and health

requires_roles: [integration-runtime]

## Product intention

This phase is included but blocked under trusted-local posture.

## Mapped obligations

Add health checks, structured logs, provider/graph/simulation diagnostics, queue/task visibility, and error tracking before production-shaped deployment.

## Stable vs free

Stable: operators can see what is broken.

Free: monitoring stack.

## Implementation scope

Blocked until posture is promoted.

## Interfaces touched

Backend health endpoints, job status, provider status, logs.

## State / runtime touched

Runtime diagnostics.

## UX / DX / operator requirements

Health views must distinguish missing config, provider outage, graph-memory failure, simulation runtime failure, and app errors.

## Required output (integration-runtime)

Add actionable observability around providers, graph memory, and OASIS runtime.

## Blocks (integration-runtime)

No generic "failed" state when the boundary is diagnosable.

## Quality bar

Operator can diagnose the failed boundary within one minute.

## Do not ship

Production-shaped deployment without health and logs.

## Repair routing

Implement this before private/public operations.

## Unlock condition

Health and diagnostics are verified.

