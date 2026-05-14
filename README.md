# Agent Buildprint

Construction plans for coding agents.

Agent Buildprint turns product ideas or existing repositories into AI-readable architecture contracts, prompts, policies, tests, and checks that coding agents can follow without forcing a framework runtime.

## Current MVP

- `agb check` validates Buildprint folders and generated code imports.
- `agb init langgraph` creates a LangGraph-style Vanilla TypeScript agent contract.
- `agb map` maps an existing repo into `.project.buildprint/` with deterministic facts, confidence report, risks, questions, and a continuation prompt.

## Commands

```bash
node ./bin/agb.js check ./langgraph
node ./bin/agb.js check ./langgraph --code ./langgraph/examples
node ./bin/agb.js init langgraph ./my-agent-contract
node ./bin/agb.js map ./my-project
node ./bin/agb.js map ./my-project --out ./my-project.buildprint
```

## Mapper output

```txt
.project.buildprint/
  facts.json
  buildprint.yaml
  discovered-map.md
  confidence-report.md
  risks.md
  prompts/continue-building.md
  tests/architecture.yaml
```

## Principle

Deterministic facts first. Inference second. Low-confidence areas become questions, not fake certainty.
