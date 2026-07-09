# Evolutionary Coding Agent Runtime

A Capability Buildprint for adding an **eval-guided patch loop** to an existing coding-agent host: task spec → repo snapshot → coding agent patch → unit-test gate → benchmark/regression oracle → promote or rollback → archive → repeat.

Primary architecture source: [agentic-eval-evolution-runtime](https://github.com/DomEscobar/agentic-eval-evolution-runtime) (research package; no runnable code yet).

## Core idea

```text
system variant -> eval -> score/trace -> patch or mutate -> archive -> gate -> repeat
```

For coding agents (Mode B), the eval system is the judge; the agent is the patch producer:

```text
Benchmark / Spec
  -> Coding Agent proposes code patch
  -> Unit tests gate the patch
  -> Benchmark eval compares against best snapshot
  -> Regression triggers rollback
  -> Improvement updates best snapshot
  -> Archive records lineage
```

## What this buildprint is for

Hosts that already have or can add:

- a measurable fitness function (SWE-style tasks, project-local benchmarks, algorithm evals);
- visible and hidden tests with evaluator integrity protection;
- sandboxed candidate execution and rollback;
- lineage/archive storage.

## Optional profiles

- **patch-loop** (default) — TDAD-style single-patch iterations with best-snapshot rollback
- **population-evolution** — multi-candidate LLM mutation, selection, optional island migration (AlphaEvolve / CodeEvolve inspired)
- **scaffold-self-improve** (deferred) — agent proposes scaffold/tooling changes as reviewable PRs; human gate required

## Non-claims

- It does not promise AlphaEvolve, DGM, or TDAD headline benchmark numbers.
- It does not allow uncontrolled self-editing of evaluators, hidden tests, or guardrails.
- It does not replace benchmark and dataset construction — that is milestone 1.
- It does not run untrusted candidate code outside a sandbox.
- It does not prove Mode A (config/prompt evolution for RAG/chat) unless explicitly extended.

## Start

Read `BUILDPRINT.md`, then follow host assessment and the integration plan before writing code.
