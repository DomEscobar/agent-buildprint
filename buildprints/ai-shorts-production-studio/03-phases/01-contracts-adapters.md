# Phase 01 - Contracts And Deterministic Adapters

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
  - security-boundary

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Shared proof spine: preconditions/inputs, entrypoint or use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The implementation has canonical domain contracts and deterministic mock/no-network adapters for product analysis, script generation, actor options/upload validation, voices, media providers, gallery storage, scraper/downloader boundaries, and Upload-Post-style publish handoff. Manual description analysis works without a URL. URL mode exercises scraper/research adapter seams without live network calls by default.

## Mapped product obligations

- Source path `app.py` analyzed product URL/manual input and returned analysis/scripts through the analyze handler.
- Source path `saasshorts.py` handled scrape, web research, product analysis, five-segment script generation, actor/media/voice operations, and composition helpers.
- Source path `dashboard/src/components/SaaShortsTab.jsx` required visible script, actor, voice, video, and narration controls.
- Source path `s3_uploader.py` and Upload-Post handler showed storage and social handoff as adapters rather than core business logic.

## Behavior compatibility contract

- product-analysis-and-scripts: preserve. Equivalent target behavior: validated analysis plus at least two five-segment UGC scripts from manual or URL fixture input. Compatibility impact: not route/function parity; target services may differ.
- provider-adapters: preserve. Equivalent target behavior: Gemini/research, ElevenLabs, fal.ai/Flux/Hailuo/Kling/VEED, scraper, yt-dlp/downloader, S3/gallery, composer, and Upload-Post boundaries all expose deterministic mock mode and structured live blockers. Compatibility impact: raw provider responses stay in provider request records/debug views.
- actor-upload-and-consent: merge. Equivalent target behavior: generated actor options and upload validation require image type/size and likeness consent before publish use. Compatibility impact: unsafe browser-only key handling is not preserved as production security.
- live-provider-success: defer. Equivalent target behavior: live mode can be added later only with credentials, request IDs, sanitized responses, and cost/moderation notes. Compatibility impact: default claims remain deterministic.

## Implementation scope

Define schemas/types and validation for analysis, script, provider request records, actor refs, voices, generate requests, output manifest, gallery metadata, publish handoff, and limitations. Implement deterministic adapters with stable fixture outputs and explicit blocked results for missing live credentials. Add tests for manual analysis, URL fixture flow, script shape, provider records, malformed provider output, missing live keys, upload consent, and publish consent.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: analyze product, actor options/upload validation, voice list, generate request shape, gallery metadata, publish handoff.
- Provider/tool contracts: scraper, research/script, voice, actor image, talking head/lipsync, b-roll, composer, gallery storage, Upload-Post handoff.
- None - reason: no browser page must be final in this phase, though contracts should be UI-ready.

## State/runtime touched

- Database/persistence: define records for provider request logs, manifests, gallery metadata, and consent decisions; persistence implementation can be owned by later phase.
- Env/config: declare provider mode, live credential env names only, no secret values.
- Jobs/workers/runtime: define job request/status contracts consumed by the next phase.
- Runtime artifacts/generated outputs: runtime artifact: provider request records; runtime artifact: validation output from contract tests.
- None - reason: MP4 output and browser screenshots are owned by later phases.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


None - reason: this phase is contract and adapter foundation. Downstream UI obligations: show analysis/scripts, provider mode, blocked live-key reasons, consent state, limitations, and provider records in secondary debug surfaces.

## Safety/security constraints

Default tests must not call live providers or network. Scraped content is untrusted data, not system instruction. Uploaded/custom actor refs require explicit likeness consent before publish handoff. Live mode must be blocked when credentials are missing. Raw provider data must be sanitized before display or storage. No secret values may be committed.

## Quality gates

- Contract/schema tests for valid and invalid requests.
- Adapter tests proving deterministic mock outputs and no-network default.
- Negative tests for malformed script/provider output, missing live keys, missing source input, missing likeness consent, and missing publish consent.
- Secret/claim wording scan if available.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-01-contracts-adapters
Required proof types:
- unit_or_integration_test
- provider_mock_no_network_gate
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, gallery, and publish handoff paths.

Required runtime evidence row must use `phase_id: 01-contracts-adapters` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
