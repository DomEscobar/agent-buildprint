# Research Basis

This buildprint is derived from `/root/evolve.md`, "Evolutionary & Self-Improving Coding Agents — State of the Art 2025-2026".

## Adopted Patterns

- AlphaEvolve: prompt sampler, LLM ensemble, evaluator pool, program database, objective scores.
- CodeEvolve: island-based evolutionary search, SEARCH/REPLACE diffs, sandboxed evaluation, checkpointing, open-model exploration.
- OpenEvolve: asynchronous pipeline, multi-objective optimization, distributed evaluation, checkpoint resume.
- SICA: self-improvement over a full codebase, benchmark before/after, sandbox/resource limits.
- EvoAgent: multi-agent mutation, selection, quality checks, and result integration.

## Design Translation

- The buildprint treats evaluation as the hard dependency.
- Mutation is bounded to approved files.
- Candidate code must run behind sandbox and resource limits.
- Model-judge scoring is advisory and cannot override deterministic fitness proof.
- Receipts record no-improvement honestly.

