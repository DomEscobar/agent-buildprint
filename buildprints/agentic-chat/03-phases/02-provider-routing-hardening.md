# Phase 02 - Provider Routing Hardening

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

This phase assumes phase 01 already shipped a real streaming chat slice. Do not rebuild the first loop from scratch. Harden the provider boundary so the selected default model and additional configured providers share one runtime contract behind the `ChatProvider` interface, while paid claims remain blocked until credentials and proof exist.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Build the provider routing boundary for the selected default model, configured paid providers, and blocked providers. Route through the provider client/SDK selected in setup (for example the Vercel AI SDK) wrapped behind the local `ChatProvider` interface so no provider-specific code leaks into the runtime. The runtime must select a provider explicitly, construct normalized request context, stream tokens through the same streaming event pipeline as phase 01, normalize usage and errors, retry transient failures with a bounded policy, and expose provider posture clearly to the user/operator.

Required provider contracts and behavior:

- `ProviderRegistry`: lookup for the default local provider, configured paid providers, disabled providers, and unknown-provider handling with no silent fallback.
- `ProviderRequest`: session id, turn id, ordered visible messages, model/provider ids, timeout and `AbortSignal`, and redacted diagnostics.
- `ProviderStreamEvent`: `provider.started`, `model.delta`, `usage.delta`, `provider.warning`, `provider.completed`, `provider.failed`, and `provider.blocked`.
- `ProviderFailure`: an explicit error taxonomy mapping each provider's raw errors to normalized codes (`missing_credentials`, `unknown_provider`, `timeout`, `cancelled`, `rate_limited`, `network_error`, `provider_error`), retryability, user-facing recovery text, and raw-diagnostic storage rules.
- Retry policy: at most 3 attempts with exponential backoff (base 500ms plus jitter), retrying only `rate_limited`, `network_error`, and 5xx `provider_error`; never retry `unknown_provider`, `missing_credentials`, or `cancelled`.
- Timeout policy: a default request timeout (for example 20s to first token, 60s per turn) that emits a normalized `timeout` failure with recovery copy; the values are configurable and recorded in `docs/architecture.md`.
- Usage normalization: token counts from provider usage when present, else the named tokenizer estimate; latency, model id, provider id, and cost via a per-model price table; unknown values must be explicit, not omitted silently.
- Credential posture: no key present, key present but unverified, verified paid call, disabled by config, or blocked by policy.

Product-proof contract for this phase:

- Named product loop: Provider Selection And Failure Recovery.
- User/operator action: send one turn with the default local model, inspect provider route and normalized usage, then attempt an unavailable/unknown provider and receive an actionable blocked state with recovery copy.
- Named output/state: provider registry/config, `provider_route`, `provider.started`, `model.delta`, `usage.delta`, `provider.completed` or `provider.failed`, persisted failure/blocked trace, retry trace, and recovery copy.
- Failure modes: cancellation, timeout, missing credential, unknown provider, paid provider disabled, rate limit/network/provider error, and provider payload parse error must be normalized and surfaced without fake completion.
- Concrete proof artifact: API/browser transcript showing real default-model success through the hardened interface, at least two normalized failure/block cases, retry/backoff behavior on a transient failure, persisted trace/readback, and the exact claim ceiling for any paid provider not proven.

Implementation boundaries:

- Use official/well-supported provider clients (for example the Vercel AI SDK) for the selected providers. If setup chose a lower-level HTTP adapter, `docs/architecture.md` must justify it and name the proof replacing SDK guarantees.
- Do not store secrets in session records, trace payloads, screenshots, or handoff notes. Diagnostics must be redacted before they reach UI or `.buildprint` artifacts.
- The selected default model and any paid provider must flow through the same `ChatProvider` interface and streaming event pipeline.
- A paid provider adapter may be present but unproven. Its UI/API state must say blocked or configured-but-unverified until a real credentialed streaming call is captured.

This phase should leave a user, operator, or developer with a real path they can trigger, inspect, and trust within the stated claim ceiling. The path must expose honest blocked states for missing credentials, unavailable runtimes, failed persistence, and provider/network unavailability. The output must be specific to the product contract, not generic generated text, sample cards, raw JSON, or proof prose.

## DO NOT

- Do not replace real streaming proof with a buffered provider wrapper.
- Do not silently fall back from a requested provider to the deterministic test double or another provider.
- Do not claim paid-provider support from configuration files, SDK imports, or mocked responses.
- Do not expose raw provider errors or secrets in UI, trace, screenshots, or handoff notes.
- Do not retry non-retryable failures or loop retries without the bounded policy.
- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not build a generic landing page unless the mapped product is actually a landing-page product.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Inspect default-model success and provider failure/block paths through UI/API/CLI/runtime, not only source files.
- Prove the retry/backoff policy fires on a transient failure and stops on a non-retryable failure (a deterministic failing provider may drive this).
- Prove cancellation or timeout behavior produces the normalized failure path.
- Prove provider route, usage, failure, retry, and blocked-state persistence/readback.
- Capture screenshot/browser/API/runtime evidence when this phase changes a user/operator surface.
- Verify no secret values appear in persisted traces, screenshots, `.buildprint` evidence, or logs captured for handoff.
- Record any blocker with the exact missing dependency, command, credential, or decision.

## Handoff note

Write the provider interface and SDK implemented, default-model and paid-provider statuses, the error taxonomy and retry policy proven, exact proof commands or screenshots, normalized failure cases, redaction checks, any paid-provider blockers, and which provider claims the next phase may trust.
