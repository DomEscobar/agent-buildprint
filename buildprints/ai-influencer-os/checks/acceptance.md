# Acceptance Checks

## Alignment checks

- Coding agent asked `questions.md` unless user said “use Mila defaults”.
- Implementation records chosen deviations in `VALIDATION.md`.

## Architecture checks

- OpenClaw config exists.
- Persona plugin exists.
- Skills exist for image, post, social, journal, calendar, recall.
- Life modules exist for life tick, journal, social planner/autonomy, manager audit.
- Docker deployment exists.
- Browser/noVNC publishing flow is documented.

## Provider checks

- `.env.example` includes `WAVESPEED_API_KEY`.
- Image skill is designed around Wavespeed, with mock fallback for tests.
- OpenRouter/OpenClaw model vars are documented.

## Behavioral checks

- Public claims must be grounded in state/calendar/journal/social data.
- Public and private media policies are separate.
- Private sensitive media is trust/consent gated or blocked.
- Publishing is mock/manual-gated by default.
- Manager QA can block unsafe/canon-breaking drafts.

## Test checks

- Tests or validation scripts run without real external API calls.
- Missing real keys are reported as setup blockers, not hidden failures.
