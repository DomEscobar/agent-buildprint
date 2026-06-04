# Agent Buildprint

Executable build contracts for coding agents.

Agent Buildprint packages product intent, implementation order, quality obligations, review rules, and handover expectations into files that an implementation agent can follow. The CLI, `agb`, bootstraps exact Buildprint snapshots into a workspace and checks packet shape when you need a local sanity gate.

It is not a framework generator. It does not choose React, Vue, Python, Rails, or any other runtime for you unless source facts or the product contract require one. A good Buildprint preserves behavior, design responsibility, runtime boundaries, and proof expectations while leaving implementation technology flexible.

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
- `agb packet check`: validate v3 executable packet shape, read order, phase routing, UI/style constitution, and obsolete-layout rejection.
- `agb packet next`: print the next-agent read order from a packet or bootstrapped `.buildprint/` folder.
- `agb check`: run the older static blueprint/code sanity check for non-packet experiments.
- `agb evidence check`: validate evidence-ledger rows when maintaining older workspaces that still have them.
- Published Buildprint packages under `buildprints/`, each with a `publication.json` record and a canonical `BUILDPRINT.md` start file.

## Quick Start

Start a published Buildprint in a clean implementation workspace:

```bash
mkdir my-build
cd my-build
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

Then hand the workspace to a coding agent and make it read:

```text
.buildprint/next-agent.md
```

That file routes the agent through the exact snapshot files in the required order. Runtime progress, blockers, decisions, and evidence belong under `.buildprint/`; do not edit the snapshot files to fake progress.

## v3 Executable Packet Contract

`agb packet check` expects v3 phase-driven packets for current Mapper OS output.

```text
BUILDPRINT.md                 ← generic AI-builder briefing + read order only
00-questions.md               ← hard-stop / assumable / deferrable decisions
01-project-setup.md           ← implementation foundation and local docs
02-uiux-decision.md           ← mandatory UX/style constitution
blueprint.yaml                ← machine route + product-contract mirror
03-phases/
  phase-index.yaml            ← active phase route, not implementation prose
  phase-flow.md               ← active-phase loop and repair routing
  <phase>.md                  ← comprehensive building objective + proof bar
HANDOVER.md                   ← built / verified / blocked / not proven / next
```

Core invariants:

- `BUILDPRINT.md` is an AI-builder briefing only: role, responsibility, perfection alignment, fake-success intolerance, and read order. It must not become the product spec.
- Product identity, central interface, golden path, runtime posture, state/readback expectations, and provider constraints belong in `blueprint.yaml`, `01-project-setup.md`, `02-uiux-decision.md`, and the phase objectives.
- UX is mandatory. `02-uiux-decision.md` must open with UX importance and understandability, include a small checklist, and define a detailed style constitution before UI implementation starts.
- Every UI-bearing phase must read and obey `02-uiux-decision.md` before claiming progress.
- YAML routes; Markdown teaches and builds.
- Obsolete runner-shaped packet folders/files are rejected by `agb packet check`.

## Commands

```bash
# Bootstrap and packet inspection
agb start <buildprint-package-json-url-or-file> [target-folder]
agb packet check <packet-folder-or-package-json-url>
agb packet next <packet-folder-or-build-state-folder>

# General static checks
agb check <blueprint-folder> [--code <generated-code-folder>]
agb evidence check <evidence-ledger-jsonl>
```

Examples:

```bash
agb packet check ./buildprints/buildprint-mapper-os
agb packet next  ./buildprints/buildprint-mapper-os
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json ./mapped-workspace
```

## Mapping An Existing Repository

There is no `agb map` command. Mapping is an agent-session workflow governed by `buildprints/buildprint-mapper-os/`.

To map a source repository, run an agent session with Mapper OS as the governing Buildprint. The mapper workflow is source-supported: inspect the source, record observed facts, distinguish inference from blockers, select a coherent product scope, and emit a source-independent v3 executable packet.

Strict bootstrap path:

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
- A phase is complete only when its real product path is built, checked, and honestly documented.
- Browser, screenshot, worker, security, persistence, and data-lifecycle claims need matching observable verification or honest blocker notes.
- A broad smoke test should not upgrade unrelated claims.
- Handover must separate built behavior, verified behavior, blockers, not-proven claims, and next actions.

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

After publishing, verify:

```bash
npm view agent-buildprint version dist-tags --json
npm pack --dry-run
```

Public packages and docs are generated from the files in this repository. Do not publish from unverified local state.
