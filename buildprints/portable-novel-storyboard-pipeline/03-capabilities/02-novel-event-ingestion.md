# Capability 02 — Novel Event Ingestion

## Build target

Novel Event Ingestion

## Why this capability exists

Source surface IDs: SRC-EVENTS, SRC-NOVEL, SRC-TEXT-PROVIDER

Product obligations: OBL-NOVEL.

Source evidence refs:
- `src/routes/novel/addNovel.ts` accepts chapter data and creates stored novel rows.
- `src/routes/novel/getNovel.ts` reads chapter/novel data.
- `src/routes/novel/event/generateEvents.ts` triggers event generation.
- `src/utils/cleanNovel.ts` and AI utility calls show text-provider extraction.

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
- test-and-verification: must close its blocking gate for this capability.

## User-visible outcome

A user can complete the Novel Event Ingestion workflow with visible empty, loading/progress, success/ready, error, blocked, and retry states where applicable.

## System and architecture obligations

Stable obligations:
- import ordered chapters
- extract event records with deterministic no-network provider by default
- preserve pending, running, success, failure, and error reason state

Free choices:
- chapter fixture text
- text provider mock implementation
- event schema names if semantics are preserved

Boundary requirements:
- Preserve provider, persistence, security, and no-fake boundaries from the package contracts.

## UI obligations

Follow `02-context/ux-contract.md` and `02-context/design-quality-bar.md`. Any `browser_runtime_trace` proof must include `ux_design_gate` and `screenshot_state_set` coverage for the relevant empty/loading/error/blocked/success states, or an explicit blocker row.

## Inputs

- Inputs are defined by the product obligation and interface contracts.

## Outputs and downstream handoff

- Outputs are defined by the product obligation and interface contracts.

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Implementation path

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `capability_id: novel-event-ingestion`.

## Stop rules

- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, or missing browser/runtime evidence.

## Proof gate

- Proof id: proof-novel-event-ingestion
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
