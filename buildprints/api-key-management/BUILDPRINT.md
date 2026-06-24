# BUILDPRINT: API Key Management Capability

You are applying one guarded Capability Buildprint to an existing SaaS or B2B host project. Your job is to add secure API key management without guessing around the host app's auth, database, team/account model, routing, or audit pattern.

This is not a whole-product Buildprint. It is a bounded capability packet for adding customer/developer API keys to a compatible host app.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `00-assessment-questions.md`
6. `01-integration-plan.md`
7. `apply.md`
8. `02-implementation-phases/01-contract-and-config.md`
9. `02-implementation-phases/02-core-integration.md`
10. `02-implementation-phases/03-host-wiring.md`
11. `02-implementation-phases/04-user-operator-surface.md`
12. `02-implementation-phases/05-verification-and-receipt.md`
13. `verify.md`

## Capability promise

Add secure API key management to a host app that already has user identity or an explicitly approved service-account owner model plus persistence. The installed capability must generate one-time-visible secrets, store only keyed/versioned hashes, support high-entropy key prefixes and scopes, authenticate API requests, handle revocation and rotation, and emit audit evidence.

## Local checkpoints

The applying agent must create these files in the host repo:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

No source edits before host assessment and capability plan exist.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes owner identity, tenant/team boundaries, API surface selection, scope/RBAC behavior, existing token migration, persistence/migration strategy, hash/secret handling, audit behavior, or destructive operations. Do not continue by turning those decisions into assumptions. Verification must reconcile against the assessment and plan; if a baseline command, Prisma/schema validation, migration, runtime route, or negative security check fails, downgrade the claim instead of reporting installed success.

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable user/session model or approved service-account model for key owners
- the host has no persistence layer and the user has not approved one
- the API surface to protect is unclear
- the account/team ownership model is ambiguous
- an existing API key or token system is present and no migration decision exists
- the host cannot store secrets or hashes server-side
- the requested scope model would silently bypass existing RBAC or tenant boundaries
- the baseline repo cannot validate/build/test in a way that makes the capability proof trustworthy

## Success standard

Do not claim API key management is installed unless verification proves:

- new key secret is shown once and cannot be recovered later
- stored key material is keyed/versioned hash material, not plaintext
- valid prefix with wrong secret body fails
- valid active key authenticates the selected API surface
- revoked key fails
- rotated/replaced key behavior is explicit
- scope mismatch fails
- API key usage writes an audit event or receipt
- missing config or missing persistence produces an actionable blocked state
