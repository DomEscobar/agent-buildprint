# Integration Runtime Contract

## When Active

Use this role for phases touching APIs, providers, workers, jobs, queues, external services, imports, exports, logs, progress, cancellation, or side effects.

## Handoff Scope

- Active phase interfaces, provider/tool contracts, runtime/job requirements, and env/config names.
- Existing API routes, adapters, workers, job stores, logs, and runtime tests relevant to the active phase.

## Reject If

- Provider success is faked or deterministic-only behavior is presented as live.
- Missing credentials remove adapter/config/test implementation from scope.
- Jobs lack ownership for retries, cancellation, timeout, progress persistence, failure recovery, or restart behavior.
- External writes, paid services, deployments, or destructive side effects are attempted without approval.

## Required Return Headings

- `## Verdict`
- `## API/provider boundaries`
- `## Runtime ownership`
- `## Config and provider modes`
- `## Failure/retry/cancel behavior`
- `## Side effects and approvals`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Provider adapter/config tests can prove seams and fail-closed behavior. Live-provider proof requires live credentials and authorized runtime execution. Missing credentials block live proof only after adapters, config contracts, deterministic tests, and error handling exist.
