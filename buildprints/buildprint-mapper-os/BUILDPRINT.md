# Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent Buildprint. It is not a scanner command and not a source-code clone plan.

The mapper agent reads source, promotes only evidence-backed claims, preserves the requested product scope, maps the full relevant capability surface, classifies readiness honestly, distills source behavior into contracts, emits a team-pack quality router for the downstream harness, and records qualification blockers honestly.

## Authority

- `mapper-os-requirement.md` is the root product requirement.
- This package is the operating Buildprint for agents performing mapping.
- Source files are evidence. Product capabilities are the rebuild contract.
- Static scanning may guide discovery but must never become product authority.
- A qualified Buildprint is an implementation input, not proof that a future implementation already works.

## Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `EXECUTION_PROTOCOL.md`
6. `IMPLEMENTATION_PLAN.md`
7. `VERIFICATION.md`
8. `questions.md`
9. `policies/*.md`
10. `prompts/*.md` and `templates/`

For generated selected packages, do not make the implementing agent read all Markdown files or all capability packs before it knows the next action. `CURRENT_STATE.md` is the human-readable router, `CONTEXT_PACKET.json` is the machine-readable active-context router, `TEAM_STACK.md` is the quality gate router, and `CAPABILITY_INDEX.md` is consulted only after proof to choose the next dependency-ready pack.

## Required Flow

1. Source acquisition: use a local folder or clone/check out a Git URL into a temporary read-only source checkout.
2. Safe census: collect file tree, manifests, dependency hints, framework hints, env var names, scripts, deploy hints, and test hints as `CENSUS_HINT` only.
3. Capability discovery: read source surfaces to discover product capabilities and promote claims to `OBSERVED`, `INFERRED`, `QUESTION`, `BLOCKED`, or `OUT_OF_SCOPE`.
4. Scope selection: keep default output discovery-only; create `selected-buildprint/` only after candidate, scope, or full-suite selection; never shrink selected scope without explicit user decision.
5. Source distillation: convert source facts into source-independent behavior contracts and verification oracles.
6. Execution planning: give the downstream coding agent capability readiness, first slices, verification gates, implementation-team signals, repair loops, review rules, and handoff requirements.
7. Qualification: keep output unqualified until required evidence, runtime/test proof, no-fake checks, hardening artifacts, and reversal evidence exist.

## Output Modes

### Lean Discovery

Default mode. It may produce discovery, evidence, and quality files only. It must not emit implementation scaffold or selected package files.

### Selected Extraction

Creates `selected-buildprint/` with a small or medium package for the chosen capability set. It remains `SELECTED_UNQUALIFIED` until qualification proof exists.

### Full-Suite Extraction

Creates a hierarchical `selected-buildprint/` for the complete feature suite only when explicitly requested. Full-suite is user intent, not proof of completeness.

### Qualified Buildprint

Promoted only when the selected package is source-independent, capability-complete, verified, free of critical no-fake findings, and safe to hand to another coding agent without source access.

## Selected Package Shape

Small selected scopes may be flat:

```text
BUILDPRINT.md
CAPABILITIES.md
CONTRACTS.md
TEAM_STACK.md
VERIFICATION.md
EXECUTION_PROTOCOL.md
PRE_IMPLEMENTATION_QUESTIONS.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
UX_CONTRACT.md  # required for user-facing UI/browser/dashboard/graph/report/editor/operator console
DESIGN_QUALITY_BAR.md  # required for user-facing UI/browser/dashboard/graph/report/editor/operator console
manifest.json
```

Medium, large, and full-suite scopes must be hierarchical:

```text
BUILDPRINT.md
CAPABILITY_INDEX.md
CONTEXT_PACKET.json
CONTRACTS.md
TEAM_STACK.md
VERIFICATION.md
EXECUTION_PROTOCOL.md
PRE_IMPLEMENTATION_QUESTIONS.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
UX_CONTRACT.md  # required for user-facing UI/browser/dashboard/graph/report/editor/operator console
DESIGN_QUALITY_BAR.md  # required for user-facing UI/browser/dashboard/graph/report/editor/operator console
manifest.json
capabilities/<capability-id>/
  CAPABILITY.md
  VERIFICATION.md
  IMPLEMENTATION.md
  CONTRACTS.md
```

This shape is mandatory. Full-suite output without `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, and `TEAM_STACK.md`, UI-bearing output without `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md`, or any included capability pack without sibling `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`, is invalid.

`manifest.json` must match actual package files, include `teamStack.teams` for selected outputs, and must not list typo aliases such as `VERFICATION.md`. A selected package must use one canonical handoff artifact; do not put both `HANDOFF.md` and `HANDOVER.md` in the spine. `CAPABILITY_INDEX.md` must include a `Required teams` column so each capability routes to the relevant team-pack gates.

`TEAM_STACK.md` is mandatory for selected output. It infers internal team packs from product shape; it must not ask the user to choose lazy/simple/quick quality. UI-bearing output selects `ux-ui-craft`, broad output selects `product-architect`, and every selected output selects `test-and-verification`.

## Non-Negotiables

- Do not copy secrets, private keys, tokens, cookies, production data, or secret values.
- Do not mutate the source project during mapping.
- Do not infer absence from missing scanner hints.
- Do not include placeholders, mocks, no-op controls, skeleton adapters, or in-memory substitutes in claimed production scope.
- Do not preserve source internals unless they are externally observable or qualification-relevant.
- Do not use `validated`, `production-ready`, `complete`, or `end-to-end` unless label is `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked.

## Handoff Contract

Every selected package must tell the next coding agent:

- what capability to implement next;
- what behavior is stable;
- what implementation choices are free;
- which pre-implementation questions must be asked or safely defaulted before coding;
- which team-pack gates must run before and during coding;
- what first slice to build;
- what verification gate to run immediately;
- what evidence is missing;
- when to stop, replan, or escalate.
