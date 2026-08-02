# Verify

## Required structural checks

- Kernel packet files exist per capability.yaml packet_shape
- `agb packet check` on example capability packets passes

## Runtime checks

- Example capability packets validate under the current CLI

## Blocked checks

- Live host install of examples is out of scope for the standard packet itself

## Pass condition

Standard is valid when schemas and example packets pass structural checks. Write `.buildprint/capability-receipt.md` notes for any claimed example proof. Record not-proven and blockers honestly. Reconcile assumptions with proof and downgrade claim ceiling when partial. Proof level must match evidence.
