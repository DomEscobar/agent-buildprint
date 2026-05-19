# Agent Buildprint Package Spine Standard

This repository intentionally allows Buildprints to differ by domain, but every published Buildprint must expose a predictable core spine so agents and humans know where to start, validate, and report completion.

## Authority rule

`BUILDPRINT.md` is always the canonical authority spine. Other files may expand, mirror, or validate it, but they must not create a competing source of truth.

Machine-readable files such as `buildprint.json`, `phases.yaml`, `acceptance.yaml`, or `claims.yaml` are mirrors/adapters. If they disagree with `BUILDPRINT.md`, the Buildprint is defective and must be fixed.

## Required core files

Every Buildprint package must include:

- `BUILDPRINT.md` — canonical agent operating contract, binding scope, read order, phase gates, and acceptance gates.
- `README.md` — short human overview; never a competing read order.
- `SPEC.md` — behavior, requirements, edge cases, and must/must-not rules.
- `CONTRACTS.md` — interfaces, schemas, boundaries, permissions, data flow, or integration contracts.
- `PLAN.md` — implementation phase index. It may point to `plans/*.md`, `IMPLEMENTATION_ROADMAP.md`, or domain-specific phase docs.
- `TEST_MATRIX.md` — risk-to-check matrix.
- `VALIDATION_TEMPLATE.md` — final report template listing scope, commands run, evidence, pass/fail status, gaps, and blockers.
- `checks/acceptance.md` — concise completion checklist for agents/reviewers.

## Optional packs

Use optional packs when they add real validation or domain clarity:

- `plans/*.md` — detailed numbered phase rails.
- `proof/` — isolated reference proof; not a substitute for target-app validation unless the Buildprint explicitly is a proof package.
- `conformance/` — black-box target-app validation kit.
- `evals/` — golden regression fixtures/harnesses.
- `schemas/` — machine-readable validation schemas.
- `policies/` — safety, provider, publishing, or quality policies.
- `SYSTEM_MAP.md`, `TRACEABILITY_MATRIX.md`, `THREAT_MODEL.md`, `OBSERVABILITY.md`, `PORTABILITY.md`, and similar domain artifacts — required when their risk/scope triggers apply.
- `buildprint.json`, `phases.yaml`, `acceptance.yaml`, `claims.yaml` — machine mirrors only.

## Non-goals

The standard does not require all Buildprints to have identical depth or identical optional packs. A security extension, a portable product OS, and a mapper/eval harness should differ. The standard only requires that their common entry, planning, contract, and validation surfaces are predictable.

## Quality bar

Do not satisfy this standard with empty placeholders. If a file is added to meet the spine, it must either contain real requirements/checks or honestly route to an existing stronger artifact.
