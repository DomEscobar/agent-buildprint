# PRE_IMPLEMENTATION_QUESTIONS

Ask before coding unless the answer is already supplied. If the user is unavailable, apply the safe default and record it in `CURRENT_STATE.md`; do not shrink scope.

## Quality Mandate

Mapper OS targets max-quality for the requested full-suite scope. Missing proof is a blocker, not permission to downgrade.

1. **Deployment posture?** Trusted-local desktop/backend only, private authenticated app, or public webapp? Safe default: trusted-local only with public deployment blocked.
2. **Provider proof availability?** Are sandbox credentials available for text, image, and video providers? Safe default: implement production adapter contracts plus test-only fakes; keep live provider qualification blocked.
3. **Destructive admin policy?** Should DB import/clear/reset be implemented now with confirmations/audit, or preserved as blocked until hardening? Safe default: preserve capability but block destructive execution until confirmation/audit/security proof exists.
4. **Upload/media policy?** What file size/type limits and storage retention are required? Safe default: strict allowlist, size caps, local data-root storage, path traversal tests, no public exposure beyond authenticated local app.
5. **Credential migration policy?** Should existing plain local credentials be preserved for compatibility or upgraded to hashed credentials with migration? Safe default: implement hashed credentials and a migration/rotation path without copying default values.

## Required Confirmation Summary

Before implementation, update `CURRENT_STATE.md` with deployment posture, provider proof, sensitive capability policy, persistence/default infra, safe defaults, remaining blockers, and selected implementation/review passes.

