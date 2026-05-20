# Buildprint Mapper OS

Use this Buildprint to map a source project into a source-independent Buildprint package.

Mapper OS is run by an agent. It reads source, records evidence, distills capability contracts, and produces either discovery output or a selected `selected-buildprint/` package.

## Start Here

Read:

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `EXECUTION_PROTOCOL.md`
6. `VERIFICATION.md`

## Default Behavior

- Discover first.
- Ask only blocking questions.
- Selected output must include a pre-implementation question gate so downstream agents ask or safely default the few decisions that change quality/security.
- Treat scanner output as hints only.
- Keep output discovery-only until scope is selected.
- Prefer smaller complete selected scope over broad partial scope.
- Produce capability packs for medium, large, and full-suite selected outputs.

## Selected Output

Selected output belongs under `selected-buildprint/`. Its spine is:

```text
BUILDPRINT.md
CAPABILITY_INDEX.md
CONTRACTS.md
VERIFICATION.md
EXECUTION_PROTOCOL.md
PRE_IMPLEMENTATION_QUESTIONS.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
manifest.json
capabilities/
```

## Qualification

Qualification is evidence-backed source-independent readiness. It is not perfection and not proof that a future implementation already works.
