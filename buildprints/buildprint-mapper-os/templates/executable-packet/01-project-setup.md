# 01 Project Setup

This is the foundation pour. Before any identity or phase code, create enough architecture, standards, local skill harness, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `02-ui-identity.md` or `03-phases/*` until setup has enough concrete decisions to guide coding and the project-local skill harness exists.

## Setup objective

Create the real base project structure for the artifact described by `blueprint.yaml`, `00-questions.md`, and the phase objectives. Choose a stack that can actually implement the product contract and golden path mirrored in `blueprint.yaml`. Define the module boundaries, persistence model, provider/runtime seams, commands, safety rules, and verification strategy. The goal is not to over-plan; the goal is to prevent the next agent from building generic slop.

The setup output should make the identity step and first implementation phase obvious: where code goes, what commands run, how state persists, what is mocked in tests, what is blocked in live mode, and what good enough to continue means.

Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, record applicable/not applicable gates, command/proof path, and blocker if missing inside `docs/architecture.md`. Do not add irrelevant gates just to look thorough. Matching gates need a real proof path or an honest blocker.

Initialize the local Buildprint skill harness before identity or phase work. `blueprint.yaml` declares `harness.profiles`; use those profiles as the source of truth. If `agb` is available, run `agb harness init .` with the declared `--profile` flags from `blueprint.yaml` or `.buildprint/next-agent.md`. Otherwise create the same project-local harness manually. The default harness must patch or create `AGENTS.md`, add local core skill files for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`, and place them in the portable `.agents/skills/` folder plus detected agent-specific folders such as `.codex/skills/` or `.claude/skills/`. Selected profiles add focused skills only when declared: `webapp`, `backend`, `agentic`, or `full`. Every skill must declare `triggers`, `skips`, and `completion_signal`; phase handoffs must include the relevant completion signal. Do not install global skills, clone third-party skill packs, or copy upstream skill files without an explicit user request.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` - local implementation constitution, mandatory read order, ownership map, no-fake rules, verification expectations, and Buildprint Skill Harness section.
- `.agents/skills/setup-runbook/SKILL.md`, `.agents/skills/frontend-ui-product-design/SKILL.md`, `.agents/skills/subagent-driven-implementation/SKILL.md`, and `.agents/skills/verify-and-review/SKILL.md`, plus selected profile skills and detected agent-specific copies such as `.codex/skills/**/SKILL.md` or `.claude/skills/**/SKILL.md`.
- `docs/architecture.md` - selected stack, runtime topology, adapters, persistence, deployment posture, state ownership, golden path, central output contract, proof strategy, selected typed quality gates, command/proof paths, blockers, and claim ceilings.
- `.env.example` - exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` - decisions made, assumptions, blockers, commands discovered, and identity-step readiness.

## DO NOT

- Do not start identity or feature phase code before foundation exists.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, or handover.
- Do not choose a stack only because it is familiar if it cannot prove the golden path.
- Do not hide hard-stop questions as assumptions.
- Do not skip `agb harness init .` or the equivalent manual local harness creation before identity or phase work.
- Do not skip `agb harness check .` after harness initialization or `agb harness checkup .` before phase implementation; record checkup warnings as setup blockers or accepted claim ceilings.
- Do not install global skills, clone third-party skill packs, symlink outside the project, or copy upstream skill text unless the user explicitly requests it.
- Do not create `docs/product-experience.md`, `docs/product-loop.md`, `docs/proof-matrix.md`, `docs/proof-strategy.md`, or `docs/output-quality.md`; keep setup decisions inside `docs/architecture.md`, `blueprint.yaml`, and handoff notes.
- Do not make a landing page when the product needs an operational product surface, API, CLI, worker, or runtime first.

## Minimum proof before moving on

- setup artifacts exist and are specific to this product;
- `AGENTS.md` has a Buildprint Skill Harness section;
- local core skill files exist for `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`;
- local skill frontmatter includes `triggers`, `skips`, and `completion_signal`;
- `agb harness check .` passes, and `agb harness checkup .` has no unresolved fail result before phase work;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/architecture.md` exists and names stack, runtime topology, persistence, providers, commands, central output contract, selected typed quality gates, proof surfaces, blockers, and claim ceilings;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- `02-ui-identity.md` can start without guessing the architecture or whether the local skill harness exists.
