# Phase 02 - Graph Memory Build And Explorer

## How to implement this phase

Before writing code, read: packet file `03-phases/phase-flow.md`, runtime continuity file `.buildprint/next-agent.md`, and current project `AGENTS.md`. Then resolve requires_roles through `06-contracts/<role>.md`, create phase-flow required artifacts, and block runtime evidence until plan, team-gates, handoffs, returns, reviews, and proof exist.

requires_roles: [product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence]

## Product outcome

A user can build GraphRAG memory from a completed ontology project, observe chunking and Zep graph progress, see graph id/readiness, inspect nodes and edges in a graph explorer, refresh data, view legends/details, handle provider-blocked states, and delete or rebuild graph memory with confirmation.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Lens: this outcome flow connects stored seed text and ontology to a user-visible graph memory workbench.
- Shared proof spine:
  - Preconditions/inputs: Phase 01 project has extracted text and ontology.
  - Entrypoint/use site: user starts graph build or resumes a project that needs graph memory.
  - Execution behavior: split text, create graph, set ontology, add text batches, wait for processing, persist graph id and status.
  - State/artifact effects: graph build task, progress, graph id, node/edge data, project graph status, errors.
  - Observable proof: API status/data traces, graph explorer browser path, restart/readback, provider blocked/fake-provider proof.
  - Failure/recovery: missing Zep config, missing project/text/ontology, duplicate build, force rebuild, graph delete failure, denied project/graph access.
  - Non-goals: simulation profile generation, OASIS run, report generation, chat.

## Mapped product obligations

- Preserve async graph build from project text and ontology.
- Preserve task progress and project status transitions for graph building/completed/failed.
- Preserve graph data retrieval and graph delete.
- Preserve graph explorer affordances: refresh, maximize/split/workbench layout, legend, edge label toggle, node/edge/self-loop details.
- Missing live Zep credentials block live proof only after adapter/config/test/runtime wiring exists.

## Behavior compatibility contract

- preserve: graph build, task status, graph data, delete, provider-blocked status, and graph explorer user outcome.
- replace: provider SDK, graph visualization library, queue mechanism, and exact route names may change when equivalent target behavior and compatibility impact are explicit.
- merge: entity list/detail endpoints may support both graph explorer and simulation setup if ownership and proof remain clear.
- defer: profile generation and simulation config belong to Phase 03.
- drop: raw provider response dumps in UI are not required if graph semantics remain inspectable.

## Implementation scope

Implement graph build worker/runtime, graph provider adapter with deterministic/fake and live modes, chunking and ontology transfer, progress polling, graph read/delete APIs, graph explorer UI, empty/loading/building/error/blocked/success states, owner/session denial, and graph data persistence/readback.

## Interfaces touched

- API/controller contracts: start build, get task/status, list tasks if retained, get graph data, delete graph, get entity list/detail.
- Provider/tool contracts: Zep-compatible graph adapter with create, set ontology, add text batches, wait, read graph, delete.
- UI/controller contracts: graph sidecar, explorer, refresh, maximize, detail inspector, build progress.
- Resolve required roles through `06-contracts/<role>.md`; write handoff and return artifacts before phase_core_passed.

## State/runtime touched

- Durable state: project graph id/status, graph build job, provider graph reference, node/edge cache if used, deletion status.
- Runtime state: worker progress, retry/cancel/timeout, provider request logs with redaction.
- Runtime artifacts/generated outputs: graph traces, screenshot captures, and provider fake/sandbox transcripts are implementation runtime artifacts.
- Upstream inputs: Phase 01 extracted text and ontology are read-only inputs. Downstream simulation artifacts are not owned by this phase.

## UX/UI requirements

This phase is UI-bearing. The graph explorer must be a domain surface, not a raw list. Required states: waiting for ontology, graph building, provider blocked, graph empty, graph loaded, node selected, edge selected, self-loop group expanded, refresh in progress, delete/rebuild confirmation, mobile/desktop. Screenshot critique must reject default-control shells, generic dashboard graphs with no interaction, raw text-list substitutes, local MVP layouts, and unreadable dense labels.

## Safety/security constraints

Secrets stay server-side; provider errors are redacted; owner/session checks guard graph build/status/data/delete; delete/rebuild require confirmation and server-side permission; provider timeouts and rate limits must be bounded; graph data derived from uploaded content is private.

## Quality gates

Required: unit tests for chunking and provider adapter; fake-provider integration test for create/set/add/wait/read/delete; API tests for missing project/text/ontology/Zep config/duplicate build/force rebuild/delete; worker retry/cancel/recovery tests; browser/e2e for build progress and graph inspect; visual_quality_gate; no_fake_scan_pass.

## Proof gate

Proof id: proof-02-graph-memory-build

Runtime evidence must use `phase_id: 02-graph-memory-build` and append only to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`; packet file `05-evidence/evidence-ledger.jsonl` remains seed-only.

Core tracks: provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits, persistence_roundtrip, security_denied_path_test, repeatable_browser_e2e, visual_quality_gate, no_fake_scan_pass.

## Repair routing

If verification fails, route back to the current phase before editing again.

- Current phase: graph provider, worker, status, explorer UI, visual, or evidence failures.
- Packet file `02-project-setup.md`: missing provider adapter/repository/worker boundaries.
- Packet file `01-questions.md`: credentialed live Zep proof or destructive delete policy fork.
- Required prior phase: `01-seed-ontology-workbench` if project text/ontology readback is missing.
- Runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`: missing live Zep credentials or provider outage blocker.
