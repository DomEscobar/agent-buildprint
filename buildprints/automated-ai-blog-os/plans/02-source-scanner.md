# Phase 02 — Source Scanner

## Goal

Capture source facts into `SourceRecord` files while preserving fixture-only test behavior.

## Required actions

1. Implement scanner inputs from `config/sources.json` and test fixtures.
2. Write `storage/sources/*.json` records with `id`, `url`, `title`, `excerpt`, `sourceType`, `observedAt`, `quality`, `retrievalStatus`, `signals`, and `notes`.
3. Use `retrievalStatus: "failed"` or `"skipped"` for inaccessible sources; never invent title, excerpt, signals, or notes.
4. Assign `quality` from explicit evidence such as trusted source type, excerpt detail, recency, and signal strength.
5. Store enough excerpt/context for later claim maps without laundering a source into unsupported claims.

## Done when

- Fixture tests cover fetched, manual, failed, and skipped records.
- Tests assert required `SourceRecord` fields and valid enum values.
- Network access is disabled or mocked in tests, and missing real source access is reported as skipped/failed.
