# 01 Setup

Foundation pour before identity or loop work. Do not start `02-identity.md` or `loops/*` until this setup produces a real project skeleton, local skill harness, architecture notes, env contract, and setup receipt.

## Objective

Create enough foundation to run the first loop:

1. Initialize the project and local Buildprint skill harness (`agb harness init` with profiles from `blueprint.yaml`, then `agb harness checkup`).
2. Ensure root `AGENTS.md` and `.agents/skills/` contain the core skills: `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, `verify-and-review` — each with triggers, skips, and completion_signal.
3. Write `docs/architecture.md` naming main modules, seams, commands, and coding standards enforcement (lint/format/type-check). Deepen only as loops demand — do not build an architecture garden theater before the first loop.
4. For UI-bearing artifacts, record Framework And Styling Decisions when chosen (defaults: React + Vite + TypeScript; Tailwind CSS v4 + tokenized CSS variables unless host/source proves otherwise). Static DOM/plain CSS needs an explicit `ui_stack_exception`.
5. Create `.env.example` with blank secret placeholders and honest required/optional notes.
6. Route `proven_implementation_requirements` from `blueprint.yaml` into architecture: name hard domains and proven library/runtime categories.
7. Route applicable `typed_quality_gates` with command/proof paths or mark not applicable.
8. Write `.buildprint/setup-receipt.md` and ensure `.buildprint/decisions.md` has hard-stop answers (not the empty stub).
9. Record claim ceilings: what this setup does and does not prove.

## DO NOT

- Do not invent placeholder commands that cannot run.
- Do not store real secrets in the repo.
- Do not hide unanswered hard-stops behind assumable defaults.
- Do not start loops before the harness and setup receipt exist.
- Do not generate UI identity here — that belongs in `02-identity.md`.
- Do not require production harness maturity (budgets, swarm ledgers, trust zones) as setup floor.

## Proof

- Harness checkup passes or blockers are honest.
- Architecture, env example, and setup receipt exist.
- Decisions hard-stops are filled or blocked.
