# BUILDPRINT: Portable Personal Agent Chat OS

This is the canonical starting point and execution contract for a Mapper OS executable-blueprint v5 packet. Build a self-hosted personal agent chatbot where chat is the control surface for a local agent runtime. The runtime routes model providers, streams responses as events, invokes policy-gated tools, loads selected skills, manages memory, delegates bounded subagent tasks, records token telemetry, and exposes a WebUI/API boundary.

Do not start from generated prompts or secondary legacy documents. Your first action must be reading this file; do not inventory, glob, or enumerate packet files before this read order is established.

## Required read order

1. Read this `BUILDPRINT.md` first, before listing or opening other packet files.
2. Read `01-questions.md`.
3. Read and complete `02-project-setup.md`.
4. Read `blueprint.yaml` as the machine-readable mirror.
5. Read `03-phases/phase-index.yaml`.
6. Read `03-phases/phase-flow.md`.
7. Read only the active implementation phase file named by `03-phases/phase-index.yaml`.
8. Read `04-evaluation.md`.
9. Treat `05-evidence/evidence-ledger.jsonl` as the immutable packet seed; append implementation proof or blocker rows only to `.buildprint/evidence/evidence-ledger.jsonl` after phase-run artifacts exist.

## Product contract

The implementation target is a clean-room, portable personal agent OS inspired by source-observed architecture signals from TheSyart/emperor-agent at commit d9761740bf82b9d5a91e5d8cda44ab5643bab59d, with JARVIS and ToFu used only as comparison pressure. Preserve the product scope without copying source implementation, source UI style, source assets, prompts, or branding.

The binding product slice includes:

- `AgentSession`: one conversation/run with messages, checkpoints, active provider/model, runtime events, and usage.
- `ProviderRouter`: config-driven provider registry with deterministic test provider support and no live API requirement for proof.
- `StreamingAgentLoop`: turn lifecycle that emits deltas, tool events, memory events, team events, telemetry, completion, and failure.
- `ToolRegistry`: schema-described tools with risk labels and policy mediation before execution.
- `SkillRegistry`: discoverable skill records with metadata, triggers, instructions, optional resources/scripts, and explicit enablement.
- `McpAdapter`: adapter boundary that maps enabled external tools into the same `ToolSpec` policy path; proof uses deterministic local test servers.
- `MemoryStore`: raw history, daily/episodic notes, curated long-term memory, checkpoints, and attachment/source summaries.
- `ContextBuilder`: ordered assembly of runtime instructions, memory, selected skills, task/team context, recent messages, attachments, and tool results.
- `TeamBus`: evented subagent delegation with bounded task contracts and summarized results.
- `Telemetry`: normalized input/output/cache/total token counters and compaction markers visible to runtime state and UI/tests.
- `WebUI/API`: chat stream, model/provider settings, tool/skill/MCP workbench, memory editor/viewer, team view, token view, and config diagnostics.

Proof mode is local, deterministic, and no-network by default. Live model providers, real MCP servers, shell/browser/network execution, production multi-user auth, billing, hosted deployment, and exact source-project parity require separate adapter work and separate evidence.

## Implementation loop

Every phase must repeat this loop until the proof gate passes or a real blocker is recorded:

1. Observe: inspect existing project files, nearest `AGENTS.md`, current behavior, and constraints.
2. Plan: state the smallest coherent change, likely files, and verification gate.
3. Execute: make scoped changes without silently expanding architecture.
4. Verify: run the planned test/build/browser/runtime gate and inspect output.
5. Reflect: compare results against the phase proof gate.
6. Record: append evidence or blocker rows before claiming progress.

A phase cannot be marked done from code edits alone.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase in `03-phases/phase-index.yaml`
- packet seed-only blocker -> `05-evidence/evidence-ledger.jsonl`
- external/runtime blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Phase discipline

Every phase starts through `03-phases/phase-flow.md`. Do not collapse phase entry into immediate implementation: create `.buildprint/phase-runs/<phase-id>/plan.md` and `.buildprint/phase-runs/<phase-id>/team.md`, dispatch or explicitly simulate bounded role work, collect returns/reviews/proof, and only then append runtime evidence.

A phase is a proof-gated product slice, not a waterfall task bucket. Each phase must define product outcome, source evidence, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, quality gates, proof gate, and repair routing.

## Non-goals and unsafe claims

- Full Emperor Agent clone behavior.
- Exact Vue UI, visual style, copy, assets, or product metaphor matching.
- Live OpenAI, Anthropic, Bedrock, Ollama, or OpenAI-compatible provider behavior without env-gated smoke tests.
- Real shell, browser, network, or filesystem safety beyond implemented policy gates and tests.
- Real MCP server interoperability without configured server tests.
- Production multi-user auth, tenant isolation, billing, or hosted SaaS operation.
- JARVIS or ToFu feature completeness.
- Tool, route, view, or success states that are displayed but not wired end to end.
- Temporary in-memory storage as production durability.
