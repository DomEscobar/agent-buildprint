# Apply Protocol

## Objective

Install the API Key Management capability through a guarded, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `00-assessment-questions.md`.
4. Run `01-integration-plan.md`.
5. Implement each file in `02-implementation-phases/` in order.
6. Run `verify.md`.
7. Write `.buildprint/capability-receipt.md`.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/capability-receipt.md
```

## Implementation rule

Keep the capability bounded. Do not redesign auth, rebuild account settings, replace RBAC, add a public developer portal, or migrate an existing token system unless the user explicitly approved that extra scope.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes owner identity, tenant/team boundaries, API surface selection, scope/RBAC behavior, existing token migration, persistence/migration strategy, hash/secret handling, audit behavior, or destructive operations, stop and ask before source edits.

## Secret-handling rule

The full API key secret may be shown only once at creation time. Store only a keyed/versioned derived hash plus non-secret metadata such as prefix, owner, scopes, status, timestamps, and display name.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement when the host assessment decision is `block`.
- Do not store plaintext API keys.
- Do not expose key verification to client bundles.
- Do not grant broad scopes by default.
- Do not claim install success without valid, revoked, wrong-scope, and valid-prefix/wrong-secret proof.
