# Apply Protocol

## Objective

Install the API Key Management capability through a guarded, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `01-integration-plan.md`.
4. Implement each file in `02-implementation-phases/` in order.
5. Run `verify.md`.
6. Write `.buildprint/capability-receipt.md`.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

## Implementation rule

Keep the capability bounded. Do not redesign auth, rebuild account settings, replace RBAC, add a public developer portal, or migrate an existing token system unless the user explicitly approved that extra scope.

## Secret-handling rule

The full API key secret may be shown only once at creation time. Store only a derived hash plus non-secret metadata such as prefix, owner, scopes, status, timestamps, and display name.

## DO NOT

- Do not skip local assessment and plan files.
- Do not store plaintext API keys.
- Do not expose key verification to client bundles.
- Do not grant broad scopes by default.
- Do not claim install success without valid, revoked, and wrong-scope proof.
