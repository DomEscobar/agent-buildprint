# ai-swarm-simulator

`ai-swarm-simulator` is a social simulation studio for turning seed material into a graph-backed world, running agent activity across simulated social platforms, and producing a readable feed, report, and exportable story artifact.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Build](https://img.shields.io/badge/build-local%20checks%20required-yellow)
![Runtime](https://img.shields.io/badge/runtime-browser%20webapp-lightgrey)
![Status](https://img.shields.io/badge/status-trusted--local%20first-yellow)

## Features

- Build a scenario map from source material, entities, relationships, motives, risks, and influence paths.
- Convert graph entities into simulation agents with roles, stances, activity levels, influence weights, and platform behavior.
- Run a local or provider-backed swarm simulation with posts, replies, comments, reactions, reposts, searches, follows, and timeline events.
- Inspect the simulated feed, action logs, agent decisions, graph facts, report provenance, and scenario changes.
- Generate a grounded story, report, or postable thread from the simulation output without pretending it was posted to a real social network.
- Keep blocked states honest when provider keys, graph memory, persistence, export, or deployment requirements are missing.

## Requirements

- Text/model provider key when live provider-backed simulation is enabled.
- Graph memory API URL/key when external graph memory is enabled.
- Database URL and session secret when saved projects/runs are enabled.
- Export storage credentials only when exported reports/stories are written to external storage.
- Deployment credentials only when moving beyond trusted-local use.

## Environment And Provider Keys

Use `.env.example` as the source of truth for exact variable names in an implementation. Keep real secrets out of README files, tests, logs, screenshots, and handover notes.

```bash
TEXT_PROVIDER_API_KEY=
GRAPH_MEMORY_URL=
GRAPH_MEMORY_API_KEY=
DATABASE_URL=
SESSION_SECRET=
EXPORT_STORAGE_URL=
```

- Required only when the matching feature is enabled; deterministic local simulation should not need live provider keys.
- Optional provider keys unlock live generation, external graph memory, export storage, or deployment.
- Blocked unless configured: live provider-backed simulation, external graph memory, production deployment, real publishing, and durable export storage.

## Quick Start

```bash
install-command
configure-env-command
run-dev-command
test-or-check-command
```

Open the product, create or load a scenario, inspect the map, run a deterministic local simulation, review the feed, and generate the report/story output.

## Verification

Before claiming the product is complete, verify:

- setup, build, lint/typecheck, and test commands exit successfully or record exact blockers;
- the main product path works through the UI, API, or CLI surface;
- simulation output is scenario-specific rather than repetitive template text;
- state survives reload/refetch when persistence is claimed;
- missing providers produce clear blocked states rather than fake success;
- desktop and narrow layouts avoid overlap, clipped controls, unreadable text, and unreachable actions.

## Limitations

- Trusted-local operation is the default until auth, privacy, deployment, and observability are proven.
- Live provider-backed simulation requires configured credentials and safe provider boundaries.
- Real publishing to external social platforms is not implied by simulated feed or export features.
- Production readiness requires separate proof for persistence, provider secrets, deployment, privacy, and recovery paths.
