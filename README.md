# Agent Buildprint

Executable build contracts for coding agents.

Agent Buildprint packages product intent, source evidence, phase order, quality gates, and proof rules into files that an implementation agent can follow. The CLI, `agb`, bootstraps those packages into a workspace and can inspect packet/evidence files when you need a local sanity check.

It is not a framework generator. It does not choose React, Vue, Python, Rails, or any other runtime for you. A good Buildprint preserves product behavior and proof obligations while leaving implementation technology flexible unless the source evidence or product contract requires a specific stack.

## Install

```bash
npm install -g agent-buildprint
agb --help
```

Node.js 20 or newer is required.

From a repository checkout, use:

```bash
node ./bin/agb.js --help
```

## What You Get

- `agb start`: bootstrap an exact Buildprint snapshot into `.buildprint/` for an implementation workspace.
- `agb packet check`: validate executable packet shape, read order, phase routing, proof/evidence rules, and obsolete-layout rejection.
- `agb evidence check`: validate runtime evidence ledger rows.
- Published Buildprint packages under `buildprints/`, each with a `publication.json` record and a canonical `BUILDPRINT.md` start file.

## Quick Start

Start a published Buildprint in a clean implementation workspace:

```bash
mkdir my-build
cd my-build
agb start https://agent-buildprint.com/buildprints/portable-local-rag-chat-workbench/package.json .
```

Then hand the workspace to a coding agent and make it read:

```text
.buildprint/next-agent.md
```

That file routes the agent through the exact snapshot files in the required order. Runtime progress, blockers, decisions, and evidence belong under `.buildprint/`; do not edit the snapshot files to fake progress.

## Current Executable Packet Contract

The current Mapper OS executable packet baseline is documented in [Buildprint v3 Draft](docs/buildprint/buildprint-v3(DRAFT).html).

Typical packet shape:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  01-...phase.md
04-evaluation.md
05-evidence/
  evidence-ledger.jsonl
  evidence-ledger.schema.json
generated/
  agent-prompt.md
buildprint.json
publication.json
```

The important rule is authority separation:

- `BUILDPRINT.md` is the human router and canonical start file.
- `blueprint.yaml` and related YAML/JSON files are machine-readable mirrors.
- `03-phases/phase-flow.md` controls phase execution and required runtime artifacts.
- Packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.
- Runtime evidence goes to `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace.
- `.buildprint/next-agent.md` and `.buildprint/state.json` win on resumed runs.

## Commands

```bash
agb start <buildprint-package-json-url-or-file> [target-folder]
agb packet check <packet-folder-or-package-json-url>
agb packet next <packet-folder-or-build-state-folder>
agb evidence check <evidence-ledger-jsonl>
agb check <blueprint-folder> [--code <generated-code-folder>]
```

Examples:

```bash
agb packet check ./buildprints/ai-swarm-simulator
agb packet next ./buildprints/ai-swarm-simulator
agb evidence check .buildprint/evidence/evidence-ledger.jsonl
agb check ./my-buildprint --code ./generated-code
```

## Mapping An Existing Repository

There is no `agb map` command. That old direction is intentionally not the workflow.

To map a source repository, run an agent session with `buildprints/buildprint-mapper-os/` as the governing Buildprint. The mapper workflow is evidence-driven: inspect the source, record observed facts, distinguish inference from proof, select a coherent product scope, and emit a source-independent executable packet.

The strict bootstrap path for Mapper OS is:

```bash
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

If the package is not globally installed:

```bash
git clone https://github.com/DomEscobar/agent-buildprint
node agent-buildprint/bin/agb.js start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

After bootstrap, read `.buildprint/next-agent.md` and follow the mapped workflow. Ask for a target repo only if one was not already provided.

## Evidence Rules

Buildprints are useful only when claims stay tied to proof.

- Do not mark a phase complete from code edits alone.
- Do not count static UI, dead buttons, placeholder routes, mock-only providers, or in-memory demos as production behavior.
- Do not set `upgrades_claim: true` for blockers, missing credentials, unavailable browser tooling, synthetic checks, or partial proof.
- Provider adapter/config tests prove adapter seams, not live provider behavior.
- Browser, screenshot, worker, security, persistence, and data-lifecycle claims need matching executable proof or honest non-upgrading blocker rows.
- A broad smoke test should not upgrade unrelated claims.

## Publishing

The latest published npm version should be checked before every release:

```bash
npm view agent-buildprint version dist-tags time --json
```

For a README/package metadata update with no CLI API break, use a patch release:

```bash
npm version patch --no-git-tag-version
npm publish --access public
```

For the current local update, the correct next version after published `0.0.4` is `0.0.5`.

## Principles

- Evidence first. Inference second.
- Unknowns become questions or blockers, not fake certainty.
- Buildprints should be source-independent once mapped.
- Implementation agents should read one active phase at a time.
- Production-grade scope is the default unless the Buildprint explicitly narrows it.
