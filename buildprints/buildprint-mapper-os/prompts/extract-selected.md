# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Preconditions

- Discovery has run.
- Scope is selected or full-suite is explicitly requested.
- Source evidence exists for included capabilities or blockers are recorded.
- Sensitive surfaces have required hardening artifact requirements.

## Required Selected Output

For medium, large, or full-suite scope:

```text
  selected-buildprint/
  BUILDPRINT.md
  CAPABILITY_INDEX.md
  CONTEXT_PACKET.json
  SOURCE_SURFACE_COVERAGE.md
  CONTRACTS.md
  TEAM_STACK.md
  VERIFICATION.md
  EXECUTION_PROTOCOL.md
  PRE_IMPLEMENTATION_QUESTIONS.md
  IMPLEMENTATION_PLAN.md
  CURRENT_STATE.md
  UX_CONTRACT.md  # required when selected scope has user-facing UI/browser/dashboard/graph/report/editor/operator console
  DESIGN_QUALITY_BAR.md  # required when selected scope has user-facing UI/browser/dashboard/graph/report/editor/operator console
  manifest.json
  capabilities/<capability-id>/
    CAPABILITY.md
    VERIFICATION.md
    IMPLEMENTATION.md
    CONTRACTS.md  # only when local contracts are needed
```

For genuinely small scopes, a flat package may use `CAPABILITIES.md` instead of capability packs.

## Router-First Execution Packet Rule

Medium, large, and full-suite outputs are invalid unless a fresh coding agent can start by reading only:

1. `BUILDPRINT.md`
2. `CURRENT_STATE.md`
3. `EXECUTION_PROTOCOL.md`
4. `PRE_IMPLEMENTATION_QUESTIONS.md`
5. `TEAM_STACK.md`
6. `CONTEXT_PACKET.json`
7. the active capability pack named by `CURRENT_STATE.md` / `CONTEXT_PACKET.json`

Do not require the implementing agent to read all Markdown files or all capability packs before it knows the next action. `CURRENT_STATE.md` is the human-readable router. `CONTEXT_PACKET.json` is the machine-readable active-context router. `TEAM_STACK.md` is the quality gate router. `CAPABILITY_INDEX.md` is consulted only after proof to choose the next dependency-ready pack. `UX_CONTRACT.md` and `DESIGN_QUALITY_BAR.md` are loaded only when the active context or `TEAM_STACK.md` selects `ux-ui-craft`.

Set an explicit execution mode. Default full-suite selected outputs to `continuous-full-suite`: the implementation agent starts with the active pack, proves it, advances `CURRENT_STATE.md` and `CONTEXT_PACKET.json`, then consults `CAPABILITY_INDEX.md` to choose the next dependency-ready pack without reading unrelated packs upfront. Use `active-capability-handoff` only when the user explicitly requests a constrained validation or handoff run.

## Extraction Rules

