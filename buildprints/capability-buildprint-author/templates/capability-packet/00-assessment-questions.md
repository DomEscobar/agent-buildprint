# 00 - Assessment Questions

Run this question gate after `00-host-assessment.md` and before `01-integration-plan.md`.

Capability questions are assessment-led. Inspect the host project first, then ask only what blocks a safe integration.

## Hard-stop questions

Ask and stop when the host assessment cannot resolve a decision that changes:

- user identity or service-account ownership
- tenant, team, project, customer, account, or document boundaries
- authorization, RBAC, entitlement, scope, or permission source
- persistence, migrations, retention, deletion, or rollback
- provider choice, external data transfer, webhooks, billing, or secrets
- destructive/data-loss behavior
- security posture, privacy/compliance exposure, or audit requirements
- first live surface affected by the capability

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.

## Assumable defaults

The agent may infer reversible implementation details from existing host patterns:

- file names and module placement
- local helper names
- test framework conventions
- non-sensitive copy
- feature-flag names
- fixture names
- internal receipt formatting

Record important assumptions in `.buildprint/capability-plan.md`.

## Deferrable questions

Do not block implementation for:

- future UI polish outside the selected capability surface
- optional provider alternatives
- production scaling beyond the stated proof level
- admin/reporting surfaces not required for verification
- nice-to-have dashboards or analytics

Move deferrable items to the receipt as follow-up work.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.

