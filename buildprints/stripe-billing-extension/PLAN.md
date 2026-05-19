# Stripe Billing Extension Buildprint Plan

## Authority

`BUILDPRINT.md` is the canonical source of truth. This file is the implementation phase index and must not weaken the binding scope, non-goals, phase gates, or acceptance gates in `BUILDPRINT.md`.

## Phase routing

- Run `proof/` as isolated reference validation when applicable.

## Completion order

1. Read `BUILDPRINT.md` first and confirm the binding scope/non-goals.
2. Read `SPEC.md` and `CONTRACTS.md` before implementation.
3. Execute the package-specific phase gates.
4. Run the checks in `TEST_MATRIX.md`.
5. Complete `VALIDATION_TEMPLATE.md` with commands, evidence, gaps, and blockers.
6. Pass `checks/acceptance.md` before claiming completion.
