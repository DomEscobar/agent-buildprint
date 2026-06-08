# 02 Project Setup

This is the foundation pour. Before any phase code, create enough architecture, standards, UI identity, local skill harness, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `01-ui-identity.md`
- the local `docs/ui-identity.md` or `UI-IDENTITY.md` generated from `01-ui-identity.md` when the artifact is UI-bearing
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `03-phases/*` until setup has enough concrete decisions to guide coding and the project-local skill harness exists.

## Setup objective

Create the real base project structure for the artifact described by `blueprint.yaml`, `00-questions.md`, the generated UI identity, and the phase objectives. Choose a stack that can actually implement the product contract and golden path mirrored in `blueprint.yaml`. Define the module boundaries, persistence model, provider/runtime seams, commands, safety rules, and verification strategy. The goal is not to over-plan; the goal is to prevent the next agent from building generic slop.

The setup output should make the first phase obvious: where code goes, what commands run, how state persists, what is mocked in tests, what is blocked in live mode, and what good enough to continue means. Setup must preserve the generated UI identity: route names, component names, fixtures, visible copy, and proof screenshots should follow the user-language map instead of leaking internal evaluator terms.

Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, record applicable/not applicable gates, command/proof path, and blocker if missing inside `docs/architecture.md`. Do not add irrelevant gates just to look thorough. If the artifact is UI-bearing, generative, editor-like, or integration/operator-facing, the corresponding gate needs a real proof path or an honest blocker.

Initialize the local Buildprint skill harness before phase work. If `agb` is available, run `agb harness init .`; otherwise create the same project-local harness manually. The harness must patch or create `AGENTS.md`, add local skill files for `frontend-ui-product-design` and `subagent-driven-implementation`, and place them in the portable `.agents/skills/` folder plus detected agent-specific folders such as `.codex/skills/` or `.claude/skills/`. Do not install global skills, clone third-party skill packs, or copy upstream skill files without an explicit user request.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` — local implementation constitution, mandatory read order, ownership map, no-fake rules, and verification expectations.
- `.agents/skills/frontend-ui-product-design/SKILL.md` and `.agents/skills/subagent-driven-implementation/SKILL.md`, plus detected agent-specific copies such as `.codex/skills/**/SKILL.md` or `.claude/skills/**/SKILL.md`.
- `docs/architecture.md` — selected stack, runtime topology, adapters, persistence, deployment posture, state ownership, golden path, central output contract, proof strategy, selected typed quality gates, command/proof paths, blockers, and claim ceilings.
- `docs/ui-identity.md` or `UI-IDENTITY.md` — required for UI-bearing products and generated before setup; preserve and refine only if setup uncovers a contradiction. It must include first-run comprehension, user-language map, visual identity, interaction model, motion, accessibility, empty/loading/error/blocked states, screen states, dominant object, primary gesture, hidden/reachable surfaces, visible-together exclusions, and forbidden default silhouette.
- `.env.example` — exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` — decisions made, assumptions, blockers, commands discovered, and first phase readiness.

## DO NOT

- Do not start feature phase code before foundation exists.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, or handover.
- Do not choose a stack only because it is familiar if it cannot prove the golden path.
- Do not hide hard-stop questions as assumptions.
- Do not overwrite the generated UI identity with generic setup defaults.
- Do not skip `agb harness init .` or the equivalent manual local harness creation before phase work.
- Do not install global skills, clone third-party skill packs, symlink outside the project, or copy upstream skill text unless the user explicitly requests it.
- Do not name routes, components, fixtures, or screenshots around dashboard/workbench/panel/inspector concepts unless `docs/ui-identity.md` proves those names are subordinate to a stronger product metaphor, primary gesture, and screen-state budget.
- Do not create `docs/product-experience.md`, `docs/product-loop.md`, `docs/proof-matrix.md`, `docs/proof-strategy.md`, or `docs/output-quality.md`; keep those decisions inside `docs/ui-identity.md`, `docs/architecture.md`, `blueprint.yaml`, and handoff notes.
- Do not make a landing page when the product needs an operational product surface, API, CLI, worker, or runtime first.

## Minimum proof before moving on

- setup artifacts exist and are specific to this product;
- `AGENTS.md` has a Buildprint Skill Harness section;
- local skill files exist for `frontend-ui-product-design` and `subagent-driven-implementation`;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/architecture.md` exists and names stack, runtime topology, persistence, providers, commands, central output contract, selected typed quality gates, proof surfaces, blockers, and claim ceilings;
- UI-bearing artifacts have `docs/ui-identity.md` or equivalent generated from `01-ui-identity.md`, including first-run comprehension, user-language map, screen states, dominant object, primary gesture, forbidden default silhouette, hidden/reachable surfaces, and visible-together exclusions;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- next active phase can start without guessing the architecture.
