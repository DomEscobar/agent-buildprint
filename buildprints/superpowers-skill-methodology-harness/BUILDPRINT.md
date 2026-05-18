# Buildprint: Superpowers Skill Methodology Harness

## Agent Operating Contract

Build a portable skill-methodology harness for coding agents. The harness turns engineering process rules into executable agent behavior: relevant skills are loaded before action, design and planning gates precede implementation, TDD governs code changes, subagents execute isolated tasks, and completion is blocked until review and verification evidence exists.

The Buildprint is source-backed by the public `obra/superpowers` methodology, but it defines an independent methodology harness. It must not copy upstream text into a public package or claim official compatibility unless a real upstream plugin integration is installed and validated.

## Binding Implementation Slice

The validated slice is a compact, neutral Node.js proof harness with transcript evals.

Included in the validated slice:

- bootstrap discipline and skill lookup before action;
- machine-readable skill metadata;
- activation of brainstorming for build requests;
- design approval before implementation;
- plan contracts with exact paths and test commands;
- TDD gate before production changes;
- systematic debugging gate before fixes;
- task-specific subagent packets and ordered review;
- completion gate requiring verification evidence;
- transcript eval runner proving the process order.

Production adapter work is intentionally outside the validated slice until implemented and tested:

- Claude Code, Codex, OpenCode, Gemini, Cursor, or Copilot CLI adapter;
- filesystem writer for generated specs and plans;
- real branch/worktree manager;
- real subagent/task API integration;
- transcript capture from a live runtime;
- destructive or external-action approval adapters.

## Non-Goals / Unsafe Claims

- Do not publish a verbatim rebuild of `obra/superpowers`.
- Do not claim official Superpowers compatibility without installing and validating the real plugin path.
- Do not treat static skill files as sufficient; activation and transcript evidence are part of the product contract.
- Do not build a marketplace, dashboard, or control plane as the core product.
- Do not claim real runtime integration from the neutral proof harness.
- Do not claim worktree isolation, filesystem artifact writing, or live subagent orchestration until those adapters exist and pass acceptance tests.

## Required Read Order

1. `BUILDPRINT.md`
2. `SOURCE_TRACE.md`
3. `SYSTEM_MAP.md`
4. `SPEC.md`
5. `BOOTSTRAP_AND_ROUTING.md`
6. `SKILL_LIBRARY.md`
7. `WORKFLOW.md`
8. `SUBAGENT_ORCHESTRATION.md`
9. `CONTRACTS.md`
10. `TEST_MATRIX.md`
11. `VALIDATION_REPORT.md`

## Phase Gates

| Phase | Gate | Exit evidence |
| --- | --- | --- |
| Source boundary | Establish inspiration source and non-copying constraint. | `SOURCE_TRACE.md` lists mapped claims and source evidence. |
| Harness contract | Define bootstrap, routing, skill metadata, workflow, subagents, and completion gates. | `SPEC.md`, `CONTRACTS.md`, and supporting docs agree. |
| Proof implementation | Implement the neutral harness for the binding slice. | Proof files under `proof/` execute without network dependency. |
| Transcript evals | Prove activation and process order on realistic prompts. | `npm test` and eval runner results are recorded. |
| Runtime adapter upgrade | Add one real agent runtime adapter before claiming production runtime behavior. | Adapter-specific install, activation, transcript, and safety evidence. |

## Acceptance Gates

The compact proof passes only when:

- a clean-session build prompt loads bootstrap and performs skill lookup before code;
- brainstorming activates before implementation for a build request;
- approved design can transition into an implementation plan with exact files and checks;
- production-change events are blocked until failing-test evidence exists;
- debugging records root-cause evidence before fix selection;
- subagent execution uses task-specific context and runs spec review before code-quality review;
- completion is blocked without verification evidence;
- proof commands and results are recorded.

A production adapter passes only when the same gates run through the real runtime surface with captured transcripts and adapter-specific safety checks.

## Purpose

The harness makes coding-agent process discipline testable. It treats skill activation, workflow order, review, TDD, and verification as product behavior rather than optional documentation.

## Architecture

```text
Plugin / install surface
  -> session bootstrap / "use skills before action" rule
  -> skill discovery + activation descriptions
  -> mandatory workflow graph
  -> design/spec docs
  -> implementation plans
  -> isolated branch or worktree execution
  -> TDD loop
  -> subagent implement/review loops
  -> finish branch + validation
  -> transcript/eval harness
```

Required files for the compact proof package:

- `skills/<name>/SKILL.md` with frontmatter `name` and `description`;
- session-start bootstrap instruction;
- deterministic harness modules for bootstrap, skill lookup, workflow gates, subagent packets, review order, and completion verification;
- generated project-doc fixtures for specs and plans;
- tests or evals proving automatic activation on realistic prompts.

Required additions before production runtime claims:

- adapter for at least one target runtime;
- runtime transcript capture;
- filesystem/worktree/subagent integration evidence;
- adapter-specific safety and approval checks.

## Evidence Boundary

Validated evidence covers the included neutral proof only. The proof demonstrates behavior shaping and transcript contracts, not a production runtime adapter.

Safe claim:

- The Buildprint can produce a runnable clean-room methodology-harness proof with transcript evals.

Unsafe until separately validated:

- official upstream compatibility;
- exact upstream feature coverage;
- production Claude/Codex/OpenCode/Gemini/Cursor/Copilot integration;
- real git worktree management;
- real subagent API integration.

## Required Validation

For the included proof:

```bash
cd proof
npm test
node src/run-evals.js
```

Required result:

- all harness tests pass;
- all transcript evals pass;
- validation report records commands, results, covered scenarios, and remaining adapter gaps.

For a production runtime adapter, add runtime-specific install tests, clean-session activation tests, transcript capture, destructive/external-action approval checks, and fixture snapshots for the core acceptance prompts.

## Copyable Agent Prompt

```txt
Use the Superpowers Skill Methodology Harness Buildprint.

Read BUILDPRINT.md first, then follow the Required Read Order.

Implement or extend only the selected slice. Preserve the core behavior contract:
- bootstrap and skill lookup before action,
- design before code for build requests,
- exact implementation plans after approved designs,
- failing-test evidence before production changes,
- root-cause evidence before fixes,
- task-specific subagent packets with ordered review,
- verification evidence before completion.

Do not claim official Superpowers compatibility, real runtime adapter behavior, worktree isolation, or live subagent integration unless those paths are implemented and validated with transcript evidence.
```
