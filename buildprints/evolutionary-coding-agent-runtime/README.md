# Evolutionary Coding Agent Runtime

A Capability Buildprint for adding an AlphaEvolve / CodeEvolve inspired loop to an existing coding-agent project: population -> LLM mutation -> sandboxed evaluation -> selection -> archive -> repeat.

It is for hosts that already have or can add a measurable fitness function: SWE-style task pass rate, benchmark score, latency/cost metric, generated-code correctness, algorithm quality, or another deterministic evaluator.

## Core Promise

The buildprint helps a coding-agent host evolve variants of prompts, policies, orchestration code, tool routing, or bounded solution files while keeping execution sandboxed and claims evidence-led.

## Non-Claims

- It does not promise AlphaEvolve-level results.
- It does not allow uncontrolled self-editing.
- It does not replace a benchmark. The hard part is still evaluation.
- It does not run untrusted candidate code outside a sandbox.

## Start

Read `BUILDPRINT.md`, then follow the host assessment and integration plan before writing code.

