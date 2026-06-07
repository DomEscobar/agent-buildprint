# Phase 03 - State Runtime And Providers

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

Every phase must keep `02-uiux-decision.md` open as the design/style constitution. Even backend, runtime, provider, export, or verification work changes what the writer sees through states, copy, blockers, inspectors, draft previews, or controls; preserve the style schema unless the artifact is explicitly marked `not-ui-bearing`.

Make AI Story Maker durable and honest across runtime boundaries. Implement the provider adapter seam, generation run state, retries, cancellations, failure mapping, export artifact tracking, and readback behavior required by a generative story studio. The writer should be able to reload a package, inspect generation history, see whether live provider configuration is available, retry a failed scene generation, and understand exactly when an output is deterministic fixture content rather than live generated story material.

This phase should add or harden the operations behind scene drafting, regeneration, continuity review, character conversation, and export. Provider calls must be bounded, safe, and logged enough for operator understanding without leaking secret values or private manuscript content. Missing credentials must produce a blocked state with recovery instructions after adapters/config checks exist. Do not let the UI imply that a scene, character answer, continuity scan, or export ran when the runtime could not run.

Persistence matters as much as generation. Story packages, scene drafts, regeneration choices, character state, continuity notes, export files, and provider status should survive reload/restart where the implementation claims durability. If a chosen stack cannot provide restart proof in this phase, record a blocker and keep claim language conservative. A trustworthy local product path is the goal, not a broad fake integration surface.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not hard-code one provider path without a visible configuration and failure story.
- Do not leave state in memory if the product claims reload or export readback.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Prove provider blocked-state behavior or live configured behavior without copying secret values into artifacts.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
