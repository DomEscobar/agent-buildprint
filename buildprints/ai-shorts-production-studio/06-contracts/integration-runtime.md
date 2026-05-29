# Integration Runtime Contract

This role owns provider, API, worker, job, runtime, side-effect, progress, streaming, cancellation, retry, and failure semantics. It prevents "route exists" or "deterministic fallback works" from being treated as a production runtime path.

## When Active

Activate for phases touching APIs, providers, tools, workers, queues, jobs, streams, external services, imports, exports, logs, polling, cancellation, deployment/runtime config, generated artifacts, or side effects.

## Handoff Scope

The handoff must include:

- active phase file interfaces and runtime requirements;
- provider/tool/runtime notes from `02-project-setup.md`;
- relevant API routes, service modules, adapters, workers, env/config, tests, runtime artifacts, and logs;
- any external-write, paid-service, deployment, credential, or destructive-action constraints;
- current blocker rows that might affect live proof.

Do not let this role own product architecture generally. It owns runtime behavior and integration contracts for the active phase.

## Runtime Workflow

The return must identify:

- API/provider boundaries and request/response/error contracts;
- config/env names and provider modes: deterministic, sandbox, live;
- deterministic test double behavior and how it differs from live behavior;
- worker/job ownership, status, progress, logs, cancellation, timeout, retry, failure recovery, restart behavior, and idempotency;
- streaming/event behavior where applicable: chunk format, interruption, reconnect, finalization, and persisted transcript/status;
- side effects, external writes, generated outputs, and approval requirements;
- what proof can run locally and what remains live-proof blocked.

## Provider And Runtime Rules

- Missing credentials block live proof only; they do not remove adapter/config/test/runtime wiring from scope.
- A provider adapter must fail closed when config is missing, expose actionable blocked-provider state, and support deterministic local proof.
- Runtime paths must expose progress or status when work can take longer than a request/response interaction.
- Jobs must define ownership of create, observe, retry, cancel, timeout, failed, completed, and restart/recovery behavior.
- External writes, paid services, deployments, and irreversible side effects require explicit approval before they run.

## Reject If

- Provider success is faked or deterministic-only behavior is presented as live.
- Missing credentials remove adapter/config/test implementation from scope.
- Jobs lack status, progress, cancel, timeout, retry/failure, recovery, or restart behavior where runtime is owned.
- Streaming/chat/task flows lack persisted status/transcript/readback where the product needs recovery.
- External writes, paid services, deployments, or destructive side effects are attempted without approval.
- Runtime proof is claimed from static files, route existence, logs that do not exercise the path, or a UI button that never reaches the runtime boundary.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/integration-runtime.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## API/provider boundaries`
- `## Runtime ownership`
- `## Config and provider modes`
- `## Failure/retry/cancel behavior`
- `## Streaming or progress behavior`
- `## Side effects and approvals`
- `## Live-proof blockers`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Provider adapter/config tests can prove adapter boundaries and fail-closed configuration. Live provider behavior requires credentials and authorization.

Missing credentials block live proof only after adapter, config contract, deterministic test double, error handling, blocked-provider UI/API state, and runtime wiring exist.

Runtime proof must exercise the active path: request/action, runtime invocation, status/progress or response, failure behavior, and persisted/readback state where applicable.
