# Phase 03 - Host Wiring

## Objective

Connect the evolutionary loop to the host's real agent runner, benchmark harness, persistence, and approval policy.

## How to implement this phase

Expose a host command, API route, or worker job that starts a run with explicit budget, mutation scope, evaluator, and model policy. Persist run state so interruption can resume or audit. Add rollback or branch isolation. Ensure side-effecting winners require the user-approved policy from `.buildprint/capability-plan.md`.

## Required output

- host entrypoint for evolution runs;
- persistence or file-backed archive;
- approval/rollback path;
- resume/checkpoint path;
- baseline comparison path.

## Proof before moving on

Start a run through the host entrypoint, stop or fail one candidate, resume or inspect the archive, and prove the baseline comparison survives readback.

## DO NOT

- Do not bypass the host's approval policy.
- Do not mutate production data.
- Do not use placeholders, functionless buttons, or mocked/sample data for host integration proof.

