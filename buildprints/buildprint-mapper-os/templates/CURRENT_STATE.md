# CURRENT_STATE

This file is the authoritative human-readable router for implementation. If local resume state exists, merge it here before coding; if a snapshot conflicts with local `.buildprint/state.json`, the local state wins for active capability and continuation.

- Requested scope:
- Selected target / first slice:
- Execution mode: continuous-full-suite / active-capability-handoff
- Continue after proof:
- Stop only on:
- Active capability:
- Completed capability packs:
- Blocked capability packs:
- Next pack:
- Qualification label:

## Read Next

- Active pack:
- Active context packet: `CONTEXT_PACKET.json`
- Open now:
  - `EXECUTION_PROTOCOL.md`
  - `PRE_IMPLEMENTATION_QUESTIONS.md`
  - `TEAM_STACK.md`
  - `CONTEXT_PACKET.json`
  - `capabilities/<active-capability>/IMPLEMENTATION.md`
  - `capabilities/<active-capability>/CAPABILITY.md`
  - `capabilities/<active-capability>/VERIFICATION.md`
- Open only if active context/team gate requires:
  - `UX_CONTRACT.md`
  - `DESIGN_QUALITY_BAR.md`
  - `PROVIDERS.md`
  - `DATA_LIFECYCLE.md`
  - `SECURITY.md`
- Do not open yet:
  - `CAPABILITY_INDEX.md` until proof passes and the next dependency-ready pack must be selected
  - unrelated capability packs until this file advances the active pack

## Scope Preservation

- Discovered/requested capability surface:
- Explicitly user-excluded capabilities (`OUT_OF_SCOPE_BY_USER_ONLY`):
- Included ready (`INCLUDED_READY`):
- Included needs proof (`INCLUDED_NEEDS_PROOF`):
- Included blocked (`INCLUDED_BLOCKED`):
- Included risky requiring hardening (`INCLUDED_RISKY_REQUIRES_HARDENING`):
- Test-only mocks (`TEST_ONLY_MOCK`):
- First implementation slice:
- Later implementation slices:

## Execution Mode

- Default for full-suite selected outputs: `continuous-full-suite`
- Router discipline: load only the active capability pack named by this file
- Continuous mode behavior: after proof passes, update verification ledgers, advance `Active capability`, and continue to the next pack in dependency order
- Handoff mode behavior: after proof passes, update verification ledgers, advance `Next pack`, and stop with a handoff
- Stop conditions: explicit blocker, missing proof, provider uncertainty, destructive safety issue, secret exposure, user interruption, or context/tooling limit

## Quality / Depth Preservation

- Team stack status:
- Required team packs:
- Target architecture topology:
- Actual architecture topology:
- Architecture topology gate status:
- Capability depth matrix status:
- `REAL_IMPLEMENTED` capabilities:
- `CONTRACT_SEAM_ONLY` capabilities:
- `BLOCKED_WITH_REASON` capabilities:
- `FAKE_OR_PLACEHOLDER_FAIL` capabilities:
- Browser/UI proof status:
- Provider/runtime proof status:
- Notes on any accepted topology exception:

## Pre-Implementation Alignment

- Quality mandate: max-quality for requested scope; no quality-tier choice offered
- Deployment posture:
- Selected scope confirmed:
- Sensitive capabilities policy:
- Provider/runtime proof:
- Persistence/infra default:
- Safe defaults applied:
- Remaining blockers:

## Team-Pack Signals

- User-facing UI:
- Uploads:
- External providers/webhooks:
- Long-running jobs/queues:
- Graph persistence:
- Simulation/runtime execution:
- Reports/exports:
- Auth/admin/destructive controls:
- Deployment surface:
- Required team packs:
- Team-pack gates blocked:

## Last Evidence Update

- Commands run:
- Evidence artifacts:
- Blockers:
- Skipped checks:

## Next Action

-
