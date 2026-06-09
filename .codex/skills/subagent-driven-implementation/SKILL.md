---
name: subagent-driven-implementation
description: Use when executing a Buildprint phase or implementation plan with multiple tasks, review checkpoints, or separable workstreams.
phase: 03-phases
triggers:
  - multi-task phase
  - separable workstreams
  - parallel implementation
  - subagent
skips:
  - one small edit
  - same-file changes
  - unclear ownership boundaries
completion_signal: SUBAGENT_PHASE_DONE
---

# Subagent-Driven Implementation

Use when a Buildprint phase or plan has independent implementation tasks. Keep the controller responsible for context, sequencing, and final quality.

## Controller Rules

1. Read the active phase or plan once and extract concrete tasks.
2. Dispatch fresh subagents only with the task text, owned files, relevant context, verification command, and expected report format.
3. Do not make a subagent read the whole plan or infer missing scope.
4. Do not run parallel implementers over the same files or ownership boundary.
5. After implementation, run two reviews before marking a task done: spec compliance first, code quality second.
6. If a subagent reports BLOCKED or NEEDS_CONTEXT, resolve context, split the task, or escalate. Do not force blind retries.
7. Keep moving through all dependency-ready tasks; do not ask the user whether to continue unless a real blocker or product decision stops progress.

## Subagent Report Format

- Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
- Files changed
- What was implemented
- What was tested
- Self-review findings
- Open concerns or blockers

## Red Flags

- Skipping spec review or code quality review.
- Accepting close-enough behavior when the phase objective is explicit.
- Letting implementation agents broaden scope, rewrite unrelated files, or invent architecture not present in the plan.
- Treating tests as enough when browser/runtime/product proof is required.

End the controller summary with `SUBAGENT_PHASE_DONE` only after integration and controller review are complete.
