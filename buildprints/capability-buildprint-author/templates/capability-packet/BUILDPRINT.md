# BUILDPRINT: <Capability Name>

You are applying one Capability Buildprint to an existing host project. Follow the read order, lock the goal, assess the host, implement through loops, review, and verify.

This packet installs a bounded capability, not a whole-product rebuild.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-goal.md`
5. `01-host.md`
6. `loops/` (see `loops/loop-flow.md`)
7. `review.md`
8. `verify.md`

## Rule

No source edits before `00-goal.md` hard stops and `01-host.md` assessment/plan exist.

Kernel: goal → bare agentic loop → optional independent fan-out → contract review.

Before planning or editing, inspect the packet's `evidence` section in `capability.yaml`. Re-check current official docs/source for volatile providers, frameworks, auth, billing, data migration, webhooks, security, and benchmark-sensitive claims. If evidence is missing or stale, block or downgrade the claim instead of guessing from memory.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes product behavior, auth/tenant boundaries, data ownership, security posture, migration strategy, provider side effects, external billing, or destructive operations. Verification must reconcile against the assessment and plan; if a baseline command, schema validation, migration, runtime check, or negative proof fails, downgrade the claim instead of reporting installed success.

## Brutal quality rule

Do not claim 10/10 or perfect until real-host proof and adversarial review pass. Happy-path-only installs are incomplete; negative tests and failure modes are required.
