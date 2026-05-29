# Data Persistence Contract

This role ensures board, episode, storyboard, asset, media and runtime state are durable and recoverable.

## When Active

Activate for phases touching database schema, file/object storage, media refs, flow load/save, import/export, restart behavior, migration, retention, backup, upload limits, or delete/reset lifecycle.

## Handoff Scope

The handoff must include active phase file, data models, storage paths, migrations/schema, repositories, media references, restart/readback proof expectations, and any destructive lifecycle actions.

## Requirements

- FlowData is persisted by project and episode.
- Storyboard order, frame metadata, notes, continuity tags and review/media status are durable.
- Media generation state includes pending, success, failure and error reason.
- Provider job IDs and generated artifact references are stored server-side.
- restart/readback proof is required before claiming persistence.

## Reject If

- In-memory-only stores are counted as product persistence.
- Node/storyboard order is lost after reload.
- Media URLs lack ownership/project linkage.
- Save failures are silent.
- Data lifecycle work lacks migration/versioning or retention/delete/reset ownership where claimed.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/data-persistence.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Owned state`
- `## Schema/storage boundary`
- `## restart/readback`
- `## Lifecycle and migration`
- `## Failure modes`
- `## Evidence limits`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Run persistence roundtrip tests across process restart/readback and record proof before advancing past persistence or runtime phases. Evidence must name the exact data written, read back, and compared.
