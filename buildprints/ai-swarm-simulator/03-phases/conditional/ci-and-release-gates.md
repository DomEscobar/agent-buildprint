# Phase 12 - CI and release gates

requires_roles: [product-architect]

## Product intention

This phase is included but blocked under trusted-local posture.

## Mapped obligations

Add automated build/test/lint/smoke checks, graph adapter contract tests, and release gating before production-shaped handoff.

## Stable vs free

Stable: broken builds and fake graph adapter behavior are caught.

Free: CI provider.

## Implementation scope

Blocked until posture is promoted.

## Interfaces touched

Build scripts, tests, CI workflow.

## State / runtime touched

Test fixtures and local CI artifacts.

## UX / DX / operator requirements

CI output should make failures actionable.

## Required output (product-architect)

Define and enforce the minimum release gate.

## Blocks (product-architect)

No release without graph adapter, provider config, persistence, and browser smoke checks.

## Quality bar

CI catches core product regressions.

## Do not ship

Manual-only production release.

## Repair routing

Implement before release.

## Unlock condition

Release gates pass.

