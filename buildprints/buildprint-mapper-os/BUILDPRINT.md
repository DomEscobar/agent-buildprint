# BUILDPRINT: Buildprint Mapper

Buildprint Mapper is an agent-run workflow for turning an existing source project into a source-independent executable Buildprint packet. It is not a scanner command, source-code clone plan, obsolete schema revival, or evidence-writing machine.

## Core invariant

A Buildprint is an execution manual for an AI builder. It must preserve source behavior, artifact type, scope, product judgment, boundaries, design responsibilities, and proof expectations in a form another coding agent can build from without opening the source repo.

The obsolete v2 abstraction is gone. It was too compressed and runner-shaped. Buildprint Mapper now emits phase-driven comprehensive packets: YAML routes, markdown teaches/builds.

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
6. Hard-technique distillation — identify source-derived domains that need proven libraries/runtimes/services, such as fixed-format export, document parsing, rich editing, drag/reorder interaction, charts/diagrams, provider SDKs, background jobs, migrations, or durable storage. Keep choices stack-neutral unless source evidence makes a specific tool part of the product contract.
7. Responsibility placement — put the generic AI-builder briefing in selected `BUILDPRINT.md`; put product contract facts in `blueprint.yaml`, setup, UI/style decision, and phase objectives.
8. Packet emission — write the v3 phase-driven packet: `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `02-ui-identity.md`, `blueprint.yaml`, `03-phases/`, product-facing `README.md`, and `HANDOVER.md`.
9. Qualification — keep claims conservative until a downstream implementation is built and checked.

## Selected package shape

```text
BUILDPRINT.md
00-questions.md
01-project-setup.md
02-ui-identity.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-<phase>.md
  02-<phase>.md
README.md
HANDOVER.md
```

## Responsibility rules

- Selected `BUILDPRINT.md` is the AI-builder briefing only: role, responsibility, perfection alignment, fake-success intolerance, and read order. It must not name the mapped source product or carry the product spec.
- `blueprint.yaml` mirrors the product contract and routes the packet.
- `blueprint.yaml` includes proven implementation requirements when the source product depends on hard technical domains that should use proven libraries/runtimes/services or equivalent proof.
- `02-ui-identity.md` is the mandatory UI identity for UI-bearing artifacts and must begin with UX importance/understandability plus a checklist.
- Every phase file must read `02-ui-identity.md` as the standing comprehension, user-language, and visual identity responsibility when UI exists.

Each phase file must be comprehensive and readable, not a decomposed schema. Required headings: `How to implement this phase`, `Building objective`, `DO NOT`, `Minimum proof before moving on`, and `Handoff note`.

## Non-negotiables

- Do not emit slices, gates, team capsules, runner specs, generated prompt handoffs, or tiny YAML implementation guidance.
- Do not put product-specific mapped-source details into selected `BUILDPRINT.md`.
- Do not write a weak `02-ui-identity.md`; UX is mandatory, understandable, detailed, and phase-binding.
- Do not let phases skip the UI/UI identity.
- Do not copy secrets or mutate source while mapping.
- Do not silently shrink requested scope.
- Do not ship placeholders, functionless controls, fake provider success, mocked data as real proof, or raw JSON where a product surface is required.
- Do not claim validated/complete/production-ready from packet structure alone.
