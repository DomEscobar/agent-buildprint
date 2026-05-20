# Agent Buildprint

Construction plans for coding agents.

Agent Buildprint turns product ideas or existing repositories into AI-readable build contracts, prompts, policies, tests, and checks that coding agents can follow without forcing a specific framework runtime.


## Positioning

Agent Buildprint is a registry/marketplace for building plans that coding agents can follow. The value is that creators can share their expertise as agent-ready Buildprints. Our own format is only an optional alignment layer for metadata, prompts, risks, acceptance checks, and validation. Useful Markdown specs, prompt packs, diagrams, examples, and test plans should be accepted without forcing creators into complex YAML. See `POSITIONING.md` and `FORMATS.md`.

## Current MVP

- `agb analyze` prints a local Buildprint AI review packet for Agents; it gathers evidence and schemas but does not judge quality itself.
- `agb check` validates Buildprint folders and generated code imports.
- `agb start <package.json URL>` bootstraps `.buildprint/` in a new implementation repo by downloading exact Buildprint snapshots and writing continuation state.
- Repository mapping is handled by an agent session using `buildprints/buildprint-mapper-os/`, not by a deterministic CLI command.

## Install

```bash
npm install -g agent-buildprint
agb --help
```

You can also run from a checkout with `node ./bin/agb.js ...`.

## Commands

```bash
agb analyze ./buildprints/buildprint-mapper-os
agb analyze ./buildprints/portable-novel-storyboard-pipeline --phase 04-workbench-ui
agb analyze ./buildprints/buildprint-mapper-os --json
agb check ./my-buildprint
agb check ./my-buildprint --code ./generated-code
agb start https://agent-buildprint.com/buildprints/ai-influencer-os/package.json
```

## Mapping Existing Repositories

Use `buildprints/buildprint-mapper-os/` as the governing Buildprint in an agent session. The mapper is an evidence-driven source-reading workflow, not a scanner command. The agent must read source, promote claims with evidence, select or block scope, and produce a source-independent Buildprint package.

## Principle

Evidence first. Inference second. Unknowns become questions, not fake certainty. Mapper-generated packages must separate observed facts, inferred behavior, and unknowns.

## Format philosophy

Buildprints are format-flexible. A Buildprint can be Markdown-first, contract-first YAML/JSON, hybrid, or example-first.

The minimal valid Buildprint is a `BUILDPRINT.md` with a comprehensive plan, acceptance checks, risks, and a copyable agent prompt. YAML/JSON should be used when structure needs validation, not as a tax on creators. See `FORMATS.md`.

## Start a Buildprint implementation

```bash
agb start <buildprint-package-json-url-or-file> [target-folder]
```

This creates `.buildprint/`, downloads exact snapshot files from the package manifest, and writes `source.json`, `state.json`, `progress.md`, `decisions.md`, `blockers.md`, and `next-agent.md`. Agents should read `.buildprint/next-agent.md` before coding and update `.buildprint/` before stopping.
