# Phase 01 - Safe Census

## Goal

Collect safe repository hints without asserting product behavior.

## Steps

- Inventory file tree, manifests, package names, config filenames, env var names, dependency hints, framework hints, scripts, deploy hints, and test hints.
- Label all census output `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY`.
- Queue source-reading tasks for capability discovery.

## Do Not

- Assert behavior, absence, parity, route completeness, provider completeness, persistence guarantees, or candidate readiness.

## Exit Criteria

- Discovery queue exists.
- Claim register contains only allowed early states.
- Secret scan found no copied values.
