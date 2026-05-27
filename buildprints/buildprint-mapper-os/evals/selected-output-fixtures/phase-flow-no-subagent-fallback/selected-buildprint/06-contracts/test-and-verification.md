# Test And Verification Contract

## When Active

Use this role for every phase.

## Handoff Scope

- Active phase proof gate.
- `04-evaluation.md`.
- `05-evidence/evidence-ledger.schema.json`.
- Commands, tests, browser traces, runtime artifacts, and evidence rows created for the active phase.

## Reject If

- A phase is marked passed from code edits, static text, screenshots-only proof, review prose, or generic smoke tests.
- Evidence rows upgrade claims broader than the command or artifact actually proves.
- `no_fake_scan_pass`, browser/e2e, security, worker, data-lifecycle, or live-provider labels appear without matching executable proof or a non-upgrading blocker.
- A blocker row uses `upgrades_claim: true`.

## Required Return Headings

- `## Verdict`
- `## Commands run`
- `## What passed`
- `## What this does not prove`
- `## Negative cases`
- `## Evidence row check`
- `## Claim limits`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Apply the evidence ceiling rule: static text proves copy only; build/import proves syntax only; mocks prove contract shape only; deterministic providers prove local seams only; screenshots prove rendering only; live and production claims need matching runtime proof.
