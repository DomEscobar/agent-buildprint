# CAPABILITY_INDEX

This file is the traffic controller for the downstream coding agent. The agent should use this file plus `CURRENT_STATE.md` to choose exactly one capability pack to load next; it should not read all packs upfront.

| Capability | Status | Required teams | Source evidence | Product obligation | Required topology | Topology status | UI/UX status | API | Domain logic | Persistence/state | Provider/runtime | Failure states | Proof command | Proof artifact | Negative test | Runtime/browser evidence | Depth status | Promotion blocker | Dependencies | Pack | Verification | Blockers |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  | INCLUDED_READY / INCLUDED_NEEDS_PROOF / INCLUDED_BLOCKED / INCLUDED_RISKY_REQUIRES_HARDENING / OUT_OF_SCOPE_BY_USER_ONLY / TEST_ONLY_MOCK | test-and-verification | missing | missing | missing | missing | not-applicable / missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing | missing |  | capabilities/<id>/ | missing |  |

## Completeness

- Included count:
- Excluded count:
- Blocked count:
- Test-only mock count:
- Production completeness score:
- Real implemented count:
- Contract seam only count:
- Blocked with reason count:
- Fake/placeholder fail count:
- Threshold:
- Blocker overrides:

## Depth Status Rule

- `REAL_IMPLEMENTED`: user-visible/API behavior is wired through domain/service/state/provider boundaries as applicable, with tests and proof.
- `CONTRACT_SEAM_ONLY`: contract, route, adapter, or UI affordance exists, but real behavior/provider/runtime/persistence/browser proof is missing.
- `BLOCKED_WITH_REASON`: capability remains selected/requested but cannot be safely implemented until a named blocker is resolved.
- `OUT_OF_SCOPE_BY_USER_ONLY`: excluded only by explicit user decision or selected-target boundary.
- `FAKE_OR_PLACEHOLDER_FAIL`: no-op control, fake success state, skeleton adapter, static-only claim, or unproven mock counted as implementation; this blocks qualification.

## Traceability Rule

Each included capability must trace:

```text
requirement -> source evidence -> Buildprint contract -> implementation check -> QA or reversal check
```

## Evidence Contract Rule

Each included capability must carry a concrete evidence contract, not only an implementation label.

- `Source evidence` must cite observed source files, routes, screens, jobs, docs, configs, or explicitly recorded inference/blocker evidence from discovery.
- `Product obligation` must state the externally meaningful behavior the clean-room implementation must preserve.
- `Required teams` must match `TEAM_STACK.md` and include every selected team that owns a gate for the capability.
- `Required topology` must name the layers/files/classes/modules expected for broad scopes: UI, API, service/domain, provider/runtime, persistence/state, task/job, security, or tests as applicable.
- `Topology status` must be `ready`, `blocked`, `tiny-scope-justified`, or `missing`. Medium/large/full-suite outputs cannot use `missing`.
- `UI/UX status` must reference `UX_CONTRACT.md` for UI-bearing capabilities or say `not-applicable`.
- `Proof command` must be an executable command, API/browser path, or explicit `BLOCKED_WITH_REASON` entry.
- `Proof artifact` must be a file path, screenshot path, report path, test log, route inventory, or explicit blocker artifact.
- `Negative test` is required for uploads, auth/admin, destructive actions, provider calls, runtime/job controls, persistence mutations, and security boundaries.
- `Runtime/browser evidence` is required for frontend, browser, provider, runtime, deployment, and persistence/restart claims; otherwise the capability remains `CONTRACT_SEAM_ONLY` or `BLOCKED_WITH_REASON`.
- `Promotion blocker` must say what exact missing proof prevents `REAL_IMPLEMENTED` promotion. Do not leave it blank for any non-`REAL_IMPLEMENTED` included capability.

## Role Consumption Rule

The capability index is the handoff spine between roles:

```text
source mapper fills Source evidence -> product-architect fills Product obligation and Required topology -> ux-ui-craft fills UI/UX status when selected -> test-and-verification fills Proof command/artifact/Negative test -> reviewer decides Depth status and Promotion blocker
```

If a downstream role cannot consume an upstream field, stop and repair the field instead of guessing.

## Team-Pack Rule

`TEAM_STACK.md` selects the quality lenses for the package. Each included capability must list the selected teams that own its gates:

- `product-architect`: topology, boundaries, and first real vertical slice.
- `ux-ui-craft`: UI workflow quality, responsive behavior, and browser proof.
- `test-and-verification`: proof ledger, negative tests, and no-fake claims.
- `integration-runtime`: provider/API/runtime/side-effect boundaries.
- `security-boundary`: auth, admin, user-data, payment, destructive, secret, or deployment boundaries.
- `data-persistence`: durable state, import/export, reporting, restart/readback, and data lifecycle.

## Capability Pack Completeness Rule

Every included capability listed here must have:

- `capabilities/<id>/CAPABILITY.md`
- `capabilities/<id>/IMPLEMENTATION.md`
- `capabilities/<id>/VERIFICATION.md`

If any sibling file is missing, the selected package is invalid and must not be handed to an implementation agent.
