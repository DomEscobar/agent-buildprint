# Browser QA Scenarios

Run these in a real browser automation tool or documented manual browser session. Service-only tests do not satisfy browser QA.

## Happy Path

1. Open the studio app.
2. Confirm source input and workflow stepper are visible.
3. Enter the default manual product description or selected fixture.
4. Click analyze.
5. Verify product analysis and at least two script cards render.
6. Select a script.
7. Edit narration text.
8. Select voice, actor, and video mode.
9. Start generation.
10. Verify status/logs advance through running to completed.
11. Verify a playable MP4 appears in the review/player area.
12. Verify visible metadata reports 1080x1920.
13. Open debug drawer and verify raw logs/manifest are secondary.
14. Enable gallery consent and verify gallery page/list updates.
15. Attempt publish handoff with selected platforms, title, description, schedule, timezone, and consent.
16. Verify mock/manual handoff result is visible and no direct platform publishing is claimed.
17. Capture completed desktop screenshot.
18. Repeat completed-state visual check at mobile width and capture screenshot.

## Negative Paths

- Submit empty source input; visible validation error appears.
- Submit invalid URL fixture; scrape/research failure is visible and recoverable.
- Force malformed script/provider output fixture; prior valid state remains intact.
- Force provider failure; job becomes failed with reason and retry button.
- Cancel running generation; no success artifact is created.
- Open gallery before consent; no private video appears.
- Attempt publish handoff without consent; handoff is blocked with reason.
- Switch to live-provider mode without keys; app shows structured blocked state, not fake success.

## Evidence Required

- Browser command or manual test notes.
- Completed desktop screenshot path.
- Completed mobile screenshot path.
- At least one negative-path screenshot or textual evidence.
- Confirmation that rendered UI, not only service functions, was used.
