# Phase 04 — Dual-Platform Simulation Run

## Product intention

Run a short, inspectable dual-platform simulation and show the evolving social activity as a real trace. The user should be able to start, observe, stop/close, and understand what happened.

## Build

- Implement run start with safe round defaults, optional max-round override, graph-memory update setting if supported, and platform selection if included.
- Integrate the OASIS/CAMEL runtime or an explicitly bounded compatible runtime adapter.
- Persist run state, process id or job id, platform statuses, current rounds, simulated time, action counts, recent actions, stdout/stderr or structured logs, and completion/error.
- Build the run surface with platform status cards, timeline feed, action details, posts/comments, agent stats, and stop/close controls.
- Implement stop and close-environment controls with visible state transitions and timeout/fallback behavior.

## Quality bar

- Starting a run changes state and creates inspectable traces, or clearly blocks on missing runtime/provider credentials.
- Timeline/action surfaces change as run data changes.
- Stop/close controls either terminate the run or explain why they failed.
- Reloading the simulation run page can recover persisted run state.

## Do not ship

- A simulated timeline made from static canned content.
- A completed status with no run trace.
- Stop buttons that do not affect the underlying process/job.
- Unbounded default runs that surprise the operator with cost or runtime.
