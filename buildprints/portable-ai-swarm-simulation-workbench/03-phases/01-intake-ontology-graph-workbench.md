# Phase 01: Intake, Ontology, And Zep Graph Workbench

## How to implement this phase

phase_id: 01-intake-ontology-graph-workbench

Before writing code, read:

- Packet file `03-phases/phase-flow.md`
- Runtime artifact `.buildprint/next-agent.md` if it exists
- `AGENTS.md` in the implementation project
- Packet file `02-project-setup.md`
- Packet file `01-questions.md`
- Resolve requires_roles through `06-contracts/<role>.md`
- Packet file `06-contracts/product-architect.md`
- Packet file `06-contracts/ux-ui-craft.md`
- Packet file `06-contracts/integration-runtime.md`
- Packet file `06-contracts/security-boundary.md`
- Packet file `06-contracts/data-persistence.md`
- Packet file `06-contracts/test-and-verification.md`

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification]

Follow phase-flow required artifacts before code and before evidence. Create the current phase plan, team gates, handoffs, role returns, architecture/ux/qa reviews, and proof before appending runtime evidence. Packet seed evidence remains in packet file `05-evidence/evidence-ledger.jsonl`; runtime evidence belongs only in `.buildprint/evidence/evidence-ledger.jsonl`.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow

This phase is UI-bearing. Product proof is an outcome flow: a user uploads source material, sees parsed project state, reviews ontology output, starts a Zep graph build or a blocked-provider state, and lands on graph/workbench readback without losing MiroFish identity.

## Product outcome

Deliver the first useful MiroFish workbench slice: project intake, file parsing, ontology generation, graph build status, graph result readback, graph/workbench layout, and transition into simulation creation. The outcome must feel like a swarm prediction workbench rather than a generic upload form.

## Mapped product obligations

- Preserve MiroFish as a five-stage AI swarm simulation workbench with graph build, environment setup, simulation, report, and interaction stages.
- Preserve multi-file PDF, MD, TXT, and Markdown intake, safe parse errors, upload limits, project metadata, text persistence, and source text readback.
- Preserve ontology generation tied to the simulation requirement: entity types, relationship types, summary, and visible ontology details.
- Preserve Zep graph build semantics: async task, chunking, ontology set, text batch add, episode wait, progress, graph id, node count, edge count, and blocked live Zep proof when credentials are unavailable.
- Preserve graph/workbench browser composition with split mode, graph panel loading/error/ready states, and route transition into simulation setup.

## Behavior compatibility contract

Target disposition: preserve/replace. Equivalent target behavior is required, not route/function parity. Source framework names and route names may change, but the user-visible intake-to-graph behavior, provider boundaries, persisted project state, and graph build status contract must remain.

Compatibility impact:

- Replacing UI/framework internals is allowed if upload, ontology, graph status, and graph readback behavior remain visible and testable.
- Replacing provider internals is allowed only behind LLM and Zep adapters with provider_adapter_config_test_required and live_provider_proof_blocker_only.
- Dropping graph build, converting ontology to static copy, or using deterministic providers as production truth is invalid.

## Implementation scope

Implement browser/controller/API/domain/persistence/provider boundaries for the first vertical slice. Include upload validation, project creation/read/list basics needed for this slice, deterministic LLM ontology adapter test mode, Zep fake/sandbox adapter, graph build task state, graph data readback, and workbench UI states.

## Interfaces touched

- Browser workbench route, graph panel, upload controls, ontology cards, graph stats, status indicator, transition action.
- API/controller endpoints for project upload, project read/list, ontology status, graph build start/status/read.
- LLM adapter, Zep graph adapter, task runner, project repository, text/file storage.
- Test interfaces for invalid file type, empty file, missing provider config, fake Zep graph build, and browser action path.

## State/runtime touched

Own project metadata, uploaded file metadata, extracted text, ontology result, graph build task state, graph id, graph node/edge summary, and provider blocker state. State must be durable enough for restart/readback where this phase claims durability; in-memory-only state is not production behavior.

## UX/UI requirements

The first viewport must show MiroFish workbench progress and graph/setup context, not a landing page. The user action path is upload -> requirement/metadata -> ontology -> graph build -> graph result or blocked-provider state. Include empty, loading, success, invalid upload, provider-blocked, partial graph, and retry states. UI proof needs repeatable_browser_e2e, visual_quality_gate, desktop/mobile screenshots, Screenshot critique, and no default-control shells or raw text-list substitutes.

## Safety/security constraints

Validate file type, size, empty content, parse failure, denied paths, and malformed metadata before provider/runtime use. Redact provider keys and private uploaded text in logs, screenshots, and evidence. Destructive reset/delete controls may be stubbed only as disabled-with-reason unless Phase 07 owns the server-side destructive path.

## Quality gates

- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- upload_invalid_type_and_empty_file_tests
- durable_project_text_readback
- no_fake_scan_pass for static shells, mock-only graph success, and dead controls

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Proof gate

Gate: upload_ontology_graph_browser_and_adapter_proof.

Required proof includes valid upload, invalid upload, persisted text readback, deterministic ontology adapter test, fake Zep graph build/status/readback, browser path through the workbench, blocked live-provider row for Zep/LLM if unavailable, and evidence row with phase_id: 01-intake-ontology-graph-workbench.

## Repair routing

Repair the current phase for upload, graph, UI, provider-adapter, persistence, or test failures. Route architecture contradictions to packet file `02-project-setup.md`. Route irreversible product or credential decisions to packet file `01-questions.md`. Record non-upgrading live-provider blockers only in `.buildprint/evidence/evidence-ledger.jsonl` after the local adapter/config/test/runtime path exists.
