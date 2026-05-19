# Phase 05 - QA And Handover

## Goal

Validate the binding slice, record honest evidence, and finish with a useful chat handover.

## Keep In Context

- `HEAD_TO_FOOT_QA.md`
- `BROWSER_QA_SCENARIOS.md`
- `PARITY_CLAIMS.md`
- `VALIDATION_TEMPLATE.md`
- `checks/acceptance.md`
- `AGENT_HANDOFF.md`

## Steps

1. Run unit/contract tests and production build.
2. Run real browser happy path and required negative paths.
3. Run secret/no-network/default-provider checks.
4. Fill `VALIDATION.md` from `VALIDATION_TEMPLATE.md`.
5. Fill or reference build/runtime reports required by `HEAD_TO_FOOT_QA.md`.
6. Check `checks/acceptance.md`.
7. Finish with chat handover: outcome, evidence, changed behavior, known gaps, and recommended next direction.

## Do Not

- mark tests passed when blocked or skipped;
- hide known gaps;
- claim Toonflow clone, provider parity, exact UI/canvas parity, Electron parity, or final stitched-video parity;
- force the user to open files to understand the run status.

## Exit Criteria

- required commands pass or blockers are recorded;
- visual QA and claim wording pass;
- final chat handover gives a clear next direction or says no next step is needed.

## Validation Evidence

- `VALIDATION.md`;
- command summaries;
- screenshot and manifest artifacts;
- final chat handover.

