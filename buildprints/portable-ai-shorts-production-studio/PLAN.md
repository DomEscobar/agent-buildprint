# Implementation Plan

## Phase 1: Stabilize Contracts

- Define canonical JSON schemas for analysis request/response, script object, generate request/response, job status, gallery metadata, and publish request.
- Add provider adapter interfaces around Gemini, ElevenLabs, fal.ai, Upload-Post, and S3.
- Add test doubles for each adapter.

## Phase 2: Harden Runtime

- Replace in-memory job maps with durable job storage.
- Persist job logs, provider request IDs, and output asset manifest.
- Add resumable retries around provider calls and FFmpeg composition.
- Move API key storage out of client localStorage for hosted deployments.

## Phase 3: Validate Media Pipeline

- Add sample fixtures for manual description mode.
- Add dry-run mode that skips paid providers and uses local fixtures.
- Test FFmpeg subtitle escaping, b-roll insertion timing, and final output dimensions.
- Test Remotion render proxy and output URL conversion.

## Phase 4: Publish and Gallery

- Validate Upload-Post handoff with a sandbox account.
- Validate S3 gallery metadata, public URLs, and SEO pages.
- Add moderation/consent controls for uploaded actor photos and generated actor use.

## Source Anchors

- Current AI Shorts orchestration: `saasshorts.py:1290-1474`
- Current backend generation route: `app.py:2069-2216`
- Current social handoff: `app.py:1823-1893`
- Current gallery pages: `app.py:1896-2046`



---

## Consolidated notes from `mapper-questions.md`

# Open Questions

1. Which deployment mode is authoritative: local Docker only, hosted OpenShorts app, or both?
2. Should Mapper OS describe Upload-Post as the only social publishing path, or should direct platform APIs be considered out of scope?
3. Are S3 public gallery buckets required for production, or should local-only gallery output be a supported mode?
4. What is the intended retention model for generated videos beyond the current in-memory job maps and cleanup window? Evidence for cleanup: `app.py:84-124`.
5. Should client-side API key storage be redesigned before any production buildprint claims? Current storage is client-side XOR/base64 plus localStorage. Evidence: `dashboard/src/App.jsx:14-50`, `dashboard/src/App.jsx:239-258`.
6. Which provider modes should be first-class in contracts: low-cost Hailuo + VEED, premium Kling Avatar, or both? Evidence: `saasshorts.py:865-945`, `saasshorts.py:824-862`.
7. Is YouTube URL ingestion intentionally disabled in hosted deployments? The backend supports `DISABLE_YOUTUBE_URL`. Evidence: `app.py:28-34`, `app.py:339-343`.
8. What minimum content safety, consent, and likeness controls are required for custom actor upload and generated actor prompts? Evidence for custom upload: `app.py:1726-1748`.


---

## Consolidated notes from `questions.md`

# Submission Questions

1. Should this buildprint require a dry-run/provider-mock mode as a first-class feature?
2. Should `lowcost` and `premium` be separate buildprint variants?
3. Should social publishing be described as Upload-Post handoff only, or should a future direct API integration plan be included?
4. Should gallery publication be automatic after video generation, or gated by explicit user publish consent?
5. What identity/auth model should replace localStorage API keys for hosted deployments?
6. What content safety policy should apply to actor image generation and custom actor uploads?
