# BUILDPRINT: Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent executable Buildprint packet. It is not a scanner command, source-code clone plan, slice/gate schema, or evidence-writing machine.

## Core invariant

A Buildprint is an execution manual for an AI builder. It must preserve source behavior, artifact type, scope, product judgment, boundaries, and proof expectations in a form another coding agent can build from without opening the source repo.

The previous v2 Slice/Gate abstraction is retired. It was too compressed and runner-shaped. Mapper OS now emits phase-driven comprehensive packets: YAML routes, markdown teaches/builds.

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
5. Source distillation — define artifact identity, golden path, central artifact/interface/boundary, runtime posture, state/readback, provider/security/destructive boundaries.
6. Packet emission — write the v3 phase-driven packet: `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `02-uiux-decision.md`, `blueprint.yaml`, `03-phases/`, and `HANDOVER.md`.
7. Qualification — keep claims conservative until a downstream implementation is built and checked.

## Selected package shape

```text
BUILDPRINT.md
00-questions.md
01-project-setup.md
02-uiux-decision.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-<phase>.md
  02-<phase>.md
HANDOVER.md
```

Each phase file must be comprehensive and readable, not a decomposed schema. Required headings: `How to implement this phase`, `Building objective`, `DO NOT`, `Minimum proof before moving on`, and `Handoff note`.

## Non-negotiables

- Do not emit slices, gates, team capsules, runner specs, or tiny YAML implementation guidance.
- Do not copy secrets or mutate source while mapping.
- Do not silently shrink requested scope.
- Do not ship placeholders, functionless controls, fake provider success, mocked data as real proof, or raw JSON where a product surface is required.
- Do not claim validated/complete/production-ready from packet structure alone.
