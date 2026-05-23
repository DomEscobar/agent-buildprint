# product-architect

Purpose: prevent lazy structure before coding begins.

This is an original Mapper OS skill capsule. It may be informed by public architecture-blueprint and architecture-decision skill patterns, but no third-party skill text is vendored into the Buildprint.

## Skill Capsule

Run this pass before implementation planning and again before an capability packet is promoted to `REAL_IMPLEMENTED`.

### Architecture Blueprint Workflow

1. Classify product shape: CLI, library, internal tool, user-facing web app, API service, data pipeline, runtime/worker, or mixed system.
2. Identify architectural style: layered, modular monolith, hexagonal, event-driven, serverless, workflow engine, graph/runtime, or tiny single-surface.
3. Define context boundaries: users, external systems, providers, stores, jobs, and deployment surface.
4. Define component boundaries: UI surfaces, API/routes, services/domain, provider adapters, storage/state, jobs/runtime, security, and tests.
5. Define data flow: request/event/input, validation, domain operation, persistence/provider side effect, response/update, proof artifact.
6. Record decisions and tradeoffs before coding.

### Required Blueprint Views

For medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy output, record:

| View | Required Content | Evidence Location |
|---|---|---|
| Context | users, systems, providers, stores, deployment boundary | `07-execution/implementation-plan.yaml` |
| Component | UI/API/service/provider/storage/job/test modules | `03-phases/phase-index.yaml` |
| Data flow | one real vertical slice from input to observable result | active capability file |
| Cross-cutting | auth, errors, logging, validation, secrets, limits | active phase safety, `04-evaluation.md`, active phase |
| Decision notes | choice, alternatives, tradeoff, consequence | `07-execution/implementation-plan.yaml` |

### Boundary Decision Rules

- UI is not the product path unless it reaches state/domain/provider behavior or an explicit blocker.
- Routes are not business logic; broad scopes need a service/domain boundary.
- Providers are not direct inline calls; use adapters with config, errors, retries, and test fakes.
- Durable claims require storage ownership and restart/readback proof.
- Jobs require status, progress, logs, cancel, retry/failure, and recovery semantics.
- Security-sensitive operations require denied-path behavior before happy-path promotion.

### ADR-Lite Table

Every non-tiny selected output must include decision notes:

| Decision | Chosen approach | Alternatives rejected | Tradeoff | Reversal trigger |
|---|---|---|---|---|
|  |  |  |  |  |

### First-Capability Topology Proof

The first implementation slice must prove one real path:

```text
user/API/input -> validation -> domain/service -> persistence/provider/runtime -> observable output -> proof artifact
```

If any segment is unavailable, keep the capability selected but downgrade it to `CONTRACT_SEAM_ONLY` or `BLOCKED_WITH_REASON`.

## Required Output

- Product topology with UI, API, service/domain, provider/runtime, persistence/state, task/job, security, and test boundaries as applicable.
- Architecture decision notes for medium/large/full-suite output.
- First vertical slice that proves one real user-visible or API-visible data path end to end.
- Explicit stable-vs-free boundaries so implementation agents can choose internals without shrinking behavior.

## Blocks

- Single-file app structure for medium/large/full-suite scopes.
- UI-only shell without a real data path.
- Diagram-only architecture without a first-capability topology proof.
- Route-shaped endpoints that do not call domain/service/storage/provider boundaries.
- Seam-only adapters promoted as product-grade implementation.
- In-memory-only product state when persistence or restart/readback is claimed.
- Architecture choices that require reading all Markdown files before the next action is known.
