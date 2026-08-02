# Contract Review

Independent review is mandatory before claiming done. The builder must not score its own work.

## Reviewer independence

Use a fresh-context reviewer — a dispatched subagent or a new agent session that did not implement the artifact.

Provide only:

- `00-goal.md` (goal + acceptance criteria)
- active loop contract(s) / Building objectives that claim completion
- diff and proof artifacts (commands, screenshots, readbacks)
- `02-identity.md` / generated identity when UI-bearing

Do **not** provide builder chat, builder rationale, or self-graded scores.

The review note must include a `## Reviewer independence` section recording who reviewed, what inputs were provided, and confirmation that builder rationale was excluded. If the same agent/session that implemented the artifact performed the review, record `REVIEW_INVALID` and fail regardless of other findings.

## What to judge

Pass or fail against the contract:

1. Does the artifact meet the goal and acceptance criteria?
2. Is the central output specific and useful, not domain-generic filler?
3. Are fake-success paths absent (placeholders, dead controls, mocked-as-live, raw JSON-as-UX)?
4. Are blockers honest where live proof is missing?
5. For UI-bearing work: does the surface match identity without generic dashboard/proof-console collapse?

Do not invent an evidence ledger or claim-gates JSON product. Cite concrete proof paths or source evidence for findings.

## Outcomes

- `loop_core_passed` — local loops proved their paths
- `claim_qualified` — independent review passes and claim ceiling matches evidence
- `blocked` — external missing dependency/credential/decision
- `REVIEW_INVALID` — reviewer was not independent

## Repair

On fail: name the flaw, patch the smallest real fix, rerun relevant proof, resubmit to an independent reviewer. Cap at five repair iterations unless externally blocked.
