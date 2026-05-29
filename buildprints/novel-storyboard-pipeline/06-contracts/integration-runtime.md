# Integration Runtime Contract

## When Active

Use this role when a phase touches AI providers, agent orchestration, task queues, Socket.IO/realtime behavior, media generation, polling, retries, or worker/runtime execution.

## Handoff Scope

- Define provider interfaces and runtime execution behavior.
- Require sandbox/live split, idempotency, retry/error mapping, and traceable task state.
- Keep fake-provider tests explicitly labeled as contract tests only.

## Reject If

- Provider credentials reach frontend state or logs.
- Retry creates duplicate paid/destructive generation calls.
- Missing credentials produce fake success.
- Long-running tasks have no durable state, stop condition, cancellation, or failure reason.
- Agent or worker traces are not inspectable.

## Required Return Headings

- Runtime Boundary
- Provider Contract
- Idempotency And Retry/Error Mapping
- Trace/Task State
- Sandbox/Live Proof Status
- Required Repairs

## Proof/Evidence Expectations

Provider proof must state whether it is sandbox, live, or fake-provider contract proof. Live qualification requires real provider response artifacts without secret leakage.
