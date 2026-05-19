# Phase 07 - Validation and Submission

## Goal

Prove the mapped package honestly and finish with a useful handover.

## Keep in context

- `TEST_MATRIX.md`
- `VALIDATION_TEMPLATE.md`
- `checks/acceptance.md`
- `policies/quality.md`

## Steps

- Run a compact clean-room reversal when possible.
- Run safe checks, tests, build, browser/runtime QA, persistence/restart QA, and no-fake scan when applicable.
- Run mapper golden evals when mapper behavior changed: `node buildprints/buildprint-mapper-os/evals/check-map.mjs --agb ./bin/agb.js`.
- Separate Buildprint gaps, scratch harness issues, product proof defects, and intentional omissions.
- Finish with chat handover.

## Do not

- Fake pass status.
- Count mocks/stubs/fixtures as product implementation.
- Hide known gaps.
- Claim full parity without explicit evidence.

## Exit criteria

- Validation report records exact commands or blockers.
- Acceptance checklist is complete or blocked.
- Final chat handover includes outcome, selected scope, evidence inspected, files generated, commands/evals run, known gaps, and recommended next direction.

## Validation evidence

- `REVERSAL_REPORT.md`, `QA_REPORT.md`, `VALIDATION_TEMPLATE.md`, and chat handover where applicable.
