# Head-to-Foot QA Plan

Purpose: prove the generated webapp works as a real runtime product flow, not only as isolated unit tests.

This QA plan is the required acceptance gate for any webapp built from this Buildprint.

## QA Levels

### Level 0 — Static Safety

Required checks:

- Buildprint package is self-contained.
- No source-repo paths are required at runtime.
- No secrets/API keys appear in artifacts.
- Safe/unsafe claims from `PARITY_CLAIMS.md` are visible in app/docs.
- Default provider mode is mock/no-network.
- Product-quality anchor from `PRODUCT_QUALITY_BAR.md` is visible in app/docs or implementation report.

Evidence to record:

- command output for secret scan,
- list of runtime source files,
- safe-claim text in UI or docs.

### Level 1 — Unit/Contract Tests

Required checks:

- Ordered chapter import.
- Empty/invalid chapter import rejection.
- Observed-to-portable state mapping.
- Event success/failure states.
- ScriptAgent config/chapter-range guards.
- XML parser accepts valid agent output.
- XML parser rejects invalid/partial/malformed output.
- Storyboard row validation: row count, duration, asset refs, mode rules.
- No partial persistence after invalid XML.
- Async job success/failure/cancel/retry.
- Deterministic IDs/clock/manifest snapshot.
- No-network gate: `fetch`, `XMLHttpRequest`, and provider SDK entry points throw by default.

Required command:

```bash
npm test
```

Pass condition:

- all tests pass,
- test count and files recorded.

### Level 2 — Production Build

Required command:

```bash
npm run build
```

Pass condition:

- TypeScript/build passes,
- static assets generated,
- no build-time provider/network dependency.

### Level 3 — Real Browser Runtime Happy Path

This is the most important product-flow test.

Required flow in a real browser, preferably automated with Playwright/CDP:

1. Open app.
2. Load/import 3-chapter fixture.
3. Extract events.
4. Verify 3 chapter events render as success.
5. Open ScriptAgent workspace.
6. Run story outline.
7. Run adaptation strategy.
8. Write scripts.
9. Verify scripts render.
10. Open ProductionAgent workspace.
11. Extract assets.
12. Generate director plan.
13. Generate storyboard table.
14. Generate storyboard rows from XML/agent output path.
15. Generate mock storyboard images.
16. Generate mock track videos.
17. Open Preview timeline.
18. Verify timeline/track/clip UI renders with local thumbnails or deterministic visual placeholders.
19. Select a storyboard clip and verify selected-shot inspector renders frame, description, prompt, assets, duration, track, and media state.
20. Open debug drawer/details and verify task log/raw refs/manifest area are secondary.
21. Export/read manifest from rendered UI.
22. Assert manifest contains at least:
    - version `portable-preview-1`,
    - 3 chapters,
    - 3 events,
    - >=1 script,
    - >=4 assets,
    - >=1 storyboard row,
    - >=1 track,
    - >=1 media record,
    - task log entries,
    - limitations/non-parity text.

Required command example:

```bash
npm run dev -- --host 127.0.0.1 --port 5179 --strictPort
APP_URL=http://127.0.0.1:5179/ node scripts/runtime-live-test.mjs
```

Pass condition:

- browser automation clicks actual rendered controls,
- manifest is parsed from rendered UI,
- all counts and limitation text pass,
- completed-state desktop screenshot captured,
- completed-state mobile screenshot captured,
- primary preview does not lead with raw URI tables, task log, or manifest textarea.

### Level 4 — Runtime Negative Paths

Required real-browser scenarios:

- Event extraction mock failure shows failure reason and retry option.
- Invalid storyboard XML shows validation error and prior rows remain unchanged.
- Delayed job cancellation marks job cancelled and does not create success artifact.
- Mock media failure creates failed media/task state and retry can succeed without duplicate owner media.
- Switching storyboard modes changes prompt/image/track behavior:
  - pure text: empty prompt, no image generation,
  - image-assisted: prompt required, tracks <= 15s,
  - first-frame: one row per track.
- Debug drawer keeps raw refs/task log available without dominating the primary workbench.

Pass condition:

- each failure is visible in UI,
- task log records reason,
- durable state remains consistent.

### Level 5 — Responsive/UX Smoke

Required checks:

- desktop width screenshot,
- mobile width screenshot,
- no overlapping critical controls,
- limitations visible near preview/export,
- provider settings clearly show mock default/live gated.
- desktop screenshot shows completed storyboard frames/thumbnails, timeline lanes, selected-shot inspector, compact media state, and export affordance.
- mobile screenshot shows completed preview or storyboard state, not an empty dashboard.
- raw `mock://...` refs do not wrap in the primary UI.
- short labels such as `image`, `video`, `success`, and `track-1` do not split across lines.

### Level 6 — Optional Live Provider Gate

Only run if explicitly enabled and credentials are available.

Required environment gates:

```bash
TOONFLOW_ENABLE_LIVE_PROVIDERS=1
NO_NETWORK=0
```

Required checks:

- one live text provider smoke can generate event or script artifact,
- provider error is normalized into `errorReason`,
- no secret is persisted in manifest/task log,
- mock tests still pass without credentials.

This level is optional and must never be required for default CI.

## Required QA Artifacts

Every build should produce:

- `BUILD_REPORT.md`
- `RUNTIME_LIVE_TEST_REPORT.md`
- browser screenshot(s)
- completed-state desktop/mobile screenshot(s)
- test/build command logs or summary
- exported/parsed manifest sample
- explicit remaining gaps
- chat handover summary with outcome, evidence, changes, gaps, and recommended next direction.

## Chat Handover QA

The final assistant response must stand on its own:

- summarize what was built or upgraded;
- list validation evidence and any command failures;
- mention screenshots/manifest/report artifacts by path or name;
- state known gaps honestly;
- recommend the next direction, or explicitly say no next step is needed.

Do not force the user to open generated files just to know whether the run succeeded.

## Runtime Evidence Boundary

This Buildprint does not include tracked runtime proof artifacts. Treat it as a specification and QA gate until an implementation records its own build report, runtime report, screenshot, command summary, and exported manifest sample inside the implementation repository.

## Non-Parity Boundary

Passing this QA proves a credible clean-room webapp implementation of the portable Toonflow-style workflow.

It still does not prove:

- exact Toonflow UI/canvas parity,
- live provider output quality,
- Electron behavior,
- final stitched-video export,
- full route/API parity.


---

## Consolidated QA Checklist

## Fixture QA

- Import 3 chapter fixtures; assert chapter indexes 1..3 and event pending.
- Run mock event extractor; assert each chapter transitions success and event text is stored.
- Force one provider error; assert failed state and error reason persist.
- Run ScriptAgent mock; assert outline, adaptation strategy, and scripts are persisted.
- Extract assets from two scripts; assert duplicate asset names are de-duped and script links exist.
- Build storyboard table and panel; assert row count, durations, track grouping, and asset links.
- Generate mock asset/storyboard images; assert media refs and task state.
- Generate mock video prompt and video; assert track prompt, video state, and selected video.
- Export package; snapshot JSON/zip manifest.
- Visual fixture QA: local thumbnails render for assets/storyboard rows and raw mock refs are hidden in debug/details.

## Manual QA

- Verify no live provider calls occur in default proof.
- Verify export package has enough information for another stack to render a preview.
- Verify missing/invalid token behavior if API facade includes auth.
- Verify the app does not look like a generic dashboard or debug harness.

## Not Claimed

- Browser/canvas parity.
- Real provider output quality.
- Final stitched video parity.
