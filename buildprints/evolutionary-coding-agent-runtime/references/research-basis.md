# Research Basis

## Primary architecture source

Research artifact:

```text
https://github.com/DomEscobar/agentic-eval-evolution-runtime
```

Validated 2026-07-09. See `references/evolution-runtime-basis.md` for how this repo maps to profiles, contracts, gates, and archive design. Key docs:

- `Golden_Quality_Setup.md` — eval control plane thesis, gates, implementation order
- `research/2026-07-07-coding-agent-patch-loop/report.md` — TDAD loop, Self-Harness, DGM, Kitchen Loop
- `research/2026-07-07-agentic-eval-runtime/report.md` — generic eval runner/tool choices
- `EvalSpec_Guide.md`, `Dataset_Quality_Checklist.md`, `Continual_Learning_Loop.md`

**Maturity:** research and architecture only — no runnable package in the source repo.

## Adopted patterns (Mode B — coding agents)

### Control plane / patch loop

- **TDAD auto-improvement loop** (directional/speculative headline numbers): one focused source change, unit-test gate, benchmark subset, best-snapshot rollback, evaluator checksum — closest direct loop reference.
- **Self-Harness** (directional): editable-surface allowlist, causal weakness mining, dual acceptance on held-in/held-out splits.
- **SWE-bench / SWE-agent** (solid): canonical benchmark substrate and agent-computer-interface shape for issue → patch → test.
- **Kitchen Loop** (speculative): specification surface and regression oracle as counterweight to pure benchmark Goodharting.

### Evolutionary / population search (optional profile)

- **AlphaEvolve** (directional): evaluator-guided evolutionary code improvement in algorithm/scientific settings.
- **CodeEvolve / OpenEvolve**: island-based search, SEARCH/REPLACE diffs, sandboxed evaluation, checkpointing.
- **Darwin Godel Machine** (directional): self-modifying agent with archive tree; high compute; Phase 4 deferred.
- **Huxley-Godel Machine** (directional): clade metaproductivity in archive selection.
- **ShinkaEvolve** (directional): novelty rejection pre-eval filter against archive embeddings.

### Config evolution (out of default scope — Mode A)

- **DSPy / GEPA** (solid): config/prompt mutation from traces — relevant only if user extends to non-coding AI apps.
- **DeepEval / Inspect AI** (solid): reusable eval runners behind host-owned gates.

## Design translation for this buildprint

- Evaluation is the hard dependency; agents are replaceable patch producers.
- Editable surfaces use **allowlists**, not blocklists alone.
- Evaluator, hidden tests, guardrails, and archive are immutable from the agent's perspective.
- Unit tests gate before benchmark spend; regressions roll back.
- Failure records capture outcome, trace behavior, and mechanism for causal mining.
- Archive stores all candidates; receipts record no-improvement honestly.
- Model-judge output is advisory and cannot override deterministic gates.

## Evidence strength (use in receipts)

| Reference | Tag | Notes |
| --- | --- | --- |
| SWE-bench, SWE-agent | solid | widely used benchmark substrate |
| DSPy, GEPA | solid | mature optimizers |
| AlphaEvolve | directional | strong in algorithm domains |
| Darwin Godel Machine | directional | real gains, extreme compute |
| Self-Harness | directional | clearest loop mechanics description |
| Huxley-Godel Machine | directional | archive/clade refinement |
| TDAD | speculative | headline numbers on 10-instance subset |
| Kitchen Loop | speculative | unreplicated; design counterweight |
| Live-SWE-agent | directional | runtime scaffold evolution — inspiration only |

Do not cite directional/speculative papers as proof the host improved.

## Rejected as primary v1 shape

- Unrestricted self-modifying agent scaffold without human review gates.
- Blocklist-only mutation scope without editable-surface allowlist.
- Benchmark score as sole success metric without regression oracle or held-out gates.
- Rebuilding DeepEval/Inspect/SWE-bench from scratch.
- Claiming self-improvement from model-judge text without deterministic reruns.

## Source links

### Primary repo

- https://github.com/DomEscobar/agentic-eval-evolution-runtime
- https://raw.githubusercontent.com/DomEscobar/agentic-eval-evolution-runtime/main/Golden_Quality_Setup.md
- https://raw.githubusercontent.com/DomEscobar/agentic-eval-evolution-runtime/main/research/2026-07-07-coding-agent-patch-loop/report.md

### Benchmarks and agents

- https://github.com/SWE-bench/SWE-bench
- https://www.swebench.com/verified.html
- https://github.com/swe-agent/swe-agent
- https://github.com/swe-agent/mini-swe-agent
- https://github.com/AutoCodeRoverSG/auto-code-rover

### Research papers

- https://arxiv.org/abs/2505.22954 — Darwin Godel Machine
- https://arxiv.org/abs/2606.09498 — Self-Harness
- https://arxiv.org/abs/2510.21614 — Huxley-Godel Machine
- https://arxiv.org/abs/2506.13131 — AlphaEvolve
- https://arxiv.org/html/2603.17973v1 — TDAD
- https://arxiv.org/abs/2603.25697 — Kitchen Loop
- https://lilianweng.github.io/posts/2026-07-04-harness/ — harness engineering survey
- https://arxiv.org/html/2507.02825v2 — Agentic Benchmark Checklist

### Eval libraries (reuse behind gates)

- https://github.com/confident-ai/deepeval
- https://github.com/UKGovernmentBEIS/inspect_ai

## Supplemental note

Earlier buildprint drafts referenced `/root/evolve.md` for AlphaEvolve/CodeEvolve/OpenEvolve patterns. That content is now subsumed by the primary GitHub repo and the coding-agent patch-loop research report above.
