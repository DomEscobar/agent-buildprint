# Phase 02 - Zep Graph Build and Visualization

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: create the phase-flow required artifacts, resolve every role through `06-contracts/<role>.md`, write handoff and return artifacts for every role, implement, verify, review, write proof, and only then append runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`. The packet seed ledger `05-evidence/evidence-ledger.jsonl` is read-only context.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

A user can build a Zep-backed graph from an owned ontology project, observe async task progress and failures, read or delete graph data safely, and inspect nodes/edges through a graph workbench with legend, detail, loading, error, fullscreen, and blocked-provider states.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: provider integration, worker task, durable graph state, and UI graph visualization.
- Shared proof spine: owned project -> graph build task -> Zep/fake adapter -> persisted graph id/status -> graph read/delete -> browser graph readback.

## Mapped product obligations

- Own `api.graph-build-task`: async graph build, chunk settings, progress, force rebuild, completion/failure.
- Own `provider.zep-graph-write`: graph create, ontology set, batch text add, wait, info read.
- Own `api.graph-read-delete`: authorized graph data read and safe delete.
- Own `ui.graph-visualization`: graph nodes/edges, legend, detail panels, loading/waiting/error/fullscreen states.

## Behavior compatibility contract

- Target disposition values are preserve for graph build, Zep write, graph read/delete, and visualization.
- Equivalent target behavior must preserve graph-memory capability without route/function parity; route names may change if UI/API docs and adapters change together.
- Compatibility impact: fake/sandbox adapters prove local contract only; live Zep proof requires authorized credentials.

## Implementation scope

- Create graph worker/task ownership with status, progress, retry/failure, force rebuild, and restart/readback.
- Add Zep adapter modes: deterministic/fake, sandbox if available, live.
- Persist graph id, build status, chunk settings, errors, timestamps, and owner/project relation.
- Implement graph read/delete with owner checks and destructive confirmation.
- Build graph UI with selectable nodes/edges, legend, inspector, fullscreen, and provider-blocked state.

## Interfaces touched

- Graph API/controllers, graph build worker, project/graph repository, Zep provider adapter, browser graph workbench, owner/session guard.

## State/runtime touched

- Durable graph build task records, graph id/status, adapter logs, graph visualization data, delete cleanup state. Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## UX/UI requirements

- UI must provide graph canvas or equivalent rich graph surface, legend, detail inspector, task progress, blocked-provider explanation, delete confirmation, responsive layout, and Screenshot critique against `02-project-setup.md`.

## Safety/security constraints

- Owner checks on build/read/delete, no secret display, redacted provider logs, destructive delete confirmation, fail-closed missing Zep config.

## Quality gates

- Worker/task tests for progress, completion, failure, force rebuild, restart/readback.
- Zep adapter fake/sandbox contract tests and live blocker row when `ZEP_API_KEY` is absent.
- API tests for read/delete authorization and not-found cases.
- Browser e2e and visual critique for graph states and detail interactions.

## Proof gate

Proof id: proof-02-graph-memory

- phase_id: 02-graph-memory
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- persistence_roundtrip
- security_denied_path_test
- no_fake_scan_pass

## Repair routing

- current phase: failed graph build, Zep adapter, graph read/delete, graph UI, or proof.
- `02-project-setup.md`: graph storage/runtime contradiction.
- `01-questions.md`: paid live provider or destructive policy fork.
- `.buildprint/evidence/evidence-ledger.jsonl`: non-upgrading live Zep/browser/deployment blockers.
