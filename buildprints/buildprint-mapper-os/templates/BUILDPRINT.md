# BUILDPRINT: <selected-scope-name>

Qualification label: `SELECTED_UNQUALIFIED`

This Buildprint is a source-independent implementation contract for the selected scope. It does not claim whole-repo completeness or source-code parity.

## Read Order

1. `BUILDPRINT.md`
2. `CAPABILITY_INDEX.md`
3. `CURRENT_STATE.md`
4. `TEAM_STACK.md`
5. `EXECUTION_PROTOCOL.md`
6. Only the active capability pack named by `CURRENT_STATE.md`

Do not read every Markdown file before coding. For medium, large, and full-suite packages, `CAPABILITY_INDEX.md` is the traffic controller, `CURRENT_STATE.md` is the active pointer, and `TEAM_STACK.md` is the quality gate router. Load `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md` only when `TEAM_STACK.md` selects `ux-ui-craft`. Load unrelated capability packs only after `CURRENT_STATE.md` advances to them.

## Scope

- Source input:
- Source checkout:
- Source commit:
- Generated at:
- Output mode:
- Included capabilities:
- Excluded capabilities:
- Blocked capabilities:

## Implementation Freedom

- Stable:
- Free:

## Qualification Boundary

Do not use validated, production-ready, complete, or end-to-end language unless label is `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked.

## Package Shape Rule

Medium, large, and full-suite selected outputs are invalid unless they include `CAPABILITY_INDEX.md`, `TEAM_STACK.md`, and every included capability pack contains sibling `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`. UI-bearing selected outputs are invalid without `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md`.
