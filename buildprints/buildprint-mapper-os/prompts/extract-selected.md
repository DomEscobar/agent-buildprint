# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Preconditions

- Discovery has run.
- Scope is selected or full-suite is explicitly requested.
- Source evidence exists for included capabilities or blockers are recorded.
- Sensitive surfaces have required hardening artifact requirements.

## Required Selected Output

For medium, large, or full-suite scope:

```text
selected-buildprint/
  BUILDPRINT.md
  CAPABILITY_INDEX.md
  CONTRACTS.md
  VERIFICATION.md
  EXECUTION_PROTOCOL.md
  IMPLEMENTATION_PLAN.md
  CURRENT_STATE.md
  manifest.json
  capabilities/<capability-id>/
    CAPABILITY.md
    VERIFICATION.md
    IMPLEMENTATION.md
    CONTRACTS.md  # only when local contracts are needed
```

For genuinely small scopes, a flat package may use `CAPABILITIES.md` instead of capability packs.

## Extraction Rules

- Convert source facts into source-independent behavior contracts.
- Do not preserve source internals unless externally observable or qualification-relevant.
- Classify every capability as `INCLUDED`, `OUT_OF_SCOPE`, `BLOCKED`, or `TEST_ONLY_MOCK`.
- Include stable-vs-free boundaries for every capability.
- Include first implementation slice and first verification gate for every included capability.
- Keep unresolved questions out of files that claim implementation readiness.
- Mark selected output `SELECTED_UNQUALIFIED` until proof exists.

## Forbidden Defaults

Do not create default `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, `IMPLEMENTATION_COMPLETENESS.md`, `PHASE_PLAN.md`, or `LOOP_GATES.md`.
