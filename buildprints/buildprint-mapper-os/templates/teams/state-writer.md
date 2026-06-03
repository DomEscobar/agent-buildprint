# state-writer

Purpose: prevent agents from self-asserting phase or slice completion.

## Activation

This capsule is not injected into an agent session. It documents the operating identity of the `state_derive` runner tool. Any human or tool acting as state-writer must follow this contract.

If a coding agent is ever asked to "update state.json" or "mark a slice complete", it must refuse and instruct the operator to run the runner instead.

## Operating Contract

You are acting as a release engineer with one rule: a slice is `complete` only when evidence files prove it.

You do not know the builder. You do not know how hard they worked. You read files and derive status from them. You do not read `progress.md`, `AGENTS.md`, or chat messages as evidence.

Evidence hierarchy (strongest to weakest):
1. `slices/<id>/acceptance-result.json` with `overall_slice_status: complete` and all `core_proof_required` paths at `upgrades_claim: true` → slice is `complete`.
2. `slices/<id>/acceptance-result.json` with `overall_slice_status: partial` → slice is `partial`.
3. `slices/<id>/acceptance-result.json` does not exist → slice is `not-started`.
4. `slices/<id>/acceptance-result.json` exists but `contract_version` does not match current `03-ux-contract.md` hash → slice is `stale`.

Gate evidence hierarchy:
1. `gates/<id>/result.json` with `status: passed` and, if `requires_human_signoff: true`, a non-empty `signoff_by` and `signoff_at` → gate is `passed`.
2. `gates/<id>/result.json` with `status: inactive` and non-null `inactive_reason` → gate is `inactive`.
3. `gates/<id>/result.json` does not exist and gate is active for current posture → gate is `pending` (blocks promotion).

## What state.json contains

```json
{
  "schema_version": "2",
  "posture": "<current deployment posture>",
  "slices": {
    "<slice-id>": {
      "status": "complete | partial | stale | not-started",
      "evidence": ["path/to/acceptance-result.json"],
      "reasons": ["if not complete: why not"]
    }
  },
  "gates": {
    "<gate-id>": {
      "status": "passed | inactive | pending | failed",
      "inactive_reason": "<posture reason | null>",
      "signoff": "auto-test | path/to/result.json"
    }
  },
  "overall_status": "complete | partial | not-started",
  "contract_versions": {
    "03-ux-contract.md": "<sha256 hash>",
    "02-architecture.md": "<sha256 hash>"
  },
  "derived_at": "<ISO timestamp>",
  "derived_by": "buildprint-runner state_derive"
}
```

`overall_status` is `complete` only when every slice is `complete` and every active gate is `passed`. Otherwise `partial`.

## Forbidden

- Any agent writing `state.json` directly.
- `status: complete` derived from builder's prose claims (`progress.md`, review comments).
- `status: complete` when any `core_proof_required` path in the slice's `acceptance-result.json` is not `pass` with `upgrades_claim: true`.
- `status: passed` for a gate requiring human signoff when `signoff_by` is empty or auto-generated.
- Ignoring `contract_version` mismatch; a stale acceptance result is `stale`, not `complete`.
