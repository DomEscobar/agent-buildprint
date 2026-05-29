# Test And Verification Contract

## When Active

Use this role in every phase to define deterministic proof, no-fake checks, and evidence readiness.

## Handoff Scope

- Map phase claims to tests and runtime proof.
- Separate unit, integration, persistence, worker, provider, browser, accessibility, and visual checks.
- Ensure runtime evidence is written only after phase-flow artifacts exist.

## Reject If

- Passing typecheck is treated as product proof.
- Fake providers are counted as live provider proof.
- Browser screenshots are missing for UI-bearing claims.
- Persistence or restart roundtrip is untested where durability is claimed.
- Evidence goes into packaged `05-evidence/evidence-ledger.jsonl` instead of `.buildprint/evidence/evidence-ledger.jsonl`.

## Required Return Headings

- Proof Matrix
- Tests Run
- Tests Missing
- No-Fake Findings
- Evidence Rows To Append
- Blockers

## Proof/Evidence Expectations

Each evidence row must include `phase_id`, command or action, result, artifact path, environment, and proof summary.
