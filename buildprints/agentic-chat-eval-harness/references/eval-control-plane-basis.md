# Eval Control Plane Basis

Primary research artifact:

```text
https://github.com/DomEscobar/agentic-eval-evolution-runtime
```

Validated 2026-07-09. The repo is an architecture and research package for eval-guided improvement loops. It contains **no runnable implementation code** — only framework docs, golden setup guidance, EvalSpec/dataset checklists, and sourced research reports.

This capability buildprint translates the repo's **eval control plane thesis** into Agentic Chat eval harness work. Mode A (config/prompt evolution) and Mode B (coding-agent patch loop) live in the source repo; Mode B is implemented by `buildprints/evolutionary-coding-agent-runtime`. This buildprint owns **chat/runtime regression eval** with an interactive operator console.

## Governing thesis

**Agents are replaceable. Evals are the control plane.**

| Layer | Role | Own in host |
| --- | --- | --- |
| Agent runtime | produces chat responses, tool calls, state changes | adapter to existing chat runtime |
| Eval control plane | scenarios, gates, archive, promote/rollback, receipts, console | **yes — core of this buildprint** |
| Integration boundary | safe/sandbox mode, trace export, redaction | **yes — isolation enforcement** |

Cross-model comparability falls out once scenarios, harness, and metrics are stable. The durable assets are task definitions, regression oracle cases, golden datasets, adversarial case libraries, and eval archive lineage — not the agent scaffold or model choice.

## Mapping from source repo to this buildprint

| Source concept | This buildprint |
| --- | --- |
| `TaskAdapter.run()` | Chat runtime adapter (phase 03) |
| `TaskAdapter.extract_trace()` | TraceSpan collector (phase 02) |
| `EvalCase` | `Scenario` fixture |
| Hard disqualifiers | Deterministic `pass_gates` |
| Archive (SQLite/JSONL) | `EvalArchiveEvent` in `.buildprint/eval-archive/` |
| Release gate | Regression command + receipt claim level |
| Mutator | **Out of scope** — see evolutionary-coding-agent-runtime |
| Coding patch loop | **Out of scope** — see evolutionary-coding-agent-runtime |
| Eval Operator Console | Phase 06 interactive console |

## Eval control plane loop (chat eval)

Canonical shape for this capability:

```text
Versioned scenario fixtures (with split tags)
  -> host chat runtime adapter (safe/sandbox mode)
  -> provider-neutral trace/span collector
  -> deterministic scorers (trace, state, side effects, UI, RAG)
  -> optional bounded model-judge scorers
  -> trajectory-level scorer (advisory only)
  -> EvalArchiveEvent append (every run, pass or fail)
  -> Eval Operator Console (inspect, diff, replay)
  -> regression command + machine-readable receipt
  -> negative proof paths
```

## Event-sourced eval archive

Store every evaluated run, not only winners. Recommended v1 storage: append-only JSONL or SQLite under `.buildprint/eval-archive/`.

Minimum archive event fields (see `capability.yaml` `mandatory_archive_fields`):

- `run_id`, `parent_run_id`
- `scenario_id`, `scenario_version`, `host_commit`, `profile`
- `gate_results`, `aggregate_pass_fail`
- `trace_summary`, `failure_record`
- `cost`, `latency`, `timestamp`
- `model_versions` when live models used

The archive is not bookkeeping. It enables regression diff, causal weakness mining, and repeated-failure analysis.

## Causal weakness mining (failure record triad)

