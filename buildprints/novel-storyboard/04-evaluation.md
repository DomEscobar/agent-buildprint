# Evaluation

Claim status: `PROOF_REQUIRED`

## Promotion Gates

| Gate | Required proof concept | Pass condition |
|---|---|---|
| Browser runtime | browser_runtime_trace | Canvas board renders, interacts and screenshots cleanly on desktop and narrow viewport. |
| Provider integration | provider_live | Live provider call succeeds with safe credentials, or blocker remains explicit and fake-provider proof is not promoted. |
| Persistence | durable_persistence | Flow data and media state survive reload and backend restart. |
| Security | security_boundary | Auth protects API/socket, default credentials are mitigated, secrets are not exposed, destructive routes are guarded. |
| No fake | no_fake | No static canvas mock, in-memory persistence, fake provider success, no-op controls or skeleton adapters count as product behavior. |
| Runtime/deployment | production_readiness | Build/start/deploy smoke proof serves browser app with API/socket and health/readiness. |

## Required Evidence Rows

Runtime proof must be recorded under `.buildprint/evidence/evidence-ledger.jsonl`, not by editing this packet seed.

Required `phase_id` rows:

- `01-canvas-workbench`
- `02-flow-persistence`
- `03-production-agent-loop`
- `04-media-generation`
- `05-webapp-runtime`

## Qualification Rule

Do not promote to `QUALIFIED_SOURCE_INDEPENDENT` until every gate passes with rerunnable command output or artifact paths. If live provider credentials are absent, provider-live proof remains blocked and the packet remains `PROOF_REQUIRED`.
