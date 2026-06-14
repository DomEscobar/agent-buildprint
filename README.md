# Agent Buildprint

[![npm version](https://img.shields.io/npm/v/agent-buildprint?label=npm)](https://www.npmjs.com/package/agent-buildprint)
[![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![license MIT](https://img.shields.io/npm/l/agent-buildprint)](https://www.npmjs.com/package/agent-buildprint)
[![Website](https://img.shields.io/badge/buildprints-agent--buildprint.com-111827)](https://agent-buildprint.com/)

Buildprints are executable product blueprints for coding agents.

Browse published Buildprints and copy the shortest start command here:

https://agent-buildprint.com/

## Shortcuts

AGB is the optional CLI helper for loading exact Buildprint snapshots into a workspace. You can install it globally for convenience:

```bash
npm install -g agent-buildprint
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

A Buildprint snapshot gives the agent ordered files for setup, UI identity, implementation phases, proof obligations, blockers, and handover.

The point is not to guess from a repo blindly. The point is to give the agent a precise build path it can follow, while still allowing explicit wishes such as a different door, a bigger garden, or another extension.

## Local Development

From this repository:

```bash
node ./bin/agb.js --help
npm run check:syntax
npm run check:packet:mapper
npm pack --dry-run
```

Node.js 20 or newer is required.
