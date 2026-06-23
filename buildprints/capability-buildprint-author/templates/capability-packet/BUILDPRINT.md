# BUILDPRINT: <Capability Name>

You are applying one Capability Buildprint to an existing host project. Follow the read order, assess the host, plan the integration, implement through phases, verify, and write the receipt.

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

## Rule

No source edits before `.buildprint/host-assessment.md`, the assessment-led question gate, and `.buildprint/capability-plan.md` exist.

Run `00-assessment-questions.md` after host assessment. Capability questions must be evidence-led; do not ask broad questions before inspecting the host project.

Before planning or editing, inspect the packet's `evidence` section in `capability.yaml`. Re-check current official docs/source for volatile providers, frameworks, auth, billing, data migration, webhooks, security, and benchmark-sensitive claims. If evidence is missing or stale, block or downgrade the claim instead of guessing from memory.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes product behavior, auth/tenant boundaries, data ownership, security posture, migration strategy, provider side effects, external billing, or destructive operations. Verification must reconcile against the assessment and plan; if a baseline command, schema validation, migration, runtime check, or negative proof fails, downgrade the claim instead of reporting installed success.

## Brutal quality rule

Do not call this capability complete, proven, perfect, or 10/10 unless verification includes real command/runtime evidence, blocked/not-proven claims, and an adversarial self-review. For credential, token, secret, or API-key capabilities, require negative tests for storage posture and full-secret verification, not only successful authentication.
