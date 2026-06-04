# Phase 01 — Foundation And First Loop

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-uiux-decision.md` if this phase touches UI

Then implement this phase as one coherent product slice. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

## Building objective

Create the implementation foundation and first visible/runnable loop for the mapped artifact. The builder should leave this phase with a real project skeleton, local commands, architecture docs, env contract, proof strategy, and a first product path that demonstrates the artifact direction.

This phase should not chase feature breadth. It should make the product shape undeniable: a user/operator/developer can start the app/service/tool, see or call the central surface, trigger one meaningful action, and receive either a real result or an honest blocked state. The result must be specific to the mapped product, not a generic starter app.

If the artifact is UI-bearing, the first surface should already reflect the visual/interaction direction from `02-uiux-decision.md`. If the artifact is API/CLI/worker-first, the first command or endpoint should prove the central interface and error/blocker semantics.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not build a generic landing page unless the mapped product is actually a landing-page product.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
