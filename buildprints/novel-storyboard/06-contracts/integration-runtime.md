# Integration Runtime Contract

This role owns socket, agent, provider, media job, and async runtime boundaries for the active phase.

## When Active

Activate for phases touching sockets, agent runs, provider adapters, async media generation, polling/callbacks, runtime startup, health/readiness, or job state.

## Handoff Scope

The handoff must include the active phase file, relevant API/socket/provider/job modules, env/config names only, fake-provider contracts, runtime logs, and proof expectations. Do not ask this role to design unrelated UI.

## Requirements

- Socket connections are authenticated and scoped.
- Agent runs have a task loop, trace, stop condition and error path.
- XML/event parsing treats agent output as untrusted.
- Provider adapters distinguish fake-provider contract proof from live provider proof.
- Provider calls include retry/error mapping, blocked credential states and audit records.
- Missing credentials block live proof only after adapter/config/test/runtime wiring exists.

## Reject If

- Skeleton adapters are counted as product behavior.
- Fake provider outputs are promoted as live media.
- Missing stop, cancel, retry, timeout, or failure recovery exists for agent/media jobs.
- Unscoped socket updates can cross project/episode boundaries.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/integration-runtime.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Runtime boundary`
- `## Provider/socket/job contracts`
- `## Retry/cancel/failure recovery`
- `## Credential/live-proof state`
- `## Files/modules expected`
- `## Commands or artifacts`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Run fake-provider, socket, job lifecycle, retry/cancel/failure and config tests before any live-provider test. Missing credentials become non-upgrading blockers, not removed scope.
