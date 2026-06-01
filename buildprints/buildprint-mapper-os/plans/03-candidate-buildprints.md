# Phase 03 - Candidate Buildprints

## Goal

Propose selected targets and first implementation slices from promoted capability evidence without losing the requested capability surface.

## Steps

- Group capabilities by product behavior and dependencies.
- Preserve the requested capability surface; recommend first implementation slices, but never shrink scope merely to make output look complete.
- Mark incomplete or risky capabilities `INCLUDED_NEEDS_VERIFICATION`, `INCLUDED_BLOCKED`, or `INCLUDED_RISKY_REQUIRES_HARDENING`; use `OUT_OF_SCOPE_BY_USER_ONLY` only for explicit user exclusions or target boundaries.
- For full-suite intent, preserve every blocker and require hierarchical output.

## Exit Criteria

- Candidate list has readiness classifications for ready, needs-verification, blocked, risky-hardening, user-excluded, and test-only capabilities.
- Each candidate has verification strategy and no-fake boundary.
- User decision is needed only for ambiguous target boundaries, explicit exclusions, or risky inclusion/blocking policy.
