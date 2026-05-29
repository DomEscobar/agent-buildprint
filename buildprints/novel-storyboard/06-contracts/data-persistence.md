# Data Persistence Contract

## Role

Ensure board, episode, storyboard, asset, media and runtime state are durable and recoverable.

## Requirements

- FlowData is persisted by project and episode.
- Storyboard order is durable.
- Media generation state includes pending, success, failure and error reason.
- Provider job IDs and generated artifact references are stored server-side.
- Restart/reload proof is required before claiming persistence.

## Must Reject

- In-memory-only stores counted as product persistence.
- Losing node/storyboard order after reload.
- Media URLs without ownership/project linkage.
- Silent save failures.

## Review Gate

Run persistence roundtrip tests across process restart and record before advancing past Phase 2 or Phase 5.
