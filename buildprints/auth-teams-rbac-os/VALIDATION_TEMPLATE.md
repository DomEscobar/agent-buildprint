# Validation Report

## Phase 00 artifacts

- AUTH_CENSUS.md:
- TENANT_BOUNDARY_MAP.md:
- AUTHZ_AUDIT.md:
- THREAT_MODEL.md:
- DECISION_GATE.md:
- RBAC_DRAFT.md:
- MIGRATION_RISK.md:

## Build evidence

- Test command:
- Result:
- Routes covered:
- Permissions covered:
- UI/browser screenshots if applicable:

## Conformance evidence

- Adapter path (`AUTH_RBAC_CONFORMANCE_ADAPTER`):
- Adapter calls real DB/API/service path, not hard-coded mocks: yes/no + evidence
- Command: `AUTH_RBAC_CONFORMANCE_ADAPTER=file:///absolute/path/to/adapter.js npm --prefix .buildprint/snapshots/conformance test`
- Result:
- Failing conformance tests, if any:
- Target-app routes/services covered by adapter:
- CI job or repeatable local command:

## Required assertions

- [ ] Existing auth provider preserved unless approved.
- [ ] Every team-scoped resource has tenant ownership documented.
- [ ] Every privileged API route has direct authorization tests.
- [ ] Last-owner protection tested.
- [ ] Invite lifecycle tested.
- [ ] Audit events tested and redacted.
- [ ] Migration/backfill/rollback path documented.
- [ ] Conformance adapter wired to the target app's real authorization path.
- [ ] Conformance suite passes or failures are listed as blockers with remediation.

## Gaps / blockers

List any skipped tests, uncovered routes, unknown tenant ownership, product decisions, missing adapter capabilities, or conformance failures.
