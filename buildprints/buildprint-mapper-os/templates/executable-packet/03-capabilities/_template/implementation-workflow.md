# Implementation Workflow

1. Build the first real vertical slice.
2. Run the capability proof contract.
3. Record proof or blocker rows in `.buildprint/evidence/evidence-ledger.jsonl`; do not mutate `.buildprint/snapshots/09-evidence/evidence-ledger.jsonl`.
4. Consult `03-capabilities/capability-index.yaml` only after the active proof closes.
