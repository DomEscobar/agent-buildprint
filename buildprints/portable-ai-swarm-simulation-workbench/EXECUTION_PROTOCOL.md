# EXECUTION_PROTOCOL

## Start Rule

Read `BUILDPRINT.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `TEAM_STACK.md`, and `CONTEXT_PACKET.json`. Then load only the active capability pack listed in `CURRENT_STATE.md` / `CONTEXT_PACKET.json`.

Execution mode defaults to `continuous-full-suite`: start with the active capability, prove it, advance `CURRENT_STATE.md` and `CONTEXT_PACKET.json`, then consult `CAPABILITY_INDEX.md` to choose the next dependency-ready capability. Do not read unrelated capability packs upfront.

## Team Gates Before Coding

- Confirm topology and first-slice boundaries with `product-architect`.
- Confirm UI screens/states with `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md`.
- Confirm provider/runtime boundaries and fallback behavior.
- Confirm persistence lifecycle and destructive safety.
- Define proof command, negative test, and artifact path before writing code.

## Implementation Loop

1. Implement one capability milestone.
2. Run the capability proof command.
3. Record evidence in the capability `VERIFICATION.md`.
4. Update root `VERIFICATION.md` and `CURRENT_STATE.md`.
5. If `CURRENT_STATE.md` says `continuous-full-suite`, consult `CAPABILITY_INDEX.md`, advance `CURRENT_STATE.md` and `CONTEXT_PACKET.json` to the next dependency-ready capability pack, and continue in the same session.
6. Stop only on fake completion, missing proof, provider uncertainty, secret exposure, destructive safety gaps, user interruption, or context/tooling limit. If execution mode is `active-capability-handoff`, stop after updating the next pack pointer.

## No-Fake Rule

Static screens, fake success states, no-op buttons, placeholder adapters, mock-only providers, or in-memory state cannot be counted as completed product behavior. They may exist only as explicit test doubles with a blocker attached.
