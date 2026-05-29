# Specification

## Scope

Build a full browser webapp proof of an AI shorts production studio. API-only, gallery-only, route-shaped, static dashboard, raw JSON, or report-first implementations do not satisfy this Buildprint.

## Inputs

- Product URL or manual product/business description; at least one is required.
- Script controls: count, style, language, audience, actor direction.
- Configuration: selected/editable script, voice, actor generated/uploaded/reference, narration edits, video mode.
- Consent controls: likeness, gallery, publish handoff.
- Provider mode: deterministic mock/no-network by default; live mode optional and credential-gated.

## Outputs

- Product analysis and optional URL research summary.
- At least two selectable UGC scripts, each with exactly five timed segments and b-roll requirements.
- Actor and voice options plus validated provider request records.
- Pollable job status with logs, result/error, provider records, and output manifest.
- Playable local MP4 fixture that probes as 1080x1920 and is visibly nonblank with captions and b-roll timing.
- Consent-gated gallery metadata and video detail.
- Consent-gated mock/manual publish handoff payload.
- Runtime artifact: validation report with commands, screenshots, MP4 probe, provider mode, gaps, and status.

## Boundaries

Do not claim OpenShorts clone, provider/API parity, rendering-quality parity, live provider success, public gallery safety, direct platform publishing, or restart-safe production durability without direct proof.
