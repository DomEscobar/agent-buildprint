# test-and-verification

Purpose: prevent implementation claims that cannot be proven.

This is an original Mapper OS skill capsule. It turns every completion claim into command, artifact, negative case, and review evidence.

## Skill Capsule

Run this pass after every milestone and before final handoff.

### Evidence Ceiling Rule

Claims cannot exceed evidence:

- Static text proves copy exists, not workflow behavior.
- Import/build success proves syntax/module load, not product behavior.
- Mock/provider fake proves contract shape, not live provider behavior.
- Screenshot proves rendering state, not backend/persistence behavior.
- Passing unit tests prove scoped logic, not full user journey unless the journey is covered.

### Proof Ladder

| Claim Type | Minimum Proof |
|---|---|
| UI workflow | browser automation or screenshots for empty/loading/error/blocked/success states |
| Visual quality | screenshot set reviewed against the phase-local design quality bar |
| API behavior | route/API call with expected response and failure case |
| Persistence | write, restart/readback, update/delete/export where applicable |
| Provider/runtime | sandbox/live proof or explicit blocker; test fake only for tests |
| Security | denied-path negative tests plus secret redaction check |
| Architecture | topology proof plus first real vertical slice |

### Required Output

- Proof command and proof artifact for every included phase.
- Negative tests for risky, stateful, provider-backed, destructive, auth/admin, upload, export, UI workflow, and runtime/job behavior.
- Visual/browser proof for every UI-bearing selected output.
- Runtime evidence ledger updated after each milestone.
- No-fake scan result before promotion or final handoff.

## Blocks

- Import-only tests used as proof of behavior.
- No-fake scans omitted for UI, provider, runtime, and persistence claims.
- Screenshot-only proof used for persistence/provider/security claims.
- Missing blocker text for unproven phases.
- Completion claims while proof ledger rows remain open.
