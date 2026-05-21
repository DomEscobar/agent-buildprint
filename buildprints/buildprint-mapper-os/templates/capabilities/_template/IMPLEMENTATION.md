# Implementation: <Capability Name>

This file is the only implementation plan for this capability. The root `IMPLEMENTATION_PLAN.md` orders capabilities; this file defines the executable slice plan for this pack.

## Agent Brief

- Goal:
- Dependencies:
- Stable behavior:
- Implementation freedom:
- Forbidden substitutions:
- First verification gate:
- Required evidence:
- Required team packs:
- Stop or escalate when:

## First Real Vertical Slice

- User/API entry:
- Domain/service behavior:
- Persistence/state effect:
- Provider/runtime effect:
- UI/browser proof when applicable:
- Negative/failure path:

The first slice must prove one real data path end to end. UI-only scaffolds, route labels, no-op controls, fake success states, deterministic adapters, or in-memory-only state do not qualify unless the capability is explicitly downgraded.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | confirm topology and vertical slice | topology proof and slice evidence | missing / not-applicable |
| ux-ui-craft | confirm `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md` for UI flows | screenshot/browser proof | missing / not-applicable |
| test-and-verification | define proof command and negative test | closed proof ledger row | missing |
| integration-runtime | confirm provider/runtime boundary | sandbox/live proof or blocker | missing / not-applicable |
| security-boundary | confirm sensitive boundary | security negative proof or blocker | missing / not-applicable |
| data-persistence | confirm durable state lifecycle | restart/readback proof or blocker | missing / not-applicable |

## Milestones

1.
2.
3.

## Repair Loop

- Failed check:
- Structured feedback:
- Focused fix:
- Rerun:
- Pass or blocker:

## Fresh Review

Required when:

-

## Stop Conditions

-

## Handoff Update

After each milestone, update root `CURRENT_STATE.md`, this capability's `VERIFICATION.md`, and root `VERIFICATION.md` with commands, evidence, blockers, and next action.
