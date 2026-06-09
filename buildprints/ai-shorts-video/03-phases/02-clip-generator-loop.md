# Phase 02 - Clip Generator Loop

## How to implement this phase

Build the long-form-video-to-shorts loop around real media processing and honest provider seams.

## Building objective

Implement and prove the Clip Generator path: upload or ingest owned source video, transcribe it, detect candidate moments, generate 3-15 short candidates, cut vertical MP4s, add hook/caption metadata, and show them in the review surface. Gemini may choose moments only when a real key is configured; otherwise the phase must preserve a deterministic/local blocker path without pretending to know viral quality.

The operator should be able to play each generated short, see source-derived title/hook/caption/platform metadata, inspect processing logs, and retry or move to editing/publishing.

## DO NOT

- Do not output generic clips unrelated to the source.
- Do not claim AI viral detection without Gemini response proof.
- Do not silently skip transcription, scene detection, crop/reframe, or caption timing.
- Do not let oversized files or disabled YouTube ingest fail unclearly.

## Minimum proof before moving on

- API/UI proof for upload or URL submission with rights attestation.
- Job status transitions through queued/processing/completed or failed with specific error.
- At least one generated MP4 exists, plays, and is linked to source metadata, or an exact provider/runtime blocker is recorded.
- Caption/hook metadata is source-derived, not filler.
- Browser proof of result review state and blocked/error state.

## Handoff note

Record source fixture, output path, job id, generated clip count, provider/runtime blockers, and unproven quality claims.
