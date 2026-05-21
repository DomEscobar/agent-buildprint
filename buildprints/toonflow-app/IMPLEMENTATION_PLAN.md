# IMPLEMENTATION_PLAN

## Current State

- Requested scope: full-suite Toonflow rebuild.
- Selected target / first slice: auth/API shell + project setup + SQLite persistence + minimal browser proof.
- Active capability: `auth-api-access`.
- Completed packs: none.
- Blocked packs: provider/runtime-heavy and destructive admin packs until proof/hardening exists.
- Next pack: `project-setup-model-selection`.

## Implementation Team / Harness Plan

- Product/UX design pass: required for UI-heavy production workbench and settings/admin flows.
- Frontend implementation pass: required for login, project, novel, script, production canvas, assets, providers, skills, memory, admin.
- Backend/runtime architecture pass: required for Express/API/socket/job/persistence layers.
- Provider/integration pass: required for text/image/video/tts adapters and model tests.
- Security/privacy review pass: required for auth, uploads, programmable providers, destructive admin, local files.
- Browser/API QA pass: required for all user-facing flows plus API/socket negative tests.
- Coverage/final Buildprint-readiness review: required before any promotion.

## Evidence-Producing Role Chain

| Pass | Role | Must produce | Consumed by | Artifact location | Status |
|---:|---|---|---|---|---|
| 1 | Source mapper / archaeologist | source evidence ledger for each included capability | product architect | `CAPABILITY_INDEX.md`, `mapping/evidence/EVIDENCE_LEDGER.json` | present |
| 2 | Product architect | product obligation and quality bar per capability | implementation planner | `CAPABILITY_INDEX.md`, capability packs | present |
| 3 | Implementation planner | required topology/layers/files and first vertical slice | builder | this file and capability `IMPLEMENTATION.md` files | present |
| 4 | QA verifier | proof command, artifact, negative test, runtime/browser evidence | skeptical reviewer | `VERIFICATION.md` and capability verification files | skeleton present |
| 5 | Skeptical reviewer | promotion/downgrade decision and exact blockers | final handoff | `CAPABILITY_INDEX.md` depth status/blockers | present |

## Architecture Topology Gate

