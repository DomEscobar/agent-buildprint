# Phase 03 - Host Wiring

## Objective

Connect the patch loop to the host's real coding agent runner, benchmark harness, snapshot/rollback system, and approval policy.

## Required inputs

- phase 02 patch-loop runner
- host agent CLI/API/worker entrypoint
- host test and benchmark scripts
- `.buildprint/evolution-runtime-safety-plan.md`

## How to implement this phase

- Expose a host command, API route, or worker job: `patch-loop`, `evolve`, or equivalent.
- Pass explicit task spec, budget, editable surfaces, and model policy per run.
- Integrate host coding agent as patch producer — do not merge eval control plane into agent runtime.
- Persist run state so interruption can resume or audit.
- Wire best-snapshot storage to host source control (branch, worktree, or tagged snapshot).
- Ensure winning patches require user-approved apply policy from capability plan.
- Optional: delegate benchmark execution to DeepEval/Inspect adapter behind host gates (no third-party types in archive).

## Required output

- host entrypoint for patch-loop runs;
- adapter from TaskSpec to host agent invocation;
- persistence or file-backed archive integrated with host paths;
- best-snapshot promotion and rollback path;
- resume/checkpoint path;
- evaluator checksum verification hook post-run.

## Proof before moving on

Start a run through the host entrypoint:

- stop or fail one iteration (unit-test rollback or regression block);
- inspect archive readback;
- prove evaluator checksum unchanged;
- prove baseline/best-snapshot comparison survives restart.

## DO NOT

- Do not bypass the host's approval policy for applying patches.
- Do not mutate production data or evaluator files.
- Do not use placeholders, functionless buttons, or mocked/sample data for host integration proof.
