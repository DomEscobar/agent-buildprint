# 01 UI Identity

UX is a must. AI Story Maker is not a finished product when it has story data, tests, and screenshots. It is finished only when a writer can understand what the product is, what to do first, what state the story is in, and what useful story decision comes next.

This file runs before project setup and before `02-project-setup.md`. Its job is not to freeze one pre-baked visual style. Its job is to force the builder to generate a product-specific `docs/ui-identity.md` or `UI-IDENTITY.md` in the implementation project before stack setup, routing, components, fixtures, and proof paths lock in the wrong mental model. The identity must be a product concept, not a renamed proof workbench.

## Why this comes before setup

The failed outcome risk is clear: a builder can satisfy proof language while producing a confusing writer experience. If setup starts first, the scaffold can encode internal labels like fixture, deterministic package, blocked, board, audit, and provider status as user-facing product concepts. That is backwards.

Before `02-project-setup.md`, the builder must decide the story-making identity in user language. The identity must then guide setup: route names, component boundaries, fixtures, empty states, local storage, export surfaces, and screenshots.

The identity fails if it can still produce a left workflow rail, central card grid, right status inspector, sample story board, or evaluator dashboard with writer-facing labels. Clarity is necessary, but not enough. AI Story Maker needs a creative product concept that changes what the writer manipulates and what dominates the screen.

## Identity generation protocol

Before setup, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `blueprint.yaml`

Then generate a local `docs/ui-identity.md` or `UI-IDENTITY.md` in the implementation project. Think through the product like a senior product designer and writer-facing software lead, including the golden path, central output contract, and the failure modes most likely to confuse a writer:

- Who is the writer and what are they trying to shape?
- What does the first screen promise in plain English?
- What is the first useful action?
- What state is empty, in progress, saved, demo-only, blocked, or ready for export?
- Which labels help a writer and which labels only help the evaluator?
- Which story object should be visually dominant: premise, cast, outline, scene, continuity, or export?
- What is the central creative object: a scene, manuscript page, character rehearsal, corkboard of turning points, living chapter, or another concrete story artifact?
- What is the primary creative gesture the writer repeats: writing into a scene, dragging a turning point, questioning a character, revising a margin note, staging a chapter, or another artifact-specific manipulation?
- What emotional/product metaphor drives the interface, and what default app silhouette is explicitly rejected?
- What proof would catch a polished-but-confusing product surface?

Do not ask for more visual direction unless `00-questions.md` says the product/artifact identity itself is unknown. Missing brand direction means reason from the artifact and decide.

## Required sections in the generated UI identity

Write the following sections in complete, AI Story Maker-specific language:

1. Product identity thesis: define AI Story Maker in plain writer language. It is a story-making product that turns a premise and notes into a revisable story package, not a prompt demo, proof dashboard, or generic AI chat shell.
2. Creative product concept: name the central creative object, primary creative gesture, moment-to-moment manipulation, emotional/product metaphor, and why that concept is stronger than a generic story workspace. The concept must be concrete enough to force a different first screen. Examples: scene-first story room, manuscript page with coach margin, character rehearsal table, corkboard of turning points, living chapter desk. Do not center the thesis on `workspace`, `dashboard`, `package`, `plan`, `board`, `panel`, `inspector`, or `status surface` unless a stronger experiential metaphor dominates them.
3. Silhouette rejection: define the expected desktop and mobile layout silhouette and the forbidden silhouette. The forbidden list must explicitly reject a three-column admin shell, left workflow rail plus central cards plus right inspector, generic dashboard, proof console, and static sample story board. The allowed silhouette must name what fills the first viewport and how the writer touches it.
4. First-run comprehension contract: specify what a first-time writer must understand within 10 seconds: what this product does, where to start, what the current story state is, and what next action improves the story.
5. User-language map: translate or ban internal terms from the main UI. `Fixture`, `deterministic`, `package`, `provider blocked`, `audit`, `proof`, and `readback` must become writer-facing language such as `sample story`, `saved draft`, `story file`, `AI setup needed`, `continuity notes`, `verified export`, or a better product-specific alternative. Internal terms may remain only in docs, logs, test names, or dev diagnostics.
6. Story workflow model: define the visible flow from premise and seed notes to cast/world, outline, scene drafting, continuity review, export, and follow-up questions. The UI must tell the writer where they are in that flow without reducing the experience to status panels.
7. Chosen style direction: pick one concrete direction from reasoning, not inheritance. It may be scene-first story room, manuscript margin coach, character rehearsal table, corkboard of turning points, warm editorial, planning-room, or another fit, but it must explain rejected adjacent styles such as generic SaaS, chat-first assistant, fantasy parchment, proof console, and renamed workbench.
8. Layout model before stack: define desktop and mobile region roles, primary story surface, supporting context, navigation, detail/review areas, scroll ownership, stable dimensions, and what must be visually dominant after the first story is created. This section must state why the layout is not a dashboard or old workbench variant.
9. Interaction model: define how writers create, inspect, edit, regenerate, save, reload, compare changes, recover from errors, understand AI setup requirements, and export. It must identify the primary creative gesture before secondary status/export actions.
10. Component language: define story cards, cast rows, outline/scene controls, editor areas, continuity notes, export actions, blocked states, empty states, validation, icons, density, radii, and feedback. Components must support the creative concept rather than becoming the product.
11. Color and typography tokens: choose exact semantic color and typography tokens that support long-form reading and editing without becoming one-note, generic, low-contrast, or decorative. Include exact semantic color roles, state colors, focus treatment, readable type sizes, line heights, weights, and usage rules.
12. Content stress fixtures: long premise, long story title, dense outline, long character names, long scene text, empty story, failed storage, missing AI credentials, failed export, and narrow/mobile viewport.
13. Proof obligations: desktop and mobile screenshots, screenshot delta review against prior/default builds when available, no-overlap/no-clipping checks, first-run comprehension review, internal-term scan of visible UI, edit/save/reload proof, export preview/open proof, and blocked-AI state proof.
14. Anti-generic rules: forbid generic dashboards, proof labels, evaluator language, raw JSON as the product surface, dead tabs, functionless buttons, dead controls, decorative cards, fake provider success, sample content presented as live AI, and any first screen that does not tell a writer what to do next.

## Minimum proof before moving to setup

- Local `docs/ui-identity.md` or `UI-IDENTITY.md` exists.
- It includes a first-run comprehension contract for a non-technical writer.
- It names a creative product concept, central creative object, primary creative gesture, emotional/product metaphor, and forbidden default silhouette.
- It contains a user-language map that keeps internal proof terms out of the main UI.
- It defines workflow, layout, interaction, component, state, color, and typography decisions before setup.
- It names content stress fixtures, empty/loading/error/blocked states, and screenshot/browser proof obligations.
- `02-project-setup.md` can use the identity to choose stack, routes, fixtures, docs, tests, and first-phase scaffolding without inventing a generic shell.

## DO NOT

- Do not start project setup before the local UI identity exists.
- Do not copy the old warm-editorial style blindly; reason from the product and commit to the best identity.
- Do not write an identity that can be satisfied by changing labels, palette, spacing, or icons around the old workbench silhouette.
- Do not center the experience on `workspace`, `dashboard`, `package`, `plan`, `board`, `panel`, `inspector`, or `status surface` without a stronger creative metaphor and manipulation model.
- Do not expose `fixture`, `deterministic`, `provider blocked`, `proof`, `audit`, `readback`, or similar evaluator language in the main product UI.
- Do not make a landing page, generic dashboard, chat-only assistant, static card gallery, or proof console.
- Do not claim UI polish unless first-run comprehension, visible language, interaction, layout, and blocked states are proven.