From [Self-Harness](https://arxiv.org/abs/2606.09498) — adopt in receipt and archive:

1. **Verifier outcome** — which gate failed and how (e.g. `forbidden-tools: fail`)
2. **Agent behavior from trace** — what the agent actually did (tool called, span sequence)
3. **Abstract failure mechanism** — root cause class (e.g. `injection_bypass`, `fake_completion`, `missing_repair_span`)

Clustering on outcomes alone produces wrong fix hypotheses. Without traces, causal mining is impossible.

## Dataset splits

Use four logical splits for scenario libraries (see `references/eval-spec-and-dataset-guide.md`):

```text
train       visible to scenario authors and optimizers; feedback cases
validation  used for candidate selection during development
holdout     never visible to mutators or auto-generators; final deploy gate
redteam     adversarial and injection regression; always gated
```

The regression command for CI typically runs `validation` + `regression` + pinned `redteam` subsets. Holdout runs are manual or release-gated.

## Continual learning loop

Production failures should become eval pressure without letting observability tools own promotion:

```text
Production traces / logs
  -> failure clusters
  -> human-approved hypothesis
  -> new regression case or scenario update
  -> validation + regression + holdout gates
  -> human review
  -> archive lineage
  -> limited launch
```

Observability tools identify clusters; they do not decide promotion. Source: [Continual_Learning_Loop.md](https://github.com/DomEscobar/agentic-eval-evolution-runtime/blob/main/Continual_Learning_Loop.md).

## Framework Rule (3rd-party tools)

External tools (Inspect AI, Braintrust, Ragas, Phoenix, Langfuse) are used as **libraries behind our contracts**:

- call them from adapters; do not let them dictate scenario schema, gate logic, or archive format
- receipts and deterministic gates remain authoritative
- Braintrust/Langfuse eval features are **lenses**, not the control plane
- trace UI (Phoenix local, Langfuse self-hosted) is optional inspection; console reads local archive first

## Trace format alignment

When the host supports it, traces should follow **OpenTelemetry GenAI semantic conventions** so production and eval share one format. The adapter captures spans in-process; no collector required for eval runs.

- **Eval runs:** full-depth trace including content (constructed fixtures, no real user data)
- **Production:** metadata-only by default; content capture opt-in per privacy policy
- Pin semconv version in adapter; attribute renames stay adapter-local, not in archive schema

## Hard gates before scoring

Disqualify — do not merely penalize — when:

- guardrail or forbidden-tool violation
- missing required trace span or side-effect receipt
- fake completion or no-fake-success gate failure
- injection bypass with forbidden side effect (security-governance)
- missing dangling-tool repair span (harness-runtime)
- holdout leakage into training/validation sets

Only runs passing all hard gates receive advisory model-judge or trajectory scores.

## Interactive Eval Operator Console

The console is part of the control plane, not the chat product UI:

- reads eval archive and receipt artifacts
- supports run exploration, trace timeline, regression diff, scenario debug replay
- displays claim ceiling and blocked profiles honestly
- does not override deterministic gates
- does not use mock/seeded data as proof

Minimum delivery: local web console + CLI (`eval:run`, `eval:show`, `eval:diff`, `eval:archive`). Optional: Phoenix (local trace lens), Braintrust (history lens).

## Build vs buy

**Reuse as libraries:**

- general eval runner: Inspect AI, DeepEval
- RAG metrics: Ragas, TruLens (rag profile only)
- trace UI lens: Phoenix (dev), Langfuse self-hosted (production funnel)
- history lens: Braintrust (when approved)

**Build locally:**

- chat runtime adapter and scenario schema
- deterministic gate registry
- eval archive schema and regression diff
- Eval Operator Console
- receipt writer and claim ceiling logic

## Source doc map

| Source path | Use when |
| --- | --- |
| `Golden_Quality_Setup.md` | target architecture, gates, implementation order |
| `Generisches_Eval_Harness_Framework.md` | original framework intent |
| `EvalSpec_Guide.md` | generating trustworthy scenario cases |
| `Dataset_Quality_Checklist.md` | auditing dataset trust before holdout claims |
| `Continual_Learning_Loop.md` | production failure → eval case → gated fix |
| `research/2026-07-07-agentic-eval-runtime/report.md` | generic eval/runtime tool choices |

## Cross-references

- `references/runtime-techniques-basis.md` — agentic-runtime-techniques catalog mapping
- `references/eval-spec-and-dataset-guide.md` — scenario splits and quality audit
- `buildprints/evolutionary-coding-agent-runtime/` — coding-agent patch loop (Mode B)

## Honest maturity statement

The source repo and this buildprint describe **intended** architecture. Host proof requires deterministic receipts and console evidence from the applying project. Do not claim `production-regression` without pinned scenario versions and repeatable archive-backed diff.
