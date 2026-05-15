# Phase 05 — Single Buildprint extraction

For a selected candidate, generate one `buildprint-submission/` package.

Rules:

- include only relevant paths and facts,
- mark unrelated areas as out of scope,
- make phases actionable,
- include contracts and checks,
- include questions for uncertain business rules.


## Max-quality extraction checklist

Before writing the final package, inspect and record:

- core happy path,
- all observed edge cases,
- validation and error messages,
- permissions and destructive actions,
- persistence and idempotency rules,
- external side-effect boundaries,
- state transitions and history/undo behavior if present,
- existing test coverage and missing tests,
- realistic QA journeys for browser UI.

Do not use vague acceptance criteria like “works correctly.” Make each check executable or manually verifiable.
