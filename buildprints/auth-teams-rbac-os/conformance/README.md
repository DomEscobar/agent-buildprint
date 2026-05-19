# Auth, Teams & RBAC Conformance Kit

This is the non-illustrative validation layer for the Buildprint. The `proof/` folder proves the reference RBAC behavior in isolation; this folder runs black-box tests against a real target app through an adapter.

## Contract

A target app must implement `src/adapter-contract.ts` and export it from a module. The adapter can call real route handlers, HTTP endpoints, service functions, a test database, or framework test utilities.

Required environment variable:

```bash
AUTH_RBAC_CONFORMANCE_ADAPTER=file:///absolute/path/to/your/adapter.js npm test
```

The adapter must exercise the actual app authorization path. Do not fake success in the adapter. If a test cannot be wired to the real DB/API/service layer, list it as a blocker in `VALIDATION_TEMPLATE.md`.

## What the tests cover

- anonymous and non-member direct API denial;
- cross-tenant resource access denial;
- UI bypass via direct invite API calls;
- self-escalation and above-ceiling role grants;
- last-owner removal/demotion protection;
- invite expiry, revoke, exact-email, and single-use behavior;
- billing permission separation from generic admin;
- audit log permission gate and metadata redaction.

## Commands

Typecheck the kit itself:

```bash
npm run typecheck
```

Run against a target app adapter:

```bash
npm run build
AUTH_RBAC_CONFORMANCE_ADAPTER=file:///absolute/path/to/adapter.js npm test
```

## Completion rule

Do not claim this Buildprint is complete for a target app until the conformance test suite passes against that app or every missing adapter capability is recorded as a blocker with a concrete remediation plan.
