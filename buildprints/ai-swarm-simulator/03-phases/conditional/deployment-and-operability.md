# Phase 11 - Deployment and operability

requires_roles: [product-architect, integration-runtime]

## Product intention

This phase is included but blocked under trusted-local posture.

## Mapped obligations

Define deployment topology, process ownership, graph store operations, environment config, migrations/bootstrap, rollback, and runtime lifecycle.

## Stable vs free

Stable: deploy/run/rollback must be explicit.

Free: VPS, container, or managed platform.

## Implementation scope

Blocked until posture is promoted.

## Interfaces touched

Docker, process manager, env config, graph store, backend/frontend serving.

## State / runtime touched

App runtime, graph runtime, provider configuration.

## UX / DX / operator requirements

Operators need clear start/stop/restart, config validation, and upgrade paths.

## Required output (product-architect)

Define deployment shape and operability responsibilities.

## Blocks (product-architect)

No "docker exists therefore production-ready" claim.

## Required output (integration-runtime)

Verify graph memory, LLM provider, and OASIS runtime in deployed environment.

## Blocks (integration-runtime)

No deployment without boundary smoke checks.

## Quality bar

Deployment can be repeated and rolled back.

## Do not ship

Unvalidated public container.

## Repair routing

Implement before non-local deployment.

## Unlock condition

Deployment walkthrough passes.

