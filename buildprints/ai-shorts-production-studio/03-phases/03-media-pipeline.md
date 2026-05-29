# Phase 03 - Media Pipeline

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`, then

1. declare phase objective
2. write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` with required roles
3. create handoff/return files only for real delegation
4. collect reviews
5. integrate
6. verify
7. record evidence

Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - data-persistence
  - security-boundary

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Shared proof spine: preconditions/inputs, entrypoint or use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The deterministic mock/no-network generation path produces a playable local 1080x1920 MP4 fixture with nonblank visual content, captions/subtitles, b-roll timing markers or visible transitions, escaped provider text, output URL/path conversion, and an output manifest consumed by the job runtime and browser review flow.

## Mapped product obligations

- Source path `saasshorts.py` handled voiceover, actor/talking-head, b-roll, subtitle generation, FFmpeg composition, and full-video orchestration.
- Source path `app.py` served local output files and returned video URL/path, filename, status, and manifest data.
- Source path optional render service validated render requests and converted output paths.

## Behavior compatibility contract

- media-composition: preserve. Equivalent target behavior: deterministic fixture pipeline creates playable vertical MP4 with captions and b-roll markers. Compatibility impact: mock fixture does not claim provider/rendering quality parity.
- subtitle-text-safety: preserve. Equivalent target behavior: provider-generated text is escaped or sanitized before subtitle/FFmpeg filters. Compatibility impact: unsupported characters may be blocked with a recorded reason.
- optional-remotion-postprocessing: defer. Equivalent target behavior: optional render service can be added only with schema validation and failure isolation. Compatibility impact: base MP4 proof cannot depend on unproven Remotion service.
- live-media-provider-output: defer. Equivalent target behavior: live provider paths remain blocked unless request IDs, sanitized responses, cost, moderation, and output proof exist.

## Implementation scope

Implement fixture audio or browser-compatible audio track, deterministic actor/talking-head visuals, deterministic b-roll visual segments, caption/subtitle generation, composition, output probe, nonblank/transition check, output manifest update, and failure propagation into job status. Add tests for dimensions, playability/probe metadata, subtitle escaping, b-roll timing, nonblank content, output URL conversion, and blocked/live-provider claim honesty.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: generation result/output manifest fields and served video URL/path.
- Provider/tool contracts: voice, actor/talking-head, b-roll, composer, optional Remotion.
- None - reason: final browser review is owned by a later UI phase.

## State/runtime touched

- Database/persistence: output manifest and media artifact metadata attached to jobs.
- Env/config: FFmpeg or equivalent composer availability; optional renderer endpoint only if implemented.
- Jobs/workers/runtime: media stages, failure states, probe validation, artifact cleanup/retention.
- Runtime artifacts/generated outputs: runtime artifact: playable MP4; runtime artifact: subtitle/caption file if used; runtime artifact: b-roll timing metadata; runtime artifact: ffprobe/probe report; runtime artifact: output manifest.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


None - reason: media is not the UI in this phase. Downstream UI obligations: show playable video, 1080x1920 badge, duration, captions or caption proof, b-roll/manifest summary, provider mode, and limitations.

## Safety/security constraints

Escape shell-sensitive and subtitle-sensitive text. Do not pipe untrusted provider text into command arguments unsafely. Keep output files under app-controlled directories. Do not expose private outputs publicly by default. Do not treat a blank/solid-color file or metadata-only artifact as media proof.

## Quality gates

- Media unit/integration proof for subtitle escaping and b-roll timing.
- Probe command or equivalent metadata proving width 1080 and height 1920.
- Nonblank/visual-transition check.
- Browser-compatible playable file check where possible.
- No-network default provider gate.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-03-media-pipeline
Required proof types:
- unit_or_integration_test
- media_probe_1080x1920
- nonblank_caption_broll_check
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, gallery, and publish handoff paths.

Required runtime evidence row must use `phase_id: 03-media-pipeline` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
