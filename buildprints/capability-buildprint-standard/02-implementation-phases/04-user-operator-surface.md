# 04 User Operator Surface

## Objective

Expose the capability's visible, blocked, success, error, denied, setup, audit, or recovery states where the host project requires them.

## Implement

- setup or missing-config state
- success and failure states
- denied/unauthorized states when relevant
- account/admin/operator view when the capability changes user or business state
- logs, receipts, audit, or recovery cues for guarded/strict profiles

## Proof before moving on

- a user/operator does not need raw logs to understand the capability state
- visible controls work or are honestly blocked
- error copy names the missing requirement without leaking secrets
- responsive or accessibility checks are run when UI is modified

## DO NOT

- Do not ship invisible backend-only success for a user-facing capability.
- Do not add decorative UI with functionless controls.
- Do not expose raw provider JSON as the product surface.

