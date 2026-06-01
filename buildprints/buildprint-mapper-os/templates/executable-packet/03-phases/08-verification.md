# Phase 08 — Verification

## Product intention

Verify the product as a user would experience it, then with the smallest useful automated gates. The standard is credible behavior, not proof-shaped prose.

## Build

- User journeys for first-run, core loop, changed input, reload/readback, export, and recovery from errors.
- Smoke tests or scripts for the core loop and critical state/data behavior.
- Regression checks for domain transformations, provider boundaries, and important feature slices.
- Screenshot or browser review for visual hierarchy, copy, dead controls, and generic-dashboard smell.
- Release gates that distinguish local readiness from production/security/provider readiness.

## Quality bar

Verification should catch the embarrassing failures: unclear first action, canned output, broken reload/export, dead controls, fake providers, ugly copy, or missing next action.

## Do not ship

Only unit tests with no user journey, screenshots ignored after capture, passing build as product proof, or handover that hides visible slop and unresolved blockers.
