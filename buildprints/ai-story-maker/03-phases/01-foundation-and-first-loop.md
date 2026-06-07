# Phase 01 - Foundation And First Loop

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-uiux-decision.md` as the standing design/style responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

## Building objective

Every phase must keep `02-uiux-decision.md` open as the design/style constitution. Even backend, runtime, provider, export, or verification work changes what the writer sees through states, copy, blockers, detail views, draft previews, or controls; preserve the style schema unless the artifact is explicitly marked `not-ui-bearing`.

Create the implementation foundation and the first visible story-making loop for AI Story Maker. The first loop should let a writer start a story package from a premise and optional seed notes, validate the input, create durable local package state, and see an initial story-making surface with story package status, cast/world placeholders that are honestly empty or fixture-labeled, and a clear next action to build the outline. This is not a marketing page or a chat demo. The first screen after setup should already feel like the warm editorial story-making product described in `02-uiux-decision.md`.

The implementation foundation must include architecture docs, local commands, env contract, proof strategy, proof matrix, UI identity, and setup receipt from `01-project-setup.md`. The domain model should start with story package, premise, seed note, character placeholder, relationship, outline beat, scene card, generation run, provider status, export artifact, and audit/log event, even if some fields are not fully used yet. The path should prove that the product can create and reload a project shell without pretending that live AI generation has happened.

The phase should leave the next phase with a stable place to add story-world graph and outline generation. A skeptical reviewer should be able to run the app or API, submit a premise, see validation errors for empty input, see provider status as configured or blocked, reload the created package, and inspect that no visible controls promise generation/export/chat unless they work or explain the blocker.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not build a generic landing page when the mapped product is a working story-making surface.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback for the created story package.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
