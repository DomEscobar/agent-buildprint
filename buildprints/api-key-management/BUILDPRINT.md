# BUILDPRINT: API Key Management Capability

You are applying one guarded Capability Buildprint to an existing SaaS or B2B host project. Your job is to add secure API key management without guessing around the host app's auth, database, team/account model, routing, or audit pattern.

This is not a whole-product Buildprint. It is a bounded capability packet for adding customer/developer API keys to a compatible host app.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `01-integration-plan.md`
6. `apply.md`
7. `02-implementation-phases/01-contract-and-config.md`
8. `02-implementation-phases/02-core-integration.md`
9. `02-implementation-phases/03-host-wiring.md`
10. `02-implementation-phases/04-user-operator-surface.md`
11. `02-implementation-phases/05-verification-and-receipt.md`
12. `verify.md`

## Capability promise

Add secure API key management to a host app that already has user identity and persistence. The installed capability must generate one-time-visible secrets, store only hashes, support key prefixes and scopes, authenticate API requests, handle revocation and rotation, and emit audit evidence.

## Local checkpoints

The applying agent must create these files in the host repo:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

No source edits before host assessment and capability plan exist.

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable user/session model for key owners
- the host has no persistence layer and the user has not approved one
- the API surface to protect is unclear
- the account/team ownership model is ambiguous
- an existing API key or token system is present and no migration decision exists
- the host cannot store secrets or hashes server-side
- the requested scope model would silently bypass existing RBAC or tenant boundaries

## Success standard

Do not claim API key management is installed unless verification proves:

- new key secret is shown once and cannot be recovered later
- stored key material is hashed, not plaintext
- valid active key authenticates the selected API surface
- revoked key fails
- rotated/replaced key behavior is explicit
- scope mismatch fails
- API key usage writes an audit event or receipt
- missing config or missing persistence produces an actionable blocked state
