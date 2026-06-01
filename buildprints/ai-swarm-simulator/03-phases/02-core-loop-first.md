# Phase 02 - Core Loop First

requires_roles: [integration-runtime, data-persistence, ux-ui-craft]

## Product intention

Build the smallest real loop: seed input creates a persisted project, the OSS graph-memory adapter builds/read backs graph data, and the canvas renders it.

## Mapped obligations

- Accept seed text or file fixture and prediction requirement.
- Persist project metadata and extracted text.
- Generate or accept ontology.
- Build graph through `GraphMemoryPort`.
- Read graph data through backend API.
- Render graph in the canvas with node/edge inspection.

## Stable vs free

Stable: no canned graph unrelated to input; no Zep required; graph survives reload.

Free: parser details, fixture shape, storage engine, graph backend.

## Implementation scope

Implement project create/read, graph build/readback, adapter contract tests, and browser-visible canvas render.

## Interfaces touched

Project API, graph API, graph-memory adapter, canvas data adapter, upload/seed UI.

## State / runtime touched

Project metadata, extracted text, graph namespace, graph build status, graph data cache if used.

## UX / DX / operator requirements

The user must see build progress or blocked state and then inspect graph content without reading raw JSON.

## Required output (integration-runtime)

- `GraphMemoryPort` implementation for the chosen OSS backend.
- Contract tests for create, ingest, readback, search/stats if available.

## Blocks (integration-runtime)

- Zep SDK import in required runtime path.
- Graph ids that cannot be mapped back to project ids.
- Adapter emits graph data incompatible with the canvas.

## Required output (data-persistence)

- Durable project and graph status readback.
- Restart-aware task state or explicit local limitation.

## Blocks (data-persistence)

- In-memory-only project/graph status while claiming persistence.

## Quality bar

With a fixture seed, graph data renders after reload and reflects the input domain.

## Do not ship

Do not use fixed demo nodes as product behavior.

## Repair routing

Adapter gaps go to this phase; canvas-specific readability goes to phase 06.

## Unlock condition

The local fixture graph loop works from seed to persisted canvas readback.
