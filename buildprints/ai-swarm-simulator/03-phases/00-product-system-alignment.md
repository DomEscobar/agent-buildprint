# Phase 00 - Product System Alignment

requires_roles: [product-architect, integration-runtime, data-persistence, ux-ui-craft]

## Product intention

Align the implementation around one trusted-local product: a graph-centered swarm prediction workbench with OSS graph memory and provider-independent AI calls.

## Mapped obligations

- Name the central artifact as the interactive graph-centered simulation workbench.
- Define `GraphMemoryPort` before implementing graph behavior.
- Define provider config without vendor lock.
- Decide deterministic fixture mode vs live provider mode.
- Keep public-production hardening blocked for trusted-local posture.

## Stable vs free

Stable: selected scope, graph/canvas quality, Zep replacement, provider independence, local persistence/readback.

Free: stack choices, graph backend choice, UI implementation details, queue/storage engine.

## Implementation scope

Create the app skeleton, configuration model, adapter interfaces, route plan, and first fixture data shape.

## Interfaces touched

App entrypoints, config, graph-memory interface, provider interface, route map, local dev commands.

## State / runtime touched

Local graph-memory service config, project store path, simulation store path, provider config.

## UX / DX / operator requirements

The first run path must explain missing graph backend or provider credentials through actionable blocked states.

## Required output (product-architect)

- Product loop contract.
- Adapter contracts.
- Runtime topology.
- Local command list.

## Blocks (product-architect)

- No central artifact named.
- Zep Cloud remains required.
- Provider config hard-codes one hosted vendor.

## Quality bar

A new engineer can explain the first usable loop, central data model, graph-memory boundary, and blocked hardening items before writing feature code.

## Do not ship

Do not begin broad UI panels before the graph-memory and canvas contract is clear.

## Repair routing

Product contradictions go to `BUILDPRINT.md`; setup gaps go to `02-project-setup.md`.

## Unlock condition

Interfaces and local runtime plan are defined, with explicit blocked states for live providers.
