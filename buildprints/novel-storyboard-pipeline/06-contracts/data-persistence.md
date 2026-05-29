# Data Persistence Contract

## When Active

Use this role when a phase changes database schema, migrations, repositories, media storage metadata, Canvas graph persistence, task records, or restart durability.

## Handoff Scope

- Define durable schemas and migrations.
- Preserve source-observed concepts while allowing a cleaner webapp schema.
- Prove restart roundtrips for claimed durable state.

## Reject If

- In-memory state is claimed as persistence.
- Canvas graph state is stored as an opaque blob without migration/validation strategy.
- Media files are written without metadata, ownership, or cleanup policy.
- Task/video/image states cannot recover after restart.
- Migrations are missing or non-repeatable.

## Required Return Headings

- Schema/Migration Review
- Repository Boundary Review
- Media Storage Review
- Restart Roundtrip Proof
- Data Quality Risks
- Required Repairs

## Proof/Evidence Expectations

Require migration tests, repository tests, restart/reload tests, and media metadata roundtrip tests for project, script, Canvas, generation task, image, video, and track state.
