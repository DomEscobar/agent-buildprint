# Verification: Graph Builder And Visualization

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | graph task creates graph id and nodes/edges | missing |  |
| contract test | adapter contract is exercised | missing |  |
| runtime/API/browser | graph API and UI render | missing |  |
| persistence/restart | task/graph id reload | missing |  |
| team-pack gates | selected teams have proof or blocker | missing |  |
| no-fake | no static graph completion | missing |  |

## Blockers

- Implementation not built.
- Zep sandbox optional but not supplied.

## Proof Ledger

| Required proof | Command/API/browser path | Artifact | Negative test | Runtime/browser evidence | Status | Blocker |
|---|---|---|---|---|---|---|
| graph build | `npm test -- graph-builder` | `artifacts/graph-builder-report.json` | missing provider key, failed task | graph screenshots | missing | needs implementation |

## Team-Pack Proof

| Team | Required proof | Evidence | Status | Blocker |
|---|---|---|---|---|
| product-architect | graph topology |  | missing |  |
| ux-ui-craft | graph screenshots |  | missing |  |
| test-and-verification | task tests |  | missing |  |
| integration-runtime | Zep adapter proof |  | missing |  |
| security-boundary | destructive control proof |  | missing |  |
| data-persistence | graph readback |  | missing |  |
