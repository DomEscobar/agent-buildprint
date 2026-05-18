# BUILDPRINT — Complete Agent Skills Evaluation OS

## Mission

Build an evaluation operating system for complete coding-agent setups: skills, agents, commands, hooks, MCP servers, instructions, permissions, routers, subagents, and workflow rules.

The system must answer:

1. Is the setup valid and installed exactly as expected?
2. Are skills and components discoverable without manual prompting?
3. Do individual skills work in sandboxed tasks?
4. Does the agent follow required process order, not only final output?
5. Do subagents and parallel sessions preserve context, ownership, and merge safety?
6. Is the loadout worth its token/context cost?
7. Can results be reproduced in CI with stored evidence?

## Architecture

```text
Setup Snapshot
  → Static Lint
  → Loadout Inventory
  → Skill Unit Tests
  → Activation Evals
  → Transcript Process Checks
  → E2E Task Bench
  → Multi-Agent Safety
  → Scorecard + CI Reports
```

## Canonical modules

### 1. Setup Snapshot
Capture the target setup under test. Include installed skills, commands, agents, hooks, MCP servers, permissions, model/router config, and source commit or package lock.

### 2. Static Lint
Validate files before behavior tests. Check frontmatter, names, paths, hook schemas, MCP refs, permissions, tool declarations, forbidden patterns, and broken links.

### 3. Loadout Inventory
Measure context footprint, active/dormant artifacts, duplicates, loaded token tax, active token cost, and stale components.

### 4. Skill Unit Tests
Run one skill at a time in fresh sandboxes with fixtures and deterministic assertions on files, commands, JSON, stdout/stderr, response content, latency, and token use.

### 5. Activation Evals
Generate positive and negative prompts for every skill/agent/command/hook/MCP component. Score recall, precision, wrong-component activation, and ask-clarify behavior.

### 6. Transcript Process Checks
Check event order and forbidden shortcuts. Examples: skill loaded before writing, failing test before implementation, approval before destructive action, review before finish.

### 7. E2E Task Bench
Run complete repo tasks requiring multiple skills: plan → implement → test → review → finish. Score artifacts, tests, safety, recovery, and evidence.

### 8. Multi-Agent Safety
Evaluate delegation briefs, subagent JSON outputs, file ownership, worktree isolation, merge conflicts, stale state, and parent-context loss.

### 9. Scorecard + Reports
Produce machine-readable and human reports: JSON, Markdown, HTML/JUnit if implemented, stored transcripts, artifacts, diffs, and a weighted score.

## Non-goals

- Do not claim deterministic evaluation of model intelligence.
- Do not treat one happy-path chat transcript as proof.
- Do not require one specific agent vendor.
- Do not auto-install untrusted tools without explicit approval.
- Do not publish credentials, transcripts containing secrets, or private repo content.

## Implementation rule

Default proof mode must be offline and deterministic. Live agent/provider runs are optional adapters behind explicit configuration.


---

## Research and implementation notes: implementation rails

# PLAN — Implementation rails

## Phase 0 — Scope and policy
- Define target agent platforms.
- Define allowed live adapters and offline mode.
- Define safety policy for external actions, credentials, browser use, and destructive commands.

## Phase 1 — Snapshot
- Discover setup artifacts.
- Normalize to `SetupSnapshot`.
- Record source versions and install target.
- Redact secrets.

## Phase 2 — Static lint
- Validate `SKILL.md` frontmatter and body.
- Validate agent/command/hook/MCP references.
- Validate permission boundaries.
- Block behavior tests on critical errors.

## Phase 3 — Loadout inventory
- Compute loaded token/context footprint.
- Detect duplicates, dormant artifacts, and unused high-cost components.
- Emit inventory report.

## Phase 4 — Skill unit suites
- Add `*.skill-test.yml` or equivalent cases.
- Run sandboxed tests.
- Assert file, command, JSON, output, duration, and token contracts.

## Phase 5 — Activation suites
- Generate positive and negative prompts per component.
- Run with base setup and optionally with router enabled.
- Score recall, precision, ambiguity handling, and wrong-route rate.

