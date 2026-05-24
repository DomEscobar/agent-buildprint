# Phase 01 — Instance Auth, Config, and Provider Setup

## Product outcome

A bootable self-hosted instance with admin auth, persisted app data, safe provider-key configuration, runtime mode disclosure, and local/cloud provider selection.

## Source evidence

- `README.md` documents Docker/Electron entrypoints, admin auth env vars, provider env vars, local app_data storage, and BYOK mode.
- `servers/fastapi/api/v1/auth/router.py` defines auth routes under `/api/v1/auth`.
- `servers/fastapi/utils/simple_auth.py` owns session token creation/validation.
- `servers/fastapi/utils/get_env.py` and provider config utilities define environment/provider resolution.
- `servers/nextjs/components/Auth/AuthGate.tsx`, `LLMSelection.tsx`, and provider config components expose auth/config UX.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Source surface dispositions

- Source surface: `SRC-AUTH-CONFIG-PROVIDERS` from `02-project-setup.md`.
- Target disposition: preserve unless `02-project-setup.md` explicitly says merge/defer/drop for a sub-surface.
- Target contract: preserve the capability and user/API outcome without forcing route/function parity.
- Compatibility impact: source path and route names are evidence anchors only, not route/function parity.
- Blocker rule: if the capability cannot be preserved in the target architecture, record a blocker instead of silently narrowing scope.

## Implementation scope

- Admin/session auth setup and protected app shell.
- Provider selection/config for text LLMs and image providers.
- Persistent app data roots for user config, presentations, assets, and generated files.
- Disclosure of deterministic/local/live provider mode in UI/API responses where generation is claimed.

1. Implement the smallest real source-independent vertical path for this phase.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: instance-auth-config-provider-setup`.

Inputs:
- Inputs are defined by the product obligation and interface contracts.

Outputs/downstream handoff:
- Outputs are defined by the product obligation and interface contracts.

Downstream phases may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- Auth endpoints and session cookie/header middleware.
- Provider config endpoints or server actions.
- App config store, env loader, startup health check, and runtime-mode endpoint.

## State/runtime touched

- user config, session secret, provider config, app data directory, database connection, generated asset roots.
- migrations/startup must not erase existing app data.

Boundary requirements:
- Preserve provider, persistence, security, export, file-upload, and no-fake boundaries from the package contracts.

## UX/UI requirements

Use the inline UX/UI requirements in this phase. Any `browser_runtime_trace` proof must include `ux_design_gate` and `screenshot_state_set` coverage for the relevant empty/loading/error/blocked/success states, or an explicit blocker row.

## Safety/security constraints

- Preserve auth/privacy/tenant boundaries if present.
- Never expose secrets in logs, UI, screenshots, reports, generated decks, provider requests, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, SSRF/file-path traversal risk, or missing browser/runtime evidence.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide browser/screenshot proof or an honest blocker.
- For persistence/provider/export behavior, prove readback/live mode or record a blocker.

## Proof gate

- Proof id: proof-instance-auth-config-provider-setup
- Required proof types:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip_or_blocker
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_integration_proof_or_blocker
  - persistence_roundtrip_or_blocker
  - security_boundary_review_or_blocker
  - clean_room_implementation_trace
  - no_fake_scan_pass
- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, auth/upload/export failure where applicable, and phase safety/security constraints.
- Runtime evidence ledger: runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: instance-auth-config-provider-setup` and write to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`, not the packaged seed ledger.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `05-evidence/evidence-ledger.jsonl`
