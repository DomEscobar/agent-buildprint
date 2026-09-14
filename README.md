# Agent Buildprint

[![npm version](https://img.shields.io/npm/v/agent-buildprint?label=npm)](https://www.npmjs.com/package/agent-buildprint)
[![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![license MIT](https://img.shields.io/npm/l/agent-buildprint)](https://www.npmjs.com/package/agent-buildprint)
[![Website](https://img.shields.io/badge/buildprints-agent--buildprint.com-111827)](https://agent-buildprint.com/)

Buildprints are executable implementation packets for coding agents.

Skills improve the worker. Buildprints package the work. A skill teaches an agent how to debug, design, review, search, or use a tool well. A Buildprint tells an agent what to install, change, or build in a target codebase and how to prove it worked.

Browse published Buildprints and copy the shortest start command here:

https://agent-buildprint.com/

## Shortcuts

AGB is the optional CLI helper for loading exact Buildprint snapshots into a workspace. Version `0.1.0` includes the v2 runtime and bundled packets; install it globally for convenience:

```bash
npm install -g agent-buildprint@0.1.0
```

Then start from a published Buildprint:

```bash
mkdir my-build
cd my-build
agb start https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

No global install required:

```bash
git clone https://github.com/DomEscobar/agent-buildprint
node agent-buildprint/bin/agb.js start \
  https://agent-buildprint.com/buildprints/buildprint-mapper-os/package.json .
```

Optionally install the local agent skill harness:

```bash
agb harness init .
agb harness check .
agb harness checkup .
```

Then give the workspace to your coding agent and tell it to read:

```text
.buildprint/next-agent.md
```

## Common Commands

```bash
agb start <buildprint-package-json-url-or-file> [target-folder]
agb packet check <packet-folder-or-package-json-url>
agb packet next <packet-folder-or-build-state-folder>
agb harness init [project-folder] [--profile webapp] [--profile backend]
agb harness check [project-folder] [--profiles webapp,backend]
agb harness checkup [project-folder] [--profiles webapp,backend]
agb --help
```

## What You Get

A Buildprint snapshot is a **kernel packet**: goal, minimal setup, identity when UI-bearing, named loops, independent contract review, blockers, and handover. Default execution is goal → bare agentic loop → optional independent subagent fan-out → contract review. Production harness maturity is an upgrade, not the floor.

The point is not to guess from a repo blindly. The point is to give the agent a precise build path it can follow, while still allowing explicit wishes such as a different door, a bigger garden, or another extension.

Product Buildprints package whole systems. Capability Buildprints package bounded integrations such as Stripe subscriptions, RBAC permissions, API key management, webhooks, auth, analytics, or deployment.

## Guided game packet

[Guided 2D Game / vertical slice](buildprints/guided-2d-game/README.md) guides scoped intake, graybox/art convergence, coherent sprite animation, validated world placement and evidence-backed game QA. It includes dependency-free contract validators and negative fixtures—not a prebuilt game or paid-generation requirement.

## Full standalone isometric game packet

[Full Standalone Isometric Game](buildprints/standalone-isometric-game/README.md) covers the entire agreed original game using a pinned [Isometric Framework](https://github.com/DomEscobar/isometric-framework/commit/7542ff68de04ca6ea6736974b54ec5b5dde1cc33) scaffold and its existing skills: one approved contract, mobile-first UX, complete world/gameplay production, and user-requested running-build visual/gameplay acceptance. It is separate from Guided 2D Game and does not cap delivery at calibration.

Version `0.1.0` contains the v2 runtime and this packet. Scaffold the pinned framework host first, then add the CLI to that host and start the bundled packet with the locally resolved executable:

```bash
npm install --save-dev agent-buildprint@0.1.0
npx --no-install agb start ./node_modules/agent-buildprint/buildprints/standalone-isometric-game/package.json .
npx --no-install agb state status .
npx --no-install agb loop next .
```

```powershell
npm install --save-dev agent-buildprint@0.1.0
npx --no-install agb start .\node_modules\agent-buildprint\buildprints\standalone-isometric-game\package.json .
npx --no-install agb state status .
npx --no-install agb loop next .
```

`start` records packet state; it does not scaffold the framework host. The framework remains separately pinned and locally built as described by the packet. AGB does not bundle framework skills or inject them into an agent session: the host reads the installed framework catalog and the selected skill files. Remote hosted manifests are separate website bytes; npm publishing does not update them or existing snapshots. Remote v2 starts still require an exact manifest SHA-256 from a separately trusted channel. See [CLI limitations](buildprints/standalone-isometric-game/references/cli-integration.md), [release notes](CHANGELOG.md), and the historical [authoring report](buildprints/standalone-isometric-game/AUTHORING_REPORT.md).

## Opt-in local runtime v2

[CLI runtime guide](docs/cli-runtime-v2.md): safe staged `start`, copy-only pinned `bootstrap`, resumable hash-linked state, explicit approvals and loop transitions, defects/returns, skill-file routing, and current-build-bound evidence attestations. `state status`, `loop next/begin/accept/advance`, `evidence bind/record` are real commands; none execute tests, manifest scripts, providers or deployment. Legacy manifests keep legacy state and packet operations; there is no automatic migration. Existing state/user files are never overwritten. Byte hashes and recorded review claims are not publisher authentication or verified visual acceptance. [Source delivery report](docs/cli-overhaul-report.md).

## Local Development

From this repository:

```bash
node ./bin/agb.js --help
npm run check:syntax
npm run check:packet:mapper
npm run check:packets
npm run check:guided-2d-game
npm run check:standalone-isometric-game
npm run check:capabilities
npm run check:authors
npm run check:capability:regressions
npm run eval:mapper-overhaul
npm pack --dry-run
```

Node.js 20 or newer is required.
