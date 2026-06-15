# BUILDPRINT: <Capability Name>

You are applying one Capability Buildprint to an existing host project. Follow the read order, assess the host, plan the integration, implement through phases, verify, and write the receipt.

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

## Rule

No source edits before `.buildprint/host-assessment.md` and `.buildprint/capability-plan.md` exist.

Before planning or editing, inspect the packet's `evidence` section in `capability.yaml`. Re-check current official docs/source for volatile providers, frameworks, auth, billing, data migration, webhooks, security, and benchmark-sensitive claims. If evidence is missing or stale, block or downgrade the claim instead of guessing from memory.

## Brutal quality rule

Do not call this capability complete, proven, perfect, or 10/10 unless verification includes real command/runtime evidence, blocked/not-proven claims, and an adversarial self-review. For credential, token, secret, or API-key capabilities, require negative tests for storage posture and full-secret verification, not only successful authentication.
