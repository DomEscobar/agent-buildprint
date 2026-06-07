# Phase 04 — UI Polish And Interaction

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

Every phase must keep `01-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Repair the human-facing experience until it feels like the product described in `01-ui-identity.md`. This is not a cosmetic pass. It is the phase that catches generic product shells, dead controls, unclear empty states, invisible errors, weak motion, confusing hierarchy, and interactions that do not teach the user what is happening.

For UI products, inspect the app like a hostile product reviewer. Click every visible control in the golden path. Try empty input, blocked provider/runtime, success, error, reload, and mobile/narrow layout where relevant. Make the primary surface feel intentional. Motion, spacing, copy, layout regions, and state transitions should help comprehension rather than decorate placeholders.

Use the selected gates in `docs/proof-matrix.md` or equivalent to decide what to inspect. If viewport proof applies, inspect real desktop and mobile/narrow screenshots for overlap, clipping, unreadable text, unreachable actions, and page-level horizontal overflow. If editor stress applies, test long labels/content/notes or artifact-specific stress data. If semantic output proof applies, review whether the output is specific and useful rather than repeated generic copy. If the artifact is non-UI, inspect the operator/developer surface with the same severity: help text, logs, errors, retries, idempotency, and recovery.

For non-UI products, polish the operator/developer experience: CLI help, API error bodies, logs, docs, examples, and handoff commands.

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
- Run or record selected typed proof paths from `docs/proof-matrix.md`, especially viewport, stress, semantic-output, or operator/integration proof when applicable.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
