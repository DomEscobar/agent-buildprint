# Mapper OS Current State

Last updated: 2026-05-20 Europe/Berlin

## Product direction

Mapper OS should keep the public CLI surface simple:

```bash
agb map ./repo --out ./mapped-buildprint
agb analyze ./mapped-buildprint
```

- `agb map` generates an evidence-backed mapped Buildprint package from a source repo.
- `agb analyze` is the analytic/review surface for existing Buildprints or mapped packages.
- A separate top-level `agb qualify` command is not part of the core product flow.
- Qualification/promotion status belongs inside the mapped output, not as a third main verb.

## What `agb map` currently does

`agb map` systematically scans a project for:

- repository/package structure
- frameworks and package manager
- routes/pages
- API endpoints/RPC/handlers
- data/model/schema files
- tests/build/deploy signals
- integrations and env var names only
- risky areas such as auth, payments, AI/tool calls, external writes, uploads, admin surfaces
- project size/scope pressure for large repos and monorepos

It then emits a mapped Buildprint package with discovery, decomposition, implementation, quality, evidence, and agent-facing rails.

## Key generated artifacts

Important root artifacts include:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `FEATURE_INVENTORY.md`
- `FEATURE_HYPOTHESES.md`
- `EVIDENCE_COVERAGE.md`
- `SOURCE_VALIDATION_QUEUE.md`
- `PRODUCT_CAPABILITY_MAP.md`
- `IMPLEMENTATION_DECOMPOSITION.md`
- `PHASE_PLAN.md`
- `LOOP_GATES.md`
- `PARITY_ACCEPTANCE.md`
- `REVIEW_PROTOCOL.md`
- `REVIEW_PACKET.json`
- `MAPPER_OS_ALIGNMENT.md`
- `DECOMPOSITION_STRATEGY.md`
- `manifest.json`

Important modular folders include:

- `product/`
- `architecture/`
- `implementation/phases/`
- `implementation/slices/`
- `implementation/loops/`
- `implementation/tasks/`
- `quality/`
- `evidence/`
- `agent/`

## Qualification/promotion model

Static mapping alone must not claim final qualification.

`agb map` now writes qualification artifacts directly:

- `manifest.qualificationStatus = "QUALIFICATION_REVIEW_REQUIRED"`
- `manifest.qualification.command = "agb map"`
- `evidence/SOURCE_VALIDATION.md`
- `evidence/qualification-records.json`
- `quality/PROMOTION_GATE.md`

The intended meaning is:

- mapped packages are AI-usable and evidence-backed
- claims are marked as observed, inferred, question, blocked, or out-of-scope
- feature hypotheses need source/runtime/test evidence before final promotion
- final `QUALIFIED_BUILDPRINT` status requires validation outside static mapping

## Current validation state

The latest Mapper qualification-surface change was validated with:

- `node --check bin/agb.js`
- `node --check evals/check-map.mjs`
- `node --check buildprints/buildprint-mapper-os/evals/check-map.mjs`
- `npm run eval:map`
- `npm run eval:analyze`
- `npm test`
- `git diff --check`

Latest relevant commit before this file:

- `b9b1aec Fold mapper qualification into map output`

## Known next work

Recommended next step is not more architecture. Run a brutal validation loop against real/adversarial projects:

1. Small app
2. SaaS app with auth/payments/providers
3. Large monorepo/system repo
4. Deceptive fixture with mocks/stubs/dead code/fake providers

For each generated package, check:

- correct size/scope behavior
- no fake parity claims
- risk detection quality
- useful feature clustering
- useful implementation phases
- clear runtime/test proof handoff
- whether another agent can actually follow the package without inventing facts

## Boundaries for future agents

- Do not reintroduce `agb qualify` as a core public verb without a strong product reason.
- Keep `agb map` as generation plus evidence/promotion gate emission.
- Keep `agb analyze` as review/analytics.
- Do not claim “perfect” or “qualified” from static repo scanning alone.
- Preserve the no-secret rule: env names only, never secret values.
- Prefer smaller complete selected scopes over broad fake Buildprints.
