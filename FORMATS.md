# Agent Buildprint Formats

Agent Buildprint is format-flexible. A Buildprint is not “a YAML file”; it is a package of instructions, contracts, policies, examples, and checks that help coding agents build reliably.

## Package tiers

### Level 1 — Simple Buildprint

For small features or integrations.

```txt
BUILDPRINT.md
TEST_MATRIX.md
```

### Level 2 — Strong Buildprint

Recommended default for serious Buildprints.

```txt
BUILDPRINT.md          # architecture truth
SPEC.md                # behavior truth
PLAN.md                # execution index
CONTRACTS.md           # interfaces/data contracts
TEST_MATRIX.md         # risk → test mapping
VALIDATION_TEMPLATE.md # completion report shape
```

### Level 3 — Agent-grade Buildprint

For multi-module apps, agent systems, or high-risk integrations.

```txt
BUILDPRINT.md
SPEC.md
PLAN.md
plans/
  00-alignment.md
  01-runtime.md
  02-feature.md
CONTRACTS.md
TEST_MATRIX.md
VALIDATION_TEMPLATE.md
DEFAULT_PRESET.md      # optional defaults, never forced identity
policies/
prompts/
checks/
examples/
diagrams/
schemas/
```

## File responsibilities

```txt
README.md              humans decide if they want it
BUILDPRINT.md          coding-agent architecture contract
SPEC.md                user-visible behavior and must/must-not rules
PLAN.md                phase index
plans/*.md             tiny feature-by-feature task rails
CONTRACTS.md           function/data/interface names and shapes
DEFAULT_PRESET.md      configurable defaults only
TEST_MATRIX.md         alignment risks mapped to tests
VALIDATION_TEMPLATE.md honest completion report
```

## Minimal registry requirements

A minimal Buildprint can still be just `BUILDPRINT.md`, but registry quality badges should reflect package strength:

- `basic`: has `BUILDPRINT.md`
- `tested`: has `TEST_MATRIX.md` or tests/checks
- `strong`: has `SPEC.md`, `PLAN.md`, `CONTRACTS.md`
- `agent-grade`: has `plans/*.md` and `VALIDATION_TEMPLATE.md`

## Design principles

- Markdown first; YAML/JSON optional.
- Do not make creators write complex schemas unless useful.
- Keep each file short and single-purpose.
- Strong Buildprints repeat the same target shape across architecture, spec, plan, contracts, and tests.
- Existing-project mappings must label facts as observed, inferred, or unknown.

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
