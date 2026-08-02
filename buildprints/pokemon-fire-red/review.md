# Contract Review

Independent review is mandatory before claiming done. The builder must not score its own work.

## Reviewer independence

Use a fresh-context reviewer — a dispatched subagent or a new agent session that did not implement the artifact.

Provide only:

- `00-goal.md` (goal + acceptance criteria)
- active loop contract(s) / Building objectives that claim completion
- diff and proof artifacts (commands, screenshots, readbacks)
- `02-identity.md` / generated identity when UI-bearing

Do **not** provide builder chat or builder rationale.

The review note must include a `## Reviewer independence` section. If the same agent/session that implemented the artifact performed the review, record `REVIEW_INVALID` and fail.

## What to judge

Pass or fail against the contract: goal/acceptance, central output quality, anti-fake-success, honest blockers, and identity fit when UI-bearing.

Do not invent an evidence ledger or claim-gates JSON product.

## Outcomes

- `loop_core_passed` — local loops proved their paths
- `claim_qualified` — independent review passes and claim ceiling matches evidence
- `blocked` — external missing dependency
- `REVIEW_INVALID` — reviewer was not independent
