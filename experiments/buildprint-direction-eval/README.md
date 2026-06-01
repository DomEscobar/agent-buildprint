# Buildprint Direction Evaluation

Purpose: stop patching Buildprint philosophy by vibe. This experiment tests whether a Buildprint direction makes coding agents build a better product.

The object under test is not the packet checker, file count, or self-reported evidence. The object under test is the product built by an agent from a Buildprint.

## Core hypothesis

A Buildprint direction is correct only if it produces a better implemented product under controlled conditions.

A better implemented product means a blind reviewer scores the resulting app higher on product-quality dimensions that matter to the original product promise.

## Test subject

Primary specimen: `buildprints/novel-storyboard` / MiroFish-style storyboard workbench.

Why this specimen:

- It has a clear end-to-end product loop: intake -> graph/workbench -> simulation/runtime -> report/storyboard -> interaction/history.
- It exposes common LLM failure modes: decorative graphs, generic dashboards, fake intelligence, dead controls, missing persistence, raw debug UI, proof theater.
- Existing outputs and product-quality observations already give us a baseline.

## Variants

Each variant targets the same product and uses the same broad structure unless explicitly testing structure:

- A — Current proof-heavy Buildprint control.
- B — Same structure, rewritten content: setup/questions/phases/review/handover stay, but evidence theater is replaced with product leadership, craftsmanship alignment, concrete anti-patterns, and phase-flow judgment.
- C — Minimal/compressed Buildprint challenger. Included only if we want to test whether structure size itself matters; not assumed correct.

The first decision should be A vs B. C is optional after B proves whether content style matters.

## Non-negotiable controls

- Same coding agent/model family.
- Same wall-clock or token budget.
- Same starting environment.
- Same target product promise.
- No human mid-run coaching except identical unblock policy.
- Reviewer should not know which variant produced which output.
- Product output is scored before reading the agent's self-report.

## Pass/fail decision

B beats A only if it scores higher by at least 20% total or wins at least 5 of 7 dimensions without a critical regression.

A critical regression is one of:

- app does not run locally;
- central artifact is decorative/non-functional;
- core loop cannot be completed;
- output fabricates live-provider behavior;
- obvious dead controls dominate the UI.

If B does not beat A, do not rewrite Mapper OS around B. Diagnose the failed assumption first.

## Anti-fix

Do not tune the checker to prefer our favorite packet prose. Do not add more proof files because a product was bad. Do not let the agent grade itself. Do not declare victory because generated Markdown sounds better.

The only win condition is better built product.
