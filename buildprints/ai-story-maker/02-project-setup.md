# 02 Project Setup

This is the foundation pour. Before any phase code, create enough architecture, standards, UI identity, proof strategy, and local commands that future agents cannot invent a random project shape.

## How to implement setup

Before writing code, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `01-ui-identity.md`
- the local `docs/ui-identity.md` or `UI-IDENTITY.md` generated from `01-ui-identity.md`
- current workspace or target project `AGENTS.md` if present

Then create or update the implementation project foundation. Do not start `03-phases/*` until setup has enough concrete decisions to guide coding.

## Setup objective

Create the real base project structure for AI Story Maker as described by `blueprint.yaml`, `00-questions.md`, and the phase objectives. Choose a stack that can implement a browser story-making surface with intake, story-memory graph, outline/storyboard board, editable generated scenes, provider boundaries, durable local projects, export/readback, and honest blocked states. The implementation may use any production-capable webapp stack, but it must support typed UI/API boundaries, persisted project state, background or queued generation work, provider configuration checks, and browser verification.

The setup output should make the first phase obvious: where code goes, what commands run, how story packages persist, how provider calls are separated from deterministic tests, how exports are opened or parsed back, and what proof is needed before a claim can upgrade. Setup must preserve the generated UI identity: route names, component names, fixtures, visible copy, and proof screenshots should use writer-facing language, not evaluator language. It must also establish progressive disclosure plus task-flow information architecture before UI code begins: each screen state needs one dominant creative surface, one supporting context surface, and one action/status surface at most. Intake, story world, cast, outline, storyboard, scene drafting, continuity, provider setup, export, and coach conversation are product capabilities, not permission to render every capability on one permanent page. Use `typed_quality_gates` in `blueprint.yaml` as a selector, not as decoration. During setup, write a short proof matrix that marks each selected gate applicable/not applicable, names the command/proof path, and records any blocker. The applicable gates for this packet are UI identity precision, first-run comprehension, visual viewport acceptance, editor/content stress acceptance, semantic output acceptance, integration/operator acceptance, and critical review pushback. If one is not applicable to the chosen implementation, explain why in the matrix instead of deleting the obligation.

The product contract is not a generic writing prompt form. AI Story Maker needs a coherent story-making flow: a premise and seed notes create a story world, cast, relationships, outline, scenes, revision handles, continuity review, export package, and post-output questions. Setup must establish source-independent domain models for story package, character, relationship, chapter, scene, storyboard card, generation run, provider status, export artifact, and audit/log event. The central output contract belongs in `docs/output-quality.md`; setup should copy the product-specific primitives and reviewer questions from `blueprint.yaml` into a local artifact that implementers can test against.

## Required setup artifacts

Create these in the implementation project unless the project already has equivalent stronger files:

- `AGENTS.md` - local implementation constitution, mandatory read order, ownership map, no-fake rules, and verification expectations.
- `docs/architecture.md` - selected stack, runtime topology, adapters, persistence, deployment posture, and state ownership.
- `docs/product-loop.md` - golden path and primary writer journey.
- `docs/product-experience.md` - required for UI-bearing artifacts; primary screen sketch in prose, screen-state inventory, task-flow navigation model, dominant object, primary gesture, top three interactions, forbidden default silhouette, old/default layout patterns that must not appear, what is visible now, what is reachable but hidden, what moves to detail/modal/step/route surfaces, what must not be visible together, and what the UI must make impossible to confuse.
- `docs/output-quality.md` - central output, output primitives, quality signals, unacceptable generic substitutes, reviewer acceptance questions, and claim ceilings.
- `docs/proof-strategy.md` - commands/tests/browser/API proof, screenshot criteria, provider blocker semantics, export readback, and what cannot upgrade claims.
- `docs/proof-matrix.md` - selected typed_quality_gates from `blueprint.yaml`, each marked applicable/not applicable, with command/proof path and current blocker if missing.
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
- Do not name routes, components, fixtures, or screenshots around dashboard/workbench/panel/inspector concepts unless `docs/product-experience.md` proves those names are subordinate to a stronger creative concept and screen-state budget.
- Do not make a marketing landing page when the product needs a working story-making surface as the first screen.
- Do not count deterministic/sample story content as live provider proof or story-quality proof.

## Minimum proof before moving on

- setup artifacts exist and are specific to AI Story Maker;
- package/build/test commands are named, even if some are currently blocked;
- `.env.example` has blank secrets only;
- `docs/output-quality.md` or an equivalent artifact-specific output contract exists;
- UI-bearing artifacts have `docs/product-experience.md` or equivalent with primary screen sketch, screen states, dominant object, primary gesture, first three interactions, forbidden default silhouette, hidden/reachable surfaces, and visible-together exclusions;
- `docs/proof-matrix.md` or equivalent names selected typed quality gates, proof commands/inspection paths, and non-applicable gates;
- UI-bearing artifacts have `UI-IDENTITY.md` or equivalent generated from `01-ui-identity.md`, including first-run comprehension and user-language map;
- `.buildprint/setup-receipt.md` records assumptions and blockers;
- next active phase can start without guessing the architecture.
