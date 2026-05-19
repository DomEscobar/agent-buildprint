# QA Plan

## Static QA

- Validate schemas/contracts for all API/service shapes.
- Run type/import/static checks for the chosen stack.
- Run secret scan for provider keys and tokens.
- Run claim wording check against `claims.yaml`.
- Verify no default tests call live providers.

## Unit / Contract QA

- Mock Gemini, ElevenLabs, fal.ai/media, Upload-Post, S3, scraping, and yt-dlp.
- Test analysis, scripts, actor options/upload validation, voice list, generation request validation, status polling, gallery consent, and publish payload construction.
- Test malformed provider/script output rejection.
- Test missing live keys return structured blocked states.

## Runtime / Job QA

- Test pending/running/success/failure/cancel/retry.
- Test ordered logs, provider request records, output manifest, and error reasons.
- Test restart persistence or record temporary-storage blocker.

## Media QA

- Test subtitle escaping with provider-like strings.
- Test b-roll timing/visual changes.
- Generate fixture MP4 and run ffprobe for 1080x1920.
- Verify output is playable and nonblank.
- If Remotion exists, test render schema, output path, URL conversion, and failure handling.

## Browser QA

- Run real browser happy path from `HEAD_TO_FOOT_QA.md`.
- Run negative paths from `BROWSER_QA_SCENARIOS.md`.
- Capture completed-state desktop and mobile screenshots.
- Verify rendered UI, not just service functions, was used.

## External QA

Optional only. Run provider sandbox tests only with explicit credentials and cost approval. Record provider request IDs, sanitized responses, date, account/sandbox target, cost/quota notes, and limitations.

## Acceptance Criteria

- Full webapp studio proof exists and is browser-tested.
- Generated fixture MP4 is playable, nonblank, and reports 1080x1920.
- Local proof mode status reaches success/failure with inspectable logs and provider records.
- Gallery and publish handoff are private/blocked until explicit consent.
- Production/live-provider claims are absent unless evidence exists.
