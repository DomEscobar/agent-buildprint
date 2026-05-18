# Buildprint: Superpowers Skill Methodology Harness

## Promise

Build a portable skill-methodology harness for coding agents that turns good engineering practice into executable agent behavior: relevant skills are loaded before responses, implementation is gated by design and plans, code is produced with TDD, subagents execute isolated tasks, and completion is blocked until review and verification evidence exists.

## Non-goals

- Do not copy `obra/superpowers` text verbatim into a public clone.
- Do not claim official Superpowers compatibility unless installing the real plugin.
- Do not build a marketplace/dashboard/control-plane as the core product.
- Do not treat static skill files as sufficient; activation and transcripts are part of the product.

## Architecture

```text
Plugin / install surface
  → Session bootstrap / “use skills before action” rule
  → Skill discovery + activation descriptions
  → Mandatory workflow graph
  → Design/spec docs
  → Implementation plans
  → Worktree or isolated branch execution
  → TDD loop
  → Subagent implement/review loops
  → Finish branch + validation
  → Transcript/eval harness
```

## Required files in an implementation

- `skills/<name>/SKILL.md` with frontmatter `name` and `description`.
- A bootstrap instruction loaded at session start.
- Agent-specific adapters for at least one runtime: Claude Code, Codex, OpenCode, Gemini, Cursor, or Copilot CLI.
- Project docs directory for generated specs and plans.
- Tests/evals that prove automatic activation on realistic prompts.

## Status

Public Buildprint status: `validated: scoped compact proof`. The package has a runnable clean-room proof with transcript evals. Production runtime implementation remains incomplete and must be validated separately.

| Area | Current proof | Production implementation boundary |
| --- | --- | --- |
| Runtime adapter | Neutral Node.js harness only | Add and validate at least one real Claude/Codex/OpenCode/Gemini/Cursor/Copilot adapter |
| Generated docs | Records required spec/plan paths in transcript data | Write and persist project docs on the filesystem |
| Worktrees | Models isolation requirements in workflow contracts | Create and manage real isolated branches/worktrees |
| Subagents | Simulates task packets and review ordering | Integrate with a real subagent/task API |
| Transcript evals | Covered by included proof evals | Keep as acceptance evidence for each production adapter |


---

## Consolidated notes from `README.md`

# Superpowers Skill Methodology Harness Buildprint

A source-backed Buildprint for rebuilding a Superpowers-style coding-agent skill setup: bootstrap instructions, mandatory skill activation, brainstorming-before-code, spec/plan docs, TDD, subagent-driven execution, code review, finishing workflow, and transcript-based harness acceptance tests.

Source inspiration: [`obra/superpowers`](https://github.com/obra/superpowers), pinned during mapping at commit `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`.

This is a **methodology harness Buildprint**, not a package-manager dashboard and not a verbatim clone. It defines the durable architecture and behavioral contracts an agent setup must reproduce.

## Read order

1. `BUILDPRINT.md`
2. `SOURCE_TRACE.md`
3. `SYSTEM_MAP.md`
4. `SPEC.md`
5. `BOOTSTRAP_AND_ROUTING.md`
6. `SKILL_LIBRARY.md`
7. `WORKFLOW.md`
8. `SUBAGENT_ORCHESTRATION.md`
9. `TEST_MATRIX.md`
10. `VALIDATION_REPORT.md`

## Core claim

A useful skill harness is not “some skill files on disk.” It needs:

- a session-start bootstrap that forces skill lookup before action,
- skills with sharp activation descriptions and hard gates,
- a canonical workflow from idea → design → plan → isolated implementation → TDD → review → finish,
- subagent/task isolation with review loops,
- transcript/eval tests proving the harness actually triggers.
