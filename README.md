# Agent Buildprint

Executable build contracts for coding agents.

Agent Buildprint packages product intent, source support, phase order, quality gates, review rules, and handover expectations into files that an implementation agent can follow. The CLI, `agb`, bootstraps those packages into a workspace and can inspect packet shape when you need a local sanity check.

It is not a framework generator. It does not choose React, Vue, Python, Rails, or any other runtime for you. A good Buildprint preserves product behavior and quality obligations while leaving implementation technology flexible unless source facts or the product contract require a specific stack.

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
- `agb packet check`: validate executable packet shape, read order, phase routing, review/handover wiring, and obsolete-layout rejection.
- `agb evidence check`: validate legacy runtime evidence ledger rows when working with older packets.
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

The current Mapper OS executable packet baseline is typed and review-centered. It uses `04-review.md` and `05-handover.md`, not packaged evidence ledgers, as the handoff path.

Typical packet shape:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  00-...phase.md
  ...
  99-final-review-handover.md
04-review.md
05-handover.md
generated/
  agent-prompt.md
buildprint.json
publication.json
```

The important rule is authority separation:

- `BUILDPRINT.md` is the human router and canonical start file.
- `blueprint.yaml` and related YAML/JSON files are machine-readable mirrors.
- `03-phases/phase-index.yaml` names the active phase and dependency order.
- `03-phases/phase-flow.md` controls phase execution.
- `04-review.md` defines skeptical artifact review through observable walkthroughs.
- `05-handover.md` records status, verification, blockers, and continue options.
- `.buildprint/next-agent.md` and `.buildprint/state.json` win on resumed runs.

## Commands

```bash
agb start <buildprint-package-json-url-or-file> [target-folder]
agb packet check <packet-folder-or-package-json-url>
agb packet next <packet-folder-or-build-state-folder>
agb evidence check <legacy-evidence-ledger-jsonl>
agb check <blueprint-folder> [--code <generated-code-folder>]
```

Examples:

```bash
agb packet check ./buildprints/ai-swarm-simulator
agb packet next ./buildprints/ai-swarm-simulator
agb check ./my-buildprint --code ./generated-code
```

## Mapping An Existing Repository

There is no `agb map` command. That old direction is intentionally not the workflow.

To map a source repository, run an agent session with `buildprints/buildprint-mapper-os/` as the governing Buildprint. The mapper workflow is source-supported: inspect the source, record observed facts, distinguish inference from blockers, select a coherent product scope, and emit a source-independent executable packet.

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

## Review Rules

Buildprints are useful only when implementation claims stay tied to observable behavior.

- Do not mark a phase complete from code edits alone.
- Do not count static UI, dead buttons, placeholder routes, mock-only providers, or in-memory demos as production behavior.
- Use `04-review.md` to exercise controls, commands, APIs, operator actions, reload/readback, blocked states, and posture-specific operability.
- Use `05-handover.md` to separate built behavior, verified behavior, blockers, and next atomic actions.
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
