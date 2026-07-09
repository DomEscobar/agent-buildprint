# Compatibility

This capability is compatible with a host app or host project that already runs coding-agent tasks and can evaluate patches with deterministic gates. Architecture source: [agentic-eval-evolution-runtime](https://github.com/DomEscobar/agentic-eval-evolution-runtime).

## Strong Fit

- coding-agent CLIs or worker systems (SWE-agent shape, mini agents, custom runners);
- project-local benchmarks with visible and hidden tests;
- repos with unit-test commands that can gate before benchmark spend;
- local-first systems where candidate execution can be isolated and rolled back;
- hosts that can checksum-protect evaluator scripts and persist patch lineage.

## Weak Fit

- hosts with only subjective human review and no repeatable evaluator;
- public production systems where generated code would run with user data;
- projects with no rollback, no source control, or no audit trail;
- blocklist-only mutation policies with no path to editable-surface allowlist;
- teams unwilling to set a model budget ceiling or protect hidden tests.

## Block Conditions

Block implementation when the host app cannot isolate candidate execution, when editable surfaces are unclear, when the evaluator cannot be protected from agent edits, when the evaluator is non-deterministic, or when provider credentials would be exposed to mutated code.

## Composition Notes

Composes well with:

- `agentic-chat-eval-harness` — chat/runtime regression alongside coding patch loops;
- SWE-bench-shaped local task fixtures;
- DeepEval or Inspect AI as eval runner libraries behind host gates;
- observability systems for trace capture (OTel GenAI shape recommended by source repo).

Install after the host can run a baseline on the best snapshot, not before. Mode A config/prompt evolution for RAG/chat apps is a separate concern — use the source repo's Mode A guidance if needed, not this buildprint's default path.

## Evidence Expectations

Hosts should not expect TDAD/DGM/AlphaEvolve headline numbers without their own receipts. Research tags in `capability.yaml` describe external literature, not host proof.
