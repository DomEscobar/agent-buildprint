# Eval Spec and Dataset Guide

Primary research artifacts:

```text
https://github.com/DomEscobar/agentic-eval-evolution-runtime/blob/main/EvalSpec_Guide.md
https://github.com/DomEscobar/agentic-eval-evolution-runtime/blob/main/Dataset_Quality_Checklist.md
```

Validated 2026-07-09. This guide ports portable patterns from those source docs into the Agentic Chat Eval Harness scenario contract. It governs how scenarios are authored, split, versioned, and audited before holdout or production-regression claims.

## Core rule

**Black-box outcome first, white-box diagnostics second.**

- E2E scenario pass/fail gates decide promotion and regression
- trace spans, component checks, and UI artifacts explain failures
- guardrails and deterministic gates disqualify unsafe variants

Final assistant text alone is never sufficient proof.

## Scenario split tags

Every scenario must declare `scenario_split`:

| Split | Purpose | Visibility |
| --- | --- | --- |
| `train` | Authoring feedback, exploratory cases | Scenario authors, optimizers |
| `validation` | Candidate selection during development | CI dev loop, console default filter |
| `holdout` | Final deploy gate | Never auto-visible to mutators or generators |
| `redteam` | Adversarial, injection, regression gate | Pinned library; always gated |
| `regression` | Pinned golden cases for CI | Regression command default set |
| `core` | Production-critical happy paths | Always in regression when profile enabled |
| `edge` | Boundary and corner cases | Validation + selective regression |
| `negative` | Expected-failure / negative proof cases | Negative proof runner |

A scenario may also declare `metadata.category` for finer grouping (e.g. `injection`, `cancel_mid_tool`, `weak_evidence`).

## Scenario case shape (extended)

Build on `agentic-chat-eval/scenario.v0`. Required additions:

```yaml
scenario_split: validation  # train | validation | holdout | redteam | regression | core | edge | negative
metadata:
  category: core
  difficulty: medium  # easy | medium | hard
  required_claims: []
  forbidden_claims: []
  expected_citations: []      # rag profile
  expected_checkpoints: []    # harness-runtime / multi-step
  cost_budget: null
  latency_budget_ms: null
  leakage_check: passed       # required before holdout promotion
```

Domain-specific fields belong in `metadata.additional_context` or profile-specific blocks (`expected_tool_calls`, `expected_state_diff`, etc.).

## Dataset layout (host convention)

Recommended directory shape:

```text
evals/
  scenarios/
    core-chat/
    tool-actions/
    harness-runtime/
    security-governance/
  splits/
    train.manifest.yaml
    validation.manifest.yaml
    holdout.manifest.yaml
    redteam.manifest.yaml
  adversarial/
    injection-cases.v1.yaml
.buildprint/eval-archive/
  events.jsonl
  last-green.json
```

Manifests list scenario ids and pinned versions. The regression command references `validation` + `regression` + selected `redteam` by default. Holdout runs require explicit operator action.

## Dataset quality checklist

Do not call a scenario library trustworthy until:

### Oracles and fixtures

- [ ] Each scenario has explicit `pass_gates` with deterministic assertions
- [ ] Expected outcomes are reviewer-confirmed, not agent-guessed
- [ ] Tool side effects have mock/sandbox receipts or observable state diffs
- [ ] Negative cases assert expected failure, not accidental pass

### Split hygiene

- [ ] Holdout scenarios are excluded from train/validation manifests
- [ ] Redteam cases are versioned (`adversarial_case_library_version` in receipt)
- [ ] Scenario version bumps are recorded in archive events
- [ ] Leakage check run before holdout promotion (`metadata.leakage_check: passed`)

### Trace and diagnostic coverage

- [ ] `expected_trace_events` cover model, tool, and final response at minimum
- [ ] Harness-runtime cases assert repair, queue, or cancellation spans when applicable
- [ ] Security-governance cases assert screening, HITL, or grant spans when applicable
- [ ] UI profile cases link screenshot/DOM artifact paths

### Review confidence

- [ ] Domain reviewer confirmed expected outcomes for production-critical flows
- [ ] Flaky live-model scenarios document model id, temperature, and flake threshold
- [ ] Blocked profiles are marked `not-proven`, not silently skipped

## EvalSpec-style generation workflow

When generating new scenarios from production failures (continual learning loop):

1. **Cluster** — group production failures by mechanism, not symptom text alone
2. **Hypothesize** — write abstract failure mechanism (see eval-control-plane-basis failure record triad)
3. **Draft case** — black-box outcome + white-box trace expectations
4. **Split assign** — start in `train`; promote to `validation` after review; never auto-promote to `holdout`
5. **Gate** — run deterministic scorers; model-judge optional and advisory
6. **Archive** — append EvalArchiveEvent even on failure
7. **Regression pin** — add to `regression` manifest only after validation pass

## Leakage checks

Before claiming holdout or production-regression proof:

- holdout scenario ids must not appear in train/validation manifests
- redteam payloads must not be embedded in scenario titles visible to optimizers
- production trace content must not be copied verbatim into fixtures without privacy review
- synthetic reconstruction is preferred when production content cannot be stored

## Negative proof scenarios

Maintain a pinned set of `scenario_split: negative` cases for phase 05 verification:

- wrong expected tool call must fail
- missing side-effect receipt must fail
- missing trace span must fail
- forbidden tool call must fail
- injection bypass must fail (security-governance)
- missing dangling-tool repair must fail (harness-runtime)

These are runnable from CLI and from the console Negative Proof Runner.

## Dataset economics (planning)

Per profile, budget scenario authoring effort honestly:

- 5–15 core/regression cases for first runtime proof
- 3–8 edge/negative cases for gate calibration
- 5–20 redteam cases for security-governance (renew periodically)
- holdout set stays small and stable; changes require version bump

Who authors and reviews cases must be named in `.buildprint/agentic-chat-eval-plan.md` before claiming `profile-proven`.

## Source links

- https://github.com/DomEscobar/agentic-eval-evolution-runtime/blob/main/EvalSpec_Guide.md
- https://github.com/DomEscobar/agentic-eval-evolution-runtime/blob/main/Dataset_Quality_Checklist.md
- https://github.com/DomEscobar/agentic-eval-evolution-runtime/blob/main/Continual_Learning_Loop.md
- `references/eval-control-plane-basis.md`
- `references/runtime-techniques-basis.md`
