# 00 - Assessment Questions

Run this question gate after `00-host-assessment.md` and before `01-integration-plan.md`.

Capability questions are assessment-led. Inspect the host first, then ask only what blocks safe RBAC integration.

## Hard-stop questions

Ask and stop when the host assessment cannot resolve:

- which user/session source is authoritative
- initial roles and permission names
- default role for new or unknown users
- admin/owner bootstrap path
- tenant/team/project boundary behavior
- first protected route, action, or API surface
- whether an existing authorization system must be migrated or preserved
- persistence/migration strategy for roles or memberships
- denied-state behavior for missing role state

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.

## Assumable defaults

The agent may infer reversible details from host patterns:

- module placement
- test fixture names
- non-sensitive denied copy
- helper naming
- local receipt formatting

Record meaningful assumptions in `.buildprint/capability-plan.md`.

## Deferrable questions

Do not block on:

- a full admin console
- nested teams/workspaces unless required by the selected surface
- advanced audit reporting
- future permission categories

Move deferrable items to `.buildprint/capability-receipt.md`.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.

