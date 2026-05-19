# Contracts

These contracts describe required behavior and data boundaries. Implementations may use HTTP routes, server actions, RPC, or local services, but the browser studio and tests must exercise equivalent inputs/outputs.

## Shared Types

### ProviderRequestRecord

Required fields:

- `id`: stable local ID.
- `provider`: `mock-gemini`, `mock-elevenlabs`, `mock-fal`, `mock-upload-post`, `mock-s3`, `mock-scraper`, or live provider label.
- `operation`: research, analyze, script, actor, voice, talking_head, b_roll, compose, gallery, publish_handoff.
- `mode`: `mock` or `live`.
- `status`: pending, running, success, failure, blocked.
- `started_at`, `completed_at`.
- `request_id`: provider request ID when live; deterministic local ID when mock.
- `sanitized_request`, `sanitized_response`, `error_reason`.

Provider records are evidence, not user-facing primary UI. Show summaries in the studio and raw details in a debug drawer.

### Script

Required fields:

- `id`, `title`, `hook`, `cta`.
- `segments`: exactly five items.
- Each segment: `index`, `duration_seconds`, `narration`, `b_roll`, `caption_hint`.
- `metadata`: style, language, actor direction, provider mode.

### OutputManifest

Required fields:

- `job_id`, `version`, `provider_mode`, `created_at`.
- `assets`: actor, voiceover, talking_head, b_roll, subtitle, composed_video.
- `provider_requests`: ProviderRequestRecord IDs.
- `video`: URL/path, filename, width, height, duration, mime type.
- `limitations`: non-claim text.

## Analyze Product

Canonical endpoint: `POST /api/saasshorts/analyze`

Request:

- `url`: optional string.
- `description`: optional string.
- `num_scripts`: integer, default 2, min 1.
- `style`: string.
- `language`: string.
- `actor_gender`: string.
- `provider_mode`: `mock` default, `live` optional gated mode.

Rules:

- At least one of `url` or `description` is required.
- Manual description mode must work without URL.
- URL mode must route scraping/research through adapters.
- Untrusted scraped content must not become trusted prompt/system instructions.

Response:

- `analysis`: product name, audience, value props, differentiators, risks, source mode.
- `scripts`: Script[].
- `web_research`: null in manual mode or structured research summary in URL mode.
- `provider_requests`: ProviderRequestRecord[].

Evidence anchors: `app.py:1661-1717`, `saasshorts.py:47-546`.

## Actor Options / Upload

Canonical endpoint: `POST /api/saasshorts/actor-options`

Request:

- `actor_description`.
- `num_options`.
- `product_description`.
- `likeness_consent`: required for uploaded/custom likeness path.
- `provider_mode`.

Response:

- `images`: array of actor refs with `id`, `url`, `description`, `provider_request_id`, `consent_required`.

Rules:

- Generated actor options use adapter seams.
- Uploaded actor photos must validate image type/size and require explicit likeness consent.
- Unconsented actor refs cannot be used for publish handoff.

Evidence anchors: `app.py:1720-1798`, `saasshorts.py:673-754`.

## Voice List

Canonical endpoint: `GET /api/saasshorts/voices`

Response:

- `voices`: array of `id`, `name`, `description`, `provider`, `mode`.
- Defaults must be available in mock mode without keys.
- Live ElevenLabs mode requires env/key gate and provider evidence.

Evidence anchors: `app.py:2233-2245`, `saasshorts.py:796-817`.

## Generate Video

Canonical endpoint: `POST /api/saasshorts/generate`

Request:

- `script`: Script.
- `voice_id`.
- `actor_description`.
- `selected_actor_url`.
- `retry_job_id`.
- `video_mode`: premium, low_cost, mock.
- `provider_mode`: mock default, live optional gated mode.
- `gallery_consent`: false default.
- `likeness_consent`: required if custom actor likeness is used.

Immediate response:

- `job_id`.
- `status`: pending or queued.

Rules:

- Missing live keys block live mode with structured reason; mock mode must remain explicit.
- Starting generation must create a pollable job and visible UI state.
- Generation must not return fake completed status before media output exists.

Evidence anchors: `app.py:2060-2216`, `saasshorts.py:1290-1474`.

## Job Status

Canonical endpoint: `GET /api/saasshorts/status/{job_id}`

Response:

- `status`: pending, running, success, failure, canceled.
- `logs`: ordered entries with timestamp, level, message.
- `provider_requests`.
- `output_manifest`.
- `result`: null until success; includes video URL/path, filename, duration, width, height, cost estimate, script, optional gallery video ID.
- `error_reason`: present on failure/blocked/canceled states.

Additional actions:

- cancel job;
- retry failed job;
- inspect output manifest.

## Gallery

Canonical endpoints:

- `GET /api/saasshorts/gallery`
- `GET /gallery`
- `GET /video/{video_id}`

Rules:

- Private by default.
- Only consented metadata appears in gallery API/pages.
- Gallery pages include valid HTML, JSON-LD/Open Graph metadata, and playable local video refs.
- Unconsented or missing IDs return empty/not found without leaking metadata.

Evidence anchors: `app.py:1801-1809`, `app.py:1896-2046`.

## Publish Handoff

Canonical endpoint: `POST /api/saasshorts/post`

Request:

- `job_id`.
- `api_key` or server-side configured handoff credential.
- `user_id`.
- `platforms`: selected subset of TikTok, Instagram, YouTube.
- `title`.
- `description`.
- `scheduled_date`.
- `timezone`.
- `publish_consent`: required true.

Response:

- `handoff_id`.
- `provider`: Upload-Post mock/live adapter label.
- `status`: blocked, prepared, submitted.
- `payload_summary`: selected platforms, title, description, schedule, timezone.
- `provider_request`: ProviderRequestRecord.

Rules:

- Default mode is mock/manual handoff.
- Do not claim direct official platform publishing.
- Live Upload-Post requires sandbox evidence before live-path claim.

Evidence anchors: `app.py:1812-1893`.
