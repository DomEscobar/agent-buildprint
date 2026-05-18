# Buildprint Markdown Quality Audit Schema v1.0.0

Use this schema for every Buildprint. No file gets a vague “looks fine”. Every Markdown file must be classified and every package must pass edge checks.

## File classification
- `CORE`: primary architecture/build contract (`BUILDPRINT.md`, `SPEC.md`, major package entry docs).
- `CONTRACT`: interfaces, data/state contracts, schemas, adapter boundaries.
- `PLAN`: ordered implementation phases, handoff, roadmap.
- `QA`: tests, acceptance, validation, runtime QA, proof evidence.
- `POLICY`: safety, publishing, security, permissions, no-fake rules.
- `TRACE`: source trace, parity/claim mapping, evidence matrix.
- `PROOF`: runnable proof files/docs, reversal reports, eval evidence.
- `SUPPORT`: useful but non-core supporting context.
- `QUESTIONABLE`: duplicate, stale, too vague, or attention-harmful.

## Per-file checks
1. **Alignment** — matches current Buildprint positioning and package manifest; no stale public path/source-of-truth claims.
2. **Attention quality** — first sections contain agent-critical facts, not process chatter/history. Score 0-3.
3. **Context rot** — no obsolete phase reports, old validation status, stale local paths, duplicate roundtables, or outdated file lists.
4. **No-fake risk** — no language that allows mocked providers, fake routes, skeleton adapters, no-op controls, in-memory durability claims, or placeholder success states as implemented product behavior.
5. **Edge coverage** — concrete stop conditions, failure modes, edge cases, tests, validation evidence, provider/persistence/security boundaries where relevant.
6. **Action** — `KEEP`, `TIGHTEN`, `MERGE`, `DELETE`, `REWRITE`, or `BLOCK`.

## Package edge checks
- `scopeBoundary`: selected scope and excluded capabilities are explicit.
- `stopConditions`: clear blockers and fail-fast conditions exist.
- `statePersistence`: persistence/durability claims are backed by restart/read proof or marked N/A.
- `routeControlReality`: UI/routes/controls are real or excluded; no route-shaped placeholders.
- `providerBoundary`: real providers are gated and verified; mocks only in test/demo fixtures.
- `qaEvidence`: tests/build/runtime/browser/eval evidence exists or status is honest.
- `securitySafety`: secrets, auth, permissions, external writes, abuse cases covered where relevant.
- `excludedCapabilities`: hard capabilities are excluded rather than faked.
- `noContextRot`: package has no stale public paths, duplicate obsolete docs, old validation claims, or confusing history.

## Verdicts
- `PASS`: all package edge checks pass; no high/blocker actions.
- `PASS_WITH_WARNINGS`: only low/medium tightening items.
- `FIX_REQUIRED`: high-severity rewrite/tighten/merge/delete items remain.
- `BLOCKED`: blocker issue risks fake implementation or broken package truth.
