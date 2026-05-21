# VERIFICATION

Qualification label: `SELECTED_UNQUALIFIED`

## Verification Ladder

| Gate | Applies? | Command/API entry | Expected result | Status | Evidence |
|---|---|---|---|---|---|
| static/build | yes/no |  |  | missing |  |
| unit/contract | yes/no |  |  | missing |  |
| architecture topology | yes/no | tree/module inspection plus rationale | medium/large/full-suite scopes have separated UI/API/domain/service/provider/storage/task topology or an explicit blocker | missing |  |
| capability depth matrix | yes | `CAPABILITY_INDEX.md` depth columns reviewed | every included capability is `REAL_IMPLEMENTED` or honestly `CONTRACT_SEAM_ONLY`/`BLOCKED_WITH_REASON`; no fake completion | missing |  |
| runtime/API/browser | yes/no |  |  | missing |  |
| browser/UI proof | yes/no | screenshots or browser automation for each user-facing flow | UI states, navigation, empty/loading/error/blocked/ready states verified beyond static text presence | missing |  |
| persistence/restart | yes/no |  |  | missing |  |
| provider/runtime proof | yes/no | sandbox/live adapter run or explicit blocker | provider-backed/runtime capabilities either pass with redacted evidence or remain unqualified/blocked | missing |  |
| no-fake scan | yes |  | zero critical findings | missing |  |
| security/privacy | yes/no |  |  | missing |  |
| clean-room reversal | yes/no |  |  | missing |  |

## Qualification Blockers

- Missing gate results block qualification.
- Missing evidence for included behavior blocks qualification.
- Missing architecture topology evidence blocks medium, large, UI-bearing, provider-backed, or full-suite qualification.
- A route-shaped endpoint, static shell, deterministic adapter, or skeleton provider is `CONTRACT_SEAM_ONLY` unless product behavior is proven.
- Unresolved high/critical security risks block qualification.
- Secret leakage blocks qualification.
