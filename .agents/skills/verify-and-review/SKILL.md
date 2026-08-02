---
name: verify-and-review
description: Use at the end of every Buildprint loop and before handover to run proof, prepare independent contract review, set claim ceilings, and block fake success.
phase: loop-completion
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

Use before claiming a loop, checkpoint, or Buildprint is complete. Proof prepares an independent contract review — it does not replace it.

## Workflow

1. Re-read `00-goal.md` acceptance criteria and the active loop contract.
2. Run the strongest available proof command, browser/API/runtime check, screenshot inspection, persistence readback, or manual check.
3. For UI-bearing work, capture screenshots when surfaces changed and compare against `02-identity.md` / generated identity.
4. Inspect the diff and list unrelated changes, dead controls, placeholder paths, mocked/sample-only proof, and claim gaps.
5. Patch one concrete weakness if found, then rerun the relevant proof.
6. Hand off to independent `review.md` (fresh-context reviewer; builder chat excluded). Self-review is invalid.
7. Record what was verified, what was not proven, `loop_core_passed` vs `claim_qualified`, and what future agents may trust.
8. End with `VERIFY_REVIEW_DONE` only when the claim ceiling is honest.

## Hard Rules

- No fake success: edits alone do not prove behavior.
- If proof cannot run, state the exact blocker and reduce the claim.
- Do not invent evidence ledgers or claim-gates JSON products as the verification surface.
- Do not approve unrelated churn unless it is required for the task.
