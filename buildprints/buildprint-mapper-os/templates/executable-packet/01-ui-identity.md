# 01 UI Identity

UX is a must. It matters as much as implementation because the user only experiences the artifact through surfaces, states, copy, controls, motion, feedback, and proof. A powerful backend hidden behind a confusing, generic, or ugly interface is not a finished product.

This file runs before project setup and before `02-project-setup.md`. Its job is not to hand the builder a pre-baked style sheet. Its job is to force high-reasoning UI identity work before scaffolding locks in the wrong product shape.

## Why this comes before setup

Project setup chooses stack, routes, component boundaries, state shape, fixtures, commands, and proof paths. If setup happens before the product has a clear UI identity, the implementation can accidentally encode a generic shell, internal proof vocabulary, or the wrong first-run mental model into the foundation.

For UI-bearing artifacts, the builder must generate a local `docs/ui-identity.md` or `UI-IDENTITY.md` before completing `02-project-setup.md`. For non-UI libraries/services, write `not-ui-bearing` and generate an equivalent developer/operator identity covering command shape, output formatting, error tone, docs style, and recovery flow.

## Identity generation protocol

Before setup, read:

- `BUILDPRINT.md`
- `00-questions.md`
- `blueprint.yaml`

Then think deeply about the product, user, artifact type, golden path, central output, risk, density, review proof, and what a confused first-time user would misunderstand. Generate a full local UI identity plan in the implementation project. Do not ask for visual direction unless a hard-stop question in `00-questions.md` says the product identity itself is unknown.

The generated identity must be specific enough that a later agent can build the same product surface without guessing. If it could apply unchanged to ten unrelated products, it fails.

## Required sections in the generated UI identity

Write the following sections in complete, product-specific language:

1. Product identity thesis: what this product is in plain language, who it serves, what job the first screen must make obvious, and what it must not feel like.
2. First-run comprehension contract: the exact first screen mental model, first action, visible state, and next action a non-technical user should understand within 10 seconds.
3. User-language map: translate internal/build/proof terms into user-facing terms, and list forbidden main-UI words. Internal terms may live only in docs, logs, dev panels, or clearly labeled diagnostics.
4. Chosen style direction: one concrete direction and the adjacent styles rejected, with reasoning tied to the artifact rather than generic taste.
5. Layout model before stack: desktop and mobile region roles, primary task surface, supporting context, navigation, scroll ownership, fixed-format regions, and what must be visually dominant.
6. Interaction model: how users create, inspect, edit, recover, confirm, navigate, and understand blocked actions.
7. Component language: controls, repeated items, detail regions, overlays, empty/loading/error/blocked states, selected states, density, radii, icon use, and feedback.
8. Color and typography tokens: exact semantic color roles, readable typography scale, state colors, focus treatment, and forbidden palette pitfalls.
9. Content stress fixtures: long names, long titles, dense data, empty data, failed provider/runtime, failed persistence/export, and mobile/narrow cases the UI must survive.
10. Proof obligations: screenshots, viewport checks, no-overlap/no-clipping, keyboard/focus checks where relevant, content-specificity checks, edit/readback proof, and blocked-state proof.
11. Anti-generic rules: what must not appear in the main product surface, including generic shells, raw JSON dumps, proof-theater labels, dead controls, fake success, decorative-only views, unclear empty states, and internal status jargon.

## Minimum proof before moving to setup

- A local `docs/ui-identity.md` or `UI-IDENTITY.md` exists for UI-bearing artifacts.
- The identity includes a first-run comprehension contract.
- Internal/proof terms are translated or banned from the main UI.
- Layout and interaction are defined before stack scaffolding.
- Color, typography, component, and state rules are concrete enough to implement.
- Proof obligations name the checks that would catch the artifact's most likely UI failure.

## DO NOT

- Do not treat this file as a fixed moodboard.
- Do not copy a style from another packet without reasoning from this product.
- Do not write only "modern, clean, intuitive", "dashboard", "studio", "workbench", or other borrowed UI labels.
- Do not expose proof/evaluator/build terms in the main product UI unless the product is explicitly a developer tool.
- Do not let setup start until the identity plan exists or the artifact is explicitly `not-ui-bearing`.