## Phase 6 — Transcript invariants
- Define required event order.
- Parse transcripts/events.
- Fail forbidden shortcuts and missing process steps.

## Phase 7 — E2E benchmark
- Run representative repo tasks.
- Score final artifacts, tests, process evidence, safety, and recovery.

## Phase 8 — Multi-agent safety
- Test delegation briefs, output schemas, file ownership, worktree/session coordination, and merge recovery.

## Phase 9 — Reports
- Aggregate scorecard.
- Store redacted evidence.
- Emit CI-friendly JSON/Markdown/JUnit/HTML reports.


---

## Research and implementation notes: overview

# Complete Agent Skills Evaluation OS Buildprint

A stack-adaptable Buildprint for evaluating a complete coding-agent skills setup - not just one `SKILL.md` file.

The blueprint combines static config linting, install snapshot/parity, loadout/token inventory, skill-level sandbox tests, component activation tests, transcript/order checks, end-to-end task benchmarks, multi-agent safety cases, and CI scorecards.

## Why this exists

A skills setup can look good while failing in practice:

- the files are invalid or silently ignored;
- the installed setup is not the setup you think you are testing;
- the right skill exists but does not activate;
- the agent produces plausible output while skipping the required process;
- subagents collide on files or lose parent context;
- the loadout taxes every turn with unused context.

This Buildprint evaluates the whole system from install to behavior.

## Default proof

The included proof is an offline JavaScript implementation of the evaluation pipeline and scoring model. It uses fixture objects only and makes no network or agent calls. It validates the scoring architecture, not a complete production evaluation OS with live adapters, sandboxed agent execution, or transcript capture from a real runtime.

```bash
cd proof
npm test
```

## Research basis

Research artifacts:

- `/root/.openclaw/workspace/research/newer-superpowers-like-2026-05-17/`
- `/root/.openclaw/workspace/research/complete-agent-skills-eval-stack-2026-05-17/`

Primary source pressure came from `balyakin/skill-eval-runner`, `sjnims/cc-plugin-eval`, `obra/superpowers`, `agent-sh/agnix`, `David-CKS/claude-skill-router`, `robester0403/Local-Loadout-Smithery`, `Powerjackie/delegate-kit`, `wan-huiyan/agent-traffic-control`, `slash9494/ai-config-sync-manager`, `TakumaAida/agents-deploy`, `motiful/skill-forge`, and `agent-sh/agentsys`.


---

## Research and implementation notes: tool comparison

# TOOL_COMPARISON

| Tool/repo | Best role in this Buildprint | Use carefully because |
| --- | --- | --- |
| `balyakin/skill-eval-runner` | Core per-skill sandbox runner | Does not prove activation/routing by itself |
| `sjnims/cc-plugin-eval` | Component trigger/activation evals | Claude-plugin-oriented |
| `obra/superpowers` | Transcript/process philosophy and workflow examples | Methodology-specific, not generic scoring |
| `agent-sh/agnix` | Static config and agent-file linting | Rule set may need target tuning |
| `robester0403/Local-Loadout-Smithery` | Loadout/cost/dormancy inventory | Claude/Cursor loadout focus |
| `David-CKS/claude-skill-router` | Router intervention to A/B test activation | Router success is not same as skill quality |
| `slash9494/ai-config-sync-manager` | Claude/Codex config sync | Sync parity must be tested after conversion |
| `TakumaAida/agents-deploy` | One-source `.agents/` deployment | Young project; validate generated targets |
| `Powerjackie/delegate-kit` | Subagent delegation contracts | v0.1 rough edges; good conceptual module |
| `wan-huiyan/agent-traffic-control` | Parallel-session/worktree safety | Claude-session-specific details |
| `motiful/skill-forge` | Skill publish readiness/security checks | Complements lint, not runtime behavior proof |
| `agent-sh/agentsys` | Cross-agent runtime/orchestration reference | Larger platform scope than evaluation OS |
