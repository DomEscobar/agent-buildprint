# Capability 01 — Upload and persist submitted records

## Build target

Implement one real vertical ingest path: accept a submitted record, validate required fields, store it durably, and allow readback through a separate operation.

## Why this capability exists

- Product obligation: OBL-INGEST
- Source surface: SRC-INGEST-API
- Source evidence: OBSERVED(api/records.ts:1-20) accepts record input and writes a stored result.

## Required global context

- `00-intent/product-obligations.md`
- `01-operating-model/stop-rules.md`
- `02-context/team-stack.yaml`
- `02-context/ux-contract.md`
- `02-context/design-quality-bar.md`
- `08-evaluation/claim-upgrade-rules.yaml`
- `09-evidence/evidence-ledger.schema.json`

## Required teams and gates

- product-architect: preserve ingest workflow and downstream readback handoff.
- ux-ui-craft: upload/form, validation error, loading, blocked, and success/ready states are visible and serious.
- data-persistence: records survive restart/readback where durability is claimed.
- test-and-verification: require proof command, negative test, browser/runtime evidence or blocker, and evidence row.

## User-visible outcome

A user can submit a record, see pending/success/error state, and observe that the saved record is available again through readback.

## System and architecture obligations

- Use a real API/service/storage seam; do not fake success in UI state only.
- Validation must reject missing required fields.
- Persistence must be durable or explicitly blocked with a ledger row.

## UI obligations

This capability is UI-bearing. Follow `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; proof must include empty, loading, error, blocked, and success/ready screenshots or blocker rows.

## Inputs

- User-submitted record fields.
- Existing persisted records for readback.

## Outputs and downstream handoff

- Stored record.
- Validation result.
- Readback result consumed by later workflow slices.

## Implementation path

1. Implement the smallest real ingest path.
2. Add validation failure handling.
3. Add persistence readback.
4. Run proof gates.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

## Stop rules

- Stop instead of claiming persistence if restart/readback cannot run.
- Stop instead of claiming browser proof if screenshots/browser trace cannot be produced.
- Stop if source-independent implementation evidence is unavailable.

## Proof gate

- Proof id: proof-ingest-record
- Required proofs: browser_runtime_trace, ux_design_gate, screenshot_state_set, persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass.
- Negative tests: rejects missing required fields.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `09-evidence/evidence-ledger.jsonl`
- Claim rules: `08-evaluation/claim-upgrade-rules.yaml`

## Unlocks

No later fixture slice unlocks. In a full packet, consult `03-capabilities/capability-index.yaml` only after proof or blocker rows close this capability honestly.
