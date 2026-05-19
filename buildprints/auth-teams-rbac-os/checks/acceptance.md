# Acceptance Checks

- Phase 00 artifacts are complete before implementation.
- Existing auth provider is reused by default.
- Permission engine denies by default.
- Server guards protect every team-scoped route.
- Tenant boundary map covers every included resource.
- Invites expire, can be revoked, are single-use, and enforce role ceiling.
- Role mutation protects last owner and blocks self-escalation.
- Audit log records privileged mutations with redacted metadata.
- Migration/backfill/rollback/recovery plan exists.
- Phase 09 validation covers every route and threat.
- `conformance/` adapter is wired to the target app's real DB/API/service authorization path.
- Conformance suite passes against the target app, or every failing/missing adapter capability is recorded as a blocker.
