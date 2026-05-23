# Capability <n> — <build target>

## Build target

Describe the concrete vertical behavior that must exist after this capability.

## Why this capability exists

- Product obligation: OBL-<id>
- Source surface: SRC-<id>
- Source evidence: OBSERVED(<path>:<line-or-section>)

## Required global context

- `00-intent/product-obligations.md`
- `01-operating-model/stop-rules.md`
- `02-context/team-stack.yaml`
- `08-evaluation/claim-upgrade-rules.yaml`
- `09-evidence/evidence-ledger.schema.json`

## Required teams and gates

- product-architect: preserve workflow, dependencies, and product depth.
- test-and-verification: require proof command, negative test, and evidence row.
- ux-ui-craft: required when this capability has user-facing UI.
- integration-runtime: required when this capability uses APIs, jobs, providers, or async runtime.
- data-persistence: required when this capability owns durable state, import/export, reports, or history.
- security-boundary: required when this capability touches uploads, secrets, auth/admin, destructive actions, provider logs, or public deployment.

## User-visible outcome

State what a user can do and observe.

## System and architecture obligations

List concrete API/service/provider/storage/job seams and forbidden shortcuts.

## UI obligations

List required states and browser proof when UI-bearing; otherwise say `not UI-bearing`.

## Inputs

List user, system, file, provider, and state inputs.

## Outputs and downstream handoff

List persisted data, events, artifacts, API responses, and what later capabilitys consume.

## Implementation path

1. Implement the smallest real vertical path.
2. Add failure/negative behavior.
3. Add persistence/runtime readback where claimed.
4. Run proof gates.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

## Stop rules

- Stop instead of faking live provider, durable persistence, browser proof, destructive action, security, or source-independent implementation evidence.
- Stop if required evidence cannot be produced and write a blocker row.

## Proof gate

- Proof id: <proof-id>
- Required proofs: clean_room_implementation_trace, no_fake_scan_pass, plus capability-specific runtime/browser/persistence/security proofs.
- Negative tests: <negative-test>
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `09-evidence/evidence-ledger.jsonl`
- Claim rules: `08-evaluation/claim-upgrade-rules.yaml`

## Unlocks

- Next capability: <next-slice-id-or-none>
- Unlock only after evidence rows satisfy this capability proof gate or blocker rows preserve the scope honestly.
