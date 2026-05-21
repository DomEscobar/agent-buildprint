# Novel Import And Chapter Event Extraction

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Users import chapter batches, list/search chapter text, and trigger AI chapter-event extraction that updates per-chapter event state and error reason.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Novel import UI, API routes, clean-novel worker/service, AI text provider, SQLite chapter/event state, polling/status UI.
Stable behavior: Chapter indexing, AI event extraction prompt contract, eventState transitions.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: API import + generate event using sandbox text provider
Required evidence: artifacts/novel-event-extraction.log; BLOCKED_WITH_REASON: AI provider proof unavailable.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs provider sandbox, asynchronous state proof, and malformed AI-output handling evidence.

## Behavior Contract

- User/system action: Users import chapter batches, list/search chapter text, and trigger AI chapter-event extraction that updates per-chapter event state and error reason.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_novel rows with chapterData, event, eventState, errorReason.
- Failure/empty/loading/blocked states: No matching chapters, provider failure, AI malformed event.
- Provider/persistence/runtime/operational boundary: universalAi text model required.

## Stable vs Free

| Stable | Free |
|---|---|
| Users import chapter batches, list/search chapter text, and trigger AI chapter-event extraction that updates per-chapter event state and error reason. | Implementation framework/component/database abstraction. |
| No matching chapters, provider failure, AI malformed event. | Exact internal error class names. |
| API import + generate event using sandbox text provider | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/novel/addNovel.ts:8-53; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/novel/event/generateEvents.ts:9-37; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/novel/getNovel.ts:8-46; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/lib/initDB.ts:348-353

