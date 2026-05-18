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
- Preview timeline and manifest export.

Acceptance:

- Playwright happy path covers import -> events -> script -> production -> mock media -> preview.
- Responsive smoke test at desktop and mobile widths.

## Phase 5 - Hardening

Build:

- Error UX and validation summaries.
- Snapshot fixtures.
- Provider settings guardrails.
- Documentation surfaces for parity boundaries.

Acceptance:

- `PARITY_CLAIMS.md` safe claims are displayed/used in docs.
- QA scenarios in `BROWSER_QA_SCENARIOS.md` pass or have documented gaps.

## Stop Condition

Stop before implementing final stitched video export or full infinite canvas unless a later buildprint supplies evidence and requirements.


---

## Consolidated notes from `PLAN.md`

# Plan

1. Define portable schemas for Project, Chapter, EventSummary, ScriptPlan, Script, Asset, StoryboardRow, MediaTask, VideoTrack, ExportPackage.
2. Implement in-memory or SQLite repository interfaces and fixture loader.
3. Implement mock text provider for event extraction and agent outputs.
4. Implement workflow services for import, event extraction, script planning, asset extraction, storyboard creation, media generation requests, and export package creation.
5. Add adapter interfaces for live text/image/video providers but keep proof default mocked.
6. Add API or CLI façade around the services.
7. Add tests covering happy path, invalid input, provider failure, retry, cancellation, and export package snapshot.
8. Optional: add a minimal browser UI only after service contracts pass.
