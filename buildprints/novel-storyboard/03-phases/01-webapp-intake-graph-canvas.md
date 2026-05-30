# Phase 01 - Webapp Intake And Graph Canvas

## Product outcome

Deliver upload_prompt_intake, route_spine, graph_build_pipeline, and graph_canvas_workbench as a working browser flow. A user can upload seed files, enter a prediction requirement, enter the workbench, see graph build progress, and inspect an interactive graph canvas with layout modes and detail panels.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
Glance surfaces delivered: upload_prompt_intake, graph_canvas_workbench

This phase uses a product lens because the deliverable is the first user-facing outcome flow. The shared proof spine is mandatory: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped source notes

- Upload and prompt collection: frontend/src/views/Home.vue:137-196 and 224-306.
- Pending upload state: frontend/src/store/pendingUpload.js:8-29.
- Routes: frontend/src/router/index.js:9-42.
- Workbench layout and polling: frontend/src/views/MainView.vue:15-98 and 212-366.
- Graph canvas: frontend/src/components/GraphPanel.vue:19-228 and 472-786.
- Graph APIs: backend/app/api/graph.py:122-610.

## Implementation scope

- Browser home route with file upload/drop, accepted extensions, size feedback, prompt textarea, disabled start until valid, and clear validation errors.
- Workbench route keyed by durable project id with graph/split/workbench layout controls.
- Graph build orchestration: upload files, persist project, extract text, start ontology/graph build, expose job status, poll progress, load graph data.
- Canvas interaction depth: zoom, pan, drag, node select, edge select, self-loop or grouped relationship handling, legend, refresh, loading, empty, failed, and completed states.
- Durable project state and upload metadata. In-memory-only jobs are not acceptable for production claims.
- UX/UI requirements: quiet technical webapp, dense but readable workbench, responsive split layout, no marketing landing page as the main experience, visible status, no overlapping canvas controls, accessible keyboard focus for upload and action controls.

## Interfaces touched

- Frontend routes: Home, Process/Workbench.
- API: create project/ontology, build graph, task status, get graph data, project get/list/reset/delete if exposed.
- State: project metadata, uploaded file metadata, extracted text pointer, ontology, graph_id, graph build job state.

## Proof gate

- repeatable_browser_e2e: upload at least one allowed text fixture, enter a prompt, start the workbench, see polling state, and reach graph canvas or explicit provider blocker.
- provider_adapter_config_test_required: graph provider adapter must validate env configuration and fail with a safe visible blocked state if credentials are absent.
- persistence_roundtrip: project metadata and uploaded-file metadata survive server restart or equivalent storage reload.
- browser_runtime_trace: desktop and mobile screenshots for Home and Workbench, including graph/split/workbench modes.
- security_boundary_review: upload extension/size validation, filename sanitization, secret redaction, and destructive control gating.

## Repair routing

If the graph provider is unavailable, keep the UI and API behavior implemented and record live_provider_proof_blocker_only. Do not fake graph nodes as product proof.

## Unlock condition

Unlock Phase 02 only after upload intake, project persistence, graph build contract, and canvas browser proof are recorded.
