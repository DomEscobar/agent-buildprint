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

## Capability Proof Ledger

Every included capability must close here before final handoff. Closing means either direct proof exists or the blocker is explicit and the capability is not promoted.

| Capability | Required proof | Command/API/browser path | Artifact path | Negative test | Runtime/browser evidence | Status | Blocker |
|---|---|---|---|---|---|---|---|
|  | missing | missing | missing | missing | missing | missing |  |

## Evidence Budget Rule

For each included capability:

- At least one direct proof command/API/browser path is required, unless the row is explicitly `BLOCKED_WITH_REASON`.
- At least one proof artifact path is required: test log, route/API output, screenshot, browser trace, generated report, restart/readback log, provider transcript, or reviewer report.
- At least one negative/failure-state test is required when the capability uploads files, mutates state, uses auth/admin/destructive controls, calls providers, starts/stops runtime jobs, writes memory/graphs, exports data, or affects privacy/security.
- UI/frontend claims require browser automation, screenshot, or trace proof. Static markup or labels alone keep the capability at `CONTRACT_SEAM_ONLY`.
- Persistence claims require restart/readback/delete/export proof where applicable. File existence alone keeps broad persistence claims at `CONTRACT_SEAM_ONLY`.
- Provider/runtime claims require sandbox/live provider proof with secrets redacted, or explicit blocker. Deterministic adapters and local fallbacks preserve contracts only.
- Security/admin/destructive claims require positive and negative authorization/confirmation tests or remain unqualified.
- Broad/full-suite outputs should have proof coverage proportional to capability count. A small number of tests cannot qualify many independent capabilities unless each capability has separate API/browser/runtime evidence.

## Qualification Blockers

- Missing gate results block qualification.
- Missing evidence for included behavior blocks qualification.
- Missing Capability Proof Ledger rows for included capabilities block qualification.
- Missing proof command, proof artifact, negative test, runtime/browser evidence, or promotion blocker fields block promotion unless an explicit blocker explains why.
- Missing architecture topology evidence blocks medium, large, UI-bearing, provider-backed, or full-suite qualification.
- A route-shaped endpoint, static shell, deterministic adapter, or skeleton provider is `CONTRACT_SEAM_ONLY` unless product behavior is proven.
- Unresolved high/critical security risks block qualification.
- Secret leakage blocks qualification.
