# Vision: Buildprint Mapper

Buildprint Mapper should make AI builders better at reconstruction, not better at filling schemas.

The target output is a short executable packet for a product-minded coding agent. It teaches the goal, first successful loop, setup posture, UI/operator identity when needed, independent fan-out, contract review, and honest handover — without burying the builder in orchestration paperwork or source baggage.

## Why kernel-loop

Strong results come from four primitives:

1. **Goal** — one observable outcome and acceptance criteria
2. **Bare agentic loop** — think → act → observe until done or stuck
3. **Independent subagent fan-out** — clean ownership when work splits
4. **Contract-based review** — a fresh-context reviewer checks the result against the goal and loop contract

Phases as heavy manuals optimized for orchestration completeness. Tiny v2 docs compressed judgment into filenames. The kernel shape keeps routing in YAML and judgment in Markdown, but the unit of work is a **named loop**, not a phase bureaucracy.

Production maturity (budgets, receipts, swarm ledgers, trust zones) is an upgrade claimed with proof — never the path to first success.

## Why BUILDPRINT.md is generic

A downstream builder needs the first file to orient behavior: you are responsible, perfection matters, fake success is not allowed, read in this order. Product-specific details belong after that orientation. If the first file carries mapped-source names or implementation trivia, the builder imitates stale source context instead of building the selected artifact.

## Why identity still matters

UX is not polish after the real work. For UI-bearing artifacts, `02-identity.md` defines metaphor, primary gesture, and visual/operator contract before loops ship UI. Setup still initializes the local skill harness: `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation` for clean fan-out, and `verify-and-review` for contract review. Loops keep identity open so design responsibility survives backend work.

## Desired downstream behavior

A fresh coding agent should:

1. read the generic AI-builder briefing and read order;
2. lock the goal and hard-stop answers in `00-goal.md`;
3. create minimal setup and the local skill harness;
4. read identity when the artifact is UI-bearing;
5. load only the active loop;
6. run a bare agentic loop against the goal;
7. fan out independent subagents only when ownership is clean;
8. verify directly;
9. run independent contract review against goal + loop contract;
10. record a concise, honest handover.
