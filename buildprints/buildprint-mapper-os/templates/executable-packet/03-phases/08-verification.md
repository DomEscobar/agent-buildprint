# Phase 08 — Verification

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Verify the product as a user would experience it, then with the smallest useful automated gates. The standard is credible behavior, not proof-shaped prose.

## Mapped obligations

- User journeys for first-run, core loop, changed input, reload/readback, export, and recovery.
- Smoke/regression checks for domain, provider, persistence, and blocked-state behavior.
- Browser review for UI-bearing artifacts.
- Release gates that distinguish local from production readiness by posture.
- Traceability mapping in `.buildprint/traceability.yaml` mapping every acceptance ID from `02-core-loop-first` to one ledger `artifact_id`, `test_id`, and `state_covered` (missing rows block release).
- UX traceability mapping in `.buildprint/ux-traceability.yaml` mapping every `ux_ac_id` from `00b-ux-contract/ux-acceptance.yaml` to at least one `journey_id` in `08-verification/playtester-journeys.md`, the citing phase, and one ledger row (missing rows block release).
- A dedicated **novice journey** in `08-verification/playtester-journeys.md` that runs the first-run path defined in `00b-ux-contract/first-run-path.md` with no provider configured and no user-supplied input; the journey must reach a useful screen or honestly record why this is impossible.
- Release gates listed in `.buildprint/release-gates.yaml` must be green.

## Stable vs free

- Stable: required verification categories and blocker semantics.
- Free: test framework tooling and CI platform details.

## Implementation scope

- Run the ordered verification stack:
  1. unit + state-transition tests;
  2. lint / typecheck;
  3. slop scan (AI residue: swallowed errors, narrative comments, any-casts, dead stubs);
  4. playtester journey per state in the state model (action-driven, action log + screenshots);
  5. write runtime ledger rows in `.buildprint/evidence/evidence-ledger.jsonl`.
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

- `08-verification/playtester-journeys.md` defines for each journey: `journey_id`, `states_to_visit[]`, `action_script`, `expected_outcome` per state, evidence (`log_path`, `screenshot_path`), and the list of `ux_ac_id`s covered. Journeys must be reproducible after repairs.
- One journey must be the novice journey: starts from a fresh app with no provider configured and no user input, follows `00b-ux-contract/first-run-path.md`, and exits with either a useful first screen or an honest recorded reason for impossibility.
- Every term in `00b-ux-contract/copy-quality-bar.md#jargon-ban` is scanned for on the product surface during the journey; un-aliased appearances are recorded as findings with file/line and screenshot.

## Blocks (ux-ui-craft)

- Playtester journeys defined but not fully executed or missing logs/screenshots.
- No novice journey, or a novice journey that requires provider config or user input without a recorded reason.
- A `ux_ac_id` from `00b-ux-contract/ux-acceptance.yaml` with no row in `.buildprint/ux-traceability.yaml`.

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

Only unit tests with no user journey, screenshots ignored after capture, passing build as product verification, handover that hides visible slop and unresolved blockers, verification claim without ledger row, exit code, or reproducible journey script artifact, missing novice journey, or a `ux_ac_id` left uncovered in `.buildprint/ux-traceability.yaml`.

## Repair routing

- failed check -> owning phase
- missing gate definition -> `02-project-setup.md`
- unresolved central failure -> `04-review.md`

## Unlock condition

Verification runs cover core loop, persistence continuity, provider honesty, and posture-relevant release blockers.
