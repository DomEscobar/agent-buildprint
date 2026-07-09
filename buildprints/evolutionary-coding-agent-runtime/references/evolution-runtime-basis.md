# Evolution Runtime Basis

Primary research artifact:

```text
https://github.com/DomEscobar/agentic-eval-evolution-runtime
```

Validated 2026-07-09. The repo is an architecture and research package for eval-guided improvement loops. It contains **no runnable implementation code** — only framework docs, golden setup guidance, EvalSpec/dataset checklists, and sourced research reports.

This capability buildprint translates the repo's **Mode B: Coding Agent Patch Loop** into host integration work. Mode A (config/prompt evolution for RAG/chat/classifier apps) lives in the source repo but is out of default scope here.

## Governing thesis

**Agents are replaceable. Evals are the control plane.**

| Layer | Role | Own in host |
| --- | --- | --- |
| Agent runtime | produces patches / variants | adapter to existing coding agent |
| Eval control plane | tasks, gates, promote/rollback, archive | **yes — core of this buildprint** |
| Integration boundary | editable surfaces, sandbox, checksum evaluator | **yes — isolation enforcement** |

Cross-agent comparability falls out once specs, harness, and metrics are stable. The durable assets are task definitions, hidden tests, regression oracle cases, golden datasets, and patch archive lineage — not the agent scaffold.

## Mode B loop (default profile)

Canonical shape from `Golden_Quality_Setup.md` and `research/2026-07-07-coding-agent-patch-loop/report.md`:

```text
Task / Spec
  -> Repo Snapshot
  -> Coding Agent (one focused patch)
  -> Unit Tests (hard gate — fail fast, rollback)
  -> Benchmark / Regression Oracle
  -> Compare to Best Snapshot
  -> Promote or Roll Back
  -> Archive Lineage
  -> Repeat until baseline, budget, or plateau
```

TDAD-style safeguards to adopt:

- evaluator script SHA-256 checksummed and read-only
- unit-test failure reverts immediately
- benchmark compares against best snapshot
- regression triggers rollback
- five consecutive reverts force restore to best snapshot
- regression rate tracked separately from resolution rate

## Self-Harness mechanisms (directional evidence)

From [Self-Harness](https://arxiv.org/abs/2606.09498) — adopt all three in the control plane:

1. **Editable surfaces (allowlist, not blocklist).** Hand the proposer an explicit list of paths/modules it may edit. Everything else is off-limits by default. Blocklists fail open; allowlists fail closed.
2. **Causal weakness mining.** Failure records need three levels: verifier outcome, agent behavior from trace, abstract failure mechanism. Clustering on outcomes alone produces wrong fix hypotheses.
3. **Dual acceptance.** A patch merges only if it shows no regression on **both** a held-in split (fixes mined weakness) and a held-out split (does not break anything else).

## Hard gates before scoring

Disqualify — do not merely penalize — when:

- guardrail violation
- evaluator or hidden-test checksum changed
- patch outside editable surfaces
- unit tests fail
- forbidden files touched
- holdout leakage detected
- unsafe tool permission or sandbox escape

Only candidates passing all hard gates receive a composite or Pareto score vector.

## Suggested score vector (coding agents)

Use per-metric vectors for selection (Pareto-optimal), not a single weighted composite alone:

```text
60% issue resolution / correctness
15% regression safety
10% patch minimality
10% code quality / static checks
 5% cost and latency
```

Baseline success requires **both** resolution and non-regression.

## Archive requirements

Store every evaluated candidate, including failures. Minimum fields match `capability.yaml` `mandatory_archive_fields`.

Additional control-plane mechanisms:

- **Novelty rejection** ([ShinkaEvolve](https://arxiv.org/abs/2509.19349)): pre-eval embedding similarity filter against archive to save budget and reduce diversity collapse.
- **Clade tracking** ([Huxley-Godel Machine](https://arxiv.org/abs/2510.21614)): track lineage improvement potential, not only current best score.

## Kitchen Loop counterweight (speculative evidence)

When benchmark-only optimization is risky, add a specification surface and regression oracle:

- enumerate product claims the system must support
- synthetic usage against that surface
- bounded answer to "is the system at least as good as before?"

Source: [Kitchen Loop](https://arxiv.org/abs/2603.25697). Treat as design guidance, not proven ROI.

## Build vs buy

**Reuse as libraries** (Framework Rule — no third-party types in adapter/archive contracts):

- general eval runner: DeepEval or Inspect AI
- benchmark substrate shape: SWE-bench / SWE-bench Verified
- coding agent reference class: SWE-agent, mini-SWE-agent, AutoCodeRover
- optional CI red-team: promptfoo

**Build locally:**

- task spec and editable-surface enforcement
- evaluator integrity and guardrail isolation
- archive schema and rollback/promotion logic
- convergence and budget stops
- host-specific adapter to coding agent runner

## Recommended rollout phases (within Mode B)

Once host prerequisites exist, sequence work as the source repo recommends:

```text
Phase 1: agent patches target application code toward project-local baseline
Phase 2: agent proposes scaffold/tooling changes as reviewable PRs (human gate)
Phase 3: benchmark selects better scaffold variants
Phase 4: DGM/HGM-style open-ended self-improvement with lineage archive (deferred)
```

Do **not** start Phase 2–4 until Phase 1 proves archive/gate/rollback ROI on the simpler app-patch case.

## Source doc map

| Source path | Use when |
| --- | --- |
| `Golden_Quality_Setup.md` | target architecture, gates, implementation order |
| `Generisches_Eval_Harness_Framework.md` | original framework intent, section 10 patch mode |
| `EvalSpec_Guide.md` | generating trustworthy task/benchmark cases |
| `Dataset_Quality_Checklist.md` | auditing dataset trust before claiming holdout proof |
| `Continual_Learning_Loop.md` | production failure cluster → eval case → gated fix |
| `research/2026-07-07-coding-agent-patch-loop/report.md` | TDAD, SICA, DGM, Kitchen Loop evidence |
| `research/2026-07-07-agentic-eval-runtime/report.md` | generic eval/runtime tool choices |

## Product use-case mapping

This buildprint primarily serves hosts classified as **coding agents** in the agentic-runtime-techniques catalog:

- SWE-style issue repair loops
- project-local regression climbers
- algorithm/scientific code evolution (AlphaEvolve profile)
- scaffold improvement experiments (deferred, human-gated)

It composes with `agentic-chat-eval-harness` when the host also needs chat/runtime regression — but does not require it.

## Honest maturity statement

The source repo and this buildprint describe **intended** architecture. Host proof requires deterministic receipts from the applying project. Research tags in `capability.yaml` `evidence.research_tags` must appear in receipts when citing external results.
