# Integration Runtime Contract

## Role

Own socket, agent, provider and async job boundaries.

## Requirements

- Socket connections are authenticated and scoped.
- Agent runs have a task loop, trace, stop condition and error path.
- XML/event parsing treats agent output as untrusted.
- Provider adapters distinguish fake-provider contract proof from live provider proof.
- Provider calls include retry/error mapping, blocked credential states and audit records.

## Required Integration Vocabulary

Every provider-facing implementation must define callback or polling behavior, idempotency where retries can duplicate work, sandbox/live split and retry/error mapping.

## Must Reject

- Skeleton adapters.
- Fake provider outputs promoted as live media.
- Missing stop behavior for agent runs.
- Unscoped socket updates.

## Review Gate

Run fake-provider and socket contract tests before live-provider tests. Missing credentials become blockers, not removed scope.
