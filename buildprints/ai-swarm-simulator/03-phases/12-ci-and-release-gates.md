# Phase 12 - CI And Release Gates

requires_roles: [product-architect, integration-runtime]

## Product intention

Block repeatable release claims until tests and checks run consistently outside a developer's manual session.

## Mapped obligations

- Run unit, adapter contract, backend API, frontend build, and browser smoke in CI or a documented local release gate.
- Include fixture graph-memory backend setup.
- Fail on Zep required dependency regression.

## Stable vs free

Stable: checks must cover selected behavior.

Free: CI provider.

## Implementation scope

Included but blocked under trusted-local posture.

## Interfaces touched

Test scripts, CI config, release checklist.

## State / runtime touched

Fixture databases and generated artifacts.

## UX / DX / operator requirements

Failure messages should route to the owning phase.

## Required output (product-architect)

Release gate checklist and automated checks.

## Blocks (product-architect)

No check catches accidental Zep Cloud reintroduction.

## Quality bar

The selected loop can be regression-tested without live paid credentials.

## Do not ship

Do not make live paid provider credentials mandatory for the base CI path.

## Repair routing

CI gaps go to this phase.

## Unlock condition

Repeatable checks pass and block known regressions.
