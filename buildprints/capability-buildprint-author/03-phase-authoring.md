# 03 Phase Authoring

## Objective

Author the phased grafting workflow so the applying agent cannot jump from docs to edits.

## Required phase files

- `00-host-assessment.md`
- `00-assessment-questions.md`
- `01-integration-plan.md`
- `apply.md`
- `02-implementation-phases/01-contract-and-config.md`
- `02-implementation-phases/02-core-integration.md`
- `02-implementation-phases/03-host-wiring.md`
- `02-implementation-phases/04-user-operator-surface.md`
- `02-implementation-phases/05-verification-and-receipt.md`
- `verify.md`

## Each phase must include

- objective
- required inputs
- evidence or docs the applying agent must re-check before edits
- implementation or assessment instructions
- proof before moving on
- DO NOT rules

## Required local outputs for applying agents

- `.buildprint/host-assessment.md`
- `.buildprint/capability-questions.md`
- `.buildprint/capability-plan.md`
- `.buildprint/capability-receipt.md`

## Discovery decision gate

The generated `00-host-assessment.md` must require the applying agent to classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`.

The generated `00-assessment-questions.md` must run after host assessment and before integration planning. It must require assessment-led hard-stop questions, assumable defaults, and deferrable questions. It must explicitly say that `agent_assumption` is invalid for hard-stop decisions.

The generated `01-integration-plan.md` and `verify.md` must force reconciliation against `.buildprint/host-assessment.md`: every `must ask user`, blocker, baseline failure, and assumption is resolved, accepted as a claim ceiling, or left blocking.

If any `must ask user` finding changes product behavior, auth/tenant boundaries, data ownership, security posture, migration strategy, provider side effects, external billing, or destructive operations, the generated packet must stop before source edits.

## Phase evidence rules

For volatile providers, frameworks, billing, auth, security, data migration, webhook, or benchmark-sensitive work, phases must force the applying agent to verify current docs/source before implementation. The phase should say what to inspect, which version-sensitive assumptions matter, and when to block instead of guessing.

For high-risk security or credential capabilities, phases must force negative proof:

- storage is non-recoverable and not plaintext
- generated identifiers/prefixes have host-appropriate entropy and collision handling
- verification checks the full secret or credential material after any lookup prefix
- revoked, denied, wrong-scope, malformed, missing, and equivalent failure paths are tested when relevant
- production-sensitive gaps such as migrations, rollback, rate limits, admin auth, audit, and tenant boundaries are recorded under blockers/not-proven instead of hidden

## DO NOT

- Do not leave `apply.md` as a vague "implement this" note.
- Do not let the agent skip host assessment.
- Do not let the agent claim installed without receipt and verification.
- Do not let hard-stop findings become silent assumptions.
- Do not let phases silently rely on stale provider behavior or uncited model memory.
- Do not let a high-risk capability advance with happy-path tests only.
