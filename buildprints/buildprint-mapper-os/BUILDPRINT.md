# Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent Buildprint. It is not a scanner command and not a source-code clone plan.

The mapper agent reads source, promotes only evidence-backed claims, selects the smallest fully implementable scope unless full-suite is explicitly requested, distills source behavior into contracts, creates downstream-agent execution plans, and records qualification blockers honestly.

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

## Required Flow

1. Source acquisition: use a local folder or clone/check out a Git URL into a temporary read-only source checkout.
2. Safe census: collect file tree, manifests, dependency hints, framework hints, env var names, scripts, deploy hints, and test hints as `CENSUS_HINT` only.
3. Capability discovery: read source surfaces to discover product capabilities and promote claims to `OBSERVED`, `INFERRED`, `QUESTION`, `BLOCKED`, or `OUT_OF_SCOPE`.
4. Scope selection: keep default output discovery-only; create `selected-buildprint/` only after candidate, scope, or full-suite selection.
5. Source distillation: convert source facts into source-independent behavior contracts and verification oracles.
6. Execution planning: give the downstream coding agent first slices, verification gates, repair loops, review rules, and handoff requirements.
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
VERIFICATION.md
EXECUTION_PROTOCOL.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
manifest.json
```

Medium, large, and full-suite scopes must be hierarchical:

```text
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
  CONTRACTS.md
```

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
- what first slice to build;
- what verification gate to run immediately;
- what evidence is missing;
- when to stop, replan, or escalate.
