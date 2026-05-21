# Project Setup And Model Selection

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Agent Brief

Goal: Users can create, edit, and list Toonflow projects with title, intro, story type, art style, director manual, aspect ratio, image/video model choices, quality, and generation mode.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Project UI forms, project API routes, schema validation, project table persistence, model-list dependency.
Stable behavior: Project metadata and model selections become downstream generation context.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: API create/edit/list smoke test with SQLite readback
Required evidence: artifacts/project-crud.log; BLOCKED_WITH_REASON: API/runtime proof not executed.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs runtime CRUD proof and UI state screenshots.

## Behavior Contract

- User/system action: Users can create, edit, and list Toonflow projects with title, intro, story type, art style, director manual, aspect ratio, image/video model choices, quality, and generation mode.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_project SQLite rows.
- Failure/empty/loading/blocked states: Invalid schema, missing models, stale model IDs.
- Provider/persistence/runtime/operational boundary: Depends on configured vendor model IDs for image/video.

## Stable vs Free

| Stable | Free |
|---|---|
| Users can create, edit, and list Toonflow projects with title, intro, story type, art style, director manual, aspect ratio, image/video model choices, quality, and generation mode. | Implementation framework/component/database abstraction. |
| Invalid schema, missing models, stale model IDs. | Exact internal error class names. |
| API create/edit/list smoke test with SQLite readback | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/src/routes/project/addProject.ts:8-45; source-real/src/routes/project/editProject.ts:8-43; source-real/src/routes/project/getProject.ts:6-10; source-real/src/lib/initDB.ts:27-48

