# Agent Buildprint

Construction plans for coding agents.

Agent Buildprint turns product ideas or existing repositories into AI-readable build contracts, prompts, policies, tests, and checks that coding agents can follow without forcing a specific framework runtime.


## Positioning

Agent Buildprint is a registry/marketplace for building plans that coding agents can follow. The value is that creators can share their expertise as agent-ready Buildprints. Our current mapped Buildprint baseline is the executable packet contract documented in [Buildprint v1 Current Execution Contract](docs/buildprint/Buildprint.v1.HTML).

## Product Surfaces

Agent Buildprint currently has three surfaces:

- Published Buildprints: package folders under `buildprints/` with `publication.json` for website metadata and `BUILDPRINT.md` as the human start point.
- Executable packets: the stricter Mapper OS output shape with `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/`, `04-evaluation.md`, and `05-evidence/`.
- CLI bootstrap/checks: `agb start` downloads exact snapshots into `.buildprint/`; `agb packet check` and repo scripts validate packet shape and evidence discipline.

Not every published Buildprint is an executable packet. Older/classic packages are still valid when their own `BUILDPRINT.md` defines the contract, but Mapper-generated packages should use the current executable packet baseline.

## Install

```bash
npm install -g agent-buildprint
agb --help
```

You can also run from a checkout with `node ./bin/agb.js ...`.

## Commands

```bash
agb check ./my-buildprint
agb check ./my-buildprint --code ./generated-code
agb start https://agent-buildprint.com/buildprints/portable-local-rag-chat-workbench/package.json ./my-build
agb packet check ./buildprints/portable-local-rag-chat-workbench
agb evidence check .buildprint/evidence/evidence-ledger.jsonl
```

## Mapping Existing Repositories

Use `buildprints/buildprint-mapper-os/` as the governing Buildprint in an agent session. The mapper is an evidence-driven source-reading workflow, not a scanner command. The agent must read source, promote claims with evidence, select or block scope, and produce a source-independent Buildprint package.

Mapped executable packets use a strict read order, phase-flow, evidence ledger, and continuation model. See [Buildprint v1 Current Execution Contract](docs/buildprint/Buildprint.v1.HTML) for the current flow.

## Principle

Evidence first. Inference second. Unknowns become questions, not fake certainty. Mapper-generated packages must separate observed facts, inferred behavior, and unknowns.

## Format philosophy

Buildprints are format-flexible. A Buildprint can be Markdown-first, contract-first YAML/JSON, hybrid, or example-first.

The minimal valid Buildprint is a `BUILDPRINT.md` with a comprehensive plan, acceptance checks, risks, and a copyable agent prompt. YAML/JSON should be used when structure needs validation, not as a tax on creators. Mapper-generated packages use the stricter executable packet shape described in [Buildprint v1 Current Execution Contract](docs/buildprint/Buildprint.v1.HTML).

## Start a Buildprint implementation

```bash
agb start <buildprint-package-json-url-or-file> [target-folder]
```

This creates `.buildprint/`, downloads exact snapshot files from the package manifest, and writes `source.json`, `state.json`, `progress.md`, `decisions.md`, `blockers.md`, and `next-agent.md`. Agents should read `.buildprint/next-agent.md` before coding and update `.buildprint/` before stopping.
