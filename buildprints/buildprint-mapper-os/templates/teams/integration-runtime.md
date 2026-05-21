# integration-runtime

Purpose: prevent mocked or unowned provider/runtime paths from being counted as complete.

## Required Output

- Provider/API/runtime boundary contract with config, side effects, retries, error behavior, and secret-name-only handling.
- Sandbox/live proof where available, or explicit qualification blocker.
- Test fake limited to tests, never production-path success claims.

## Blocks

- Fake provider success in production paths.
- External writes without confirmation, idempotency, or failure behavior.
- Long-running jobs without status, progress, logs, cancel, and failure semantics.
- Runtime behavior claimed without runtime proof or blocker.
