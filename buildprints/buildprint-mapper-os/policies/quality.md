# Mapper OS Quality Policy

Mapper OS optimizes for correctness over impressive output.

## Quality Invariant

A Mapper OS output is acceptable only when:

- scanner hints remain non-authoritative;
- every observed claim has source evidence;
- capability boundaries are product-behavior boundaries, not folder boundaries;
- included capabilities have contracts, verification, no-fake checks, execution slices, and a recorded implementation depth status;
- scope preservation is not enough: selected outputs must also preserve quality/depth by distinguishing real implementation from contract seams, blockers, and fake placeholders;
- medium, large, UI-bearing, provider-backed, or full-suite outputs include an architecture topology gate instead of accepting flat route/static-shell prototypes as product-quality implementation;
- missing evidence is marked `QUESTION`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, or `INCLUDED_RISKY_REQUIRES_HARDENING`;
- capabilities are excluded only by explicit user decision or selected-target boundary, never because they are hard to prove;
- explicitly user-excluded capabilities are not replaced with placeholders;
- qualification wording matches the actual evidence.

## Evidence Policy

- Cite source path and line or section for every `OBSERVED` claim.
- Mark synthesis as `INFERRED`.
- Mark missing behavior as `QUESTION`, `INCLUDED_NEEDS_PROOF`, or `INCLUDED_BLOCKED`.
- Mark risky sensitive behavior as `INCLUDED_RISKY_REQUIRES_HARDENING` when it remains in requested scope but needs hardening/proof.
- Mark removed capabilities as `OUT_OF_SCOPE_BY_USER_ONLY` only when the user or selected target boundary explicitly excludes them.
- Treat absence as a claim requiring searched surfaces and residual uncertainty.

## No-Fake Policy

Block qualification on:

- placeholder routes;
- route-shaped links;
- no-op controls;
- fake success states;
- skeleton adapters;
- deterministic provider/runtime adapters counted as live/provider-qualified implementation;
- static UI shells counted as browser-proven product UX;
- single-file or flat architecture counted as product architecture for medium, large, UI-bearing, provider-backed, or full-suite scope without explicit justification;
- production-path mocks;
- in-memory-only persistence where persistence is claimed;
- unresolved high/critical security risks;
- missing hardening artifacts for sensitive surfaces.

## Execution Policy

Each included capability must include:

- implementation depth status: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `FAKE_OR_PLACEHOLDER_FAIL`;
- first implementation slice;
- first verification gate;
- topology/proof expectations for UI, API, domain logic, persistence/state, provider/runtime, failure states, tests, and proof;
- repair-loop instruction;
- fresh-review trigger when risky;
- stop/escalation condition;
- evidence required for qualification.
