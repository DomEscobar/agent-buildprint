# 02 UI Identity

UX is a must. It matters as much as implementation because the user only experiences the artifact through surfaces, states, copy, controls, motion, feedback, and proof. A powerful backend hidden behind a confusing, generic, or ugly interface is not a finished product.

This file runs after `01-project-setup.md` and before `03-phases/*`. Its job is not to hand the builder a pre-baked style sheet. Its job is to force high-reasoning UI identity work after the local harness and architecture baseline exist, but before scaffolding and phase code turn a weak product shape into permanent implementation.

## Why this comes after setup

Project setup must create the architecture baseline and local skill harness without doing identity work. The identity step then uses that harness, the selected architecture, and the product contract to make UI/UX decisions deliberately instead of mixing design reasoning into setup paperwork.

For UI-bearing artifacts, the builder must generate a local `docs/ui-identity.md` or `UI-IDENTITY.md` before starting any phase. For non-UI libraries/services, write `not-ui-bearing` and generate an equivalent developer/operator identity covering command shape, output formatting, error tone, docs style, and recovery flow.

## Skill loading protocol

Before identity generation, load the local frontend skill created by setup:

- Prefer the active provider-specific copy only when an explicit provider created one. For the default provider, load `.agents/skills/frontend-ui-product-design/SKILL.md`.
- Also accept the portable `.agents/skills/frontend-ui-product-design/SKILL.md`.
- Read the skill's `SKILL.md`, then load only the references needed for this artifact. At minimum for UI-bearing artifacts, use `references/preflight.md`, `references/screen-states.md`, `references/structural-variety.md`, `references/aesthetic-direction.md`, `references/design-tokens.md`, `references/component-states.md`, `references/mobile-hard-floor.md`, `references/screenshot-capture.md`, and `references/slop-review.md` when present.
- If the local frontend skill is missing, return to `01-project-setup.md` and initialize the project-local harness. Do not continue by improvising from memory.

## Product identity seed

- Product: Automated AI Blog OS.
- Product-specific identity must reject generic dashboards, admin shells, proof consoles, renamed workbenches, and card grids.

## Identity generation protocol

Before writing identity output, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `01-project-setup.md`
- `blueprint.yaml`
- `docs/architecture.md`
- current workspace or target project `AGENTS.md` if present
- the local `frontend-ui-product-design` skill and relevant references

Then think deeply about the product, user, artifact type, golden path, central output, risk, density, review proof, and what a confused first-time user would misunderstand. Generate a full local UI identity plan in the implementation project. Do not ask for visual direction unless a hard-stop question in `00-questions.md` says the product identity itself is unknown.

The generated identity must be specific enough that a later agent can build the same product surface without guessing. If it could apply unchanged to ten unrelated products, it fails.

The generated identity also fails if it can be satisfied by a generic dashboard, renamed workbench, card grid, admin shell, or proof console with better labels. First-run comprehension is necessary but not sufficient. The identity must name an artifact-specific product metaphor, dominant object, primary gesture/manipulation, forbidden default silhouette, and screenshot-level acceptance criteria.

## Required sections in the generated UI identity

Write the following sections in complete, product-specific language:

