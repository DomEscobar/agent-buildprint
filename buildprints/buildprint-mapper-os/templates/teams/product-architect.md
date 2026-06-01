# product-architect

Purpose: prevent lazy structure before coding begins.

This is an original Mapper OS skill capsule. It may be informed by public architecture-blueprint and architecture-decision skill patterns, but no third-party skill text is vendored into the Buildprint.

## Skill Capsule

Run this pass before implementation planning and again before a selected packet is promoted.

### Architecture Blueprint Workflow

1. Classify product shape: CLI, library, internal tool, user-facing web app, API service, data pipeline, runtime/worker, or mixed system.
2. Identify the central artifact and first usable loop.
3. Define context boundaries: users, external systems, providers, stores, jobs, and deployment surface.
4. Define component boundaries: UI surfaces, API/routes, services/domain, provider adapters, storage/state, jobs/runtime, security, and tests.
5. Define data flow: request/event/input, validation, domain operation, persistence/provider/runtime side effect, response/update, observable output.
6. Record decisions and tradeoffs before coding.

### Required Blueprint Views

For medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy output, record:

| View | Required Content | Location |
|---|---|---|
| Context | users, systems, providers, stores, deployment boundary | `02-project-setup.md` and active phase files |
| Component | UI/API/service/provider/storage/job/test modules | `03-phases/phase-index.yaml` and phases |
| Data flow | one real vertical slice from input to observable result | active phase file |
| Cross-cutting | auth, errors, logging, validation, secrets, limits | active phase and `04-review.md` |
| Decision notes | choice, alternatives, tradeoff, consequence | `02-project-setup.md` and phase files |

### Boundary Decision Rules

- UI is not the product path unless it reaches state/domain/provider behavior or an explicit blocker.
- Routes are not business logic; broad scopes need a service/domain boundary.
- Providers are not direct inline calls; use adapters with config, errors, retries, and test fakes.
- Durable claims require storage ownership and restart/readback behavior.
- Jobs require status, progress, logs, cancel, retry/failure, and recovery semantics.
- Security-sensitive operations require denied-path behavior before happy-path promotion.

## Required Output

- Product topology with UI, API, service/domain, provider/runtime, persistence/state, task/job, security, and test boundaries as applicable.
- Architecture decision notes for medium/large/full-suite output.
- First vertical slice that creates one real user-visible or API-visible path end to end.
- Explicit stable-vs-free boundaries so implementation agents can choose internals without shrinking behavior.

## Blocks

- Single-file app structure for medium/large/full-suite scopes unless the selected scope is truly tiny/static.
- UI-only shell without a real data path.
- Diagram-only architecture without a first usable path.
- Route-shaped endpoints that do not call domain/service/storage/provider boundaries.
- Seam-only adapters promoted as product-grade implementation.
- In-memory-only product state when persistence or restart/readback is required.
- Architecture choices that require reading all Markdown files before the next action is known.
