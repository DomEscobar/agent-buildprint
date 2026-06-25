# 00 Assessment Questions

Ask these after `00-host-assessment.md` and before `01-integration-plan.md`. Hard-stop questions must be answered by the user or explicit user delegation. `agent_assumption` is invalid for hard-stop decisions.

## Hard-stop questions

1. **Fitness function** — which benchmark, test suite, task set, or metric defines improvement?
2. **Mutation scope** — which files or modules may the loop edit, and which are forbidden?
3. **Sandbox policy** — what isolation boundary is required before candidate code can run?
4. **Model and budget** — which mutation models are allowed, and what spend/time ceiling stops the loop?
5. **Selection policy** — best score only, tournament, MAP-Elites, island migration, or another policy?
6. **Self-modification approval** — can winners be applied automatically, or must a human approve?
7. **External side effects** — may candidates access network, tools, providers, repositories, or user data?
8. **Claim target** — is the goal a research prototype, host-applied improvement, or production-safe runtime?

## Assumable defaults

- Start with a single local island and two or more candidates.
- Use deterministic baseline comparison before claiming improvement.
- Use patch validation and forbidden-file checks before evaluation.
- Record no-improvement honestly instead of forcing a winner claim.
- Keep model-judge output advisory only.

## Deferrable questions

- exact UI layout for archive inspection;
- exact diversity metric when the first version uses best-of-N;
- remote distributed evaluators;
- long-running schedule and cron policy;
- advanced MAP-Elites bins.

## Output

Write answers into `.buildprint/capability-plan.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.

