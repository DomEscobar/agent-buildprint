# Verification: Simulation Setup

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | simulation config generated and persisted | missing |  |
| contract test | config schema validates | missing |  |
| runtime/API/browser | setup API/UI works | missing |  |
| persistence/restart | config reloads | missing |  |
| team-pack gates | selected teams have proof or blocker | missing |  |
| no-fake | no static profiles counted as generated | missing |  |

## Proof Ledger

| Required proof | Command/API/browser path | Artifact | Negative test | Runtime/browser evidence | Status | Blocker |
|---|---|---|---|---|---|---|
| simulation setup | `npm test -- simulation-setup` | `artifacts/simulation-setup.json` | empty graph blocks prepare | setup screenshots | missing | needs implementation |

## Team-Pack Proof

| Team | Required proof | Evidence | Status | Blocker |
|---|---|---|---|---|
| product-architect | setup topology |  | missing |  |
| ux-ui-craft | setup screenshots |  | missing |  |
| test-and-verification | config tests |  | missing |  |
| integration-runtime | provider adapter proof |  | missing |  |
| security-boundary | redaction proof |  | missing |  |
| data-persistence | config readback |  | missing |  |
