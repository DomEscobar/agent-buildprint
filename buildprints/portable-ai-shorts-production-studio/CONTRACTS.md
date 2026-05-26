# Contracts

Canonical behavior may be implemented through HTTP routes, server actions, RPC, or local services. The browser studio and tests must exercise equivalent inputs and outputs.

## Required domain objects

- ProviderRequestRecord: id, provider, operation, mode, status, timestamps, request id, sanitized request/response, error reason.
- Script: id, title, hook, CTA, exactly five segments, segment duration, narration, b-roll, caption hint, metadata.
- JobStatus: job id, status, current stage, logs, provider records, output manifest, result, error reason, retry lineage.
- OutputManifest: job id, provider mode, assets, provider request ids, video URL/path, filename, width, height, duration, mime type, limitations.
- GalleryMetadata: video id, consent state, title, description, manifest ref, visibility, created time.
- PublishHandoff: job id, selected platforms, title, description, schedule, timezone, consent, provider record, status.

## Required services

- Analyze product: manual description works without URL; URL mode routes through scraper/research adapters.
- Actor options/upload: generated refs or validated image upload; likeness consent required for custom actor publish use.
- Voice list: mock voices available without keys; live ElevenLabs blocked without credentials.
- Generate video: creates a pollable job; no fake completed result before media exists.
- Job status/cancel/retry: exposes pending, running, success, failure, blocked, canceled, retry.
- Gallery/video detail: private by default and only consented metadata appears.
- Publish handoff: mock/manual default; blocked without publish consent; no official platform API publishing claim.

## Provider adapters

Required adapter boundaries: scraper, research/script provider, voice provider, actor/talking-head/b-roll media provider, composer, gallery storage/S3, Upload-Post/social handoff. Default mode is deterministic mock/no-network. Live mode requires credentials, request IDs, sanitized responses, cost/quota notes, moderation notes, and explicit claim limits.
