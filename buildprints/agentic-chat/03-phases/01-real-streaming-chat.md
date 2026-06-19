# Phase 01 - Real Streaming Chat Slice

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

This phase is intentionally first-outcome heavy and the outcome floor is **real model tokens, not an echo**. The stack chosen by the user in `00-questions.md` and recorded in `docs/architecture.md` (provider/model, streaming transport, persistence store, frontend/backend) is the contract to implement, not to re-decide here. A contracts-only backend, a static UI shell, or a storage layer that waits for a later streaming phase is not enough. If setup chose a UI-bearing architecture, this phase must expose the loop through the UI as soon as the backend path exists.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Build the smallest useful Agentic Chat runtime that streams a **real model**: a user can create or open a session, submit one message, watch real assistant tokens stream incrementally over the chosen transport, inspect the provider/model/trace/telemetry path, reload or restart, and see the persisted conversation and trace still present. This phase owns both the core contracts and the first real streaming runtime proof.

The real provider selected in `00-questions.md` (for example a local Ollama model when the user wants a free, no-key path) is routed through the `ChatProvider` interface. The deterministic provider is demoted to a **test double**: it backs automated tests and offline development, but it is never presented to the user as a successful product turn. If the selected model runtime is unreachable in the build environment, record an honest runtime blocker with the exact missing dependency; do not relabel the deterministic echo as the delivered outcome.

Required runtime contracts:

- `session`: stable id, title or derived label, created/updated timestamps, active model/provider route, and schema version.
- `message`: stable id, session id, role, content, status (`pending`, `streaming`, `completed`, `failed`, `blocked`), created timestamp, completed timestamp when applicable, and source turn id.
- `turn`: stable id, session id, provider id, model id, status, started/completed timestamps, cancellation/timeout/error fields, and checkpoint id.
- `stream_event`: ordered records for `turn.started`, `model.delta`, `usage.delta`, `turn.completed`, `turn.failed`, and `turn.blocked`; each carries session id, turn id, sequence number, timestamp, event type, and product-safe payload.
- `provider_route`: selected provider, model, credential posture, real/test mode, blocked reason when applicable, and no silent fallback.
- `telemetry`: prompt/output token counts (from provider usage when present, else a named tokenizer estimate), latency timing, provider id, model id, and cost field set to zero/unknown when not a paid call.
- `checkpoint`: enough context metadata to resume or explain the latest turn without dumping hidden prompts or private stores.

Product-proof contract for this phase:

- Named product loop: Real Streaming Chat Turn.
- User/operator action: create or open a session, send one message to the real default model, observe the first assistant token before completion, inspect the inline/API trace, reload or restart, and read the persisted conversation back.
- Named output/state: persisted `session`, user `message`, assistant `message`, ordered `stream_event` records, `provider_route`, `telemetry`, and `checkpoint` with schema version or migration path.
- Failure modes: missing/unreachable model runtime, unknown provider, provider timeout, stream cancellation via `AbortSignal`, duplicate/repeated appends, and persistence write/read failure must produce product-visible blocked or failed states without fake assistant completion.
- Concrete proof artifact: `.buildprint/evidence-phase-01.md` with an API/browser transcript proving incremental real-token streaming, first-token-before-completion timing, persisted readback after process restart, unreachable-model and unknown-provider blocked responses, and the concurrency/corruption stance.

Required surface behavior:

- API surface must include a documented health/config path, session create/read path, streaming turn path, and trace/readback path. The handoff must list the exact routes or commands.
- Streaming must use an incrementally readable transport (SSE or equivalent) so tokens render token-by-token; returning a final buffered JSON blob after the turn completes does not satisfy this phase.
- UI-bearing builds must show the chat thread and composer/input as the dominant first viewport. The streaming assistant message must visibly change while tokens arrive; trace/telemetry/provider details must be inspectable without replacing the conversation with a generic dashboard.
- Missing paid-provider credentials must be shown as a blocked option or diagnostic state. They must not prevent the selected default provider path from running.

This phase should leave a user, operator, or developer with a real path they can trigger, inspect, and trust within the stated claim ceiling. The path must expose honest blocked states for missing credentials, unavailable runtimes, failed persistence, and provider/network unavailability. The output must be specific to the product contract, not generic generated text, sample cards, raw JSON, or proof prose.

## DO NOT

- Do not present the deterministic test double as a successful product turn; it is a test fixture, not the deliverable.
- Do not stop at schema/contracts/storage without a real streaming turn.
- Do not split first value across "storage now, streaming later" unless an external blocker is recorded with exact evidence.
- Do not implement streaming as a single buffered string returned after completion.
- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not build a generic landing page unless the mapped product is actually a landing-page product.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the real streaming chat path through UI/API/CLI/runtime, not only source files.
- Prove the first `model.delta` from the real model is observed before `turn.completed`.
- Prove persistence/readback for session, messages, stream events, provider route, telemetry, and checkpoint after restart, or record the exact persistence blocker.
- Prove unreachable-model and unknown-provider states block honestly without faking a deterministic success.
- Prove `AbortSignal` cancellation produces a persisted `turn.failed{cancelled}` state.
- Capture screenshot/browser/API/runtime evidence for the empty, streaming, completed, and blocked states.
- Record any blocker with the exact missing dependency, command, credential, or decision.

## Handoff note

Write what was built, the exact streaming surface (transport and routes) used, the command/API/browser proof, first-token-before-completion evidence, persisted readback evidence, the real-model vs test-double boundary, cancellation proof, remaining paid-provider limitations, and which next phase can trust this real streaming slice.
