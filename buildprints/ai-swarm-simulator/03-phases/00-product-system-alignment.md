# Phase 00 - Product system alignment

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Define the product spine before coding: a trusted-local graph-backed swarm simulation workbench with provider-neutral LLMs and an open-source graph memory replacement for Zep Cloud.

## Mapped obligations

- Choose the concrete app stack and local run shape.
- Define `GraphMemoryAdapter` and `LLMProvider` boundaries before feature work.
- Decide how Graphiti or another free open-source graph engine will store graph state locally.
- Preserve the graph canvas as a first-class work surface.
- Mark public/private hardening as blocked under trusted-local posture.

## Stable vs free

Stable: graph workbench, upload-to-graph loop, provider-neutral LLM config, open-source Zep replacement, durable readback.

Free: exact component library, database choice, queue implementation, and API route names if the user workflow stays intact.

## Implementation scope

Create project structure, configuration contracts, adapter interfaces, local env examples, and the initial UI/routing shell plan.

## Interfaces touched

Frontend app shell, backend config, graph memory adapter, LLM provider adapter, persistence initialization.

## State / runtime touched

Local graph store, project metadata store, upload/report/simulation folders or database tables, runtime health/config state.

## UX / DX / operator requirements

The first screen should be the usable workbench entry, not a marketing landing page. The operator must see missing provider/memory configuration as actionable blocked state.

## Required output (product-architect)

Define the central product loop, boundaries, module ownership, and phase sequence so later phases do not fragment into disconnected demos.

## Blocks (product-architect)

Do not start feature coding with direct provider calls scattered across services.

## Required output (ux-ui-craft)

Set a real frontend craft floor: structured app, responsive workbench layout, graph canvas affordances, and non-placeholder states.

## Blocks (ux-ui-craft)

Do not ship a single-file UI, tiny decorative graph, unlabeled controls, or raw JSON as the primary surface.

## Required output (integration-runtime)

Define provider-neutral LLM and graph-memory adapters with live/blocker modes and error propagation.

## Blocks (integration-runtime)

Do not keep Zep Cloud as the hidden implementation behind a renamed adapter.

## Required output (data-persistence)

Define durable readback for projects, graph references, simulation state, reports, logs, and chat/interview history.

## Blocks (data-persistence)

Do not claim reload or restart safety for in-memory task status.

## Required output (security-boundary)

Name trusted-local limits for uploads, provider keys, deletes, and simulation process controls.

## Blocks (security-boundary)

Do not expose this as public-ready without auth, tenancy, upload hardening, and abuse controls.

## Quality bar

The setup makes it impossible to accidentally build a generic dashboard or a Zep-dependent clone.

## Do not ship

Ambiguous provider config, no adapter boundary, no graph persistence decision, or no trusted-local blocker list.

## Repair routing

If the product loop or adapter boundary is unclear, repair `02-project-setup.md` and this phase before moving on.

## Unlock condition

The implementation has a clear app skeleton, adapter contracts, local config defaults, and blocked-state semantics.

