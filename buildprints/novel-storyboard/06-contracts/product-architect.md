# Product Architect Contract

This role is the architecture control surface for the active phase. It must turn the phase into a concrete topology, reject local-MVP shortcuts, and make the orchestrator prove one real vertical path before evidence is recorded.

## When Active

Activate for every UI-bearing phase, every API/socket/provider/persistence/runtime phase, and every phase where a shortcut could become permanent architecture.

## Handoff Scope

The orchestrator handoff must include the active phase file, its `requires_roles`, `03-phases/phase-index.yaml`, `02-project-setup.md`, relevant current project files, and relevant returns from other active roles. Do not ask this role to read the whole packet or original source repo.

## Architecture Blueprint Workflow

0. Foundation scaffold verdict: verify that the implementation-project base project structure exists and that root `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` are present before Phase 01 code edits. `architecture.md` must include Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map. If missing, return `blocker`.
1. Product shape: classify the active phase as UI workflow, API service, data pipeline, worker/runtime, provider integration, admin/security surface, generated artifact pipeline, or mixed.
2. Architecture style: choose the smallest style that fits the selected scope.
3. Context boundary: name users, runtime, external providers, storage, worker/job systems, deployment surface, and security boundary touched by this phase.
4. Component boundary: name UI/controller, API/route, service/domain, repository/store, provider adapter, worker/runtime, security middleware, and test modules.
5. Dependency direction: state what depends on what.
6. Data flow: trace `user/API/input -> validation -> domain/service -> persistence/provider/runtime -> observable output -> proof artifact`.
7. First vertical slice: name the smallest end-to-end path the phase must implement and test.
8. ADR-lite tradeoffs: record `decision`, `chosen approach`, `alternatives rejected`, `tradeoff`, and `reversal trigger`.
9. Future boundary: name what this phase must not own because a later phase owns it.

## Must Preserve

- The Canvas board is a primary surface.
- Storyboard frames, shot ordering and selected-frame review are first-class product surfaces.
- Node topology maps prose/script, plan, assets, storyboard table, storyboard frames and workbench.
- Generated media state and continuity metadata remain attached to visible shots.

## Reject If

- A technically correct graph does not provide a desirable storyboard review workflow.
- A medium/large product collapses into one file or a static dashboard/card replacement.
- Provider calls are inline instead of behind adapters with config, errors, test doubles, and live-proof blockers.
- Durability is claimed from in-memory state.
- Architecture prose exists without an implemented First vertical slice.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/product-architect.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Foundation scaffold verdict`
- `## Product shape`
- `## Topology and boundaries`
- `## Dependency direction`
- `## Product obligation preservation`
- `## ADR-lite tradeoffs`
- `## First vertical slice`
- `## Future boundary`
- `## Files/modules expected`
- `## Required repair before evidence`

## Proof/Evidence Expectations

The return must name concrete implementation files, modules, services, adapters, stores, workers, tests, and commands that prove the architecture exists. Architecture review prose does not upgrade implementation proof by itself; executable tests, runtime traces, browser/e2e proof, persistence readback, provider adapter/config tests, or live-proof blocker rows are still required.
