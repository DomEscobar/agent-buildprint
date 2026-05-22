# BUILDPRINT: <selected-scope-name>

Qualification label: `SELECTED_UNQUALIFIED`

This Buildprint is a source-independent implementation contract for the selected scope. It does not claim whole-repo completeness or source-code parity.

## Read Order

1. `BUILDPRINT.md`
2. `CURRENT_STATE.md`
3. `EXECUTION_PROTOCOL.md`
4. `PRE_IMPLEMENTATION_QUESTIONS.md`
5. `TEAM_STACK.md`
6. `CONTEXT_PACKET.json`
7. Only the active capability pack named by `CURRENT_STATE.md` / `CONTEXT_PACKET.json`

Do not read every Markdown file before coding. For medium, large, and full-suite packages, `CURRENT_STATE.md` is the human-readable router, `CONTEXT_PACKET.json` is the machine-readable active-context router, `TEAM_STACK.md` is the quality gate router, and `CAPABILITY_INDEX.md` is consulted only after proof to choose the next dependency-ready pack. Load `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md` only when the active context or team gate requires them. Load unrelated capability packs only after `CURRENT_STATE.md` advances to them.

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

Medium, large, and full-suite selected outputs are invalid unless they include `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, and every included capability pack contains sibling `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`. UI-bearing selected outputs are invalid without `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md`.
