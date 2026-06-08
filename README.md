# Agent Buildprint

[![npm version](https://img.shields.io/npm/v/agent-buildprint?label=npm)](https://www.npmjs.com/package/agent-buildprint)
[![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![license MIT](https://img.shields.io/npm/l/agent-buildprint)](https://www.npmjs.com/package/agent-buildprint)
[![CLI agb](https://img.shields.io/badge/CLI-agb-111827)](#commands)
[![Buildprint v3](https://img.shields.io/badge/Buildprint-v3%20executable-4f46e5)](#v3-executable-packet-shape)

Executable product contracts for coding agents.

Agent Buildprint turns product intent, implementation order, UX responsibility, runtime boundaries, quality obligations, review rules, and handover expectations into files a coding agent can actually follow.

It is not a framework generator and not another prompt blob. `agb` bootstraps exact Buildprint snapshots, installs a project-local skill harness, and validates packet shape so agents build the product path instead of improvising a generic dashboard.

## Start Fast

```bash
npm install -g agent-buildprint
mkdir my-build && cd my-build
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
agb harness init .
```

Then hand the workspace to a coding agent and make it read:

```text
.buildprint/next-agent.md
```

## Why It Exists

| Coding agents often drift into | Buildprints force |
| --- | --- |
| one giant view with every capability visible | screen states, progressive disclosure, and one dominant surface |
| vague "make it nice" UI notes | a generated `docs/ui-identity.md` and UI skill reference pack |
| prompt-only implementation plans | phase files with build objectives, proof, and handover |
| fake completion from code edits | observable behavior, blocker honesty, and claim ceilings |
| stack-fixed boilerplate | runtime flexibility unless source facts require a stack |

## Install

```bash
npm install -g agent-buildprint
agb --help
```

Node.js 20 or newer is required.

From a repository checkout:

```bash
node ./bin/agb.js --help
```

## What `agb` Does

| Command | Purpose |
| --- | --- |
| `agb start` | Download an exact Buildprint snapshot into `.buildprint/`. |
| `agb harness init` | Create or repair a project-local `AGENTS.md` skill harness. |
| `agb harness check` | Verify local skills and bundled reference files. |
| `agb packet check` | Validate v3 executable packet shape and reject stale runner-era files. |
| `agb packet next` | Print the active phase or next-agent instructions. |
| `agb check` | Run the older static blueprint/code sanity check for non-packet experiments. |
| `agb evidence check` | Validate older evidence-ledger rows for legacy workspaces. |

## Quick Start

Bootstrap a published Buildprint in a clean implementation workspace:

```bash
mkdir my-build
cd my-build
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

Then hand the workspace to a coding agent and make it read:

```text
.buildprint/next-agent.md
```

That file routes the agent through the immutable snapshot files in the required order. Runtime progress, blockers, decisions, and handover notes belong under `.buildprint/`; do not edit snapshot files to fake progress.

## Project-Local Skill Harness

Buildprints now install a local skill harness before phase work:

```bash
agb harness init .
agb harness check .
```

The harness creates or patches `AGENTS.md` and writes portable skills under `.agents/skills/`. When Codex or Claude folders are detected or requested, it also writes agent-specific copies such as `.codex/skills/` or `.claude/skills/`.

Current required skills:

| Skill | What it protects |
| --- | --- |
| `frontend-ui-product-design` | Product-specific UI, screen states, mobile floor, tokens, and anti-slop review. |
| `subagent-driven-implementation` | Multi-task phase execution with file ownership and review checkpoints. |

The UI skill is intentionally small at the entrypoint and carries detailed guidance through `references/` files. The generated `frontend-ui-product-design` skill includes:

| Reference | Guards against |
| --- | --- |
| `references/preflight.md` | ignoring existing tokens, fonts, framework, components, and motion stance |
| `references/screen-states.md` | stuffing every capability into one permanent screen |
| `references/structural-variety.md` | color-swapped hero/cards/dashboard templates |
| `references/design-tokens.md` | improvised colors, fonts, focus, spacing, and fake proof copy |
| `references/component-states.md` | dead controls and missing hover/focus/loading/error states |
| `references/mobile-hard-floor.md` | clipped mobile layouts and lazy desktop stacking |
| `references/slop-review.md` | generic SaaS surfaces that could belong to any product |

This is the mechanism that prevents a coding agent from turning every product into one huge dashboard. The UI skill forces a screen-state decision before layout: current task, dominant surface, visible-now surfaces, hidden-but-reachable surfaces, detail/modal/drawer/route placement, and what must not be visible together.

## UX/UI Contract

For UI-bearing products, UX is part of completion. A Buildprint should make the coding agent decide the product experience before writing UI code.

The current contract is:

- Generate or preserve `docs/ui-identity.md` before implementation work.
- Keep `docs/architecture.md` as the technical contract.
- Do not generate old planning/proof paperwork such as `docs/product-experience.md`, `docs/product-loop.md`, `docs/proof-matrix.md`, `docs/proof-strategy.md`, or `docs/output-quality.md`.
- Do not expose every listed capability as a permanent region.
- Keep one dominant product/creative surface, one supporting context surface, and one action/status surface per screen state.
- Move secondary capability into tabs, steps, routes, drawers, popovers, scoped modals, or detail views.
- Verify desktop and mobile screenshots for overflow, clipping, unreadable text, dead controls, generic dashboard silhouette, and weak information hierarchy.

Buildprints should not reward "metaphor skin" compliance. Calling something a canvas, loom, board, studio, cockpit, or desk is not enough. The interaction model, first action, mobile flow, and visible hierarchy must actually fit the product.

## v3 Executable Packet Shape

Current Mapper OS output is a v3 phase-driven executable packet:

```text
BUILDPRINT.md
00-questions.md
01-ui-identity.md
02-project-setup.md
blueprint.yaml
03-phases/
  phase-index.yaml
  phase-flow.md
  <phase>.md
HANDOVER.md
```

Core responsibilities:

- `BUILDPRINT.md` is the generic AI-builder briefing and read order. It must not become the product spec.
- `00-questions.md` asks only implementation-changing hard stops, assumable defaults, and deferrable decisions.
- `01-ui-identity.md` defines product identity, design thesis, screen-state expectations, style direction, tokens, typography, layout, components, motion, state behavior, anti-generic rules, and proof obligations.
- `02-project-setup.md` creates the implementation foundation: local skill harness, `AGENTS.md`, `docs/ui-identity.md`, `docs/architecture.md`, env contract, setup receipt, and stack/runtime decisions.
- `blueprint.yaml` is the machine route and product-contract mirror. YAML routes; Markdown teaches and builds.
- `03-phases/phase-index.yaml` names the active phase and phase files.
- `03-phases/phase-flow.md` defines the active-phase loop and repair routing.
- Each phase file is a product-engineering assignment with a building objective, required context, proof, handoff, and standing UI/user-language responsibility.
- `HANDOVER.md` separates built behavior, verified behavior, blockers, not-proven claims, and next actions.

`agb packet check` rejects obsolete runner-shaped packet folders/files, weak UI identity, tiny phase objectives, stale responsibility references, and fake-success leakage.

## Mapping An Existing Repository

There is no `agb map` command.

Mapping is an agent-session workflow governed by `buildprints/buildprint-mapper-os/`. The mapper should inspect the source repository, record observed facts, distinguish inference from blockers, select a coherent product scope, and emit a source-independent v3 executable packet.

Strict bootstrap path:

```bash
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

If the package is not globally installed:

```bash
git clone https://github.com/DomEscobar/agent-buildprint
node agent-buildprint/bin/agb.js start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

After bootstrap, read `.buildprint/next-agent.md` and follow the workflow. Ask for a target repo only if one was not already provided.

## Commands

```bash
# Bootstrap
agb start <buildprint-package-json-url-or-file> [target-folder]

# Packet inspection
agb packet check <packet-folder-or-package-json-url>
agb packet next <packet-folder-or-build-state-folder>

# Project-local skill harness
agb harness init [project-folder] [--agent auto|all|codex|claude|agents] [--json]
agb harness check [project-folder] [--agent auto|all|codex|claude|agents] [--json]

# Legacy checks
agb check <blueprint-folder> [--code <generated-code-folder>]
agb evidence check <evidence-ledger-jsonl>
```

Examples:

```bash
agb packet check ./buildprints/buildprint-mapper-os
agb packet next ./buildprints/buildprint-mapper-os
agb harness init .
agb harness check .
agb start https://agent-buildprint.com/buildprints/ai-story-maker/package.json ./story-workspace
```

## Review Rules

Buildprints are useful only when implementation claims stay tied to observable behavior.

- Do not mark a phase complete from code edits alone.
- Do not count static UI, dead buttons, placeholder routes, mock-only providers, or in-memory demos as production behavior.
- A phase is complete only when its real product path is built, checked, and honestly documented.
- Browser, screenshot, worker, security, persistence, and data-lifecycle claims need matching observable verification or honest blocker notes.
- A broad smoke test should not upgrade unrelated claims.
- Handover must separate built behavior, verified behavior, blockers, not-proven claims, and next actions.

## Development Checks

Useful local checks:

```bash
npm run check:syntax
npm run eval:mapper-overhaul
npm run check:packet:mapper
node bin/agb.js packet check buildprints/ai-story-maker
npm run check:blueprint-yaml
npm pack --dry-run
```

On Windows, `check:blueprint-yaml` expects `python3` on PATH. If only the `py` launcher is available, use a temporary `python3.cmd` shim for that command.

## Publishing

Check the live registry before every release:

```bash
npm view agent-buildprint version dist-tags time --json
```

For README/package metadata updates without a CLI API break, use a patch release:

```bash
npm version patch --no-git-tag-version
npm pack --dry-run
npm publish --access public
```

After publishing:

```bash
npm view agent-buildprint version dist-tags --json
```

Do not publish from unverified local state.
