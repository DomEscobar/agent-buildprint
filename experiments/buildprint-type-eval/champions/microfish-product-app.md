# Track A Champion — Microfish Product App Buildprints

Champion: **Consumer-First Product System / Consumer-First Phased Buildprint**

Score: **47/50**

Source run: `experiments/buildprint-structure-eval/runs/microfish-intake-ux-architecture-001`

Source scorecard: `experiments/buildprint-structure-eval/runs/microfish-intake-ux-architecture-001/review/scorecard.md`

Source leaderboard: `experiments/buildprint-structure-eval/runs/microfish-intake-ux-architecture-001/review/leaderboard.md`

Type-eval structure: `experiments/buildprint-type-eval/buildprints/product-app/consumer-first-product-system/BUILDPRINT.md`

## Evidence

- Three blind product-app Buildprint variants were compared on the Microfish normal-user intake + analysis slice.
- Winner mapping after reveal: `gamma` = Consumer-First Phased Buildprint.
- Browser review completed through served `dist/`: paste notes -> Analyze notes -> first read -> changed notes affected output -> reload restored previous work -> JSON download worked.
- Gates for the champion: `npm run build` passed and `npm test` passed; an independent browser review succeeded after the agent run was interrupted.
- Product evidence supported the normal-user loop: one dominant action, no technical/provider jargon before value, plain-language People / Topics / Risks / Next step output, local persistence/readback, export, and modular TypeScript structure.

## Why it won

Consumer-First produced the clearest first successful loop for a normal user while keeping enough architecture and verification discipline to avoid the previous expert-dashboard failure mode.

## Known gaps

- Agent execution was interrupted and required manual verification after the fact.
- Champion smoke script had a Playwright selector timeout, even though the independent browser review succeeded.
- Architecture score was good but weaker than the Product-Architecture runner-up.

## Next useful synthesis if continuing

Do not run random Track A variants just to churn. The concrete next candidate should combine Consumer-First's normal-user first loop with Product-Architecture's stronger modular/gate discipline:

1. `00-alignment`: stack, modular architecture, product slice, quality bar.
2. `01-first-run-ux`: 10-second clarity, one primary action, no jargon.
3. `02-outcome-simulation`: failure map/replay, plain-language result story.
4. `03-domain-state-export`: input-output causality, persistence, export.
5. `04-architecture-garden`: seams/tests/refactor budget.
6. `05-verify-handover`: build/test/smoke/screenshot, honest blockers.
