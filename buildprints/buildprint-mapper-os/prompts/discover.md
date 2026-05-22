# Discover Prompt

Use Mapper OS to perform lean discovery on a source project.

## Instructions

- Treat source as read-only.
- Collect safe census hints only.
- Create a mechanical source-surface census before semantic capability mapping.
- Do not copy secret values.
- Do not assert product behavior from filenames, manifests, dependencies, or route patterns.
- Create `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY` claims only until source reading promotes evidence.
- Discover product capabilities before file/module boundaries.
- Record unknowns as `QUESTION` or `BLOCKED`.

## Required Discovery Output

```text
discovery/
  SOURCE_READING_PLAN.md
  DISCOVERY_QUEUE.md
  CLAIM_REGISTER.md
  SYSTEM_MAP.md
  BUILDPRINT_CANDIDATES.md
evidence/
  EVIDENCE_LEDGER.json
  SOURCE_SURFACE_CENSUS.json
quality/
  PROMOTION_GATE.md
```

## Source Surface Census

Before creating candidate Buildprints, create `evidence/SOURCE_SURFACE_CENSUS.json`.

The census is mechanical. Do not infer product behavior from it, and do not treat route/function/file parity as a requirement.

Each entry must include:

- `id`
- `kind`
- `path`
- `symbolOrName` when safely available
- `signalLevel`: `high`, `medium`, or `low`
- `riskFlags`
- `evidence`
- `notes`

Use stable IDs with prefixes such as `routes.*`, `api.*`, `tables.*`, `models.*`, `jobs.*`, `queues.*`, `sockets.*`, `providerAdapters.*`, `auth.*`, `admin.*`, `uploads.*`, `exports.*`, `imports.*`, `fileStores.*`, `env.*`, `deployment.*`, and `docs.*`.

High-signal examples include user-facing routes, API handlers, persistence models/tables, provider adapters, auth/admin paths, jobs, uploads, imports/exports, file stores, sockets, deployment/runtime config, and source docs that define product workflows.

Discovery output must use qualification label `DISCOVERY_ONLY`.
