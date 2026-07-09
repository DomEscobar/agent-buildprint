# Phase 06 - Interactive Eval Operator Console

## Objective

Ship a scoped **Eval Operator Console** — a local interactive developer tool for inspecting runs, traces, gate failures, and regression diffs. This is not the chat product UI.

## Required inputs

- phase 04 scorers and CLI
- eval archive (`.buildprint/eval-archive/`)
- receipt writer
- trace artifacts per run
- enabled profile list and claim ceiling
- `references/eval-control-plane-basis.md`

## Design gate

Before implementation, apply the `frontend-ui-product-design` skill:

- genre: developer/operator tool (eval terminology allowed)
- dominant object per screen: run, trace tree, gate failure, or diff — not a generic dashboard
- honest claim ceiling banner on every screen
- no seeded mock data presented as proof

Record `UI_IDENTITY_DONE` in handoff notes or an explicit UI blocker in the receipt.

## Console delivery shape

Minimum host deliverables:

```text
Local web console reading .buildprint/eval-archive/ + receipt artifacts
CLI parity: eval:run | eval:show | eval:diff | eval:replay | eval:archive
Optional lens adapters: Phoenix (local trace UI), Braintrust (history only)
```

Adapt host path to conventions: Next.js route, Vite dev server, or static HTML served from eval package.

Suggested CLI shape (adapt names):

```text
npm run eval:agentic-chat -- --scenario core-chat.blocked-tool-recovery
npm run eval:show -- --run latest
npm run eval:diff -- --baseline last-green
npm run eval:replay -- --scenario harness-runtime/cancel-mid-tool
npm run eval:archive -- --list --profile harness-runtime
```

## Required views

### 1. Run Explorer

Browse and filter archive events by:

- profile, scenario id, scenario_split, host commit, pass/fail, timestamp

Actions: open run detail, compare to baseline, re-run scenario.

### 2. Run Detail

Single-run drill-down:

- pass/fail summary and claim ceiling
- gate results map
- score summary (deterministic vs advisory model-judge/trajectory)
- blockers and artifact paths
- link to receipt file

### 3. Trace Timeline

Parent/child span tree for the selected run:

- filter by `span_type` (model, tool, repair, HITL, retrieval, UI, etc.)
- expand span input/output refs (redacted per policy)
- highlight spans referenced in failure record

### 4. Regression Diff

Side-by-side comparison of current run vs `last-green` baseline:

- gate pass/fail delta
- score delta
- new or missing span types
- failure mechanism change

### 5. Scenario Debugger

Interactive replay for development:

- step through scenario `turns`
- inject steering/cancel operator actions (harness-runtime profile)
- watch live span stream
- save run to archive on completion

Use `examples/harness-runtime-scenario.yaml` as reference shape.

### 6. Gate Failure Panel

When deterministic gates fail:

- show verifier outcome, agent behavior excerpt, abstract failure mechanism
- clearly separate deterministic failures from advisory model-judge/trajectory scores
- link to negative proof scenario if applicable

### 7. Negative Proof Runner

One-click replay of pinned negative scenarios (phase 05 list):

- wrong tool, missing side effect, missing span, forbidden tool
- profile-specific: injection bypass, missing repair, fake UI success

Must produce visible fail state in console — not silent CLI-only failure.

## Optional views (when profile enabled)

### Adversarial Library (security-governance)

- versioned injection case list
- bypass vs blocked classification over time
- link to `adversarial_case_library_version` in receipt

### UI Artifact Diff (ui-proof)

- side-by-side expected vs captured screenshot/DOM
- highlight debug/private data leaks

## Console invariants

- reads real archive and receipt JSON only
- receipts and deterministic gates remain authoritative
- console cannot override or mute failed gates
- blocked/not-proven profiles visible with honest labels
- no functionless buttons, placeholders, or mock passes as proof

## Required output

- local web console reachable at documented `console_url`
- CLI commands documented in capability plan
- `.buildprint/eval-console-evidence/` with screenshots for: run-detail, gate-failure, regression-diff
- console config recorded in receipt

## Proof before moving on

Show in console (or CLI + screenshots):

- at least one completed run visible in Run Explorer
- trace timeline renders real spans from a host run
- one failed deterministic gate inspectable in Gate Failure Panel with failure record triad
- regression diff works against `last-green` baseline
- one negative proof scenario produces visible fail state
- receipt links archive path and console URL
- claim ceiling banner matches receipt `proof_level`

## DO NOT

- Do not build consumer chat UI — that belongs to agentic-chat product buildprint
- Do not use Braintrust/Langfuse eval features as the control plane
- Do not replace deterministic gates with model-judge scores in the UI
- Do not present mock/seeded archive data as runtime proof
- Do not hide blocked profiles or failed runs
