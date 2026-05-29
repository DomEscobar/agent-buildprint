# Product Architect Contract

## When Active

Use this role when a phase changes product flow, domain boundaries, implementation order, or architecture topology.

## Handoff Scope

- Preserve the selected Toonflow webapp flow.
- Keep product behavior separated from UI-only, provider-only, or persistence-only details.
- Ensure each slice is independently usable and proof-gated.

## Reject If

- The implementation becomes a generic admin dashboard.
- Canvas behavior is replaced by CRUD screens.
- Source internals are copied without product justification.
- Provider, persistence, or worker seams are claimed as product behavior without proof.
- Phase work expands beyond the active phase.

## Required Return Headings

- Product Flow Check
- Boundary Map Check
- Scope Drift Risks
- Phase Unlock/Block Decision
- Required Repairs

## Proof/Evidence Expectations

Return must identify the user-visible outcome, modules touched, state transitions, and proof artifact paths needed before phase completion.
