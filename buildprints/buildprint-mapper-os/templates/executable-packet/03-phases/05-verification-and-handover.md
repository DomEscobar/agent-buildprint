# Phase 05 — Verification And Handover

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-uiux-decision.md` as the standing design/style responsibility for every UI-bearing artifact

Then implement this phase as one coherent product slice. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

## Building objective

Every phase must keep `02-uiux-decision.md` open as the design/style constitution. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, inspectors, or controls; preserve the style schema unless the artifact is explicitly marked `not-ui-bearing`.

Verify the artifact from a fresh-start mindset and write the final handover. Run the real commands a next agent or human would use. Exercise the golden path, negative cases, blocked dependency paths, persistence/readback, and visible/operator experience.

The goal is not to create a long proof ledger. The goal is to find lies before handoff: fake provider success, dead UI, missing state, placeholder modules, stale docs, commands that do not run, tests that pass while the product path fails, and claims that are broader than evidence.

Update `HANDOVER.md` with exactly what was built, commands run, observed results, blockers, unproven claims, and recommended next actions.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not hide skipped gates. If a command cannot run, say why and what proof is missing.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
