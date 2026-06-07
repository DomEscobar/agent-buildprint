# Phase 02 - Story World And Outline Loop

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

Build the first complete creative loop: premise and seed notes become a story world, cast, relationships, chapter outline, and scene storyboard that a writer can inspect and revise. This phase should preserve the useful source-distilled pattern of structured memory and graph-backed progression, but express it as story craft: characters have goals and relationship edges, world rules constrain later scenes, outline beats escalate causally, and storyboard cards expose purpose, conflict, turn, consequence, emotional temperature, and revision handles.

The central output quality bar matters here. A generated outline that merely repeats the premise is not acceptable. If live provider credentials are unavailable, implement deterministic fixtures and provider seams that demonstrate structure and blocked-state behavior, but label them as fixtures and do not upgrade story-quality claims. The story world and outline should be persisted with lineage from the user's premise/seed notes so a later scene can cite which world rule, character goal, or relationship edge influenced it.

The UI should let the writer build or regenerate the story world, inspect cast cards and relationship graph/list, edit outline beats, add or remove scene cards, and save/reload the board. Long titles and dense outlines must remain readable. Visible controls must either work, validate, or explain blockers. The phase passes when a writer can move from a real package to a useful, editable outline/storyboard state and know exactly what remains unproven.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not accept generic beat lists, interchangeable character cards, or a static relationship diagram as central output quality.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback for story world, cast, outline, and storyboard cards.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record reviewer-style output proof: what the story package makes clear, what still feels generic, what the writer can do next, and which quality claim remains unproven.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
