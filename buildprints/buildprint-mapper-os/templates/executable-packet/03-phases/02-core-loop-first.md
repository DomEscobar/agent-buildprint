# Phase 02 — Core loop first

## Product intention

Build one complete normal-user loop that proves the product promise end to end before expanding secondary features.

## Build

- First-run path with a clear input or starting action.
- Primary action that produces a meaningful result.
- Data contracts for the loop: inputs, domain transformation, persisted state, outputs, and errors.
- Result surface that is readable, actionable, and tied to the user's input.
- Reload/readback for the loop's state when continuity matters.
- Honest local-only or credential-blocked behavior for unavailable live providers.

## Quality bar

In a 60-second demo, changed user input should visibly change the result, the result should be useful in plain language, and the next action should be obvious.

## Do not ship

Canned output, raw JSON as the experience, fake provider success, a form that does not change behavior, or a result that explains the system instead of helping the user.
