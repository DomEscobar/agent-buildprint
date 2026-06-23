# 00 - Assessment Questions

Run this question gate after `00-host-assessment.md` and before `01-integration-plan.md`.

Capability questions are assessment-led. Inspect the host first, then ask only what blocks safe subscription billing.

## Hard-stop questions

Ask and stop when the host assessment cannot resolve:

- which authenticated user or account owns a subscription
- whether billing is user-based, team-based, tenant-based, or organization-based
- Stripe product/price mapping and environment
- entitlement model and first gated feature
- webhook delivery path and public URL assumptions
- persistence/migration strategy for customer/subscription state
- whether an existing billing provider must be migrated or preserved
- production secret handling and webhook secret availability
- refund/cancellation/proration behavior when the app must expose it

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.

## Assumable defaults

The agent may infer reversible details from host patterns:

- module placement
- test fixture names
- local setup copy
- feature-flag names
- receipt formatting

Record meaningful assumptions in `.buildprint/capability-plan.md`.

## Deferrable questions

Do not block on:

- a full billing portal unless required for verification
- tax automation
- coupons/promotions
- advanced invoice reporting
- multi-product plan catalogs beyond the selected proof path

Move deferrable items to `.buildprint/capability-receipt.md`.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.

