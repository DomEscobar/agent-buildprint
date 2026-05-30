# Phase 01 - Webapp Intake Graph Canvas

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. Write `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml` with lead decision, user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers.
2. Declare the phase objective in `.buildprint/phase-runs/PHASE_ID/plan.md`.
3. Confirm the implementation scaffold and local guidance files required by `02-project-setup.md` exist.
4. Implement the first real vertical path.
5. Verify with commands and browser/runtime artifacts.
6. Write `.buildprint/phase-runs/PHASE_ID/proof.md` and `.buildprint/phase-runs/PHASE_ID/evidence.json`.
7. Append narrow proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Do not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Product outcome

This phase delivers upload_prompt_intake, graph_canvas_workbench for the MiroFish canvas simulation workbench without claiming live-provider, deployment, security, worker, visual, or lifecycle qualification beyond direct matching proof.

## Phase mode contract

```yaml
phase_contract:
  phase_id: 01-webapp-intake-graph-canvas
  blueprint_mode: product
  phase_style: outcome_flow
  glance_surfaces:
    - upload_prompt_intake
    - graph_canvas_workbench
  owned_surface_ids:
    - surface-upload-prompt-intake
    - surface-graph-canvas-workbench
  core_pass_required:
    - criterion-browser-runtime-trace
    - criterion-persistence-roundtrip
    - criterion-no-fake-scan
  claim_upgrade_tracks:
    - criterion-live-provider-proof
    - criterion-deployment-operations-proof
    - criterion-visual-quality-gate
```

- blueprint_mode: product
- phase_style: outcome_flow
- Glance surfaces delivered: upload_prompt_intake, graph_canvas_workbench.
- Shared proof spine: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped obligations

- Preserve the mapped MiroFish behavior for upload_prompt_intake, graph_canvas_workbench.
- Implement source-independent target behavior; do not require opening the original source repo during implementation.
- Keep deterministic/fake provider proof separate from live provider claim upgrades.

## Stable vs free

Stable: user-visible workflow, provider boundaries, persistence/readback, runtime status, failure states, and evidence ceilings.
Free: exact framework, component names, storage engine, queue implementation, and visual style if the product-grade graph/simulation/report experience is preserved.

## Implementation scope

Implement the smallest real vertical path for this phase. Avoid standalone demos, generic dashboards, raw JSON substitutes, in-memory-only production claims, no-op controls, and route-shaped handlers without service/storage/runtime behavior.

## Interfaces touched

- UI/controller/API boundary for phase-owned surfaces.
- Provider adapter boundary where this phase touches LLM, graph memory, report, or runtime behavior.
- Test/e2e/no-fake verifier boundary.

## State/runtime touched

- Durable project/workflow state and runtime artifacts owned by this phase.
- `.buildprint/phase-runs/PHASE_ID/phase-preflight.yaml`, `plan.md`, `proof.md`, and `evidence.json` as runtime proof artifacts.
- `.buildprint/evidence/evidence-ledger.jsonl` for narrow evidence/blocker rows.

## UX / DX / operator requirements

UI-bearing phases must look like a product-grade graph/simulation/report workbench. Non-UI proof must use mode-equivalent API, dataflow, automation, provider, or operations proof. Screenshots alone do not upgrade claims without browser action traces and visual critique.

## Safety constraints

Protect uploads, generated artifacts, provider secrets, destructive actions, chat/report data, and runtime process controls. Missing credentials or deployment authorization may block claim upgrades but must not remove adapters, config contracts, tests, or fail-closed states from scope.

## Quality gates

- Unit/integration tests for phase-owned behavior.
- `verify:no-fake`.
- `verify:phase-artifacts` with `PHASE_ID=01-webapp-intake-graph-canvas`.
- Browser/runtime/API/provider/dataflow/automation proof matching this phase mode.

## Proof gate

`phase_core_passed` requires the phase-owned local vertical path to run with command output or artifact paths saved under `.buildprint/phase-runs/PHASE_ID/`. Evidence rows must include `phase_id`, `proof_type`, `provider_mode`, `claim_type`, and `upgrades_claim` with narrow `proves` values.

## Repair routing

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase
- external/live-provider/deployment blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

## Source-specific contract notes

## Product outcome

Deliver upload_prompt_intake, route_spine, graph_build_pipeline, and graph_canvas_workbench as a working browser flow. A user can upload seed files, enter a prediction requirement, enter the workbench, see graph build progress, and inspect an interactive graph canvas with layout modes and detail panels.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
Glance surfaces delivered: upload_prompt_intake, graph_canvas_workbench

This phase uses a product lens because the deliverable is the first user-facing outcome flow. The shared proof spine is mandatory: preconditions/inputs, entrypoint/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals.

## Mapped product obligations

- Preserve the webapp intake flow with file upload/drag-drop and prediction prompt collection.
- Maintain the multi-screen routing spine across Home, Workbench, and future simulation views.
- Implement the graph build pipeline, transforming document intake and prediction prompts into ontologies.
- Expose the interactive graph canvas workbench supporting layout adjustments and zoom/pan/drag controls.

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
