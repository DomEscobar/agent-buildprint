# Loop 01 — Foundation And First Loop

## How to implement this loop

Before writing code, read:

- `loops/loop-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `00-goal.md`
- `01-setup.md`
- `02-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this loop as one coherent product path. Understand the objective, run a bare agentic loop until the smallest complete path works, verify it, and only then move on.

## Building objective

Every loop must keep `02-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Create the implementation foundation and first visible/runnable loop for the mapped artifact. Leave this loop with a real project skeleton, local commands, and a first product path that demonstrates the artifact direction against `00-goal.md`.

Do not chase feature breadth. Make the product shape undeniable: a user/operator/developer can start the app/service/tool, see or call the central surface, trigger one meaningful action, and receive either a real result or an honest blocked state. The result must be specific to the mapped product, not a generic starter app.

If the artifact is UI-bearing, the first surface should already reflect the visual/interaction direction from `02-identity.md`. If the artifact is API/CLI/worker-first, the first command or endpoint should prove the central interface and error/blocker semantics.

Product-proof contract for this loop:

- Named product loop: instantiate the mapped product's first runnable loop by name.
- User/operator action: name the exact first action performed.
- Named output/state: name the record, screen state, file, command output, or domain object that changes.
- Failure mode: name one realistic blocked/error path without fake success.
- Concrete proof artifact: name the command output, API transcript, screenshot, or readback that proves the loop.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this loop complete from code edits or prose alone.
- Do not build a generic landing page unless the mapped product is actually a landing-page product.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this loop creates durable state.
- Capture screenshot/browser/API/runtime evidence when this loop changes a user/operator surface.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next loop can trust this work.
