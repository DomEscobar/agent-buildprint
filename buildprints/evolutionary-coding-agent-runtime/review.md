# Contract Review

Independent review is mandatory before claiming capability install success. The builder must not score its own work.

## Reviewer independence

Use a fresh-context reviewer. Provide only `00-goal.md`, `01-host.md`, active loop contracts, diff/proof, and `capability.yaml`. Do not provide builder chat or builder rationale.

Include a `## Reviewer independence` section. Same-session self-review is `REVIEW_INVALID`.

## What to judge

- Goal/acceptance met or honestly blocked
- Bounded capability scope preserved
- Verify structural/runtime checks match claims
- No plaintext secrets or forbidden apply actions
- Claim ceiling reconciled (downgrade when partial)

Do not invent evidence ledgers. Reconcile assessment assumptions with proof; downgrade claim ceiling when blocked or not-proven.

## Outcomes

- `loop_core_passed`
- `claim_qualified`
- `blocked`
- `REVIEW_INVALID`
