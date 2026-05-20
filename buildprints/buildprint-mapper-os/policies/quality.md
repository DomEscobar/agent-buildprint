# Mapper OS Quality Policy

Mapper OS optimizes for correctness over impressive output.

## Quality Invariant

A Mapper OS output is acceptable only when:

- scanner hints remain non-authoritative;
- every observed claim has source evidence;
- capability boundaries are product-behavior boundaries, not folder boundaries;
- included capabilities have contracts, verification, no-fake checks, and execution slices;
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
- production-path mocks;
- in-memory-only persistence where persistence is claimed;
- unresolved high/critical security risks;
- missing hardening artifacts for sensitive surfaces.

## Execution Policy

Each included capability must include:

- first implementation slice;
- first verification gate;
- repair-loop instruction;
- fresh-review trigger when risky;
- stop/escalation condition;
- evidence required for qualification.