1. Product identity thesis: what this product is in plain language, who it serves, what job the first screen must make obvious, and what it must not feel like.
2. Creative product concept: the artifact-specific metaphor, dominant object, primary gesture, moment-to-moment manipulation, and what emotional/operator affordance should make the surface feel like this product rather than a generic shell.
3. Silhouette rejection: the expected desktop/mobile layout silhouette and the forbidden default silhouette. Explicitly reject generic dashboard, renamed workbench, card grid, admin shell, proof console, and any old layout shape that could pass with labels/colors changed. Name the adjacent at-risk silhouette your own chosen layout is structurally closest to, and state the concrete structural and visual treatment that distinguishes your layout from it. Token, palette, copy, spacing, label, or icon changes do not count as a distinguishing treatment.
4. First-run comprehension contract: the exact first screen mental model, first action, visible state, and next action a non-technical user should understand within 10 seconds.
5. User-language map: translate internal/build/proof terms into user-facing terms, and list forbidden main-UI words. Internal terms may live only in docs, logs, dev panels, or clearly labeled diagnostics.
6. Chosen style direction: one named aesthetic direction (functional-minimal, editorial, warm-approachable, technical/terminal, or expressive) committed to concrete type, color, shape, and motion choices, plus the adjacent style rejected with reasoning tied to the artifact. A direction that reduces to "modern, clean, minimal" with no committed choices fails.
7. Layout model before stack: desktop and mobile region roles, primary task surface, supporting context, navigation, scroll ownership, fixed-format regions, and what must be visually dominant.
8. Screen-state contract: current task, dominant surface, visible-now surfaces, reachable-but-hidden surfaces, route/tab/drawer/modal placement, and what must not be visible together.
9. Interaction model: how users create, inspect, edit, recover, confirm, navigate, and understand blocked actions. Identify the primary gesture before secondary status/export actions.
10. Component language: controls, repeated items, detail regions, overlays, empty/loading/error/blocked states, selected states, density, radii, icon use, and feedback. Components support the product concept; they are not the concept.
11. Color and typography tokens: exact semantic color roles, readable typography scale, state colors, focus treatment, and forbidden palette pitfalls.
12. Content stress fixtures: long names, long titles, dense data, empty data, failed provider/runtime, failed persistence/export, and mobile/narrow cases the UI must survive.
13. Proof obligations: screenshots, screenshot delta review against prior/default builds when available, viewport checks, no-overlap/no-clipping, keyboard/focus checks where relevant, content-specificity checks, edit/readback proof, and blocked-state proof. Include an anti-silhouette distinctiveness screenshot check: compare the shipped first-screen screenshot against the forbidden silhouette and the named adjacent silhouette, and fail if the screenshot is indistinguishable from them once the copy is ignored. Mechanical checks alone (overlap, clipping, viewport, focus) do not satisfy this obligation.
14. Anti-generic rules: what must not appear in the main product surface, including generic shells, raw JSON dumps, proof-theater labels, dead controls, fake success, decorative-only views, unclear empty states, and internal status jargon.

## Minimum proof before moving to phases

- A local `docs/ui-identity.md` or `UI-IDENTITY.md` exists for UI-bearing artifacts, or the artifact is explicitly marked `not-ui-bearing`.
- The local frontend skill was loaded, or a missing-harness blocker routed back to `01-project-setup.md`.
- The identity includes a first-run comprehension contract.
- The identity names a creative product concept, product metaphor, dominant object, primary gesture, forbidden default silhouette, and screenshot-level acceptance criteria.
- The identity includes a screen-state contract with visible-now, hidden/reachable, placement, and visible-together exclusions.
- Internal/proof terms are translated or banned from the main UI.
- Layout and interaction are defined before phase scaffolding.
- Color, typography, component, and state rules are concrete enough to implement.
- Proof obligations name the checks that would catch the artifact's most likely UI failure, and include an anti-silhouette distinctiveness screenshot check that fails a build matching the forbidden or adjacent silhouette.

## DO NOT

- Do not treat this file as a fixed moodboard.
- Do not copy a style from another packet without reasoning from this product.
- Do not write only "modern, clean, intuitive", "dashboard", "studio", "workbench", or other borrowed UI labels.
- Do not accept an identity that can be implemented as a dashboard/workbench/card grid with palette, spacing, copy, icon, or label changes.
- Do not accept a chosen layout that is the forbidden or adjacent silhouette with only token, palette, copy, spacing, label, or icon changes; the distinguishing structural treatment must be named.
- Do not expose proof/evaluator/build terms in the main product UI unless the product is explicitly a developer tool.
- Do not let phases start until the identity plan exists, the artifact is explicitly `not-ui-bearing`, or a blocker is recorded.

