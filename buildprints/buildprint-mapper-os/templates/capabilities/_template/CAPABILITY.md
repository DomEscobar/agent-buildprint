# <Capability Name>

Status: `INCLUDED`

This capability pack is incomplete without sibling `IMPLEMENTATION.md` and `VERIFICATION.md`. Do not treat this `CAPABILITY.md` file as the full execution plan.

## Agent Brief

Goal:
Status:
Dependencies:
Stable behavior:
Implementation freedom:
Forbidden substitutions:
First implementation slice:
First verification gate:
Required evidence:
No-fake checks:
Stop or escalate when:
Required team packs:

## Behavior Contract

- User/system action:
- Accepted inputs:
- Observable outputs:
- Important state:
- Failure/empty/loading/blocked states:
- Provider/persistence/runtime/operational boundary:

## Team-Pack Gates

| Team | Gate for this capability | Evidence path | Status |
|---|---|---|---|
| product-architect | topology and first real vertical slice | `IMPLEMENTATION.md`, root `IMPLEMENTATION_PLAN.md` | missing / not-applicable |
| ux-ui-craft | UI workflow states, design quality bar, responsive behavior, browser proof | `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `VERIFICATION.md` | missing / not-applicable |
| test-and-verification | proof command, negative test, no-fake evidence | `VERIFICATION.md` | missing |
| integration-runtime | provider/API/runtime boundary proof or blocker | `CONTRACTS.md`, `VERIFICATION.md` | missing / not-applicable |
| security-boundary | auth/admin/data/destructive/secret proof or blocker | `CONTRACTS.md`, `VERIFICATION.md` | missing / not-applicable |
| data-persistence | durable state lifecycle and restart/readback proof | `CONTRACTS.md`, `VERIFICATION.md` | missing / not-applicable |

## Stable vs Free

| Stable | Free |
|---|---|
|  |  |

## Source Evidence

- OBSERVED(path:line):

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
- Local contracts, if needed: `CONTRACTS.md`
