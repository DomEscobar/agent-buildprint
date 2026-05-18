# Agent Buildprint Formats

Agent Buildprint is format-flexible. A Buildprint is not “a YAML file”; it is a package of instructions, contracts, policies, examples, and checks that help coding agents build reliably.

`BUILDPRINT.md` is always the canonical start file. Other files may add detail, but they must not compete with it as the entry point or authority spine.

## Package tiers

### Level 1 — Simple Buildprint

For small features or integrations.

```txt
BUILDPRINT.md          # canonical start + compact build contract
TEST_MATRIX.md         # optional but recommended risk → check mapping
```

### Level 2 — Strong Buildprint

Recommended default for serious Buildprints.

```txt
BUILDPRINT.md          # canonical start + authority spine
SPEC.md                # user-visible behavior and must/must-not rules
PLAN.md                # phase index, if the build needs phases
CONTRACTS.md           # interfaces/data contracts
TEST_MATRIX.md         # risk → test mapping
VALIDATION_TEMPLATE.md # completion report shape
```

### Level 3 — Agent-grade Buildprint

For multi-module apps, agent systems, or high-risk integrations.

```txt
BUILDPRINT.md          # canonical start, read order, binding slice, gates, non-claims
SPEC.md                # behavior truth
PLAN.md                # phase index
plans/
  00-alignment.md
  01-runtime.md
  02-feature.md
CONTRACTS.md           # function/data/interface names and shapes
TEST_MATRIX.md         # risk → checks
VALIDATION_TEMPLATE.md # honest completion report
DEFAULT_PRESET.md      # optional defaults, never forced identity
policies/
prompts/
checks/
examples/
diagrams/
schemas/
```

### Level 4 — Machine-checkable / Pro Buildprint

For flagship Buildprints, marketplace-verified packages, or any package where context rot, security, claims, or phase alignment matter.

```txt
BUILDPRINT.md          # canonical human-readable control spine
buildprint.json        # machine-readable mirror of the authority spine
phases.yaml            # optional structured phase gates
acceptance.yaml        # optional structured acceptance gates
claims.yaml            # optional safe/unsafe claim contract
checks/                # executable consistency/acceptance checks
proof/                 # optional tracked proof after validation
```

Level 4 does not replace Markdown. It adds a machine-checkable control plane so agents and registry tooling can validate the Markdown package.

## `BUILDPRINT.md` authority spine

Every serious `BUILDPRINT.md` should start with a compact operating contract before deep explanation.

Recommended top sections:

```md
# Buildprint

## Agent operating contract

- This file is the canonical start file.
- If another file conflicts with this file, this file wins.
- Build the binding implementation slice before optional extensions.
- Do not claim excluded capabilities.

## Binding implementation slice

What must be built first, in 5-12 concrete bullets.

## Non-goals / unsafe claims

What must not be built or claimed unless a later approved phase adds it.

## Required read order

Which files to read, and why.

## Phase gates

What each phase must produce and pass before moving on.

## Acceptance gates

Commands, browser/runtime checks, artifact checks, and evidence required for done.
```

This keeps `BUILDPRINT.md` as the start file while making it agent-native: priority, authority, phase state, and done criteria are visible before token attention drifts.

## Optional machine-readable control plane

Markdown is the human/source narrative. Structured files are optional mirrors for agents and tooling.

Use them when a package has many files, high-risk behavior, public claims, security boundaries, or multi-phase implementation.

### `buildprint.json`

Purpose: package identity, authority hierarchy, file roles, required files, and registry metadata.

Minimal shape:

```json
{
  "schema": "agent-buildprint/v1",
  "canonicalStart": "BUILDPRINT.md",
  "authority": ["BUILDPRINT.md", "SPEC.md", "CONTRACTS.md", "TEST_MATRIX.md"],
  "files": [
    { "path": "BUILDPRINT.md", "role": "canonical-control", "required": true },
    { "path": "SPEC.md", "role": "behavior-contract", "required": false }
  ]
}
```

### `phases.yaml`

Purpose: prevent phase drift and “continue coding” behavior without proof.

```yaml
phases:
  - id: implementation-slice-1
    inputs:
      - BUILDPRINT.md
      - SPEC.md
      - CONTRACTS.md
    must_produce:
      - working runtime for the binding slice
      - tests for included scope
    must_pass:
      - npm test
    forbidden:
      - placeholder routes counted as implemented
      - live provider calls in default CI
```

### `acceptance.yaml`

Purpose: make done criteria checkable by agents and CI.

```yaml
acceptance:
  commands:
    - npm test
    - npm run build
  artifacts:
    - BUILD_REPORT.md
    - RUNTIME_LIVE_TEST_REPORT.md
  runtime:
    browser_required: true
    screenshots_required: true
```

### `claims.yaml`

Purpose: keep public claims, README copy, and implementation proof aligned.

```yaml
safe_claims:
  - deterministic mock-provider workflow proof
unsafe_claims:
  - full provider parity
  - drop-in replacement
required_wording:
  - "clean-room portable implementation"
forbidden_wording:
  - "clone"
  - "same as original"
```

## File responsibilities

```txt
README.md              humans decide if they want it
BUILDPRINT.md          canonical coding-agent control spine and architecture contract
SPEC.md                user-visible behavior and must/must-not rules
PLAN.md                phase index
plans/*.md             tiny feature-by-feature task rails
CONTRACTS.md           function/data/interface names and shapes
DEFAULT_PRESET.md      configurable defaults only
TEST_MATRIX.md         alignment risks mapped to tests
VALIDATION_TEMPLATE.md honest completion report
buildprint.json        optional machine-readable authority/file-role mirror
phases.yaml            optional structured phase gates
acceptance.yaml        optional structured done gates
claims.yaml            optional safe/unsafe claim contract
checks/                optional executable package/proof checks
```

## Minimal registry requirements

A minimal Buildprint can still be just `BUILDPRINT.md`, but registry quality badges should reflect package strength:

- `basic`: has `BUILDPRINT.md`
- `tested`: has `TEST_MATRIX.md` or tests/checks
- `strong`: has `SPEC.md`, `PLAN.md`, `CONTRACTS.md`
- `agent-grade`: has `plans/*.md` and `VALIDATION_TEMPLATE.md`
- `pro`: has machine-readable gates (`buildprint.json`, `phases.yaml`, `acceptance.yaml`, or `claims.yaml`) plus executable checks/proof

## Design principles

- Markdown first; YAML/JSON optional but valuable for high-stakes packages.
- `BUILDPRINT.md` is the canonical start file; do not add competing start files.
- Do not make creators write complex schemas unless useful.
- Keep each file short and single-purpose.
- Put binding scope, non-claims, read order, and gates near the top of `BUILDPRINT.md`.
- Strong Buildprints repeat the same target shape across architecture, spec, plan, contracts, and tests.
- Existing-project mappings must label facts as observed, inferred, or unknown.
- Agent-grade packages should be validated against context rot: stale references, contradictory status, missing required files, and unsafe claims.

## Product promise

```txt
Any good software construction plan
→ packaged as a Buildprint
→ readable by humans
→ aligned for coding agents
→ optionally checkable by tools
```

## Implementation state folder

Agent-grade Buildprints should be started with:

```bash
agb start <buildprint-package-json-url-or-file>
```

This creates an implementation-local `.buildprint/` folder:

```txt
.buildprint/
  source.json
  state.json
  progress.md
  decisions.md
  blockers.md
  next-agent.md
  snapshots/
```

Snapshot files must be downloaded/copied exactly from the package manifest. Agents must not rewrite, summarize, or regenerate snapshot content manually.
