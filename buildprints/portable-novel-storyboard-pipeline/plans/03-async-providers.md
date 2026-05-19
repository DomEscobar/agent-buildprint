# Phase 03 - Async Jobs And Providers

## Goal

Implement job lifecycle and deterministic mock media providers without live network dependency.

## Keep In Context

- `ASYNC_JOB_MODEL.md`
- `PROVIDER_ADAPTERS.md`
- `VISUAL_FIXTURE_PACK.md`
- `TEST_MATRIX.md`

## Steps

1. Implement job states: queued, running, success, failure, cancelled, retrying.
2. Add idempotency by kind, owner, and input hash.
3. Implement cancellation and retry paths for events and media tasks.
4. Implement mock image/video providers returning deterministic raw refs plus local preview refs.
5. Enforce no-network default in tests by stubbing `fetch`, `XMLHttpRequest`, and provider SDK entry points.

## Do Not

- make live calls unless explicitly env-gated outside default CI;
- duplicate owner media records on retry;
- show raw mock refs as primary product UI;
- persist credentials in task logs or manifests.

## Exit Criteria

- cancellation, retry, provider failure normalization, idempotency, and no-network tests pass;
- media records map to local fixture previews.

## Validation Evidence

- unit/integration test summary;
- visual fixture inventory in validation report.

