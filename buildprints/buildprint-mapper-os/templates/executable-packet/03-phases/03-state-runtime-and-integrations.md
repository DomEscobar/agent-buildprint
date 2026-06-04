# Phase 03 — State, Runtime, And Integrations

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

Every phase must keep `02-uiux-decision.md` open as the design/style constitution. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, inspectors, or controls; preserve the style schema unless the artifact is explicitly marked `not-ui-bearing`.

Make the product loop durable and honest across runtime boundaries. Implement the persistence, adapter seams, provider configuration, integration boundaries, retry/error states, and readback behavior required by the artifact.

A user/operator should be able to reload, re-run, or inspect the relevant state without discovering that the product was only in-memory or hardcoded. Provider and integration seams should have deterministic test paths and explicit live blockers. If external systems are involved, calls must be bounded, safe, logged enough for operator understanding, and never pretend to run when credentials/runtime are missing.

This phase should turn the core loop from a local demo into a trustworthy local product path.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not leave state in memory if the product claims persistence or reload/readback.
- Do not hard-code a single provider when the Buildprint requires dynamic provider configuration.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
