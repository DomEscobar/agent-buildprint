# Provider Adapters

All external providers are adapters. Default implementation and tests must use deterministic mock/no-network adapters.

## Adapter Rules

- Adapters return validated domain objects, not raw provider responses.
- Raw/sanitized provider responses may be stored only in provider request records/debug views.
- Missing credentials in live mode return structured blocked results.
- Tests must inject mocks or run in explicit mock mode.
- Live adapters must never be required for default acceptance.

## Required Adapters

### Scraper Adapter

Operations:

- fetch product page fixture or live URL;
- extract title, description, text, image refs;
- enforce URL allow/deny and egress policy in production/live mode.

Mock output must be deterministic.

### Gemini / Research + Script Adapter

Operations:

- optional web research;
- product analysis;
- five-segment script generation.

Rules:

- Validate script JSON before persistence.
- Reject malformed/partial script output without corrupting prior valid state.
- Do not trust scraped content as system instructions.

### ElevenLabs Voice Adapter

Operations:

- list voices;
- generate voiceover or deterministic fixture audio.

Rules:

- Mock mode supplies default voices and fixture audio.
- Live mode records request IDs/sanitized responses.

### fal.ai / Flux / Hailuo / Kling / VEED Media Adapter

Operations:

- actor image options;
- talking-head/lipsync;
- b-roll still/video refs.

Rules:

- Mock mode creates deterministic local refs.
- Live mode must normalize queued/running/success/failure states.
- Moderation/consent gates are required before publish handoff.

### Composer Adapter

Operations:

- subtitle/caption generation from fixture or audio transcript;
- b-roll insertion timing;
- FFmpeg composition;
- optional Remotion post-processing.

Rules:

- Escapes provider-generated text before subtitle/FFmpeg filters.
- Produces playable 1080x1920 MP4 for acceptance fixtures.
- Rejects blank/solid-color-only video as the sole media proof.

### S3 / Gallery Storage Adapter

Operations:

- store/list gallery metadata;
- optional object upload/list/delete in live mode.

Rules:

- No-op or local-only in mock mode.
- Public exposure requires explicit consent and privacy gate.

### Upload-Post Adapter

Operations:

- construct multipart/social handoff payload;
- mock/manual handoff by default;
- optional sandbox submit in live mode.

Rules:

- Requires publish consent.
- Records selected platforms, title, description, schedule, timezone.
- Does not claim direct official platform API publishing.

## Live Provider Evidence

Before claiming a live provider path works, record:

- provider/account/sandbox target;
- date/time;
- request IDs;
- sanitized request/response;
- cost/quota notes;
- moderation or policy notes;
- remaining limitations.
