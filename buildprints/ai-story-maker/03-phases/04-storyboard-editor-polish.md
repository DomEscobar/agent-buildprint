# Phase 04 - Storyboard Editor Polish

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `02-project-setup.md`
- `01-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

## Building objective

Every phase must keep `01-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, provider, export, or verification work changes what the writer sees through states, copy, blockers, detail views, draft previews, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Repair the human-facing story-making product until it feels like the warm editorial experience described in the generated identity contract. This is not cosmetic cleanup. It is where generic product shells, dead controls, unclear empty states, weak motion, clipped scene cards, unreadable long generated text, hidden provider failures, and confusing hierarchy get found and fixed. The primary writer workflow should remain visible: story package status, cast/world structure, outline/storyboard, selected scene drafting, continuity review, and export or provider state.

Inspect the app like a skeptical product reviewer. Try empty premise, long premise, long chapter title, many characters, dense outline, blocked provider, failed generation, successful save, reload, export, and mobile/narrow layout. Board cards must keep stable dimensions. Drawers and detail regions must own their scroll. Long generated scenes must remain readable without pushing controls off screen. Every visible CTA must work, validate, navigate, regenerate, export, or explain a blocker.

This phase should also improve interaction details that make the story output usable: compare before/after regenerated scenes, mark continuity warnings, show which cast/world facts influenced a beat, keep focus behavior predictable, and make blocked states useful rather than scary. If the output still feels generic, route back to the story-world or provider phase instead of hiding the weakness under nicer colors.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not treat gradients, rounded cards, or icons as proof of product quality.
- Do not leave any visible CTA without working or blocked behavior.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Run or record selected typed proof paths from `docs/proof-matrix.md`, especially viewport, stress, semantic-output, and provider/operator proof.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
