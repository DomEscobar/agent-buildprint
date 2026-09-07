# Independent contract review

The builder must not score its own work. A fresh-context reviewer is a separate agent/session that did not implement the artifact. Supply `00-goal.md`, active loop contracts, `02-identity.md`, immutable diff/build and proof only; exclude builder chat and builder rationale.

## Reviewer independence
Record reviewer identity/session, code revision, build and loaded manifest/asset hashes, review time and input list. Same implementing session means **REVIEW_INVALID**. No reviewer available means review blocked, not implicitly passed.

Judge input-driven core-loop completion, bounded scope, identity in motion, source rights, shared production validation, device and deployment truth against `references/qa.md`. Re-run a negative case and one complete play path independently. Report concrete failing contract + reproduction + severity, not a numeric self-score. Do not require a second evidence product; use `templates/milestone-evidence.md` and HANDOVER.

- `loop_core_passed`: local affected path proved; no release qualification implied.
- `claim_qualified`: independent review passes for explicitly named scope and immutable evidence.
- `blocked`: missing external decision, device, service or reviewer limits the claim.
- `REVIEW_INVALID`: review was not independent; redo with a separate reviewer.

Check the Asset-Maker quality gate in `references/qa.md`, including both exact WaveSpeed models, actual-access evidence, paid-use approval and disclosed free-only fallbacks with unchanged visual QA; reject interchangeable-provider claims or silent downgrades.

Authored-packet review checks routing, runnable fixtures/negative cases, instructions and honesty. It cannot certify a future game, provider integration or deployment.
