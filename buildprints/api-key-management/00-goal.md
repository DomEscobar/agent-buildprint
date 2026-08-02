# 00 Goal

Install the bounded `api-key-management` capability into a compatible host so the declared verify checks pass or blockers are honest.

## Acceptance criteria

- Host assessment completed and hard stops confirmed or blocked
- Capability seams wired without whole-product rewrite
- `verify.md` structural/runtime checks pass or blockers recorded
- Independent contract review against this goal

## Hard-stop questions



Ask and stop when the host assessment cannot resolve:

- who owns API keys: user, team, tenant, organization, service account, or another actor
- which API surface the first key must authenticate
- whether scopes must integrate with existing RBAC, tenant boundaries, or entitlements
- whether an existing token/API-key system must be migrated or left alone
- where keyed/versioned hash material may be stored
- how audit events or receipts should record key creation, use, revocation, and rotation
- whether production migrations are approved
- whether any key material may ever be exported or recovered

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.


## Assumable defaults


The agent may infer reversible details from host patterns:

- helper/module placement
- test fixture names
- display labels
- feature-flag names
- local receipt formatting

Record meaningful assumptions in `.buildprint/capability-plan.md`.


## Deferrable questions
 questions

Do not block on:

- a full developer portal
- advanced analytics
- multiple key formats
- production rate limits beyond the selected protected surface
- broad admin UI

Move deferrable items to `.buildprint/capability-receipt.md`.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.


## Host assessment notes

See also `01-host.md` (merged assessment + plan).
