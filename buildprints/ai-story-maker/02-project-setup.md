# 02 Project Setup

This is the foundation pour. Before any phase code, create enough architecture, standards, UI identity, local skill harness, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `01-ui-identity.md`
- the local `docs/ui-identity.md` or `UI-IDENTITY.md` generated from `01-ui-identity.md`
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `03-phases/*` until setup has enough concrete decisions to guide coding and the project-local skill harness exists.

## Setup objective

Create the real base project structure for AI Story Maker as described by `blueprint.yaml`, `00-questions.md`, and the phase objectives. Choose a stack that can implement a browser story-making surface with intake, story-memory graph, outline/storyboard board, editable generated scenes, provider boundaries, durable local projects, export/readback, and honest blocked states. The implementation may use any production-capable webapp stack, but it must support typed UI/API boundaries, persisted project state, background or queued generation work, provider configuration checks, and browser verification.

The setup output should make the first phase obvious: where code goes, what commands run, how story files persist, how provider calls are separated from deterministic tests, how exports are opened or parsed back, and what proof is needed before a claim can upgrade. Setup must preserve the generated UI identity: route names, component names, fixtures, visible copy, and proof screenshots should use writer-facing language, not evaluator language. It must also establish progressive disclosure plus task-flow information architecture inside `docs/ui-identity.md` before UI code begins: each screen state needs one dominant creative surface, one supporting context surface, and one action/status surface at most. Intake, story world, cast, outline, storyboard, scene drafting, continuity, provider setup, export, and coach conversation are product capabilities, not permission to render every capability on one permanent page.

The product contract is not a generic writing prompt form. AI Story Maker needs a coherent story-making flow: a premise and seed notes create a story world, cast, relationships, outline, scenes, revision handles, continuity review, export package, and post-output questions. Setup must establish source-independent domain models for story file, character, relationship, chapter, scene, storyboard card, generation run, provider status, export artifact, and log event. The central output contract stays in `blueprint.yaml`; do not create another generated output-quality document.

Initialize the local Buildprint skill harness before phase work. If `agb` is available, run `agb harness init .`; otherwise create the same project-local harness manually. The harness must patch or create `AGENTS.md`, add local skill files for `frontend-ui-product-design` and `subagent-driven-implementation`, and place them in the portable `.agents/skills/` folder plus detected agent-specific folders such as `.codex/skills/` or `.claude/skills/`. Do not install global skills, clone third-party skill packs, or copy upstream skill files without an explicit user request.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` - local implementation constitution, mandatory read order, ownership map, no-fake rules, and verification expectations.
- `.agents/skills/frontend-ui-product-design/SKILL.md` and `.agents/skills/subagent-driven-implementation/SKILL.md`, plus detected agent-specific copies such as `.codex/skills/**/SKILL.md` or `.claude/skills/**/SKILL.md`.
- `docs/architecture.md` - selected stack, runtime topology, adapters, persistence, deployment posture, state ownership, command list, proof surfaces, and claim ceilings.
- `docs/ui-identity.md` or `UI-IDENTITY.md` - generated before setup; preserve and refine only if setup uncovers a contradiction. It must include first-run comprehension, user-language map, visual identity, interaction model, motion, accessibility, empty/loading/error/blocked states, story drafting stress fixtures, and anti-generic shell rules.
- `.env.example` - exact env names with blank secrets and no mock/test mode enabled by default.
- `.buildprint/setup-receipt.md` - decisions made, assumptions, blockers, commands discovered, and first phase readiness.

## DO NOT

- Do not start feature phase code before foundation exists.
- Do not create placeholder commands that silently pass.
- Do not put real secrets in `.env.example`, docs, tests, logs, screenshots, generated scenes, or handover.
- Do not hide hard-stop questions as assumptions.
- Do not choose a stack that cannot prove editable story state, provider blocking, and export readback.
- Do not overwrite the generated UI identity with generic setup defaults.
- Do not skip `agb harness init .` or the equivalent manual local harness creation before phase work.
- Do not install global skills, clone third-party skill packs, symlink outside the project, or copy upstream skill text unless the user explicitly requests it.
- Do not name routes, components, fixtures, or screenshots around dashboard/workbench/panel/inspector concepts unless `docs/ui-identity.md` proves those names are subordinate to a stronger creative concept and screen-state budget.
- Do not create `docs/product-experience.md`, `docs/product-loop.md`, `docs/proof-matrix.md`, `docs/proof-strategy.md`, or `docs/output-quality.md`; keep those decisions inside `docs/ui-identity.md`, `docs/architecture.md`, `blueprint.yaml`, and handoff notes.
- Do not make a marketing landing page when the product needs a working story-making surface as the first screen.
- Do not count deterministic/sample story content as live provider proof or story-quality proof.

## Minimum proof before moving on

- setup artifacts exist and are specific to AI Story Maker;
- `AGENTS.md` has a Buildprint Skill Harness section;
- local skill files exist for `frontend-ui-product-design` and `subagent-driven-implementation`;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/architecture.md` exists and names stack, runtime topology, persistence, providers, commands, proof surfaces, and claim ceilings;
- UI-bearing artifacts have `docs/ui-identity.md` or equivalent generated from `01-ui-identity.md`, including first-run comprehension, user-language map, screen states, dominant object, primary gesture, forbidden default silhouette, hidden/reachable surfaces, and visible-together exclusions;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- next active phase can start without guessing the architecture.
