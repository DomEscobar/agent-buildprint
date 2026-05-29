# BUILDPRINT: Complete Agent Skills Evaluation OS

## Agent Operating Contract

Build an offline deterministic evaluation proof for complete coding-agent setup contracts: skills, agents, commands, hooks, MCP servers, instructions, permissions, routers, subagents, and workflow rules. Production/live adapters can extend the same contract only after separate validation.

The default evaluator measures both structure and fixture-backed behavior. It must answer whether the setup is valid, installed as expected, discoverable without manual prompting, useful in sandboxed tasks, compliant with required process order, safe under multi-agent execution, worth its token/context cost, and reproducible in CI with stored evidence.

Default proof mode is offline and deterministic. Its accepted status is `offline proof accepted`; live agent, provider, browser, or runtime adapters require `production adapter accepted` evidence behind explicit configuration and separate validation.

## Binding Implementation Slice

The included proof is an offline JavaScript implementation of the evaluation pipeline and scoring model. It uses fixture objects only and makes no network or agent calls.

Included in the validated slice:

- setup snapshot contract;
- static lint layer;
- loadout inventory metrics;
- skill unit evaluation contract;
- activation evaluation contract;
- transcript process invariant checks;
- E2E task benchmark contract;
- multi-agent safety checks;
- weighted scorecard and hard-fail model;
- deterministic proof tests under `proof/`.

Excluded until adapter work is implemented:

- live coding-agent execution;
- sandboxed real skill runs;
- transcript capture from a real runtime;
- provider or browser automation;
- CI publishing adapters beyond local report generation;
- exact behavioral equivalence to any referenced external project.

## Non-Goals / Unsafe Claims

- Do not claim deterministic evaluation of model intelligence.
- Do not treat one successful chat transcript as proof.
- Do not require one specific agent vendor.
- Do not auto-install untrusted tools without explicit approval.
- Do not publish credentials, transcripts containing secrets, or private repo content.
- Do not count offline fixtures as live adapter behavior.
- Do not claim complete production evaluation coverage until real runtime, sandbox, transcript, and reporting adapters are implemented and validated.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `SAFETY_POLICY.md`
5. `STATIC_LINT.md`
6. `LOADOUT_INVENTORY.md`
7. `SKILL_UNIT_EVALS.md`
8. `ACTIVATION_EVALS.md`
9. `TRANSCRIPT_PROCESS_EVALS.md`
10. `E2E_TASK_BENCH.md`
11. `MULTI_AGENT_SAFETY.md`
12. `SCORECARD.md`
14. `VALIDATION_REPORT.md`

## Phase Gates

| Phase | Gate | Exit evidence |
| --- | --- | --- |
| Scope and policy | Define target platforms, allowed live adapters, permissions, redaction, and destructive-action policy. | Policy object and safety hard-fail list exist. |
| Snapshot | Capture skills, commands, agents, hooks, MCP servers, permissions, router settings, versions, and source refs. | `SetupSnapshot` validates and secrets are redacted. |
| Static lint | Validate files and references before behavior tests. | Critical static errors block expensive/live tests unless exploratory mode is explicit. |
| Loadout inventory | Measure loaded context, active usage, duplicates, dormant artifacts, and router misses. | Inventory metrics feed the scorecard. |
| Skill unit reviews | Run selected skills in fresh sandboxes or deterministic fixtures. | Assertions cover files, commands, JSON, output, duration, and token guards. |
| Activation reviews | Test positive and negative natural prompts for each component. | Recall, precision, wrong-component rate, and clarification behavior are scored. |
| Transcript checks | Parse events and enforce process order. | Required event-order invariants pass or produce findings. |
| E2E task bench | Run representative complete tasks for the selected adapter mode. | Artifacts, tests, process, safety, recovery, and evidence are scored. |
| Multi-agent safety | Evaluate delegation briefs, ownership, worktree/session isolation, and merge safety. | File ownership and coordination checks pass or hard-fail. |
| Reports | Aggregate findings and scores. | JSON and Markdown reports plus redacted artifacts are stored. |