| Surface | Required topology | Actual topology | Evidence | Status |
|---|---|---|---|---|
| Frontend/UI | Feature routes/components for login, projects, novel, script, production canvas, media, settings, admin; browser states for empty/loading/error/success | Source has bundled minified web only; downstream implementation must create inspectable topology | source-real/data/web/index.html:1-8; source-real/scripts/main.ts:198-205 | blocked until implementation/browser proof |
| Backend/API | Route layer separated from auth/domain/provider/storage/job concerns | Source shows Express routes, utils, agents, providers, DB modules | source-real/src/app.ts; source-real/src/routes/**; source-real/src/utils/** | source observed; downstream proof required |
| Providers/integrations | Adapter registry, secret-name-only config, retries/errors, sandbox tests | Source has programmable vendor adapters and VM | source-real/src/routes/setting/vendorConfig/addVendor.ts:61-112; source-real/src/utils/vm.ts:16-55 | blocked for security/provider proof |
| Persistence/state | Durable SQLite, local files, restart/readback/delete/export semantics | Source uses Knex/better-sqlite3 and local data root | source-real/src/utils/db.ts:15-45; source-real/src/utils/oss.ts:16-156 | blocked for runtime proof |
| Tasks/runtime | Long-running jobs with status/progress/error/cancel where applicable | Source records task states and provider async statuses | source-real/src/utils/ai.ts:142-162; source-real/src/routes/production/workbench/generateVideo.ts:78-123 | blocked for runtime proof |

## Milestones

| 1 | Local Login, Token Gate, And API Shell | INCLUDED_RISKY_REQUIRES_HARDENING | Implement login/token API, protected route smoke, browser login state. | yarn lint && API auth smoke test against local server | Backend auth route, token middleware, socket auth guard, user/settings persistence, negative auth tests, security review. | pending |
| 2 | Project Setup And Model Selection | INCLUDED_NEEDS_PROOF | Implement Project Setup And Model Selection vertical slice without dropping later scope. | API create/edit/list smoke test with SQLite readback | Project UI forms, project API routes, schema validation, project table persistence, model-list dependency. | pending |
| 3 | Novel Import And Chapter Event Extraction | INCLUDED_NEEDS_PROOF | Implement Novel Import And Chapter Event Extraction vertical slice without dropping later scope. | API import + generate event using sandbox text provider | Novel import UI, API routes, clean-novel worker/service, AI text provider, SQLite chapter/event state, polling/status UI. | pending |
| 4 | Script Agent Workspace | INCLUDED_NEEDS_PROOF | Implement Script Agent Workspace vertical slice without dropping later scope. | Socket integration test with sandbox text model and stop/error branches | Socket namespace, streaming response model, agent orchestration, workspace get/set events, memory service, script API persistence. | pending |
| 5 | Script Asset Extraction | INCLUDED_NEEDS_PROOF | Implement Script Asset Extraction vertical slice without dropping later scope. | Contract test for extraction result persistence with sandbox model | Script CRUD/export API, AI extraction service, asset persistence, script-asset join table, task/status UI. | pending |
| 6 | Asset Library And Media Upload | INCLUDED_RISKY_REQUIRES_HARDENING | Implement Asset Library And Media Upload vertical slice without dropping later scope. | Upload/read/delete API test with filesystem containment checks | Asset UI, upload API, file service with path containment, media type validation, SQLite asset/image state, negative upload tests. | pending |
| 7 | Image Generation For Assets And Storyboards | INCLUDED_NEEDS_PROOF | Implement Image Generation For Assets And Storyboards vertical slice without dropping later scope. | Sandbox image provider run or deterministic test-only provider plus live-proof blocker | Generation forms, image API, AI image provider adapter, task record service, file service, polling/status UI. | pending |
| 8 | Production Agent Workbench | INCLUDED_NEEDS_PROOF | Implement Production Agent Workbench vertical slice without dropping later scope. | Socket + flow integration test with sandbox text provider | Production socket namespace, agent sub-agent orchestration, skill loader, flow workspace event bridge, asset/storyboard APIs, memory. | pending |
| 9 | Storyboard And Flow Data Persistence | INCLUDED_NEEDS_PROOF | Implement Storyboard And Flow Data Persistence vertical slice without dropping later scope. | Save/read/restart/readback contract test | Flow editor UI, REST persistence, schema validation, storyboard/asset join tables, restart/readback tests. | pending |
| 10 | Video Generation Workbench | INCLUDED_NEEDS_PROOF | Implement Video Generation Workbench vertical slice without dropping later scope. | Sandbox video provider or blocked live-provider proof with polling trace | Timeline/workbench UI, video generation API, provider adapter, o_video/o_videoTrack persistence, task record, polling UI. | pending |
| 11 | Programmable Vendor Provider System | INCLUDED_RISKY_REQUIRES_HARDENING | Implement Programmable Vendor Provider System vertical slice without dropping later scope. | Schema validation tests plus sandbox adapter execution tests | Settings UI code editor, vendor API, schema validator, VM sandbox, provider file storage, model test routes, security review. | pending |
| 12 | Skill And Prompt Management | INCLUDED_NEEDS_PROOF | Implement Skill And Prompt Management vertical slice without dropping later scope. | Skill list/edit/path-traversal contract tests | Settings UI, skill API, path containment, frontmatter parser, agent skill tools, filesystem persistence, negative path tests. | pending |
| 13 | Agent Memory And Local RAG | INCLUDED_NEEDS_PROOF | Implement Agent Memory And Local RAG vertical slice without dropping later scope. | Memory add/get/clear test with local ONNX model and restart readback | Memory service, embedding runtime, SQLite memories table, settings API, agent tools, clear/retrieve API, runtime proof. | pending |
| 14 | Database Backup, Import, And Destructive Admin Operations | INCLUDED_RISKY_REQUIRES_HARDENING | Implement Database Backup, Import, And Destructive Admin Operations vertical slice without dropping later scope. | Export/import/clear roundtrip in isolated temp DB | Admin settings UI, export/import/reset APIs, confirmation UX, authorization, audit logging, backup validation, restore tests. | pending |
| 15 | Electron Desktop And Docker Runtime | INCLUDED_NEEDS_PROOF | Implement Electron Desktop And Docker Runtime vertical slice without dropping later scope. | yarn lint, yarn build or docker build smoke, Electron launch smoke | Electron main process, backend server lifecycle, static web assets, build scripts, package config, Docker image, smoke tests. | pending |

## Risk Register

- Provider VM and user-supplied adapter code require security review.
- Destructive database import/clear/reset must not be exposed without confirmations/audit.
- Frontend source is not present; downstream UI must be reconstructed from behavior contracts, docs, and runtime proof expectations.
- Default credential handling requires migration/hardening and must not copy secret values into artifacts.

