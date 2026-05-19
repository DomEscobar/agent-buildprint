# Webapp Target Spec

## Stack Flexibility

Recommended source-evidence stack is React dashboard + FastAPI routes + FFmpeg + optional Remotion. The implementation may use another stack if every user-visible workflow, API/service contract, media output, and validation gate is satisfied.

## Required Routes / Views

- Studio home/workbench: source input, current project/job summary, workflow stepper.
- Analysis/scripts view: product analysis, web research summary when URL mode is used, selectable script cards.
- Configuration view: actor, voice, video mode, narration edits, consent controls.
- Generation view: job status, ordered logs, provider mode, retry/cancel.
- Review view: playable MP4 result, dimensions/duration, script metadata, output manifest summary.
- Gallery view: private by default; consented videos only.
- Video detail view: consented metadata and player only.
- Publish handoff view: selected platforms, title, description, schedule, timezone, consent, mock/manual handoff result.
- Debug/details drawer: logs, raw provider request records, manifest JSON, validation notes.

## Required API / Service Behavior

Equivalent endpoints or service actions must exist for:

- analyze product;
- generate actor options or validate actor upload;
- list/select voices;
- start video generation;
- get job status;
- cancel/retry generation;
- list consented gallery videos;
- render gallery/video pages or equivalent app routes;
- construct publish handoff payload.

## Required Happy Path

1. User enters manual description or URL fixture.
2. App returns product analysis and at least two scripts.
3. User selects a script and configures voice, actor, video mode, narration.
4. User starts generation and sees pollable progress/logs.
5. App produces playable 1080x1920 MP4 fixture.
6. User reviews result and sees safe limitation wording.
7. User explicitly consents to gallery exposure and sees gallery update.
8. User creates a mock/manual publish handoff payload with schedule/timezone.

## Required Negative Paths

- No source input.
- Invalid URL or scrape failure.
- Malformed provider/script output.
- Missing provider key in live mode.
- Provider adapter failure.
- Job cancel.
- Retry after failed generation.
- Gallery access without consent.
- Publish handoff without consent.

## Forbidden UI Substitutes

- Backend-only demo.
- Static docs page.
- Gallery-only frontend.
- Raw JSON explorer as the main product.
- Placeholder controls with no behavior.
