# Product Architect Contract

This role is the architecture control surface for the active phase. It is not a persona label and not a broad design essay. It must turn the phase into a concrete topology, reject local-MVP shortcuts, and make the orchestrator prove one real vertical path before evidence is recorded.

## When Active

Activate for:

- every medium, large, or full-suite packet;
- every UI-bearing phase, because UI shape must be backed by state and runtime ownership;
- every phase touching API/routes, domain logic, providers, persistence, workers, jobs, auth, deployment, generated artifacts, imports, exports, reports, or product settings;
- every phase where a shortcut could become permanent architecture.

If the phase claims to be tiny, this role still checks whether that claim is honest. A tiny phase can be simple, but it cannot hide missing boundaries behind a single-file product.

## Handoff Scope

The orchestrator handoff must include only:

- active phase file and its `requires_roles`;
- `03-phases/phase-index.yaml`;
- `02-project-setup.md` product shape, architecture decisions, production readiness contract, open assumptions, and phase start gate;
- relevant current project files for the active phase;
- relevant returns from other active roles when those returns affect topology.

Do not ask this role to read the whole packet, all phases, or the original source repo. It reviews the active phase and the dependency boundary needed to implement that phase without painting later phases into a corner.

## Architecture Blueprint Workflow

The return must complete this workflow before implementation is treated as ready:

1. Product shape: classify the active phase as UI workflow, API service, data pipeline, worker/runtime, provider integration, report/export, admin/security surface, generated artifact pipeline, or mixed.
2. Architecture style: choose the smallest style that fits the selected scope: modular monolith, layered app, hexagonal ports/adapters, worker queue, workflow engine, local-first desktop/web workbench, serverless adapter, or tiny single-surface. State why the choice fits.
3. Context boundary: name users, local runtime, external providers, storage, worker/job systems, deployment surface, and security boundary touched by this phase.
4. Component boundary: name UI/controller, API/route, service/domain, repository/store, provider adapter, worker/runtime, security middleware, and test modules. If a boundary is intentionally absent, say why.
5. Dependency direction: state what depends on what. UI calls application/API, API calls service/domain, service/domain calls repositories/adapters, adapters own external systems, tests exercise contracts from outside the boundary.
6. Data flow: trace `user/API/input -> validation -> domain/service -> persistence/provider/runtime -> observable output -> proof artifact`.
7. First vertical slice: name the smallest end-to-end path the phase must implement and test.
8. ADR-lite tradeoffs: for each non-trivial choice, record `decision`, `chosen approach`, `alternatives rejected`, `tradeoff`, and `reversal trigger`.
9. Future boundary: name what this phase must not own because a later phase owns it.

## Architecture Quality Bar

The returned topology must be specific enough that an implementer can create files without inventing the architecture from scratch:

- name module families, not just layers: `routes`, `application services`, `domain`, `repositories`, `provider adapters`, `worker runtime`, `UI state/controllers`, `tests`, and `observability`;
- define the first production-ready path even when live provider proof is blocked;
- define deterministic test doubles as test infrastructure only, not product runtime truth;
- keep provider, persistence, security, and UI runtime decisions explicit;
- prefer boring modular structure over clever framework tricks unless the product requires the trick.

## Reject If

- A medium/large/full-suite product collapses into one server file, one route file, one component file, or embedded HTML/CSS/JS as the product architecture.
- A UI-only shell is presented as product progress without state/domain/provider behavior or a stated blocker.
- Routes contain business logic that should live in service/domain modules.
- Provider calls are inline instead of behind adapters with config, error behavior, test doubles, and live-proof blockers.
- Deterministic providers or mocks are wired as the only product path while live adapters/config contracts are missing.
- Durability is claimed from in-memory state or local files with no ownership, schema/versioning, migration, or restart/readback plan.
- Jobs or async tasks lack status, progress, cancel, timeout, retry/failure, recovery, idempotency, and ownership.
- Security-sensitive behavior is added after the fact instead of being part of the boundary.
- Architecture prose, diagrams, or comments exist without an implemented First vertical slice.
- A phase creates abstractions that are not exercised by its proof gate.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/product-architect.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Foundation scaffold verdict`: confirm implementation-project `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and UI-bearing `ui-identity.md` exist before Phase 01; include blocker if missing.
- `## Product shape`
- `## Topology and boundaries`
- `## Boundary map`: summarize the `architecture.md` boundary map touched by this phase and any dependency-rule risks.
- `## Dependency direction`
- `## Product obligation preservation`
- `## ADR-lite tradeoffs`
- `## First vertical slice`
- `## Future boundary`
- `## Files/modules expected`
- `## Required repair before evidence`

## Proof/Evidence Expectations

The return must name concrete implementation files, modules, services, adapters, stores, workers, tests, and commands that prove the architecture exists. Architecture review prose does not upgrade implementation proof by itself; it only permits the orchestrator to run the phase proof gate.

Evidence can reference this return only as architecture review support. The implementation proof must still come from executable tests, runtime traces, browser/e2e proof, persistence readback, provider adapter/config tests, or live-proof blocker rows as appropriate.
