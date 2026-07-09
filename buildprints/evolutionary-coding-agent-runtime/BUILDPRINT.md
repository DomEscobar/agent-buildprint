# BUILDPRINT: evolutionary-coding-agent-runtime

You are applying one strict Capability Buildprint to an existing coding-agent host. Your job is to add an **eval-guided patch loop** (and optional population-based evolution) where the **eval system is the control plane** and the coding agent is a disposable patch producer.

This is a bounded capability, not a whole-product Buildprint. Do not rebuild a generic eval framework from scratch. Graft a TDAD / Self-Harness / AlphaEvolve-inspired improvement loop onto a host that already has or can add deterministic benchmarks, hidden tests, and sandboxed execution.

## Primary source

Architecture, contracts, evidence tags, and implementation order are derived from:

- https://github.com/DomEscobar/agentic-eval-evolution-runtime
- `references/evolution-runtime-basis.md`
- `references/research-basis.md`

That repository is currently **research and architecture only** — no runnable implementation code. This buildprint translates its Mode B (Coding Agent Patch Loop) design into host integration work. Mode A (config/prompt evolution for RAG/chat apps) is out of scope unless the user explicitly extends scope.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `00-assessment-questions.md`
6. `01-integration-plan.md`
7. `apply.md`
8. `02-implementation-phases/01-contract-and-config.md`
9. `02-implementation-phases/02-core-integration.md`
10. `02-implementation-phases/03-host-wiring.md`
11. `02-implementation-phases/04-user-operator-surface.md`
12. `02-implementation-phases/05-verification-and-receipt.md`
13. `verify.md`
14. `references/evolution-runtime-basis.md`
15. `references/research-basis.md`

No source edits before host assessment and capability plan. The applying agent must inspect the host, classify findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`, record the decision path, and block when the fitness function, sandbox boundary, editable surfaces, or evaluator integrity plan is unclear.

## Architecture thesis

**Agents are replaceable. Evals are the control plane.**

```text
Eval Control Plane (selection — own this)
  - task/spec definitions
  - visible + hidden tests
  - hard gates and regression oracle
  - promote / rollback / budget / convergence
  - event-sourced archive and lineage

Coding Agent (variation — adapter to host)
  - inspects repo snapshot
  - proposes one focused patch
  - reads visible feedback only

Integration Layer (isolation boundary)
  - editable-surface allowlist
  - sandbox + checksum-protected evaluator
  - adapter to host agent runner and test harness
```

The coding agent may patch application code or, in an advanced deferred profile, propose scaffold changes as reviewable PRs. It must **not** patch the evaluator, hidden tests, guardrails, or archive.

## Capability promise

Add a bounded loop:

```text
task spec + repo snapshot
  -> coding agent patch
  -> unit-test gate
  -> benchmark / regression oracle
  -> promote or rollback
  -> archive lineage
  -> repeat until baseline, budget, or plateau
```

Optional profile: population-based mutation (AlphaEvolve / CodeEvolve style) over bounded code zones with selection and island migration — only when the host already supports multi-candidate evaluation cost.

## Scope boundary

This buildprint installs:

- task/spec and editable-surface contracts
- evaluator integrity protection (checksum, read-only hidden tests)
- TDAD-style patch loop with dual acceptance (held-in + held-out)
- causal weakness mining in failure records (outcome + trace behavior + mechanism)
- sandboxed candidate execution with timeout, memory, and network limits
- event-sourced archive with patch lineage, regression count, and rollback path
- operator surface, receipts, and honest claim ceilings

It does **not** replace:

- the host's coding agent runtime
- SWE-bench or project-local benchmark authoring
- full dataset construction (EvalSpec / golden-case generation is a human milestone)
- Mode A config/prompt evolution for non-coding AI apps

## Proposed integration paths

The buildprint ships self-contained by default. Adopted paths must run behind deterministic gates in `verify.md`; model-judge praise never overrides security, regression, or proof gates.

Available paths (detail in `capability.yaml` under `proposed_integration_paths`):

- `tdad-patch-loop` — unit-test gate, benchmark subset, best-snapshot rollback (default v1 shape)
- `self-harness-gates` — editable-surface allowlist, causal weakness mining, dual acceptance
- `swe-bench-shape` — project-local task spec mirroring issue + repo snapshot + hidden tests
- `kitchen-loop-oracle` — specification surface + regression oracle alongside benchmark score
- `population-evolution` — multi-candidate LLM mutation + selection (AlphaEvolve/CodeEvolve profile)
- `inspect-ai-runner` — Inspect AI as eval runner library behind host gates
- `deepeval-runner` — DeepEval as eval runner library behind host gates
- `hybrid-self-plus-adapter` — keep self-contained, add optional adapter per adopted path

Decision gate is in `00-assessment-questions.md` under "Integration Path Discovery". Default decision is `self-contained` / `tdad-patch-loop`.

## Local checkpoints

The applying agent must create these files in the host repo before or during implementation:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/evolution-runtime-plan.md
.buildprint/evolution-runtime-safety-plan.md
.buildprint/evolution-runtime-receipt.md
.buildprint/capability-receipt.md
```

## Hard-stop conditions

Stop before implementation when:

- the host has no deterministic benchmark, test suite, or measurable fitness signal;
- candidate execution cannot be sandboxed;
- editable surfaces are undefined or use a blocklist-only plan without user approval;
- the evaluator, hidden tests, or guardrails cannot be checksum-protected from the agent;
- the mutation scope could edit secrets, deployment config, credentials, billing, or production data;
- the host cannot persist lineage, scores, failures, and selected winners;
- the user wants autonomous self-modification without approval and rollback.

## Quality bar

The installed capability is proven only when a host run produces at least one focused patch cycle, evaluates it under the same fitness function as baseline, enforces unit-test and regression gates, records lineage, and either improves over the best snapshot or honestly records no improvement. A model-judge can advise, but deterministic evaluator results and receipts own the claim.

## Evidence honesty

Tag claims using the source repo's evidence scale:

| Tag | Meaning |
| --- | --- |
| solid | replicated substrate (SWE-bench, SWE-agent, DSPy, GEPA) |
| directional | real reported results, limited replication (DGM, Self-Harness, HGM, AlphaEvolve) |
| speculative | single preprint or unreplicated (TDAD headline numbers, Kitchen Loop) |

Do not cite directional or speculative research as proof that the host improved. Receipts must separate fixture proof, host proof, and blocked states.
