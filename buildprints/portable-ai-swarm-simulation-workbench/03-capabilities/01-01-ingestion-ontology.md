# Capability 01 — Source Ingestion And Ontology

## Build target

Upload PDF/Markdown/text seed material with a natural-language prediction requirement, extract text, persist a project, and generate an ontology suitable for downstream graph and agent simulation.

## Why this capability exists

Source surface IDs: SRC-003

Product obligations: OBL-001.

Source evidence refs:
- /root/MiroFish/README.md:27-32 describes upload of seed materials, prediction requirements, report output, and interactive digital world..
- /root/MiroFish/backend/app/api/graph.py:122-248 implements multipart upload, project creation, text extraction, ontology generation, and response payload.
- /root/MiroFish/backend/app/utils/file_parser.py:61-94 limits parsing to PDF, Markdown, and text.
- /root/MiroFish/backend/app/models/project.py:17-73 defines project status, files, ontology, graph id, requirement, chunk settings, and errors.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Required global context

- `START_HERE.md`
- `blueprint.yaml`
- `PRE_IMPLEMENTATION_QUESTIONS.md`
- `02-context/team-stack.yaml`
- `02-context/ux-contract.md`
- `02-context/design-quality-bar.md`
- `02-context/source-evidence-index.yaml`
- `08-evaluation/claim-upgrade-rules.yaml`
- `09-evidence/evidence-ledger.schema.json`

## Required teams and gates

- product-architect: must close its blocking gate for this capability.
- ux-ui-craft: must close its blocking gate for this capability.
- integration-runtime: must close its blocking gate for this capability.
- data-persistence: must close its blocking gate for this capability.
- security-boundary: must close its blocking gate for this capability.
- test-and-verification: must close its blocking gate for this capability.

## User-visible outcome

A user can complete the Source Ingestion And Ontology workflow with visible empty, loading/progress, success/ready, error, blocked, and retry states where applicable.

## System and architecture obligations

Stable obligations:
- Upload PDF/Markdown/text seed material with a natural-language prediction requirement, extract text, persist a project, and generate an ontology suitable for downstream graph and agent simulation.
- Inputs, outputs, failure states, persistence expectations, and proof gates are mandatory.

Free choices:
- Frameworks, database choices, graph provider, queue/worker implementation, and UI component libraries may vary if contracts and proofs pass.

Boundary requirements:
Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UI obligations

Follow `02-context/ux-contract.md` and `02-context/design-quality-bar.md`. Any `browser_runtime_trace` proof must include `ux_design_gate` and `screenshot_state_set` coverage for the relevant empty/loading/error/blocked/success states, or an explicit blocker row.

## Inputs

- `files: pdf|md|markdown|txt`
- `simulation_requirement`
- `project_name`
- `additional_context`

## Outputs and downstream handoff

- `project_id`
- `ontology.entity_types`
- `ontology.edge_types`
- `analysis_summary`
- `files`
- `total_text_length`

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Implementation path

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `capability_id: 01-ingestion-ontology`.

## Stop rules

- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, or missing browser/runtime evidence.

## Proof gate

- Proof id: proof-01-ingestion-ontology
- Required proof types:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip_or_blocker
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_integration_proof_or_blocker
  - persistence_roundtrip_or_blocker
  - security_boundary_review_or_blocker
  - clean_room_implementation_trace
  - no_fake_scan_pass
- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, and security fixtures from `06-safety/security-test-fixtures.yaml`.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `09-evidence/evidence-ledger.jsonl`
- Claim rules: `08-evaluation/claim-upgrade-rules.yaml`
- Evidence schema: `09-evidence/evidence-ledger.schema.json`

## Unlocks

After proof or blocker rows close this capability honestly, consult `03-capabilities/capability-index.yaml` for the next dependency-ready slice. Do not load unrelated future capabilities upfront.
