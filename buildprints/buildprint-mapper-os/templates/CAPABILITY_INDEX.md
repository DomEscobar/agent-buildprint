# CAPABILITY_INDEX

| Capability | Status | UI/UX | API | Domain logic | Persistence/state | Provider/runtime | Failure states | Tests | Proof | Depth status | Dependencies | Pack | Verification | Blockers |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  | INCLUDED_READY / INCLUDED_NEEDS_PROOF / INCLUDED_BLOCKED / INCLUDED_RISKY_REQUIRES_HARDENING / OUT_OF_SCOPE_BY_USER_ONLY / TEST_ONLY_MOCK | missing | missing | missing | missing | missing | missing | missing | missing | missing |  | capabilities/<id>/ | missing |  |

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
