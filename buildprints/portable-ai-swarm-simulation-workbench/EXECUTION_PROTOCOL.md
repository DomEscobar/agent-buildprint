# EXECUTION_PROTOCOL

## Start Rule

Read `BUILDPRINT.md`, `CAPABILITY_INDEX.md`, `CURRENT_STATE.md`, and `TEAM_STACK.md`. Then load only the active capability pack listed in `CURRENT_STATE.md`.

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
5. Stop on fake completion, missing proof, provider uncertainty, secret exposure, or destructive safety gaps.

## No-Fake Rule

Static screens, fake success states, no-op buttons, placeholder adapters, mock-only providers, or in-memory state cannot be counted as completed product behavior. They may exist only as explicit test doubles with a blocker attached.
