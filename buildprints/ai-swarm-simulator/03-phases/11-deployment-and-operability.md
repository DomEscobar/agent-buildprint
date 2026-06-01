# Phase 11 - Deployment And Operability

requires_roles: [integration-runtime, data-persistence, security-boundary]

## Product intention

Block production deployment claims until the full stack can be deployed, operated, stopped, and recovered with known configuration.

## Mapped obligations

- Package frontend, API, graph-memory backend, storage, worker, and runtime dependencies.
- Define environment variables without secret values.
- Provide start/stop/restart/migration/cleanup commands.

## Stable vs free

Stable: deployment proof must include graph memory and workers.

Free: Docker Compose, native services, managed private infra.

## Implementation scope

Included but blocked under trusted-local posture.

## Interfaces touched

Deployment config, service scripts, env templates, runbook.

## State / runtime touched

Persistent volumes, graph backend data, upload/report/simulation stores.

## UX / DX / operator requirements

Operator can bring the stack up and see where data lives.

## Required output (integration-runtime)

Deployment smoke and documented service topology.

## Blocks (integration-runtime)

Frontend-only deployment that cannot run graph memory or simulation.

## Quality bar

Fresh environment can start and pass health checks.

## Do not ship

Do not claim deployability from a frontend build alone.

## Repair routing

Deployment gaps go to this phase.

## Unlock condition

Deployment smoke proves all central services.
