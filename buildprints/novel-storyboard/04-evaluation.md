# Evaluation

## Qualification Target

The current label is PROOF_REQUIRED. Upgrade to QUALIFIED_SOURCE_INDEPENDENT only when all selected behavior can be implemented and verified from this packet without reopening the MiroFish source checkout.

## Required Evidence Rows

Runtime rows must be appended to .buildprint/evidence/evidence-ledger.jsonl, not to the packaged seed. Each row must include phase_id, status, proof_type, provider_mode, commands, changed_files, and what claim it upgrades.

Required proof types:

- browser_runtime_trace
- repeatable_browser_e2e
- provider_adapter_config_test_required
- live_provider_proof_blocker_only or live_provider_proof_passed
- persistence_roundtrip
- worker_retry_cancel_recovery
- security_boundary_review
- clean_room_implementation_trace

## No-Fake Gates

Fail qualification if any selected behavior is represented only by:

- static routes without real handlers;
- mocked provider output counted as live provider behavior;
- in-memory-only job/persistence state counted as durable;
- no-op stop/close/delete controls;
- fake report or fake agent chat responses;
- static graph screenshots counted as canvas/browser proof;
- timeline fixtures counted as simulation runtime proof.

## Browser Proof Set

Capture desktop and mobile screenshots or traces for:

- Home upload/prompt state.
- Workbench split mode with graph canvas.
- Workbench graph-only and workbench-only modes.
- Simulation setup progress/completed/blocked states.
- Simulation run with dual-platform status/timeline or truthful blocker.
- Report page with timeline logs and generated/blocked sections.
- Interaction console with report chat, agent selection, and survey/interview flow or truthful blocker.
- History restore flow.

## Promotion Rule

PROOF_REQUIRED can be upgraded only after all phases have plan.md, proof.md, passing evidence rows, no unresolved critical no-fake findings, and no unresolved high/critical security risks.
