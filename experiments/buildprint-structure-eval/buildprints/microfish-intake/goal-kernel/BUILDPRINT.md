# Goal-Kernel Buildprint — Microfish Intake Slice

## Operating rule

Make `GOAL.md` true. Do not stop because files exist, tests pass once, or the UI looks plausible. Stop only when the goal is demonstrably true under `ACCEPTANCE.md` and `VERIFY.md`, or when an honest blocker is recorded.

## Required read order

1. `BUILDPRINT.md`
2. `PRODUCT_SLICE.md`
3. `GOAL.md`
4. `ACCEPTANCE.md`
5. `VERIFY.md`
6. `HUMAN_REVIEW.md`
7. `HANDOVER.md`

## Build loop

```text
read goal -> build smallest real slice -> verify -> inspect gap -> repair -> verify again -> handover
```

## Stop/ask rules

Ask only for missing credentials, external sends/publishes, destructive actions, irreversible decisions, or impossible environment constraints.

If provider credentials are absent, implement deterministic local adapters and mark live proof blocked. Missing credentials must not collapse the local product slice.
