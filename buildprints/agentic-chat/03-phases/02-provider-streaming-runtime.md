# Phase 02 - Provider Streaming Runtime

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

Deliver the evented chat turn engine: provider registry, deterministic test provider, streaming runtime loop, context-builder skeleton, checkpoint persistence, failure events, and normalized usage events. The local proof must show `turn.started`, `model.delta`, telemetry, completion or failure, persisted messages, and actionable unknown-provider diagnostics.

Product-proof contract for this phase:

- Named product loop: Streaming Agent Turn.
- User/operator action: send a message through the local deterministic provider and watch the first `model.delta` arrive before the turn completes.
- Named output/state: `turn.started`, incremental `model.delta`, `usage.delta`, `turn.completed` or `turn.failed`, persisted assistant message, checkpoint, and provider trace events.
- Failure mode: cancellation via `AbortSignal`, provider timeout, unavailable live credential, and unknown provider each produce normalized failure events without fake completion.
- Concrete proof artifact: API/browser transcript proving a real `ReadableStream` or SSE stream where the first delta is observed before completion, plus persisted readback of events and messages.

This phase fails if the endpoint buffers all events and returns NDJSON only after the turn completes. A deterministic provider may be local, but the transport must be incremental: the verifier must be able to read a first chunk, cancel or continue the stream, and then inspect the persisted trace. The provider runtime interface must define cancellation, timeout policy, retry/non-retry failure taxonomy, usage normalization, and blocked live-provider diagnostics before any live provider claim is made.

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
