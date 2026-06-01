# Phase 08 - Verification

requires_roles: [product-architect, integration-runtime, data-persistence, ux-ui-craft, security-boundary]

## Product intention

Prove the trusted-local workbench behavior that was built, and keep all unproven live/provider/production claims blocked.

## Mapped obligations

- Run unit/contract tests for graph-memory and provider adapters.
- Run backend API smoke.
- Run frontend build.
- Run browser review of graph/canvas.
- Run restart/readback check.
- Run live provider smoke only with credentials and explicit cost/rate awareness.

## Stable vs free

Stable: proof must match claimed behavior.

Free: test framework and automation harness.

## Implementation scope

Create and run the smallest meaningful test set for selected behavior.

## Interfaces touched

Tests, browser smoke, local run scripts, handover.

## State / runtime touched

Fixture data, local graph backend, persisted project/simulation/report state.

## UX / DX / operator requirements

Verification output should tell the next engineer what command or browser step failed.

## Required output (integration-runtime)

- Graph-memory adapter tests.
- Provider blocked/live tests.

## Blocks (integration-runtime)

- No test covers Zep replacement path.

## Required output (data-persistence)

- Restart/readback verification.

## Blocks (data-persistence)

- Persistence claims without reload proof.

## Required output (ux-ui-craft)

- Browser canvas interaction proof.

## Blocks (ux-ui-craft)

- Canvas untested while claiming UI readiness.

## Quality bar

The handover can distinguish built-and-verified, built-not-verified, and blocked.

## Do not ship

Do not turn test pass into production readiness.

## Repair routing

Failed checks route to the owning phase.

## Unlock condition

Review and handover can be completed honestly.