## Acceptance Gates

The offline proof is accepted only as `offline proof accepted` when:

- snapshot, lint, loadout, unit, activation, transcript, E2E, and multi-agent layers execute through deterministic fixtures;
- scoring weights and hard-fail overrides are applied;
- findings include evidence and remediation context;
- all local proof tests pass with `target verification command`.

A production adapter is accepted only when:

- it captures a real setup snapshot;
- it runs sandboxed behavior tests or records explicit blockers;
- it stores redacted transcripts and artifacts;
- it separates skill correctness from activation behavior;
- it records command output and reproducible evidence;
- it fails hard on secret leakage, unsafe external writes, destructive actions without approval, missing snapshots, irreproducible results, or fabricated evidence.

## Purpose

Complete skills setups can appear healthy while failing operationally: invalid files may be ignored, installed artifacts may differ from the intended setup, skills may not activate, agents may skip required process, subagents may collide, and loadouts may tax every turn with unused context. This Buildprint evaluates the whole setup from install snapshot to behavior evidence.

## Architecture

```text
Setup Snapshot
  -> Static Lint
  -> Loadout Inventory
  -> Skill Unit Tests
  -> Activation Reviews
  -> Transcript Process Checks
  -> E2E Task Bench
  -> Multi-Agent Safety
  -> Scorecard + CI Reports
```

Canonical modules:

1. Setup Snapshot: capture installed skills, commands, agents, hooks, MCP servers, permissions, router settings, versions, and source refs.
2. Static Lint: validate frontmatter, names, paths, hook schemas, MCP refs, permissions, tool declarations, forbidden patterns, and broken links.
3. Loadout Inventory: measure context footprint, active and dormant artifacts, duplicates, token cost, and stale components.
4. Skill Unit Tests: run one skill at a time with fixtures and deterministic assertions.
5. Activation Reviews: generate positive and negative prompts for every component and score routing behavior.
6. Transcript Process Checks: enforce required event order and prohibited shortcuts.
7. E2E Task Bench: run complete repo tasks requiring multiple components and evidence capture.
8. Multi-Agent Safety: evaluate delegation, ownership, isolation, conflict handling, and parent-context preservation.
9. Scorecard + Reports: emit JSON and Markdown reports, optional CI formats, stored artifacts, diffs, transcripts, and weighted scores.

## Evidence Boundary

Validated evidence currently covers the offline scoring architecture only. It does not prove live runtime execution, sandboxed real skills, provider calls, browser automation, or transcript capture from a real coding-agent runtime.

Safe claim:

- The Buildprint defines and proves a deterministic offline evaluation pipeline and scoring model.

Unsafe until separately validated:

- complete production evaluation OS;
- live behavior coverage for any specific coding-agent vendor;
- real skill sandbox execution;
- real transcript capture;
- provider/runtime/browser adapter behavior;
- exact coverage of referenced external tools.

## Required Validation

Run the included proof:

```bash
cd proof
target verification command
```

Required result:

- all offline pipeline/scoring tests pass;
- validation report states the offline scope boundary;
- any live adapter or sandbox limitation remains outside passed claims.

## Copyable Agent Prompt

```txt
Use the Complete Agent Skills Evaluation OS Buildprint.

Read BUILDPRINT.md first, then follow the Required Read Order.

Implement or extend only the selected evaluation slice. Preserve the architecture:
- setup snapshot,
- static lint,
- loadout inventory,
- skill unit tests,
- activation reviews,
- transcript process checks,
- E2E task bench,
- multi-agent safety,
- scorecard and reports.

Default to offline deterministic proof mode unless live adapters are explicitly configured. Do not claim live runtime behavior, provider execution, sandboxed real skills, browser automation, or production coverage without stored evidence from those adapters.
```
