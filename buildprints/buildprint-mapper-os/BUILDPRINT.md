# BUILDPRINT: Buildprint Mapper

Buildprint Mapper is an agent-run workflow for turning an existing source project into a source-independent executable Buildprint packet. It is not a scanner command, source-code clone plan, obsolete schema revival, or evidence-writing machine.

## Core invariant

A Buildprint is an execution manual for an AI builder. It must preserve source behavior, artifact type, scope, product judgment, boundaries, design responsibilities, and proof expectations in a form another coding agent can build from without opening the source repo.

Obsolete v2 was too compressed and runner-shaped. Obsolete v3 phase-driven comprehensive packets optimized for orchestration theater. Buildprint Mapper now emits **kernel_loop** packets (`buildprint/kernel/v1`):

```text
goal → bare agentic loop → optional independent fan-out → contract review
```

YAML routes; markdown teaches/builds. Production maturity is an upgrade, not the floor.

## Read order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `questions.md`
5. `policies/*.md`
6. `templates/executable-packet/`

## Required flow

1. Source acquisition — local folder or read-only checkout.
2. Safe census — hints only, never product authority.
3. Behavior discovery — read behavior-relevant files and separate observed facts from guesses.
4. Scope selection — stop for a human choice when multiple products/scopes are plausible.
5. Source distillation — define artifact identity, golden path, central artifact/interface/boundary, central output quality contract, runtime posture, state/readback, provider/security/destructive boundaries, and UI/operator experience obligations.
6. Hard-technique distillation — identify source-derived domains that need proven libraries/runtimes/services. Keep choices stack-neutral unless source evidence makes a specific tool part of the product contract.
7. Responsibility placement — put the generic AI-builder briefing in selected `BUILDPRINT.md`; put product contract facts in `blueprint.yaml`, goal, setup, identity, and loop objectives.
8. Packet emission — write the kernel packet: `BUILDPRINT.md`, `00-goal.md`, `01-setup.md`, `02-identity.md`, `blueprint.yaml`, `loops/`, `review.md`, product-facing `README.md`, and `HANDOVER.md`.
9. Qualification — keep claims conservative until a downstream implementation is built and checked.

## Selected package shape

```text
BUILDPRINT.md
00-goal.md
01-setup.md
02-identity.md
blueprint.yaml
loops/
  loop-index.yaml
  loop-flow.md
  01-<loop>.md
  02-<loop>.md
review.md
README.md
HANDOVER.md
```

## Responsibility rules

- Selected `BUILDPRINT.md` is the AI-builder briefing only: role, responsibility, perfection alignment, kernel rules, fake-success intolerance, and read order. It must not name the mapped source product or carry the product spec.
- `blueprint.yaml` mirrors the product contract and routes the packet, including optional maturity upgrades.
- `00-goal.md` locks observable goal, acceptance criteria, and hard stops.
- `02-identity.md` is the mandatory UI/operator identity for UI-bearing artifacts (or explicit `not-ui-bearing`).
- Every loop file must read `02-identity.md` as standing design responsibility when UI exists.
- `review.md` requires an independent fresh-context reviewer against the goal and loop contracts.

Each loop file must be comprehensive and readable, not a decomposed schema. Required headings: `How to implement this loop`, `Building objective`, `DO NOT`, `Minimum proof before moving on`, and `Handoff note`.

## Non-negotiables

- Do not emit slices, gates, team capsules, runner specs, generated prompt handoffs, tiny YAML implementation guidance, evidence ledgers, or claim-gates JSON products.
- Do not emit obsolete v3 `03-phases/` / `phase_driven_comprehensive*` as the selected live shape.
- Do not put product-specific mapped-source details into selected `BUILDPRINT.md`.
- Do not write a weak `02-identity.md`; UX is mandatory when UI-bearing.
- Do not let loops skip identity responsibility when UI exists.
- Do not copy secrets or mutate source while mapping.
- Do not silently shrink requested scope.
- Do not ship placeholders, functionless controls, fake provider success, mocked data as real proof, or raw JSON where a product surface is required.
- Do not claim validated/complete/production-ready from packet structure alone.
- Do not require production harness maturity for first successful loop claims.
