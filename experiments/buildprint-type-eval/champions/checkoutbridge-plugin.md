# Track B Champion — CheckoutBridge Plugin / Integration Buildprints

Champion: **Developer-First Framework Buildprint**

Score: **47/50**

Run: `experiments/buildprint-type-eval/runs/checkoutbridge-round-001`

Scorecard: `experiments/buildprint-type-eval/runs/checkoutbridge-round-001/review/scorecard.md`

Leaderboard: `experiments/buildprint-type-eval/runs/checkoutbridge-round-001/review/leaderboard.md`

## Evidence

- Three blind variants were generated and run with the same harness shape: Developer-First Framework, Reliability-First Service, Integration-First Plugin.
- All three Codex agent executions exited successfully.
- Champion output path: `experiments/buildprint-type-eval/runs/checkoutbridge-round-001/outputs/alpha`.
- Checks for champion:
  - `npm start` passed and prints a local static UI file path.
  - `npm test` passed: 6/6 Node tests.
  - `npm run smoke` passed: configure -> create -> deliver -> redeliver/dedupe -> recover -> export.
- Static review found complete fake adapter, event store, idempotency guard, recovery transitions, masked audit export, optional API seam, and browser UI.
- Browser automation was not available: OpenClaw browser blocked `file://` and localhost navigation; Playwright was not installed. Static HTTP heads/source inspection were used instead.

## Why it won

The Developer-First Framework structure produced the most complete integration/plugin product: safe test-mode credential handling, clear fake-adapter seams, observable webhook idempotency, recovery controls for failure/refund/cancel paths, useful event/audit history, masked JSON trace export, and the strongest automated coverage.

## Known gaps

This is a narrow first champion, not a perfect endpoint:

- Static file start loop is acceptable but not as polished as a hosted local app.
- Browser click-through was not automated.
- Static UI state resets on refresh.
- Operator UX was reviewed statically rather than through live browser automation.

## Recommended synthesis if continuing

Combine:

1. alpha's framework/plugin seams;
2. beta's durable state-machine/readback posture;
3. gamma's secret-safety verification and operator docs discipline.

Then run one synthesis test only if the goal is to beat 47 rather than merely document a champion.
