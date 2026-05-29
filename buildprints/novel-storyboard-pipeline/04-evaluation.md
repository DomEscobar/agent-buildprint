# Evaluation

Qualification label remains PROOF_REQUIRED until every required proof is complete.

## Promotion Gates

1. Executable packet spine exists and contains no obsolete selected-output files.
2. Foundation scaffold exists under `implementation-project/` with required `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md`.
3. Every phase proof gate passes and records runtime evidence in `.buildprint/evidence/evidence-ledger.jsonl`.
4. UI-bearing phases include browser e2e traces and inspected screenshots on desktop and mobile.
5. Canvas visual quality gate passes: no generic forms, default controls, raw text-list substitutes, local-MVP screenshots, overlapping text, or weak Canvas replacement.
6. Persistence roundtrip proves app/project/script/Canvas/task/media state survives restart.
7. Provider proof is honestly labeled as blocked, sandbox, fake-provider contract, or live. Fake-provider proof cannot qualify live generation.
8. Security hardening passes for auth bootstrap, provider secrets, media access, cross-project isolation, rate limits, and destructive actions.
9. No unresolved high/critical no-fake findings remain.

## Required Evidence Rows

Runtime rows must include:

- `phase_id`
- command/action
- result
- artifact path
- environment
- proof summary
- blocker status

## No-Fake Checks

Fail qualification if:

- Canvas is only a static shell or generic CRUD.
- Provider calls are mocked while claimed as live.
- Generation success appears without durable task/media state.
- Public auth uses default admin credentials.
- Media access is not project/user-scoped.
- Persistence is in-memory or not restart-proven.
- Final output/export is claimed without implemented and proven artifact behavior.

## Recommended Verification Commands

Downstream implementation should define exact commands in `implementation-project/test-strategy.md`, then run at least:

- package install/build/typecheck
- unit tests
- integration/API tests
- migration and persistence roundtrip tests
- worker/provider contract tests
- browser e2e tests
- screenshot/visual review
- accessibility smoke
- secret scan and no-fake review
