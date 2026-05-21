# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Preconditions

- Discovery has run.
- Scope is selected or full-suite is explicitly requested.
- Source evidence exists for included capabilities or blockers are recorded.
- Sensitive surfaces have required hardening artifact requirements.

## Required Selected Output

For medium, large, or full-suite scope:

```text
selected-buildprint/
  BUILDPRINT.md
  CAPABILITY_INDEX.md
  CONTRACTS.md
  VERIFICATION.md
  EXECUTION_PROTOCOL.md
  PRE_IMPLEMENTATION_QUESTIONS.md
  IMPLEMENTATION_PLAN.md
  CURRENT_STATE.md
  manifest.json
  capabilities/<capability-id>/
    CAPABILITY.md
    VERIFICATION.md
    IMPLEMENTATION.md
    CONTRACTS.md  # only when local contracts are needed
```

For genuinely small scopes, a flat package may use `CAPABILITIES.md` instead of capability packs.

## Extraction Rules

- Convert source facts into source-independent behavior contracts.
- Do not preserve source internals unless externally observable or qualification-relevant.
- Preserve the selected/requested capability surface. Do not convert “hard to prove,” “risky,” “external,” “destructive,” “provider-backed,” or “not first slice” into omission.
- Classify every capability as `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK`.
- Use `OUT_OF_SCOPE_BY_USER_ONLY` only for explicit user exclusions or explicit selected-target boundaries; lack of proof is not enough.
- Include stable-vs-free boundaries for every capability.
- Include first implementation slice and first verification gate for every included capability. Implementation slicing is not scope shrinking.
- Include a per-capability depth matrix for every medium, large, or full-suite output with columns for UI/UX, API, domain logic, persistence/state, provider/runtime, failure states, tests, proof, and depth status.
- Include an architecture topology gate for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy outputs. The gate must reject mostly single-file backends, one-file static UI shells, route-shaped endpoints, and seam-only adapters as product-quality implementation unless explicitly justified as tiny scope.
- Browser/UI products require browser proof or an explicit blocker. Static text/label presence is not enough.
- Provider-backed or runtime-heavy products require live/sandbox proof or explicit blocker. Deterministic adapters preserve contract shape only and must be marked `CONTRACT_SEAM_ONLY` until provider/runtime proof exists.
- Use depth statuses: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, `FAKE_OR_PLACEHOLDER_FAIL`.
- Emit implementation signals for the downstream harness: user-facing UI, uploads, external providers, long-running jobs, graph persistence, simulation/runtime execution, reports, auth/admin, destructive controls, deployment surface, and recommended review specialties.
- Generate `PRE_IMPLEMENTATION_QUESTIONS.md` with at most five blocking questions that materially affect security, scope, provider behavior, persistence, deployment, or qualification status. Do not ask how good the implementation should be; max-quality is mandatory.
- `HANDOFF.md` and `EXECUTION_PROTOCOL.md` must require the implementation agent to read `PRE_IMPLEMENTATION_QUESTIONS.md` before coding, ask unresolved blockers, record safest max-quality defaults in `CURRENT_STATE.md`, and choose an implementation team/passes from the Buildprint signals.
- Keep unresolved questions out of files that claim implementation readiness.
- Mark selected output `SELECTED_UNQUALIFIED` until proof exists.

## Forbidden Defaults

Do not create default `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, `IMPLEMENTATION_COMPLETENESS.md`, `PHASE_PLAN.md`, or `LOOP_GATES.md`.
