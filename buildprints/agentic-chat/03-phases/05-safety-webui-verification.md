# Phase 05 - Safety WebUI Verification

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Create the WebUI/API workbench and final safety boundaries for local use: empty chat, streaming, provider blocked, tool blocked, memory state, failure, retry, and success paths. Verify the deterministic runtime through UI or API, prove persistence readback, inspect responsive states, and record live-provider/tool/MCP blockers without overclaiming.

Product-proof contract for this phase:

- Named product loop: Verified Chat Surface And Claim Qualification.
- User/operator action: start the app, send a deterministic streaming turn, inspect inline trace/memory/tool state, retry or recover from one blocked path, and reload to verify persistence.
- Named output/state: polished default chat viewport, streaming message state, inline blocked/error/success states, persisted readback, `.buildprint/ui-evidence.md`, `.buildprint/artifact-check.md`, and final handover claim status.
- Failure mode: generic dashboard/workbench UI, buffered fake streaming, dead controls, missing screenshots, missing UI evidence, or unresolved live-provider/tool/MCP blockers must prevent `claim_qualified`.
- Concrete proof artifact: desktop/mobile screenshots, API/browser streaming transcript, `agb verify ui .`, `agb claim check .`, persistence readback, and independent critical review evidence.

This phase is not where the WebUI is first invented. If prior phases left only a raw API or generic shell, return to the responsible phase and repair it before final verification. This phase qualifies claims: `phase_core_passed` may be true for the local deterministic loop while `claim_qualified` remains false until UI evidence, runtime proof, blockers, and independent review align.

This phase should leave a user, operator, or developer with a real path they can trigger, inspect, and trust within the stated claim ceiling. The path must expose honest blocked states for missing credentials, unavailable runtimes, failed persistence, rejected policy gates, and provider/network unavailability. The output must be specific to the product contract, not generic generated text, sample cards, raw JSON, or proof prose.

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
