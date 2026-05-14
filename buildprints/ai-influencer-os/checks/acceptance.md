# Acceptance Checks

A generated implementation is acceptable when all checks pass.

## Required files

- `persona/SOUL.md`
- `persona/CANON.md`
- `persona/BOUNDARIES.md`
- source modules for memory, self-state, context, planner, media policy, QA, mock publishing
- tests or validation script
- `VALIDATION.md`

## Behavioral checks

1. Ungrounded public post claims are blocked.
2. Grounded safe drafts can pass QA.
3. Mock publishing requires approval.
4. Low-trust sensitive/private media requests are blocked.
5. Persona canon is referenced by QA.
6. User memory is not written into public posts.
7. No external social/image API is required for tests.

## Command check

The implementation must provide one command such as:

```bash
npm test
```

or:

```bash
npm run validate
```
