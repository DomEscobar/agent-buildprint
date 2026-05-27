# Phase 02 â€” Graph Build And Visualization

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md`, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Create handoff/return files only when real delegation happens.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

Build a provider-backed graph from extracted text and ontology, expose async task progress, retrieve graph nodes/edges, and visualize graph structure with inspectable node/edge details.

## Mapped product obligations

Mapped surface IDs: SRC-004

Product obligations: OBL-002.

Mapped product obligations refs:
- /root/MiroFish/README.md:86-93 lists graph building, memory injection, and GraphRAG construction.
- /root/MiroFish/backend/app/api/graph.py:260-522 starts asynchronous graph building, chunking, Zep graph creation, ontology setting, episode processing, and task completion.
- /root/MiroFish/backend/app/api/graph.py:534-622 exposes task status, graph data retrieval, and graph deletion.
- /root/MiroFish/frontend/src/components/GraphPanel.vue:17-220 renders graph, loading/empty states, legend, and node/edge detail panels.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Behavior compatibility contract

- Surface id: mapped surfaces listed in Mapped product obligations.
  - Disposition: preserve capability, target route/function names may differ.
  - Equivalent target behavior: preserve this phase's product outcome through cleaner target architecture where useful.
  - Compatibility impact: API/UX/data/provider behavior changes must be explicit; mapped route names are evidence, not mandatory parity.

## Implementation scope

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 02-graph-builder`.

Inputs:
- `project_id`
- `graph_name`
- `chunk_size`
- `chunk_overlap`
- `force`

Outputs/downstream handoff:
- `task_id`
- `graph_id`
- `node_count`
- `edge_count`
- `graph nodes/edges`

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: implement provider adapter/config/test seams before live proof; disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None â€” reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

Stable obligations:
- Build a provider-backed graph from extracted text and ontology, expose async task progress, retrieve graph nodes/edges, and visualize graph structure with inspectable node/edge details.
- Inputs, outputs, failure states, persistence expectations, and proof gates are mandatory.

Free choices:
- Frameworks, database choices, graph provider, queue/worker implementation, and UI component libraries may vary if contracts and proofs pass.

Boundary requirements:
Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

This phase must make graph construction inspectable as a graph workbench, not a raw node/edge list.

- Provide a graph-focused surface with relationship overview, node/edge inspection, build progress, provider mode, and next action into simulation setup.
- Use a domain visualization or structured relationship explorer appropriate to graph memory. A plain list of buttons is a fallback blocker, not `visual_quality_gate` proof.
- Preserve empty, loading, invalid chunk settings, blocked-provider, success, and graph-detail states.
- Keep controls grouped by user job: build graph, inspect graph, continue to simulation.
- Screenshot critique: browser proof must include visual critique against the workbench UX quality contract in `02-project-setup.md`.

## Safety/security constraints

- Define and preserve auth/session/tenant/privacy boundaries appropriate to the product; do not omit them because the source boundary is implicit or credentials are missing.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters; live credentials block live proof only after adapter/config/test/runtime wiring exists.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, failed core local runtime/API proof, or missing persistence proof for state this phase owns. Missing live-provider, browser/e2e, screenshot, deployment, or external-service proof limits claim qualification; record a non-upgrading blocker with blocks_continuation: false and continue if the core phase path is implemented and locally proven.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide repeatable browser/e2e proof plus screenshot or DOM evidence, or an honest blocker for unavailable browser tooling.
- For persistence/provider behavior, prove readback and provider adapter/config/test behavior; record blockers only for unavailable live credentials, external services, or deployment authorization.

## Proof gate

- Proof id: proof-02-graph-builder
- Required proof tracks:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - visual_quality_gate
  - screenshot_state_set
  - provider_adapter_config_test_required
  - live_provider_proof_blocker_only
  - worker_retry_cancel_recovery
  - repeatable_browser_e2e
  - persistence_roundtrip
  - security_boundary_review
  - clean_room_implementation_trace
  - no_fake_scan_pass
Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, data-lifecycle, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

Live credentials, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, and phase safety/security constraints and negative fixtures listed above.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: 02-graph-builder` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
