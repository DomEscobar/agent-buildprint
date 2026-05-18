# Mapper OS Quality Policy

Mapper OS optimizes for precision over coverage. A generated Buildprint should be useful because it captures edges, invariants, and validation gates — not because it summarizes many files.

## Quality bar

A publishable Mapper OS output must include:

- production-grade selected-scope posture: smaller scope is allowed, proof-only implementation is not product behavior,
- evidence-backed claims with `OBSERVED(path:line)` citations,
- explicit `INFERRED` claims where behavior is synthesized,
- `QUESTION` items for product decisions and ambiguous rules,
- module boundaries and dependency direction,
- state machines or lifecycle phases for non-trivial workflows,
- edge cases and failure modes,
- data/schema contracts,
- side effects and rollback/idempotency rules,
- permission/security boundaries,
- test and QA gates,
- no-fake implementation gates for product/app/feature scopes,
- known gaps and confidence levels.

## Edge-case inventory

For every selected product/module scope, inspect and document:

- empty/null/default input behavior,
- invalid input and validation errors,
- loading/pending/partial states,
- retry and cancellation behavior,
- concurrency and duplicate-action behavior,
- persistence failures and recovery,
- auth/permission denial,
- external provider failure or timeout,
- offline/local-only behavior if relevant,
- destructive action confirmation/undo/rollback,
- import/export compatibility and malformed files,
- accessibility and keyboard flows for UI products,
- mobile/responsive behavior when product-relevant,
- observability/audit/logging expectations.

If an edge is not evidenced, mark it `QUESTION` or `INFERRED`; do not invent it as fact.

## Evidence density

For each critical module, include at least:

- 3-7 primary evidence citations for responsibilities and contracts,
- 1-3 citations for tests/checks if present,
- explicit unknowns when evidence is missing.

Do not cite every file mechanically. Cite the files that prove architecture, contracts, and edge behavior.

## Confidence rubric

Use confidence per module/claim:

- `high`: directly evidenced by source code/tests/docs,
- `medium`: inferred from multiple observed facts but not directly specified,
- `low`: plausible but weakly evidenced,
- `unknown`: insufficient evidence.

Low/unknown items must not become hard Buildprint requirements unless the user confirms them.

## No-fake implementation bar

For product/app/feature Buildprints:

- Scope cuts must remove capabilities, not fake them.
- Mocks are allowed only as test/demo fixtures, never as claimed product behavior.
- Included routes must be real pages/handlers, not shaped links.
- Included controls must perform real state changes or real validated side effects.
- Included persistence must survive restart/reload through a durable adapter when product data is claimed.
- Included providers/exports/queues/auth/billing/uploads/admin surfaces must be real or explicitly excluded.
- Placeholder, `TODO`, `coming soon`, skeleton adapter, no-op, fake success, and in-memory-only product paths block production-grade claims.

## Product proof bar

For product/feature Buildprints, validation is incomplete until:

1. a clean-room implementation is created from the Buildprint only,
2. it runs on the user's machine,
3. unit/build checks pass or blockers are explicit,
4. browser UI is tested with Playwright CLI when applicable,
5. persistence/restart behavior is tested when product state exists,
6. no-fake implementation scan passes for included capabilities,
7. QA defects are fed back into the Buildprint as gaps or acceptance criteria.

A rough one-shot-looking demo is not enough. Product proof must show the Buildprint improved systematic iteration: architecture, modules, evidence, real included capabilities, QA, and gap closure.
