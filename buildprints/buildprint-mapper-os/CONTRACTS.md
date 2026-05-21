# Mapper OS Contracts

## Claim States

- `CENSUS_HINT`: scanner or inventory hint only.
- `PENDING_AGENT_DISCOVERY`: source reading is required before the claim can guide implementation.
- `OBSERVED`: directly grounded in source path and line or section evidence.
- `INFERRED`: synthesis from observed facts; not a hard requirement unless confirmed.
- `QUESTION`: unresolved decision or ambiguity.
- `BLOCKED`: cannot be promoted with current evidence.
- `OUT_OF_SCOPE`: intentionally excluded.

## Capability Readiness States

- `INCLUDED_READY`: selected/requested and has enough behavior contract plus verification oracle for implementation.
- `INCLUDED_NEEDS_PROOF`: selected/requested but runtime, provider, test, browser, persistence, or reversal proof is missing.
- `INCLUDED_BLOCKED`: selected/requested but cannot be implemented safely until a blocker is resolved.
- `INCLUDED_RISKY_REQUIRES_HARDENING`: selected/requested and security/privacy/destructive/provider/deployment risk requires hardening artifacts and review before qualification.
- `OUT_OF_SCOPE_BY_USER_ONLY`: excluded only by explicit user decision or explicit selected-target boundary; lack of proof alone is not enough.
- `TEST_ONLY_MOCK`: allowed only under test/demo fixture boundaries.

## Qualification Labels

- `DISCOVERY_ONLY`: no selected implementation package exists.
- `SELECTED_UNQUALIFIED`: selected package exists but source-independent qualification proof is incomplete.
- `QUALIFIED_SOURCE_INDEPENDENT`: selected package can be implemented without reopening source and has required evidence.

## Capability Depth States

- `REAL_IMPLEMENTED`: selected capability is wired through the applicable UI/API/domain/service/provider/storage/task boundaries, has failure states, and has tests plus proof evidence.
- `CONTRACT_SEAM_ONLY`: contracts, routes, UI labels, adapters, schemas, or task records exist, but real behavior, provider/runtime execution, persistence, browser proof, or production hardening is missing.
- `BLOCKED_WITH_REASON`: selected/requested capability remains in scope but cannot be safely implemented or qualified until a named blocker is resolved.
- `OUT_OF_SCOPE_BY_USER_ONLY`: excluded only by explicit user decision or explicit selected-target boundary.
- `FAKE_OR_PLACEHOLDER_FAIL`: skeleton adapter, route-shaped endpoint, no-op control, fake success state, static-only UX claim, or mock counted as product behavior. This blocks qualification.

## Required Selected Manifest Fields

- source URL or local input;
- source checkout path;
- source commit SHA when available;
- generation timestamp;
- output mode;
- discovery status;
- qualification status;
- production posture;
- mock policy;
- no-fake scan status;
- completeness score with rubric, denominator, threshold, blocker overrides, and per-capability contribution;
- capability readiness counts.

## Traceability Contract

Traceability lives per capability:

```text
capability requirement
-> source evidence
-> Buildprint contract
-> implementation check
-> QA or reversal check
```

Missing evidence, missing gate applicability, missing verification result, or unresolved `QUESTION` markers block qualification.

## No-Fake Contract

The following never count as production behavior:

- mock providers outside test/demo scope;
- fixtures counted as product paths;
- skeleton adapters;
- placeholder routes;
- route-shaped links without handlers/pages;
- no-op controls;
- fake success states;
- in-memory-only persistence where persistence is claimed;
- deterministic provider/runtime adapters counted as live/provider-qualified behavior;
- static UI labels counted as browser/user-flow proof;
- mostly single-file/flat architecture counted as product architecture for medium, large, UI-bearing, provider-backed, stateful, or full-suite scope without explicit justification.

## Source-Independence Contract

Source is allowed during mapping, distillation, and qualification. A `QUALIFIED_SOURCE_INDEPENDENT` package must be implementable from generated Buildprint files alone.
