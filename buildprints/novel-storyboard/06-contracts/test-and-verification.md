# Test And Verification Contract

## Role

Turn each phase claim into rerunnable proof.

## Required Proof Types

- `browser_runtime_trace` for Canvas and visible workflow behavior.
- `persistence_roundtrip` for flow save/reload/restart.
- `agent_runtime_trace` for socket, chat, XML/event and stop behavior.
- `provider_integration_proof` for fake-provider contract and live-provider blocker/proof.
- `security_boundary` for auth/session/secret/destructive-route checks.
- `production_readiness` for build/start/deploy smoke.

## Evidence Rules

Every pass needs command output or artifact paths. Summaries, reviews and screenshots without commands are not enough.

## Must Reject

- Fake provider success counted as live proof.
- In-memory state counted as durable persistence.
- Static markup counted as browser workflow proof.
- Manual inspection without recorded artifact path.

## Review Gate

No phase advances until evidence is written to `.buildprint/evidence/evidence-ledger.jsonl` with the current `phase_id`.
