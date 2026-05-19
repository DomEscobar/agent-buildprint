# Async Job Model

## Required States

Jobs must support:

- `pending`: created, not started.
- `running`: active stage in progress.
- `success`: completed and result exists.
- `failure`: failed with `error_reason`.
- `canceled`: canceled by user/operator, no success artifact created afterward.
- `blocked`: cannot run because consent, key, policy, or validation gate is missing.

UI labels may use queued/completed, but stored state must map clearly to these states.

## Required Job Fields

- `job_id`.
- `created_at`, `updated_at`, `completed_at`.
- `status`.
- `current_stage`.
- `request_summary`.
- `logs`: ordered entries with timestamp, level, stage, message.
- `provider_requests`: ProviderRequestRecord[] or IDs.
- `output_manifest`.
- `result`.
- `error_reason`.
- `retry_of` and `attempt`.

## Stages

Recommended stages:

1. validate request and consent;
2. resolve actor ref;
3. generate/reuse voiceover;
4. generate/reuse talking head;
5. generate/reuse b-roll;
6. generate subtitles/captions;
7. compose MP4;
8. probe and validate MP4;
9. persist output manifest;
10. optionally create gallery metadata.

## Durability Rule

Production-readiness claims require durable job storage, durable logs, provider request IDs, and restart recovery tests.

Local proof mode may use JSON, SQLite, IndexedDB, or another local store if:

- the validation report names the choice;
- status/log/result survive an app/server restart in a test, or the limitation is explicitly recorded;
- the implementation does not call it production durability.

## Retry / Cancel

- Retry of a failed job must create a new attempt or update attempt count without duplicating owner media unexpectedly.
- Retry may reuse cached actor/voice/head/b-roll fixtures when safe and recorded.
- Cancel must prevent later success transition for that attempt.
- Failure and blocked states must be visible in UI with a reason.

## Polling

Status polling must return inspectable state throughout the job. Browser QA must observe running or completed status from rendered UI, not only service tests.
