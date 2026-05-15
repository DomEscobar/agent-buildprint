# Phase 07 — Validation and submission

Before submission:

- run a compact clean-room reversal when possible,
- use mocks/stubs for external services unless they are explicitly in scope,
- keep reversal small enough to finish; prefer 5-10 focused tests over a broad clone,
- run safe checks if available,
- if the output is a product/app/feature, set up the generated result locally and record the command/URL,
- if the result has browser UI, run Playwright CLI QA (`npx --yes @playwright/cli@latest ...`) and save snapshot/eval/screenshot evidence where possible,
- inspect generated files for secrets,
- ensure claims are labeled,
- ensure unknowns are explicit,
- ensure license and creator/source identity are clear,
- create `SUBMISSION_CHECKLIST.md`.

If blocked, say blocked. Do not fake pass status.

`REVERSAL_REPORT.md` must separate:

- Buildprint gaps: missing or ambiguous contracts in the extracted package,
- scratch harness issues: local TypeScript/test/dependency mistakes,
- intentional omissions: mocked or excluded systems.

If TypeScript + NodeNext is used in scratch, make test imports compatible with emitted JavaScript (`../src/file.js`) or use a valid no-emit `.ts` import setup.

## QA report

For product or feature Buildprints, create `QA_REPORT.md` in the generated package or proof folder. It should include:

- setup commands,
- local/public URL tested,
- Playwright CLI commands run,
- user journeys tested,
- pass/fail results,
- screenshots/snapshots or eval outputs when useful,
- defects grouped as Buildprint gaps, implementation bugs, or acceptable MVP omissions.

Do not count a browser UI as product-proofed until at least one realistic user journey has been run through Playwright CLI or a named blocker explains why that was impossible.
