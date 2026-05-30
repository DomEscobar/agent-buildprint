# Phase Flow

## Snapshot Integrity

Treat this selected-buildprint as the implementation contract. Do not edit packaged evidence seed files to fake progress. Runtime proof rows belong in .buildprint/evidence/evidence-ledger.jsonl.

## Phase Identity

Read 03-phases/phase-index.yaml to find active_phase. Open only that phase file plus BUILDPRINT.md, blueprint.yaml, 01-questions.md, 02-project-setup.md, current repo AGENTS.md, and .buildprint/next-agent.md.

## Phase Entry Protocol

1. Confirm the foundation scaffold exists.
2. Create .buildprint/phases/<phase_id>/plan.md before code edits.
3. Implement the phase through its How to implement this phase section.
4. Create .buildprint/phases/<phase_id>/proof.md with commands, screenshots, logs, changed files, failures, and residual blockers.
5. Append runtime evidence rows only after plan.md and proof.md exist.

## Required Phase-Run Artifacts

- plan.md: phase scope, interfaces touched, state touched, tests to run, provider assumptions, rollback plan.
- proof.md: exact commands, browser URLs, screenshots, trace files, API responses, logs, evidence rows, and blocker labels.
- screenshots: desktop and mobile for every UI-bearing phase.
- traces/logs: worker/runtime/provider phases must preserve enough logs to replay failure analysis.

## Evidence Sequencing

Runtime evidence cannot be appended until plan.md and proof.md exist. A passing row must include phase_id, proof_type, provider_mode, status, commands, and changed_files.

## Continuation Rules

- If proof passes, update phase-index.yaml to the next phase and update .buildprint/next-agent.md.
- If proof fails, repair within the same phase.
- If provider credentials, browser runtime, or destructive-action safety is missing, record a blocker and do not substitute mocks for product behavior.

## Stop Conditions

Stop and record a blocker when a phase requires live provider credentials, public deployment security, destructive data operations, or runtime process control that cannot be safely proven in the current environment.
