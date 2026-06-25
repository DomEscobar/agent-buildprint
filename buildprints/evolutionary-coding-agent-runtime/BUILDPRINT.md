# BUILDPRINT: evolutionary-coding-agent-runtime

This is a bounded capability, not a whole-product Buildprint. It grafts an AlphaEvolve / CodeEvolve style evolutionary improvement loop onto an existing coding-agent host app or framework.

## Read Order

Read and execute in this order:

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `00-assessment-questions.md`
6. `01-integration-plan.md`
7. `apply.md`
8. `verify.md`

No source edits before host assessment and capability plan. The applying agent must first inspect the host, classify findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`, record the decision path, and block when the fitness function, sandbox boundary, or mutation scope is not clear.

## What This Capability Adds

- Population storage for candidate agent/program variants.
- LLM mutation over bounded code zones using patch or SEARCH/REPLACE style diffs.
- Deterministic fitness evaluation in a sandbox with time and memory limits.
- Selection, archive, and optional island migration.
- Lineage, score, cost, and failure receipts.
- Claim ceiling rules that prevent calling a system self-improving without benchmark evidence.

## Hard-stop Conditions

Stop before implementation when:

- the host has no deterministic benchmark, test suite, or measurable fitness signal;
- candidate execution cannot be sandboxed;
- the mutation scope could edit secrets, deployment config, credentials, billing, or production data;
- the host cannot persist lineage, scores, failures, and selected winners;
- the user wants autonomous self-modification without approval and rollback.

## Quality Bar

The installed capability is proven only when a host run produces multiple candidates, evaluates them under the same fitness function, selects a winner, records lineage, and either improves over baseline or honestly records no improvement. A model-judge can advise, but deterministic evaluator results and receipts own the claim.

