# Phase 00 - Foundation skeleton implementation

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Implement the running architectural base designed in `02-project-setup.md` for AI Swarm Simulator. Do not re-litigate setup and do not write another alignment essay. Turn the setup decisions into a runnable skeleton that future phases can extend without inventing architecture.

## Mapped obligations

- Consume the `01-questions.md` decisions and `.buildprint/setup-receipt.md` setup artifacts.
- Keep artifact type, consumer, central loop, deployment posture, and forbidden shortcuts stable.
- Create the app/runtime skeleton for trusted-local graph-backed swarm simulation workbench.
- Implement GraphMemoryAdapter, LLMProvider, simulation runtime seam, report generator, upload parser, and canvas readback contract as adapter stubs or precise seams.
- Show missing LLM credentials, missing open-source graph backend, missing OASIS/simulation runtime, and public deployment controls as honest blockers.

## Stable vs free

Stable: setup decisions, central loop, selected stack, domain boundaries, adapter names, persistence ownership, product-craft floor, and blocker semantics from `02-project-setup.md`.

Free: small internal names and file layout details if they do not contradict setup or make later phases harder.

## Implementation scope

Build the foundation skeleton only: graph workbench skeleton with provider readiness, upload/graph/simulation/report routes, adapter stubs, persistence init, health/config endpoint, and smoke command.

## Build

Create real files in the implementation project. The result must run or fail with a precise setup blocker. Documentation-only completion is not valid for this phase.

## Interfaces touched

Project entrypoints, domain module boundary, provider/integration adapters, persistence layer, configuration loader, readiness/health endpoint or equivalent command surface.

## State / runtime touched

Initial persisted state location, migration/init seam, runtime configuration, provider/deployment blocked-state model, and smoke-test fixture data as needed.

## UX / DX / operator requirements

A future agent can run one setup/dev command and see the correct domain skeleton. The first surface must express project graph, graph canvas, simulation traces, report, and interaction history, not a generic dashboard.

## Required output (product-architect)

Verify the skeleton implements the architecture chosen in `02-project-setup.md`, prevent stack/domain drift, and keep the first vertical slice path obvious.

## Blocks (product-architect)

Reopening setup debates without updating `02-project-setup.md` and `.buildprint/setup-receipt.md`, or creating a generic folder tree that does not encode the central artifact or loop.

## Required output (ux-ui-craft)

Create the framework/design-system base and first domain-shaped screen states: empty, loading, error, blocked, and ready.

## Blocks (ux-ui-craft)

Generic dashboard shell, single-file hand-rolled UI, raw ids/debug strings, dead controls, or placeholder workbench surfaces.

## Required output (integration-runtime)

Create adapter interfaces/stubs with live/blocker/error behavior for GraphMemoryAdapter, LLMProvider, simulation runtime seam, report generator, upload parser, and canvas readback contract.

## Blocks (integration-runtime)

Direct provider/runtime calls scattered through UI or domain code, or fake success when dependencies are missing.

## Required output (data-persistence)

Create the persistence initialization seam and minimal state model needed for later phases. Define readback behavior before claiming restart safety.

## Blocks (data-persistence)

In-memory state presented as durable, or missing storage path/migration/init strategy.

## Required output (security-boundary)

Enforce secret handling, upload/file boundaries, destructive-action blockers, and posture-specific exposure limits in the skeleton.

## Blocks (security-boundary)

Real secrets in `.env.example`, logs, fixtures, docs, or generated artifacts; public/private exposure claims without posture-required controls.

## Quality bar

The base runs or fails honestly, encodes the architecture setup, and makes the next phase easier to implement than to fake.

## Do not ship

Documentation-only foundation, generic dashboard/app shell, ignored setup decisions, adapter-free direct integration code, no build/test/smoke command, or hidden provider/runtime/export blockers.

## Repair routing

- setup contradiction -> `02-project-setup.md`
- unanswered product-defining question -> `01-questions.md`
- skeleton/runtime failure -> this phase
- final-review defect -> `04-review.md`

## Unlock condition

The implementation has a runnable or precisely blocked skeleton, setup receipt, adapter seams, persistence/config/readiness foundation, and first smoke proof. Only then continue to shell/navigation or core-loop feature work.
