# Phase 03 - WebUI And Verification

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

This phase is qualification and repair for the streaming chat core, not first invention. If the real streaming chat loop or the provider routing boundary is missing, return to the responsible phase instead of creating a thin verification facade. Capabilities described in `EXTENSIONS.md` (tools/skills, MCP policy, memory/compaction, subagents) belong to the full Agentic Chat maturity path in `04-agentic-loop-runtime.md`: do not stub or fake them in the UI, and do not advertise them as working before phase 04 proves or blocks them.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Qualify the WebUI/API product to a real, shippable quality bar for `streaming_chat_core`: empty chat, streaming real tokens, provider blocked, failure, retry/recovery, persisted reload, and success paths. The result should feel like a polished consumer chat product with honest agentic inspection and recovery, not a generic evaluator dashboard. With the real-model outcome floor from phase 01, the claim ceiling can be raised honestly for the local default model; paid-provider, hosting, and full agentic-capability claims remain blocked until separately proven.

Required verification surfaces:

- First viewport: conversation thread and composer/input dominate; provider/route/trace details are inline, collapsible, drawer-based, or otherwise subordinate to chat.
- Empty state: explains the first useful user action without seeded feature-demo cards or internal proof language.
- Streaming state: visibly updates the assistant message while real tokens arrive; cancellation/retry affordance is real or honestly blocked.
- Success state: completed assistant response, persisted trace/telemetry, provider route, and next action are inspectable.
- Provider blocked state: unknown provider and missing paid credential show actionable recovery without faking a deterministic success.
- Failure/recovery state: a normalized provider failure remains tied to the relevant message and offers a real retry/recovery path.
- Reload/restart state: persisted conversation, trace, and telemetry survive readback.
- Responsive state: mobile/narrow layout preserves thread, composer, inline statuses, and primary action without clipping or horizontal overflow.

Product-proof contract for this phase:

- Named product loop: Verified Chat Surface And Claim Qualification.
- User/operator action: start the app, send a real streaming turn, inspect inline route/usage/trace, retry or recover from one blocked/failed path, and reload to verify persistence.
- Named output/state: polished default chat viewport, streaming message state, inline blocked/error/success states, persisted readback, `.buildprint/ui-evidence.md`, `.buildprint/artifact-check.md`, and final handover claim status.
- Failure modes: generic dashboard/workbench UI, buffered fake streaming, dead controls, missing screenshots, missing UI evidence, raw JSON UI, proof-console language, faked agentic capabilities, or unresolved paid-provider/hosting blockers must prevent `claim_qualified`.
- Concrete proof artifact: desktop/mobile screenshots, API/browser streaming transcript, `agb verify ui .`, `agb claim check .`, persistence readback, and independent critical review evidence.

This phase qualifies claims: `phase_core_passed` may be true for the real local default-model loop while `claim_qualified` remains false until UI evidence, runtime proof, blockers, and independent review align. If the UI presents broader readiness than the runtime proves, `.buildprint/decisions.md` and handoff must state that scope-presentation decision explicitly.

Implementation boundaries:

- Honor the deployment posture chosen in `00-questions.md`. For `trusted_local`, local safety is sufficient. For `private_authenticated` or `public_webapp`, prove the matching auth, abuse-control, and secrets-handling boundary in this phase or record it as an explicit blocker; never present hosted readiness without that proof.
- Do not add new major product features here unless required to repair a failed phase contract. Repair broken surfaces and proof gaps first.
- `docs/ui-identity.md`, `docs/DESIGN.md`, and `.buildprint/ui-evidence.md` must be source/screenshot-grounded, not generic prose.
- Screenshots must cover at least desktop and narrow/mobile for empty, streaming, completed, and one blocked/recovery state.
- Raw JSON may exist in developer diagnostics only when it is not the main product surface and product-language summaries exist.
- `agb verify ui .` and `agb claim check .` are qualification gates, not replacements for browser/API use.

This phase should leave a user, operator, or developer with a real path they can trigger, inspect, and trust within the stated claim ceiling. The path must expose honest blocked states for missing credentials, unavailable runtimes, failed persistence, and provider/network unavailability. The output must be specific to the product contract, not generic generated text, sample cards, raw JSON, or proof prose.

## DO NOT

- Do not invent the first real WebUI here if prior phases skipped it; route back and repair the responsible phase.
- Do not pass a UI that looks like a dashboard, harness, proof console, or generic workbench with chat labels.
- Do not stub, mock, or advertise the `EXTENSIONS.md`/phase 04 capabilities as working before they are proven through the product loop.
- Do not count `agb verify ui .` as sufficient without browser/screenshot inspection and real surface use.
- Do not claim public hosting or paid-provider readiness from local default-model proof.
- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not build a generic landing page unless the mapped product is actually a landing-page product.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect the complete real local default-model chat product path through browser/UI plus API/CLI/runtime where useful, not only source files.
- Prove incremental real-token streaming, provider blocked state, failure retry/recovery behavior, and persisted reload/readback.
- Capture desktop and mobile/narrow screenshots for empty, streaming, completed, and blocked/recovery states into `.buildprint/screenshots/`.
- Run `agb verify ui .` and `agb claim check .`, record `.buildprint/artifact-check.md`, and route failures to the responsible phase.
- Fill `.buildprint/ui-evidence.md` with screenshot/source-grounded claims for identity, design, action surface, visual craft, and nearest bad silhouette comparison.
- Record any blocker with the exact missing dependency, command, credential, or decision.

## Handoff note

Write the qualified claim status, UI/API/browser proof, screenshot paths, artifact-check and claim-check results, persistence/readback proof, the full agentic-capability boundary, unresolved blockers, exact claims not proven, and why phase 04 and the final critical-review phase can or cannot trust the artifact.
