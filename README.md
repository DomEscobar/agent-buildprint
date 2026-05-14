# Agent Buildprint

Construction plans for coding agents.

Agent Buildprint turns product ideas or existing repositories into AI-readable architecture contracts, prompts, policies, tests, and checks that coding agents can follow without forcing a framework runtime.


## Positioning

Agent Buildprint is a registry/marketplace for building plans that coding agents can follow. The value is that creators can share their expertise as agent-ready Buildprints. Our own format is only an optional alignment layer for metadata, prompts, risks, acceptance checks, and validation. Useful Markdown specs, prompt packs, diagrams, examples, and test plans should be accepted without forcing creators into complex YAML. See `POSITIONING.md` and `FORMATS.md`.

## Current MVP

- `agb check` validates Buildprint folders and generated code imports.
- `agb init langgraph` creates a LangGraph-style Vanilla TypeScript agent contract.
- `agb map` maps an existing repo into `.project.buildprint/` with deterministic facts, a Buildprint package, confidence report, risks, questions, tiny phase plans, and a continuation prompt.
- `agb start <package.json URL>` bootstraps `.buildprint/` in a new implementation repo by downloading exact Buildprint snapshots and writing continuation state.

## Commands

```bash
node ./bin/agb.js check ./langgraph
node ./bin/agb.js check ./langgraph --code ./langgraph/examples
node ./bin/agb.js init langgraph ./my-agent-contract
node ./bin/agb.js map ./my-project
node ./bin/agb.js map ./my-project --out ./my-project.buildprint
node ./bin/agb.js start http://152.53.118.78:43117/buildprints/ai-influencer-os/package.json
```

## Mapper output

```txt
.project.buildprint/
  facts.json
  BUILDPRINT.md
  SPEC.md
  PLAN.md
  plans/*.md
  CONTRACTS.md
  TEST_MATRIX.md
  VALIDATION_TEMPLATE.md
  buildprint.yaml
  discovered-map.md
  confidence-report.md
  questions.md
  risks.md
  prompts/continue-building.md
  tests/architecture.yaml
```

## Principle

Deterministic facts first. Inference second. Unknowns become questions, not fake certainty. Mapper-generated packages must separate observed facts, inferred behavior, and unknowns.

## Format philosophy

Buildprints are format-flexible. A Buildprint can be Markdown-first, contract-first YAML/JSON, hybrid, or example-first.

The minimal valid Buildprint is a `BUILDPRINT.md` with a comprehensive plan, acceptance checks, risks, and a copyable agent prompt. YAML/JSON should be used when structure needs validation, not as a tax on creators. See `FORMATS.md`.

## Start a Buildprint implementation

```bash
node ./bin/agb.js start <buildprint-package-json-url-or-file>
```

This creates `.buildprint/`, downloads exact snapshot files from the package manifest, and writes `source.json`, `state.json`, `progress.md`, `decisions.md`, `blockers.md`, and `next-agent.md`. Agents should read `.buildprint/next-agent.md` before coding and update `.buildprint/` before stopping.
