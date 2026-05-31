# Runbook

## Phase 0 — Freeze the experiment before changing Mapper OS

1. Choose variants A and B.
2. Choose one coding agent/model and budget.
3. Choose output dirs with anonymous labels, e.g. `run-alpha`, `run-beta`.
4. Commit or otherwise snapshot the variant inputs locally before agent runs.

## Phase 1 — Prepare variant packets

A: use the current `buildprints/novel-storyboard` packet as-is.

B: create an alternate packet with the same broad structure:

- `BUILDPRINT.md`
- `01-questions.md`
- `02-project-setup.md`
- `03-phases/phase-flow.md`
- phase files
- `04-review.md` or final reviewer phase
- `05-handover.md` or handover instructions

But rewrite the content away from proof theater and toward product leadership, craftsmanship, taste, anti-patterns, and usable slice completion.

Do not optimize B for the scorecard after seeing A's output.

## Phase 2 — Run coding agents

For each variant:

1. Bootstrap/copy the packet into a clean output directory.
2. Give the agent the same build instruction:
   - build locally only;
   - use the packet as source of truth;
   - run the strongest local gates;
   - stop when budget expires or product is locally runnable;
   - write handover.
3. Do not intervene except for environment blockers under the same policy for every run.

## Phase 3 — Blind review

1. Rename outputs to anonymous labels.
2. Start the app if possible.
3. Score product first using `scorecard.md`.
4. Only after scoring, read handover/proof docs.
5. Record concrete defects and screenshots.

## Phase 4 — Decision

Compare A vs B.

- If B wins clearly: rewrite Mapper OS around the winning principles, then run a second specimen before publishing the direction as durable.
- If B ties: the rewrite is not strong enough; inspect actual output failures, not packet text.
- If A wins: proof/heavy structure may be doing useful sequencing work; isolate which part helped before removing it.

## Phase 5 — Second specimen before durable architecture change

Do not generalize from one app. Repeat on one different product type before major Mapper OS architecture changes.

Good second specimen properties:

- different UI shape;
- still has clear central artifact;
- can run locally without paid credentials;
- exposes fake-compliance failure modes.
