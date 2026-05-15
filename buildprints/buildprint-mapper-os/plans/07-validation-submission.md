# Phase 07 — Validation and submission

Before submission:

- run a compact clean-room reversal when possible,
- use mocks/stubs for external services unless they are explicitly in scope,
- keep reversal small enough to finish; prefer 5-10 focused tests over a broad clone,
- run safe checks if available,
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
