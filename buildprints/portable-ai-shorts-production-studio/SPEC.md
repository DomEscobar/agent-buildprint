# Specification

## Target Result

The implementation must be a full browser webapp proof of an AI shorts production studio. API-only, gallery-only, route-shaped, or raw-debug proofs do not satisfy this Buildprint.

The stack is flexible. React/FastAPI/FFmpeg/Remotion are source-evidence defaults, but equivalent behavior in another stack is acceptable when all UI, contract, media, and validation gates pass.

## Inputs

- `url`: optional product website URL for scraping/research. Evidence: `app.py:1661-1668`, `dashboard/src/components/SaaShortsTab.jsx:466-482`.
- `description`: optional manual product/business description. Evidence: `app.py:1661-1664`, `dashboard/src/components/SaaShortsTab.jsx:484-495`.
- `num_scripts`, `style`, `language`, `actor_gender`: script controls. Evidence: `app.py:1664-1668`, `saasshorts.py:368-375`.
- Actor/voice/video configuration: selected script, voice, actor description/ref/upload, video mode, narration edits. Evidence: `dashboard/src/components/SaaShortsTab.jsx:850-1188`.
- Consent gates: likeness consent, gallery consent, publish handoff consent.
- Provider mode: mock/no-network default; live optional and gated.

## Outputs

- Product analysis, web research summary when URL mode is used, and at least two five-segment scripts.
- Actor options or validated actor upload reference.
- Voice options and selected voice metadata.
- Pollable job with status, logs, provider request records, output manifest, result/error.
- Playable local MP4 fixture with URL/path, filename, width, height, duration, and script metadata.
- Optional consented gallery video ID and gallery/video HTML metadata.
- Optional mock/manual Upload-Post handoff response.
- Validation report with commands, screenshots, MP4 probe, provider mode, and gaps.

## User-Visible Requirements

- Browser UI must expose source input, analysis/scripts, configuration, generation progress, review/player, gallery, and publish handoff.
- Primary UI must feel like a production studio, not a debug dashboard.
- Debug/log/manifest/provider refs must be available but secondary.
- Every enabled control must perform a visible action.
- Empty/loading/success/failure/retry states must exist for major workflows.

## Non-Functional Requirements

- Default tests and default runtime proof must not call live providers.
- Background generation status must be pollable. Evidence: `app.py:2219-2230`, `dashboard/src/components/SaaShortsTab.jsx:136-171`.
- Production claims require durable job storage, durable job logs, provider request IDs, and restart recovery tests.
- Hosted deployments must handle provider keys server-side through environment or secret storage.
- URL scraping/downloading requires allow/deny and egress policy before production claim.
- Uploaded/generated actor use requires likeness consent and moderation gates before publish.
- Gallery output must be private by default and require explicit publish/gallery consent.
- Live provider output, quotas, response schemas, moderation, and platform handoff must pass sandbox validation before live-path claims.
- Output files live under an app-controlled output area and are served through app routes. Evidence: `app.py:22-27`, `app.py:181-187`.
- Docker Compose or equivalent production build/runtime instructions should run backend/service, frontend, and optional renderer. Evidence: `docker-compose.yml:1-40`.

## Explicit Non-Claims

- No OpenShorts clone or drop-in replacement.
- No provider/API parity implementation.
- No rendering-quality parity proof.
- No social-platform publishing parity proof.
- No direct official TikTok/Instagram/YouTube API publishing.
- No provider model availability, quality, moderation, or cost guarantee.
- No public gallery safety without configured private/default storage and explicit consent.
- No production restart-safe claim without durable storage and restart tests.
