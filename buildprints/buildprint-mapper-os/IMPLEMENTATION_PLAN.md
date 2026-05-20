# Mapper OS Implementation Plan

This plan turns `agb map` into a gated pipeline from evidence-backed discovery to a modular, review-required Buildprint package. Analytic review belongs to `agb analyze`; qualification/promotion status is emitted as part of the mapped package rather than a separate core CLI verb.

## Phase 1 — Unqualified discovery packet

Status: implemented.

- Emit `QUALIFICATION_REVIEW_REQUIRED`, never a qualified implementation claim from static mapping alone.
- Extract feature hypotheses from routes, APIs/RPC, docs, tests, config, package/runtime markers, integrations, and code signals.
- Emit evidence coverage and a source validation queue.
- Gate: discovery output must tell agents what is unknown and what must be read before qualification.

## Phase 2 — Product scope review gate

- Record each feature hypothesis against source files and optional runtime/test evidence.
- Promote feature states: `unqualified_hypothesis`, `validated_feature`, `blocked_unknown`, `out_of_scope`.
- Emit product scope files under `product/`.
- Gate: no feature enters the final plan without trigger, behavior, state/side effects, permissions/privacy, and acceptance evidence or a blocker.

## Phase 3 — Modularity abstraction

- Compile validated features into modules/domains.
- Emit module responsibilities, owned state, inputs/outputs, events/RPC/contracts, dependencies, failure modes, and forbidden coupling under `architecture/`.
- Gate: phases may reference modules only after module ownership and dependency direction are explicit.

## Phase 4 — Modular implementation plan

- Emit `implementation/PHASE_PLAN.md` as an index, not a giant single plan.
- Emit one file per phase under `implementation/phases/`.
- Emit vertical slices under `implementation/slices/`.
- Emit reusable objective loops under `implementation/loops/`.
- Emit concrete task checklists under `implementation/tasks/`.
- Gate: each phase has goal, included features/modules, tasks, validation, loop gates, and exit criteria.

## Phase 5 — Quality and parity gates

- Emit quality artifacts under `quality/`.
- Acceptance is feature-level and module-level.
- No-fake, persistence, integration, security/privacy, observability, and handover checks are mandatory.
- Gate: claims may advance only when evidence exists or a blocker is recorded.

## Phase 6 — Evidence and review packet

- Emit evidence artifacts under `evidence/`.
- Review packet must include feature inventory, evidence coverage, module abstraction, implementation phases, and loop gates.
- Gate: reviewer must be able to reject weak mappings before implementation starts.

## Phase 7 — Final promotion boundary

- `agb map` emits the promotion gate and missing-evidence records, but does not claim final qualification from static evidence alone.
- Only after external source/runtime/test validation may a package status become `QUALIFIED_BUILDPRINT`.
- Until then, mapped packages remain `QUALIFICATION_REVIEW_REQUIRED`.
