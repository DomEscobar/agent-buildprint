# Phase 08 — Verification

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Verify the product as a user would experience it, then with the smallest useful automated gates. The standard is credible behavior, not proof-shaped prose.

## Mapped obligations

- User journeys for first-run, core loop, changed input, reload/readback, export, and recovery.
- Smoke/regression checks for domain, provider, persistence, and blocked-state behavior.
- Browser review for UI-bearing artifacts.
- Release gates that distinguish local from production readiness by posture.

## Stable vs free

- Stable: required verification categories and blocker semantics.
- Free: test framework tooling and CI platform details.

## Implementation scope

- Run strongest local checks for included slices.
- Run restart/readback checks where continuity is claimed.
- Run provider-blocked path checks and failure-path checks.
- Run browser quality checks for UI-bearing artifacts.
- Record unresolved items as explicit blockers, not hidden assumptions.

## Interfaces touched

- Test and smoke command surfaces.
- Browser/e2e scripts and fixtures.
- CI/release gate definitions.

## State / runtime touched

- Test artifacts and verification logs.
- Restart/readback verification outcomes.
- Blocked-state and denied-path evidence notes.

## UX / DX / operator requirements

- Verification output names what failed and where to repair.
- Browser checks focus on real interactions, not static screenshots only.

## Required output (ux-ui-craft)

- Browser/screenshot checks cover empty/loading/error/blocked/success states.

## Blocks (ux-ui-craft)

- Screenshots captured but not reviewed for quality defects.

## Required output (integration-runtime)

- Runtime/provider failures are exercised and visible.

## Blocks (integration-runtime)

- Live provider claims without credentials/runtime verification.

## Required output (data-persistence)

- Restart/readback verification for durable claims.

## Blocks (data-persistence)

- Persistence claims without continuity checks.

## Required output (security-boundary)

- Sensitive paths include denied-path and unsafe-input checks.

## Blocks (security-boundary)

- Security-sensitive behavior shipped without negative tests.

## Required output (product-architect)

- Verification map covers core loop and critical boundaries.

## Blocks (product-architect)

- Passing broad checks while central behavior is broken.

## Quality bar

Verification should catch the embarrassing failures: unclear first action, canned output, broken reload/export, dead controls, fake providers, ugly copy, or missing next action.

## Do not ship

Only unit tests with no user journey, screenshots ignored after capture, passing build as product verification, or handover that hides visible slop and unresolved blockers.

## Repair routing

- failed check -> owning phase
- missing gate definition -> `02-project-setup.md`
- unresolved central failure -> `04-review.md`

## Unlock condition

Verification runs cover core loop, persistence continuity, provider honesty, and posture-relevant release blockers.
