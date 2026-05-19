# Implementation Roadmap

## Phase 1 - Domain And Persistence

Build:

- Project/chapter/script/asset/storyboard/track/media/job models.
- Deterministic ID and clock services.
- Repositories with temp/test storage.
- Manifest assembler.

Acceptance:

- Unit tests cover import ordering, state mapping, asset de-dupe, track grouping, deterministic manifest.

## Phase 2 - Agent And XML Pipeline

Build:

- Stage cards from `AGENT_PROMPT_PACK.md`.
- Mock text provider.
- XML parser/repair loop from `XML_OUTPUT_CONTRACT.md`.
- ScriptAgent and ProductionAgent services.

Acceptance:

- Integration test runs fixture through skeleton, adaptation, script, plan, table, panel.
- Malformed XML fails without partial persistence.

## Phase 3 - Async Jobs And Providers

Build:

- Job queue/service with cancellation, retry, idempotency.
- Mock image/video providers.
- Optional env-gated live adapter skeletons.
- Task log UI data contract.

Acceptance:

- Cancellation and retry tests pass.
- No-network test stubs `fetch` and still passes.

## Phase 4 - Webapp Workbench

Build:

- Project dashboard.
- ScriptAgent workspace.
- ProductionAgent workspace.
- Asset/storyboard/track/task panels.
- Creative workbench layout from `WORKBENCH_UX_SPEC.md`.
- Local thumbnails/visual placeholders from `VISUAL_FIXTURE_PACK.md`.
- Selected-shot inspector and compact media tiles.
- Secondary debug drawer for task log, raw refs, validation, and manifest JSON.
- Preview timeline and manifest export.

Acceptance:

- Playwright happy path covers import -> events -> script -> production -> mock media -> preview.
- Responsive smoke test at desktop and mobile widths with completed-state screenshots.
- Product-quality smoke rejects raw URI tables, manifest-first preview, empty mobile screenshot, and generic dashboard layout.

## Phase 5 - Hardening

Build:

- Error UX and validation summaries.
- Snapshot fixtures.
- Provider settings guardrails.
- Documentation surfaces for parity boundaries.
- Product-quality QA notes and visual fixture inventory.

Acceptance:

- `PARITY_CLAIMS.md` safe claims are displayed/used in docs.
- QA scenarios in `BROWSER_QA_SCENARIOS.md` pass or have documented gaps.
- `PRODUCT_QUALITY_BAR.md` is satisfied in browser screenshots and report evidence.

## Stop Condition

Stop before implementing final stitched video export or full infinite canvas unless a later buildprint supplies evidence and requirements.


---

## Legacy Plan Notes

These notes are lower authority than `BUILDPRINT.md`. Use them only as sequencing hints after following the canonical Required Read Order and Phase Gates.

1. Define portable schemas for Project, Chapter, EventSummary, ScriptPlan, Script, Asset, StoryboardRow, MediaTask, VideoTrack, and PortablePreviewManifest.
2. Implement durable local repository interfaces and fixture loader. If temporary storage is used, label it honestly and do not claim production durability.
3. Implement deterministic mock/no-network providers for event extraction and agent outputs.
4. Implement workflow services for import, event extraction, script planning, asset extraction, storyboard creation, media generation requests, and PortablePreviewManifest export.
5. Add adapter interfaces for optional live text/image/video providers, env-gated and excluded from default CI.
6. Add webapp/API façades around the services as required by `WEBAPP_TARGET_SPEC.md` and Phase 4.
7. Add tests covering happy path, invalid input, provider failure, retry, cancellation, no-network default, and manifest snapshot.
8. Build the browser workbench and preview/timeline for Phase 4; it is required for done, not optional.