- Convert source facts into source-independent behavior contracts.
- Do not preserve source internals unless externally observable or qualification-relevant.
- Every selected output must include `SOURCE_SURFACE_COVERAGE.md`.
- `SOURCE_SURFACE_COVERAGE.md` must list every high-signal census surface and its disposition: `OWNED_BY_CAPABILITY`, `MERGED_INTO_CAPABILITY`, `OUT_OF_SCOPE_BY_USER_ONLY`, `BLOCKED_NEEDS_REVIEW`, or `LOW_SIGNAL_IGNORED_WITH_REASON` only when a previously high-signal surface is downgraded with evidence.
- Capabilities must reference owned source surface IDs in their `CAPABILITY.md`; this is traceability, not route/function parity.
- Do not map routes/functions 1:1 unless that is the real product boundary.
- Do not satisfy source-surface coverage by dumping every route/function into a table. Each owned surface must connect to a named product obligation, contract, blocker, intentional merge, or explicit out-of-scope decision.
- If a high-signal surface is not owned by any capability, mark it as `BLOCKED_NEEDS_REVIEW`, `MERGED_INTO_CAPABILITY`, or `OUT_OF_SCOPE_BY_USER_ONLY`; do not omit it.
- Preserve the selected/requested capability surface. Do not convert “hard to prove,” “risky,” “external,” “destructive,” “provider-backed,” or “not first slice” into omission.
- Classify every capability as `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK`.
- Use `OUT_OF_SCOPE_BY_USER_ONLY` only for explicit user exclusions or explicit selected-target boundaries; lack of proof is not enough.
- Include stable-vs-free boundaries for every capability.
- Include first implementation slice and first verification gate for every included capability. Implementation slicing is not scope shrinking.
- Include a per-capability evidence/depth matrix for every medium, large, or full-suite output with columns for required teams, source evidence, product obligation, required topology, topology status, UI/UX status, API, domain logic, persistence/state, provider/runtime, failure states, proof command, proof artifact, negative test, runtime/browser evidence, depth status, and promotion blocker.
- Copy/emit `TEAM_STACK.md`; do not use old generic pass names. Generate `TEAM_STACK.md` for every selected/full-suite output. It must list selected team packs, trigger signals, blocking gates, required evidence, and review order. Team packs are markdown quality lenses, not autonomous agents and not user-selectable quality tiers. Team packs are original Mapper OS rules; public skill pages may inspire them, but selected output must not vendor or require third-party skill installation.
- Team routing: UI-bearing output selects `ux-ui-craft`, `product-architect`, and `test-and-verification`; medium/large/full-suite output selects `product-architect` and `test-and-verification`; provider/API/upload/job/runtime/webhook/external-side-effect output selects `integration-runtime`; auth/admin/user-data/payment/destructive/secrets/public-deployment output selects `security-boundary`; persistence/import/export/reporting/project-data/graph/model output selects `data-persistence`.
- UI-bearing output must generate `UX_CONTRACT.md` with screens, workflows, empty/loading/error/blocked/success states, component inventory, responsive behavior, visual quality bar, accessibility proof, interaction polish, and screenshot/browser proof plan.
- UI-bearing output must generate `DESIGN_QUALITY_BAR.md` with taste variables, product category, density/motion/layout targets, visual hierarchy, forbidden generic patterns, interaction polish, accessibility gates, responsive gates, and required screenshot set.
- Emit a Capability Proof Ledger in `VERIFICATION.md` for every included capability. For each row include required proof, command/API/browser path, artifact path, negative test, runtime/browser evidence, status, and blocker.
- Emit `CONTEXT_PACKET.json` for medium, large, and full-suite outputs. `mustRead` may include only `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `TEAM_STACK.md`, and the active capability pack's `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`. Put UI/provider/data/security docs in `readIfNeeded`. Put unrelated capability packs and `CAPABILITY_INDEX.md` in `doNotReadYet` until proof closes.
- Use role-chained artifacts, not free-form roleplay: source mapper output must feed product obligations; product obligations must feed required topology; topology must feed implementation planning; QA must feed proof ledger rows; skeptical reviewer must feed depth status and promotion blockers.
- For every included capability, emit source evidence, product obligation, required topology/layers, first implementation slice, required proof command, required proof artifact, negative test, promotion blocker, and depth status rule. If source proof is inferred or blocked, label it explicitly instead of omitting the field.
- Include an architecture topology gate for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy outputs. The gate must reject mostly single-file backends, one-file static UI shells, route-shaped endpoints, and seam-only adapters as product-quality implementation unless explicitly justified as tiny scope.
- Browser/UI products require `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, browser proof, or an explicit blocker. Static text/label presence is not enough.
- Provider-backed or runtime-heavy products require live/sandbox proof or explicit blocker. Deterministic adapters preserve contract shape only and must be marked `CONTRACT_SEAM_ONLY` until provider/runtime proof exists.
- Persistence claims require restart/readback/delete/export proof where applicable or must remain `CONTRACT_SEAM_ONLY`.
- Upload, auth/admin, destructive, provider, runtime/job, persistence mutation, export, and security-sensitive capabilities require negative/failure-state tests or explicit blockers.
- Use depth statuses: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, `FAKE_OR_PLACEHOLDER_FAIL`.
- Emit implementation signals for the downstream harness: user-facing UI, uploads, external providers, long-running jobs, graph persistence, simulation/runtime execution, reports, auth/admin, destructive controls, deployment surface, and recommended review specialties.
- Generate `PRE_IMPLEMENTATION_QUESTIONS.md` with at most five blocking questions that materially affect execution mode, security, scope, provider behavior, persistence, deployment, or qualification status. Do not ask how good the implementation should be and do not ask the user to choose a team; max-quality is mandatory and teams are inferred from Buildprint signals.
- `HANDOFF.md` and `EXECUTION_PROTOCOL.md` must require the implementation agent to read `PRE_IMPLEMENTATION_QUESTIONS.md` before coding, ask unresolved blockers, record concrete max-quality defaults and execution mode in `CURRENT_STATE.md`, and execute team-pack gates from `TEAM_STACK.md`.
- Keep unresolved questions out of files that claim implementation readiness.
- Mark selected output `SELECTED_UNQUALIFIED` until proof exists.
- Validate selected output shape before handoff. Fail the package if `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, or `TEAM_STACK.md` is missing, `UX_CONTRACT.md` or `DESIGN_QUALITY_BAR.md` is missing for UI-bearing output, required team packs are absent, any included capability pack lacks sibling `CAPABILITY.md`, `IMPLEMENTATION.md`, or `VERIFICATION.md`, `manifest.json` lists missing/non-canonical files, typo aliases such as `VERFICATION.md` exist, or both `HANDOFF.md` and `HANDOVER.md` appear as canonical spine files.

## Behavior Loss Review

Before handoff, ask:

> What source-backed product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become one of:

- a capability obligation;
- a capability blocker;
- an explicit user-approved exclusion;
- or a documented merge into another capability.

This review is adversarial: the goal is not source-shape parity, but preventing silent loss of product behavior.

## Forbidden Defaults

Do not create default `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, `IMPLEMENTATION_COMPLETENESS.md`, `PHASE_PLAN.md`, or `LOOP_GATES.md`.
