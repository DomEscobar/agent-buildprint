# Phase 00 — Foundation skeleton implementation

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary]

## Product intention

Implement the running architectural base designed in `02-project-setup.md`. Do not re-litigate setup and do not write another alignment essay. Turn the setup decisions into a runnable skeleton that future phases can extend without inventing architecture.

## Mapped obligations

- Consume the `01-questions.md` decisions and `.buildprint/setup-receipt.md` setup artifacts.
- Keep artifact type, consumer, central loop, deployment posture, and forbidden shortcuts stable.
- Create the app/package/runtime skeleton selected in setup.
- Implement adapter stubs, persistence initialization seams, readiness/config surfaces, and first smoke command.
- Show missing providers, credentials, deployment controls, export/runtime dependencies, or destructive operations as honest blockers.

## Stable vs free

Stable: setup decisions, central loop, selected stack, domain boundaries, adapter names, persistence ownership, product-craft floor, and blocker semantics from `02-project-setup.md`.

Free: small internal names and file layout details if they do not contradict setup or make later phases harder.

## Implementation scope

Build the foundation skeleton only:

- project directories and entrypoints;
- frontend/backend/runtime or non-UI equivalent structure;
- domain model stubs;
- adapter interface stubs;
- persistence initialization seam;
- configuration loader and `.env.example` compatibility;
- health/config/readiness surface;
- first smoke test/build command.

## Build

Create real files in the implementation project. The result must run or fail with a precise setup blocker. Documentation-only completion is not valid for this phase.

## Interfaces touched

Project entrypoints, domain module boundary, provider/integration adapters, persistence layer, configuration loader, readiness/health endpoint or equivalent command surface.

## State / runtime touched

Initial persisted state location, migration/init seam, runtime configuration, provider/export/deployment blocked-state model, and smoke-test fixture data as needed.

## UX / DX / operator requirements

A future agent can run one setup/dev command and see the correct artifact skeleton. For UI-bearing products, the first screen must look like the domain workbench, not a generic dashboard. For non-UI artifacts, the first command/API/example must express the real artifact loop.

## Required output (product-architect)

- Verify the skeleton implements the architecture chosen in `02-project-setup.md`.
- Prevent new stack/domain decisions from drifting away from the setup receipt.
- Keep the first vertical slice path obvious.

## Blocks (product-architect)

- Reopening setup debates without updating `02-project-setup.md` and `.buildprint/setup-receipt.md`.
- Creating a generic folder tree that does not encode the central artifact or loop.

## Required output (ux-ui-craft)

- For UI products, create the framework/design-system base and first domain-shaped screen states: empty, loading, error, blocked, and ready.
- Ensure product-facing copy has no Buildprint/proof/phase/internal harness vocabulary.

## Blocks (ux-ui-craft)

- Generic dashboard shell.
- Single-file hand-rolled UI.
- Raw ids/debug strings on the product surface.
- Dead controls or placeholder workbench surfaces.

## Required output (integration-runtime)

- Create adapter interfaces/stubs for providers, external services, runtime workers, exports, APIs, webhooks, MCP, CLIs, or infrastructure seams as applicable.
- Surface live/blocker/error modes consistently.

## Blocks (integration-runtime)

- Direct provider calls scattered through UI or domain code.
- Fake success when credentials or runtime dependencies are missing.

## Required output (data-persistence)

- Create the persistence initialization seam and the minimal state model needed for later phases.
- Define readback behavior before claiming restart safety.

## Blocks (data-persistence)

- In-memory state presented as durable.
- Missing storage path/migration/init strategy.

## Required output (security-boundary)

- Enforce secret handling, upload/file boundaries, destructive-action blockers, and posture-specific exposure limits in the skeleton.

## Blocks (security-boundary)

- Real secrets in `.env.example`, logs, fixtures, docs, or generated artifacts.
- Public/private exposure claims without posture-required controls.

## Quality bar

The base runs or fails honestly, encodes the architecture setup, and makes the next phase easier to implement than to fake.

## Do not ship

- Documentation-only foundation.
- Generic dashboard/app shell.
- Setup decisions ignored or duplicated.
- Adapter-free direct integration code.
- No build/test/smoke command.
- Hidden provider/runtime/export blockers.

## Repair routing

- setup contradiction -> `02-project-setup.md`
- unanswered product-defining question -> `01-questions.md`
- skeleton/runtime failure -> this phase
- final-review defect -> `04-review.md`

## Unlock condition

The implementation has a runnable or precisely blocked skeleton, setup receipt, adapter seams, persistence/config/readiness foundation, and first smoke proof. Only then continue to shell/navigation or core-loop feature work.
