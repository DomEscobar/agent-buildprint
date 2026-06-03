# Phase 01 - Shell and navigation

requires_roles: [ux-ui-craft, product-architect]

ux_obligations:
  - 00b-ux-contract/first-run-path.md#landing
  - 00b-ux-contract/empty-blocked-loading-states.yaml#empty.no-project
  - 00b-ux-contract/empty-blocked-loading-states.yaml#empty.no-seed
  - 00b-ux-contract/empty-blocked-loading-states.yaml#blocked.missing-llm
  - 00b-ux-contract/disclosure-plan.md#default-vs-progressive
  - 00b-ux-contract/ux-acceptance.yaml#NOVICE-NO-JARGON-FIRST-SCREEN

## Product intention

Build the visible workbench shell around the real MiroFish flow: upload, graph build, simulation, report, and interaction, with graph/split/workbench viewing modes.

## Mapped obligations

- Provide upload/start entry.
- Provide process status area.
- Provide graph canvas area that can become full-width or split.
- Provide simulation, report, and interaction navigation states.
- Make blocked provider/memory states visible.

## Stable vs free

Stable: five-step user flow and graph/split/workbench modes.

Free: exact route names, component names, and layout implementation.

## Implementation scope

Build the app shell, route flow, empty/loading/error states, and primary navigation controls.

## Interfaces touched

Frontend routes, navigation state, status display, provider status endpoint if useful.

## State / runtime touched

Client view state, selected project/simulation/report identifiers, local status calls.

## UX / DX / operator requirements

Controls must be discoverable and non-dead. Empty states should tell the user the next action, not explain Buildprint internals.

## Required output (ux-ui-craft)

Create a polished, responsive workbench shell with stable layout dimensions for graph and side panels.

## Blocks (ux-ui-craft)

No oversized marketing hero as first screen; no nested card piles; no tiny graph preview that cannot be inspected.

## Required output (product-architect)

Keep navigation tied to the product state machine: project -> graph -> simulation -> report -> interaction.

## Blocks (product-architect)

Do not create independent pages that cannot share persisted project/simulation/report context.

## Quality bar

A user can tell where they are, what is blocked, and what action moves the workflow forward.

## Do not ship

Dead buttons, clipped labels, hidden graph mode controls, or route states that lose selected project context.

## Repair routing

If the shell feels generic, repair this phase and re-run browser review.

## Unlock condition

The shell supports the core navigation and can host a real graph canvas in later phases, every entry in `ux_obligations` resolves to a real artifact section in `00b-ux-contract/`, and the landing screen surfaces the "try with sample" affordance without requiring LLM provider config.

