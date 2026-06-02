# Discover Prompt

Use Mapper OS to perform perfect detailed discovery on a source project.

## Instructions

- Treat source as read-only.
- Collect safe census hints only.
- Create a mechanical source-surface census before semantic capability mapping.
- Promote the census into a source feature coverage map before proposing phases; do not collapse many source surfaces into broad buckets.
- Do not copy secret values.
- Do not assert product behavior from filenames, manifests, dependencies, or route patterns.
- Create `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY` claims only until source reading promotes evidence.
- Discover source capabilities before file/module boundaries. Use the inferred `blueprint_mode` to name them correctly: primitives for framework/library, boundary transactions for integration, task loops for automation, dataflows for data-pipeline, operations for infrastructure, and outcome flows for product.
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
review/
  PROMOTION_GATE.md
```

Every discovery run must include an `inferred_blueprint_mode` block in `BUILDPRINT_CANDIDATES.md` with:

- `primary`: the single most likely mode (product | framework | integration | automation | library | data-pipeline | infrastructure | mixed)
- `rationale`: one or two sentences explaining why this mode fits the source evidence
- `phase_style_hint`: the expected phase style that matches the inferred primary mode
- `mixed_phase_modes`: only when primary is `mixed`, list the per-phase modes that will each need their own declaration

This hint guides extraction-phase mode classification but does not lock it. If extraction evidence changes the classification, update the mode and record why.

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

## Source Feature Coverage Map

Before creating candidate Buildprints, promote high-signal census findings into `discovery/SOURCE_FEATURE_COVERAGE_MAP.md`.

Use this compact table:

| Source surface | Source evidence | Mapped obligation | Target disposition | Owning candidate/phase | Required proof |
|---|---|---|---|---|---|

Use "Mapped obligation" as the column label. For non-product modes, the obligation is a primitive, boundary transaction, task loop, dataflow, or operation rather than a product flow. Do not use "Product obligation" as the column label in discovery output.

Rules:

- Enumerate meaningful source surfaces before semantic phase planning. The surface type shifts with the inferred mode: product flows, framework primitives/composition rules, integration boundary transactions, automation task loops, dataflow contracts, infrastructure operations, routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.
- Generic buckets like “simulation”, “dashboard”, “memory”, “reports”, “runtime”, or “core app” are invalid unless decomposed into sub-surfaces with distinct obligations.
- Every high-signal surface must be assigned exactly one owning candidate/phase, or marked `Dropped`, `Blocked`, or `Needs clarification` with rationale.
- If a surface needs supporting phases, name one primary owner plus supporting phases; do not create ambiguous shared ownership.
- Required proof must reference the specific surface, not only “tests pass”, “app builds”, or “feature preserved”.

Discovery output must use qualification label `DISCOVERY_ONLY`.
