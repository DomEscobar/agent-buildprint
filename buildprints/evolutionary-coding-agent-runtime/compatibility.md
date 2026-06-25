# Compatibility

This capability is compatible with a host app or host project that already runs coding-agent tasks and can evaluate a candidate with a deterministic score.

## Strong Fit

- coding-agent CLIs or worker systems;
- benchmark harnesses for SWE-style tasks, coding tasks, algorithm tasks, or tool-use tasks;
- local-first research systems where candidate execution can be isolated;
- hosts that can persist candidate lineage and rerun baselines.

## Weak Fit

- hosts with only subjective human review and no repeatable evaluator;
- public production systems where generated code would run with user data;
- projects with no rollback, no source control, or no audit trail;
- teams unwilling to set a model budget ceiling.

## Block Conditions

Block implementation when the host app cannot isolate candidate execution, when the mutation scope is unclear, when the evaluator is non-deterministic, or when provider credentials would be exposed to mutated code.

## Composition Notes

This buildprint composes well with agentic chat evaluation harnesses, taskflow runners, coding-agent runtimes, and observability systems. It should be installed after the host can run a baseline task, not before.

