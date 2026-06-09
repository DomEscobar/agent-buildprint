# Phase 03 - AI Shorts Loop

## How to implement this phase

Build the product-description-or-URL-to-UGC-video loop with provider boundaries first.

## Building objective

Implement and prove the AI Shorts path: analyze a website URL or manual product description, generate a structured UGC script, select/upload/generate an actor, choose voice/video mode, create voice/video/b-roll assets through configured providers, composite a vertical UGC video, and return reviewable output with cost estimate and retry state.

If Gemini, fal.ai, or ElevenLabs keys are missing, the UI must block at the correct stage with clear recovery. A manual script fixture may be used to test downstream local composition only if labeled as fixture proof, not live AI proof.

## DO NOT

- Do not count a script-only response as completed UGC video.
- Do not claim actor, voice, lipsync, b-roll, or premium mode without provider proof.
- Do not auto-upload public gallery records without explicit operator confirmation.
- Do not bury provider errors in logs only.

## Minimum proof before moving on

- Analyze endpoint/UI path returns product-specific script or a provider blocker.
- Actor/voice/video mode controls have working or blocked behavior.
- Generated video path exists and plays, or provider blocker identifies missing service/key/stage.
- Cost estimate and retry behavior are visible.
- Browser proof for success or blocked provider stage.

## Handoff note

Record provider keys used or blocked, script source, job id, generated assets, gallery upload status, and cost/quality caveats.
