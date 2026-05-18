# Buildprint: Portable AI Shorts Production Studio

## Agent Operating Contract

Build a portable AI Shorts production studio that creates vertical UGC-style marketing video drafts from a product URL or a manual product description.

`BUILDPRINT.md` is the canonical authority. Supporting files provide contracts, source evidence, QA, threat modeling, and traceability; they do not override this file.

The implementation must be honest about provider and deployment boundaries. Generated videos are drafts until durability, key handling, consent, privacy, egress, and provider validation gates are satisfied.

## Binding Implementation Slice

The binding slice covers:

1. Product URL or manual product/business description input.
2. Product-page scraping and optional Gemini web research.
3. Structured product analysis and viral script generation.
4. User selection of voice, actor image, video mode, and narration edits.
5. Actor image generation or reuse, voiceover generation, and talking-head/lipsync generation through provider adapters.
6. B-roll generation, audio-derived subtitles, FFmpeg composition, and optional Remotion post-processing.
7. Local video result storage and status polling.
8. Gallery metadata/page generation only behind explicit privacy and publication gates.
9. Upload-Post handoff only after provider, consent, and platform validation gates pass.

Provider surfaces are adapters unless validated with credentials, sandbox evidence, and recorded request/response results: Gemini, ElevenLabs, fal.ai/Flux/Hailuo/Kling/VEED, Upload-Post, S3, scraping, and yt-dlp.

## Non-Goals / Unsafe Claims

Do not claim:

- publish-ready production behavior without durable job storage, durable job logs, provider request IDs, restart recovery tests, server-side key handling, URL egress policy, consent controls, gallery privacy controls, and provider validation evidence;
- direct official TikTok, Instagram, or YouTube API publishing;
- provider availability, moderation compliance, output quality, response schema stability, or cost stability;
- public gallery safety without private-by-default storage and explicit publish consent;
- multi-tenant hosted SaaS security while provider keys remain browser-managed;
- commercial product equivalence.

Temporary in-process job maps are allowed only for local proof runs and must not be described as restart-safe storage.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `SYSTEM_MAP.md`
5. `THREAT_MODEL.md`
6. `TEST_MATRIX.md`
7. `QA_PLAN.md`
8. `TRACEABILITY_MATRIX.md`
9. `SOURCE_TRACE.md`

## Phase Gates

1. Contract stabilization: request/response schemas for analysis, scripts, generation, job status, gallery metadata, and publish handoff are defined.
2. Provider adapter boundaries: Gemini, ElevenLabs, fal.ai, Upload-Post, and S3 calls are isolated behind explicit adapter contracts with test doubles.
3. Runtime durability: jobs, logs, provider request IDs, output manifests, and retry state survive backend restart before any production claim.
4. Media validation: FFmpeg subtitle escaping, b-roll timing, vertical dimensions, Remotion proxy behavior, and output URL conversion are tested with fixtures.
5. Privacy and consent: uploaded actor photos, generated likenesses, gallery exposure, URL scraping/downloading, and publish handoff require explicit controls.
6. External validation: paid/provider/platform behavior is tested only with approved credentials, sandbox targets, and recorded evidence.

## Acceptance Gates

- Manual-description analysis returns structured product analysis and scripts without requiring URL input.
- URL analysis executes scrape, optional web research, analysis, and script generation through adapter seams.
- Video generation returns a pollable `job_id`, status logs, and a final result containing playable vertical MP4 metadata.
- The composed MP4 is playable and reports 1080x1920 for acceptance fixtures.
- Status and logs survive restart before production readiness is claimed.
- Social handoff payload matches selected platforms, title/description, schedule, and timezone.
- Gallery pages render valid HTML and metadata only after explicit publication consent.
- Provider sandbox results are recorded before claiming a live provider path works.

## Purpose

This Buildprint turns the OpenShorts AI Shorts workflow into a clean, portable architecture contract. It preserves the useful route, UI, provider, composition, and deployment evidence while requiring production claims to be backed by working durability, safety, and validation gates.

## Architecture

```txt
React dashboard
  -> FastAPI AI Shorts routes
    -> product scrape / Gemini research adapter
    -> product analysis + script adapter
    -> actor image / voice / video provider adapters
    -> subtitle + FFmpeg composition
    -> optional Remotion render service
    -> local output + gallery metadata
    -> Upload-Post handoff adapter
```

Primary evidence anchors:

- Product/manual input and analyze route: `app.py:1661-1717`
- Web research/scrape/analyze: `saasshorts.py:47-365`
- Script generation: `saasshorts.py:368-546`
- Actor/voice/video configuration UI: `dashboard/src/components/SaaShortsTab.jsx:850-1188`
- Provider asset generation: `saasshorts.py:553-1015`
- Subtitle/composition/orchestration: `saasshorts.py:1049-1474`
- Generate/status API: `app.py:2060-2230`
- Gallery/SEO pages: `app.py:1896-2046`
- Social publish handoff: `app.py:1812-1893`
- Docker services: `docker-compose.yml:1-40`

## Evidence Boundary

Source citations prove code shape and observed control flow. They do not prove live provider success, hosted deployment security, public bucket safety, platform publishing success, moderation outcomes, or restart-safe job durability. Those claims require the acceptance evidence above.

## Required Validation

Run the targeted checks documented in `QA_PLAN.md` and `TEST_MATRIX.md`. At minimum, validate request/response contracts, provider test doubles, FFmpeg composition with safe fixtures, status polling, private-by-default gallery behavior, and Upload-Post payload construction. Record external-provider tests separately with credentials, account, date, request IDs, and sanitized responses.

## Copyable Agent Prompt

```txt
Implement the Portable AI Shorts Production Studio exactly as this Buildprint contract.

Use BUILDPRINT.md as the authority. Preserve the FastAPI + React + provider-adapter + FFmpeg/Remotion architecture. Build only claims that can pass the acceptance gates.

Do not describe in-process job maps as durable storage. Do not expose gallery output publicly without explicit publish consent. Do not treat Gemini, ElevenLabs, fal.ai/Flux/Hailuo/Kling/VEED, Upload-Post, S3, scraping, or yt-dlp behavior as production-ready until sandbox/provider validation is recorded.

Required result: a pollable AI Shorts workflow from product URL/manual input through scripts, assets, composition, local video result, gated gallery, and gated social handoff, with tests and validation evidence for every included production claim.
```
