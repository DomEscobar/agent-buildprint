# Browser QA Scenarios

## Automated Playwright

1. Project fixture load
   - Open app.
   - Load 3-chapter fixture.
   - Assert chapters render in order and event states are pending.

2. Event extraction
   - Click extract events.
   - Assert each chapter transitions through running to success.
   - Trigger one mock failure and assert failure reason appears.

3. ScriptAgent happy path
   - Open ScriptAgent.
   - Fill project config.
   - Run skeleton, adaptation, and one script stage.
   - Assert plan tabs and script list update.

4. XML validation failure
   - Inject malformed storyboard XML.
   - Assert error panel appears and previous storyboard rows remain unchanged.

5. ProductionAgent happy path
   - Open ProductionAgent for script.
   - Run asset extraction, director plan, storyboard table, storyboard rows.
   - Assert assets, table, rows, tracks, and task log render.

6. Mock media generation
   - Generate storyboard images and track video.
   - Assert no network call occurs.
   - Assert media records attach to row/track.

7. Cancellation
   - Start a delayed mock job.
   - Click stop/cancel.
   - Assert job state is cancelled and no partial success artifact is added.

8. Preview export
   - Open preview.
   - Assert timeline lanes and selected clip details render.
   - Assert local thumbnails/placeholders render in the primary preview.
   - Select a clip and assert selected-shot inspector updates.
   - Open debug drawer and assert task log/raw refs are available but secondary.
   - Export manifest.
   - Assert deterministic hash for fixed clock/ids.

9. Product-quality smoke
   - Assert no raw `mock://` URI table is the primary media surface.
   - Assert manifest JSON is behind export/details and does not dominate the initial preview.
   - Assert completed desktop and mobile screenshots show storyboard/timeline/inspector state.
   - Assert labels such as image/video/success do not split across narrow cells.

## Manual QA

- Resize desktop/mobile; no overlapping panel text or controls.
- Switch storyboard modes and verify prompt/image/track rules.
- Verify task log is understandable after failures and retries.
- Verify provider settings default to mock and live mode is visibly gated.
- Verify non-parity limitations are visible in preview/export area.
- Verify the result reads as a creative workbench, not a generic admin dashboard.

## No-Network Gate

In automated tests:

- Replace `fetch`, `XMLHttpRequest`, and provider SDK entry points with throwing stubs.
- Test passes only if default workflow uses mocks.
- Local visual fixtures must still render under no-network conditions.

## Source-Implied Workflow

Manual flow follows the documented Toonflow quick start: vendor setup, project/novel import, event extraction, ScriptAgent, ProductionAgent, storyboard/workbench, preview/export substitute. Evidence: `docs/README.en.md:141-146`.
