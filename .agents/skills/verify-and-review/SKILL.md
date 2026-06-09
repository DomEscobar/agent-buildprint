---
name: verify-and-review
description: Use at the end of every Buildprint phase and before handover to run proof, inspect the diff, set claim ceilings, and block fake success.
phase: phase-completion
triggers:
  - verify
  - review
  - handover
  - done
skips:
  - early exploration before edits
  - brainstorming without implementation
completion_signal: VERIFY_REVIEW_DONE
---

# Verify And Review

Use before claiming a phase, checkpoint, or Buildprint is complete.

## Workflow

1. Re-read the active acceptance criteria and setup receipt.
2. Run the strongest available proof command, browser/API/runtime check, screenshot inspection, persistence readback, or manual check.
3. Inspect the diff and list unrelated changes, dead controls, placeholder paths, mocked/sample-only proof, and claim gaps.
4. Compare proof against the predicted failure modes from phase-flow.
5. Patch one concrete weakness if found, then rerun the relevant proof.
6. Record what was verified, what was not proven, and what future agents may trust.
7. End with `VERIFY_REVIEW_DONE` only when the claim ceiling is honest.

## Hard Rules

- No fake success: edits alone do not prove behavior.
- If proof cannot run, state the exact blocker and reduce the claim.
- Do not approve unrelated churn unless it is required for the task.
