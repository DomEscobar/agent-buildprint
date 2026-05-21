# Acceptance Checklist

- [ ] `PRE_IMPLEMENTATION_QUESTIONS.md` is answered or safe max-quality defaults are recorded in `CURRENT_STATE.md`.
- [ ] Full selected capability surface in `CAPABILITY_INDEX.md` is preserved; no silent scope shrink.
- [ ] Architecture topology is separated across UI/API/domain/provider/persistence/runtime/security/test surfaces where applicable.
- [ ] Browser/Electron proof covers user-facing flows and empty/loading/error/success states.
- [ ] API/auth/provider/runtime/persistence proof artifacts are attached or blockers are explicit.
- [ ] Security hardening is complete for auth, uploads, provider VM, destructive admin operations, user data, and secret handling.
- [ ] No mock, placeholder, route-shaped endpoint, static UI shell, or no-op control is counted as product behavior.
- [ ] Capability Proof Ledger rows in `VERIFICATION.md` are closed or explicitly blocked.
- [ ] Clean-room reversal proof exists before qualification or parity claims.
