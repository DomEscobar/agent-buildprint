# Implementation: Script Agent Workspace

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Authenticated users chat with a script-planning agent that uses project context, chapter text/events, memory, and sub-agents for story skeleton, adaptation strategy, script writing, and supervision.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Disconnect unauthenticated socket; abort mid-stream leaves no fake success.
2. Implement topology: Socket namespace, streaming response model, agent orchestration, workspace get/set events, memory service, script API persistence.
3. Add runtime/browser/provider/persistence proof hooks: Socket integration test with sandbox text model and stop/error branches
4. Update root and capability verification ledgers with artifact paths.

## Repair Loop

- Failed check: capture command, API/browser path, and observed failure.
- Structured feedback: map failure to UI/API/domain/persistence/provider layer.
- Focused fix: repair only the failing layer and adjacent contract.
- Rerun: repeat the exact proof command plus relevant negative test.
- Pass or blocker: either attach artifact or downgrade with blocker.

## Fresh Review

Required when touching auth, uploads, provider code, destructive operations, persistence migration, socket streaming, Electron/Docker runtime, or user data.

## Stop Conditions

- Needs real socket stream proof, model sandbox, and browser workspace evidence.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

