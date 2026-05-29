# Phase 06 - Voice Sidecar Experience

## How to implement this phase

Before writing code, read:

- `01-questions.md`
- `03-phases/phase-flow.md`
- `05-evidence/evidence-ledger.jsonl`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, writing role handoffs/returns, reviews, proof, and scoped evidence rows.

You may not append evidence or mark the current phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary
  - ux-ui-craft

## Product outcome

Add optional voice mode without weakening the product: voice provider config, health check, STT/TTS adapters, push-to-talk transcription insertion, auto/manual speak, stop playback, disabled-provider states, browser media proof/blockers, and SSRF-conscious sidecar URL policy.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: prove the operator outcome of using or safely disabling local speech in the chat workbench.
- Shared proof spine: preconditions are chat runtime and settings; entrypoint is voice settings and chat voice controls; execution validates sidecar URL/API key handle, checks health, records/transcribes or blocks microphone, inserts transcript, speaks assistant text manually/automatically, stops playback, and renders disabled/blocked states; state/artifact effects include voice config, health status, transcript/action events, and playback state; observable proof is fake-provider STT/TTS tests, URL safety tests, UI/browser media proof or blocker, and secret redaction review; failure/recovery covers microphone denied, sidecar unavailable, bad URL/private IP, TTS/STT failure, and stop playback.

## Mapped product obligations

- Source path `VOICE.md` implies optional Speaches/OpenAI-compatible sidecar setup, health, STT/TTS models, push-to-talk, auto/manual speak, and Docker/runtime blockers.
- Source path `src/lib/voice.ts` implies voice config validation, URL safety, API key boundary, and TTS speed clamp.
- Source paths `src/components/chat.tsx` and `src/components/settings-form.tsx` imply voice controls and settings states.

## Behavior compatibility contract

Preserve product obligations without forcing route/function parity. Preserve voice as optional and proof-required through equivalent target behavior. Compatibility impact: the target may replace the exact sidecar, but must keep OpenAI-compatible speech adapter shape or equivalent, fake-provider tests, local health diagnostics, media permission blockers, auto/manual speak, stop playback, and SSRF/private-address validation.

## Implementation scope

Implement voice config schema, health check, deterministic fake STT/TTS provider, optional OpenAI-compatible speech adapter, chat UI controls, settings UI, media permission handling, playback state, and tests. Real sidecar/Docker/microphone proof may remain a non-upgrading blocker when unavailable.

## Interfaces touched

- UI/controller: push-to-talk, transcript insertion, auto-speak toggle, manual speak, stop playback, voice health, disabled reasons.
- API/application service: voice config, health, STT/TTS requests, redacted diagnostics.
- Provider contracts: fake speech provider, OpenAI-compatible sidecar adapter, timeout/error mapping.

## State/runtime touched

- Persistence: voice config handles, selected models/voice/speed, health status if stored, voice action audit metadata.
- Runtime: browser media permission, audio recording/playback, sidecar health, STT/TTS request lifecycle.

## UX/UI requirements

Apply the product-grade visual contract from `02-project-setup.md`. Screenshot critique is required before visual claims upgrade. Required states: voice disabled, sidecar healthy, sidecar blocked, mic denied, recording, transcribing, transcript inserted, speaking, playback stopped, TTS error, auto-speak enabled/disabled, responsive controls with no overlap in the chat composer.

## Safety/security constraints

Do not store secret values. Block unsafe remote/private endpoints unless explicitly allowed as local sidecar policy. Voice audio/transcripts may be sensitive; use synthetic fixtures in evidence. Browser media permission cannot be faked into a qualified claim.

## Quality gates

- Voice config validation tests, including URL/private-IP/secret redaction cases.
- Fake STT/TTS adapter tests.
- Health check success/failure tests.
- Browser media proof or non-upgrading blocker for push-to-talk and playback controls.
- Visual quality and accessibility review for voice states.

## Proof gate

Proof id: proof-06-voice-sidecar-experience
Required proof types:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: 06-voice-sidecar-experience`.

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tool, retrieval, voice, and settings boundaries.

## Repair routing

If verification fails, repair in this phase unless the blocker is missing Phase 01 chat runtime, Phase 05 settings contract, unavailable browser media/sidecar runtime, or a required human decision about remote voice endpoints.
