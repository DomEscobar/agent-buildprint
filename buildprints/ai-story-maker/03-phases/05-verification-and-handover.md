# Phase 05 - Verification And Handover

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

Verify AI Story Maker from a fresh-start mindset and write the final handover. Run the real commands a next agent or human would use. Exercise the golden path: create a story package, build or fixture-label the story world, edit outline/storyboard cards, draft or block a scene generation honestly, save and reload state, run continuity or critique if implemented, export the package, and ask a character or story coach if provider/runtime support exists. Negative paths matter: empty input, blocked provider, failed export, lost storage, long content, and narrow viewport should all be inspected or recorded as blockers.

The goal is not to create a long proof performance. The goal is to find lies before handoff: fake provider success, dead UI, missing state, placeholder modules, stale docs, commands that do not run, tests that pass while the product path fails, and claims broader than evidence. Also find blandness before handoff. A product can pass structure checks while its story package is still generic. Compare observed output against the `central_output_contract` in `blueprint.yaml`. If the main output only proves that text flowed through the system, record the quality gap instead of calling it complete.

Verify the selected typed checks from `blueprint.yaml` and the proof surfaces named in `docs/architecture.md`; do not invent irrelevant checks at the end. For each applicable check, record the command, browser path, screenshot inspection, API/CLI check, fixture, or blocker. For each non-applicable check, leave a short reason. Update `HANDOVER.md` with exactly what was built, commands run, observed results, blockers, unproven claims, and recommended next actions.

## DO NOT

- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/deployment blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not hide skipped checks. If a command cannot run, say why and what proof is missing.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the product path through UI/API/CLI/runtime, not only source files.
- Prove persistence/readback when this phase creates durable state.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Capture reviewer-style evidence for central output quality: what the artifact makes clear, what still feels generic, what the writer can do next, and which output-quality claims remain unproven.
- Record selected typed quality results: applicable/not applicable, proof command or inspection path, result, and blocker.
- Record any blocker with exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, what works, commands run, proof observed, blockers, unproven claims, and which next phase can trust this work.
