# Phase Flow

Use this file to run every phase. Role expertise lives in `06-contracts/*.md`; this file only routes work.

## Phase Entry Protocol

1. Read `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `.buildprint/next-agent.md`, current project `AGENTS.md`, active phase, this file, and only the active phase's required `06-contracts/<role>.md` files.
2. Resolve every `requires_roles` value in the active phase to a real contract file under `06-contracts/`.
3. Create phase-run artifacts before code edits:
   - `.buildprint/phase-runs/<phase_id>/plan.md`
   - `.buildprint/phase-runs/<phase_id>/team-gates.md`
   - `.buildprint/phase-runs/<phase_id>/handoffs/<role>.md`
4. Use subagents or delegated workers when supported. If unavailable, self-simulate each required role and write the same handoff/return artifacts.
5. Implement the bounded outcome, integrate returns, run review, run proof gate, then write:
   - `.buildprint/phase-runs/<phase_id>/returns/<role>.md`
   - `.buildprint/phase-runs/<phase_id>/review.md`
   - `.buildprint/phase-runs/<phase_id>/proof.md`
6. Append runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl` only after the artifacts above exist.

## Bounded Handoff Shape

Each role handoff must include:

- Phase id
- Role name
- Scope to inspect or implement
- Files or modules expected to be touched
- Constraints
- Reject conditions
- Required return headings
- Proof evidence expected

## Integration And Review

The orchestrator owns final integration. Role returns are advisory until integrated and tested. If role returns conflict, prefer the active phase proof gate and `02-project-setup.md`.

## Repair Routing

- Proof failure: repair current phase only.
- Architecture contradiction: return to `02-project-setup.md`.
- Missing role artifact: repair `03-phases/phase-flow.md` artifacts before code changes continue.
- Security/provider blocker: use `06-contracts/security-boundary.md` and `06-contracts/integration-runtime.md`.
- Visual quality failure: repair active UI phase and `implementation-project/ui-identity.md`.

## Runtime Evidence Rule

Packaged `05-evidence/evidence-ledger.jsonl` is immutable seed. Runtime rows belong only in `.buildprint/evidence/evidence-ledger.jsonl` with `phase_id`, command, result, artifact path, and proof summary.
