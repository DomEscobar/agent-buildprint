# PRE_IMPLEMENTATION_QUESTIONS

Ask before coding unless the answer is already supplied. If the user is unavailable, apply the safe default and record it in `CURRENT_STATE.md`; do not shrink scope.

## Quality Mandate

Mapper OS targets max-quality for the requested full-suite scope. Missing proof is a blocker, not permission to downgrade.

1. **Execution mode?** Default: `continuous-full-suite`. Start with the active capability in `CURRENT_STATE.md`, prove it, update ledgers, advance through `CAPABILITY_INDEX.md`, and continue one dependency-ready pack at a time. Alternative: `active-capability-handoff` only when explicitly selected. Never read all packs upfront.
2. **Deployment posture and destructive admin policy?** Trusted-local desktop/backend only, private authenticated app, or public webapp? Safe default: trusted-local only with public deployment blocked; preserve destructive DB import/clear/reset capability but block execution until confirmation, audit, and security proof exist.
3. **Provider proof availability?** Are sandbox credentials available for text, image, and video providers? Safe default: implement production adapter contracts plus test-only fakes; keep live provider qualification blocked.
4. **Upload/media and persistence policy?** What file size/type limits, storage retention, and durable backend are required? Safe default: strict allowlist, size caps, local SQLite plus local data-root storage, path traversal tests, restart/readback proof, and no public exposure beyond authenticated local app.
5. **Credential migration policy?** Should existing plain local credentials be preserved for compatibility or upgraded to hashed credentials with migration? Safe default: implement hashed credentials and a migration/rotation path without copying default values.

## Safe Defaults For Unanswered Runs

- Execution mode: `continuous-full-suite`.
- First slice: `auth-api-access`, then `project-setup-model-selection`, then `novel-ingestion-event-extraction` by dependency order.
- Provider mode: production-shaped adapters with deterministic test doubles; no live provider claim without credentials and proof.
- Persistence: local durable SQLite plus local filesystem data root.
- Destructive actions: confirmation-gated local operations only; public/destructive execution remains blocked until security and audit proof exists.
- Deployment: local dev or trusted-local desktop/backend only.
- Qualification: keep `SELECTED_UNQUALIFIED` until all included capability gates have runtime/browser/provider/persistence/security proof or explicit blockers.

## Required Confirmation Summary

Before implementation, update `CURRENT_STATE.md` with execution mode, deployment posture, provider proof, sensitive capability policy, persistence/default infra, safe defaults, remaining blockers, and selected implementation/review passes.

