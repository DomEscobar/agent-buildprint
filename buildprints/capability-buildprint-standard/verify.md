# Verify A Capability Buildprint

Verification is the difference between a reusable capability packet and generic integration advice.

## Minimum verification contract

Every Capability Buildprint must define:

- install/configuration proof
- first successful action proof
- blocked-state proof when required secrets or services are missing
- persistence/readback proof when state changes are claimed
- rollback or recovery expectation for risky changes
- user/operator-visible success path
- `.buildprint/capability-receipt.md` with proof level and not-proven claims

## Verification shape

Use concrete checks:

```yaml
verify:
  commands:
    - npm test
    - npm run lint
  manual_checks:
    - checkout redirects to the provider and returns to the app
  runtime_checks:
    - webhook event updates entitlement state
  blocked_checks:
    - missing STRIPE_SECRET_KEY shows an actionable setup error
```

## Proof levels

`static`
: Files and configuration are present. This is useful but not enough for runtime claims.

`fixture`
: Local test fixture proves the integration path without external side effects.

`sandbox`
: External sandbox provider proves the live integration with non-production credentials.

`production`
: Production credentials and real side effects are configured and audited.

Do not upgrade proof level by implication. State the highest proven level explicitly.

## Receipt rule

The applying agent must write:

```text
.buildprint/capability-receipt.md
```

The receipt is required even when the capability is blocked. A blocked receipt is better than false-positive success.

The receipt must reconcile against `.buildprint/host-assessment.md` and `.buildprint/capability-plan.md`. Any broken baseline, failed validation, failed migration, unavailable command, unresolved hard-stop question, or unplanned blocker discovered during verification must downgrade the installed claim to blocked or partial.

## High-risk capability checks

Billing, auth, RBAC, migrations, external APIs, background jobs, destructive operations, and public deployment need stronger proof:

- explicit secret/env contract
- least-privilege permission model
- idempotency or retry behavior when applicable
- audit/logging expectation
- failure recovery path
- negative test or blocked-path proof
