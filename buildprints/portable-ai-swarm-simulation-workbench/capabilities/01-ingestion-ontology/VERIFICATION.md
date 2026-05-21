# Verification: Source Ingestion And Ontology

| Check | Expected result | Status | Evidence |
|---|---|---|---|
| first slice | upload fixture persists project and ontology | missing |  |
| contract test | ontology schema validates | missing |  |
| runtime/API/browser | API and upload screen work | missing |  |
| persistence/restart | project reloads after restart | missing |  |
| team-pack gates | selected teams have proof or blocker | missing |  |
| no-fake | no static ontology counted as live | missing |  |

## Blockers

- Implementation not built.
- Provider mode not selected.

## Proof Ledger

| Required proof | Command/API/browser path | Artifact | Negative test | Runtime/browser evidence | Status | Blocker |
|---|---|---|---|---|---|---|
| upload ontology | `npm test -- ingestion-ontology` | `artifacts/ingestion-ontology.json` | unsupported extension, malformed LLM JSON | upload screenshots | missing | needs implementation |

## Team-Pack Proof

| Team | Required proof | Evidence | Status | Blocker |
|---|---|---|---|---|
| product-architect | first slice topology |  | missing |  |
| ux-ui-craft | upload screenshots |  | missing |  |
| test-and-verification | tests and artifacts |  | missing |  |
| integration-runtime | LLM adapter proof |  | missing |  |
| security-boundary | upload/security negative proof |  | missing |  |
| data-persistence | restart/readback |  | missing |  |
