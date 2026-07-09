# Apply Protocol

## Objective

Install the Agentic Chat Eval Harness through a strict, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `00-assessment-questions.md`.
4. Run `01-integration-plan.md`.
5. Implement each file in `02-implementation-phases/` in order.
6. Run `verify.md`.
7. Reconcile profiles against `references/runtime-techniques-basis.md`.
8. Write `.buildprint/agentic-chat-eval-receipt.md`.
9. Mirror or link the final receipt at `.buildprint/capability-receipt.md` for generic Capability Buildprint tooling.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/agentic-chat-eval-plan.md
.buildprint/agentic-chat-eval-safety-plan.md
.buildprint/agentic-chat-eval-receipt.md
.buildprint/capability-receipt.md
.buildprint/eval-archive/
.buildprint/eval-console-evidence/
```

## Implementation rule

Keep the harness bounded. Do not rewrite the chat runtime, replace the provider router, create a new product UI, or rebuild the RAG stack unless the plan says that scope is required and approved.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes production-critical flows, tool side-effect policy, sandbox mode, model-judge privacy, RAG privacy, destructive operation policy, or CI cost ceiling, stop and ask before source edits.

## Integration path discovery

The harness ships self-contained by default. The list of proposed 3rd-party integration paths is in `capability.yaml` under `proposed_integration_paths`. Discovery questions for each path are in `00-assessment-questions.md` under "3rd Party Integration Discovery". After host assessment and before integration plan, the applying agent must:

- read the proposed paths and decision questions
- ask the discovery questions relevant to this host
- record the decision in `.buildprint/capability-plan.md` under "Integration Path Decision"
- keep the default `deferred` if no path answers are confirmed
- if a path is adopted, document the adapter boundary and update the receipt schema to record adapter presence/absence/version

Any adopted path must run behind the deterministic gates in `verify.runtime_checks`. Model-judge scores may never override security, side-effect, or proof gates.

## Safety rule

The harness is safe-by-default:

- destructive tools: blocked, mocked, or sandboxed
- external judges: disabled until approved
- private transcripts: local-only unless approved
- RAG private documents: local-only unless approved
- model-only scores: claim ceiling unless supported by deterministic artifacts
- missing trace: blocked or downgraded

## Phase order

1. Contract and config
2. Runner and trace core
3. Host wiring and adapters
4. Scorers, profiles, and operator surface (CLI + JSON)
5. Interactive Eval Operator Console
6. Verification, regression, and receipt

Each phase must leave the repo in a buildable or honestly blocked state. If a phase cannot be completed, write the blocker to `.buildprint/agentic-chat-eval-receipt.md` and `.buildprint/capability-receipt.md`, then stop.

## Implementation rules

- Prefer host conventions over new frameworks.
- Use the existing test runner unless it cannot support scenario execution.
- Make scenarios versioned and deterministic where possible.
- Collect trace spans before scoring.
- Separate deterministic scorers from model-judge scorers.
- Treat model-judge scores as advisory unless calibrated with examples and bounded by deterministic gates.
- Do not execute production side effects.
- Do not claim RAG or UI coverage unless the relevant profile artifacts exist.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement while a hard-stop decision is unresolved.
- Do not score only final assistant text.
- Do not let a model judge overrule a failed deterministic gate.
- Do not hide missing trace, flaky scenarios, or unsafe tools behind a success claim.
- Do not over-broaden the task into an agent runtime rebuild.
