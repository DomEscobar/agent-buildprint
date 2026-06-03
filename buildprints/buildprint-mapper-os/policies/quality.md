# Quality Policy

Core invariant: Buildprints should make better product implementation more likely. They should shape the agent's judgment before coding, not invite the agent to grade itself after coding.

## What Mapper OS should preserve

- The artifact type, promise, and central artifact/interface/boundary.
- The first usable end-to-end loop for the real consumer.
- Honest boundaries for credentials, providers, deployment, destructive actions, and security review.
- Mode-appropriate language and surface, not generic dashboards.
- State persistence/readback, traces, or reproducible outputs where the artifact needs continuity.
- A skeptical final review and concise handover.
- Anti-fabrication: every progress claim must bind to a runner artifact (exit code, acceptance-result.json, screenshot path, or observed walkthrough note).
- Builder/Reviewer separation for non-trivial slices: implementation and acceptance run in distinct agent sessions. The accepting agent uses `agb persona --role acceptance` to load the `acceptance-hostile-reviewer` capsule before evaluating any slice.
- Consumer-comprehension contract for UI-bearing spines: `03-ux-contract.md` defines the global Path Map, per-path novice and operator acceptance rows, jargon ban, and state language before any feature work. Every slice carries `paths:` entries that trace back to the Path Map. `sample_can_satisfy: false` acceptance rows require observation of the live end-to-end path, not a sample or blocker.
- Persona injection over self-certification: when an agent session starts work on a slice, it is handed the output of `agb persona --slice <path> --role build|acceptance` as its system identity. The capsule file lives in `templates/teams/` and is readable from the CLI; it is the stable identity anchor for the session.

## Slice/Gate enforcement

These mechanics replace phase-level OR-escape unlock conditions:

- **Slice**: a vertical unit of implementable work. Each slice has a `slice.yaml` with declared `paths:` and `core_proof_required:` entries. A slice is `complete` only when every `core_proof_required` path has `upgrades_claim: true` in its acceptance-result.
- **Gate**: a horizontal, posture-conditional check (security, observability, deployment, etc.). Gate results require human signoff where `requires_human_signoff: true`. Inactive gates record an `inactive_reason`; they are not silently skipped.
- **Derived state**: `state.json` is always written by `agb state derive`, never by an agent directly. `agb drift check` verifies `derived_by: "agb state derive"` is present.
- **Contract versioning**: every `acceptance-result.json` carries a `contract_version` hash of `03-ux-contract.md`. A mismatch makes the slice `stale` regardless of claimed status.

## What Mapper OS should avoid

- Evidence theater: large proof ledgers, claim vocabulary, and self-reported compliance as quality substitute.
- Overlong phase files full of protocol language.
- Validators that reward proof-shaped prose instead of runnable structure.
- User-facing, developer-facing, or operator-facing surfaces that leak Buildprint/phase/proof/test vocabulary.
- Broad shallow panels that satisfy headings but do not create a usable product.

## Preferred generated packet shape

Packet structure (v2 — Slice/Gate):

```
BUILDPRINT.md
01-questions.md
02-project-setup.md
02-architecture.md
03-ux-contract.md        ← global Path Map, novice + operator acceptance rows
blueprint.yaml
slices/
  <id>/
    slice.yaml           ← paths, core_proof_required, persona ref
    build-brief.md
    acceptance-spec.md
gates/
  gate-index.yaml
  security.md, observability.md, ...
04-handover.md            ← runner-generated from state.json
```

Rewrite content toward product leadership:

- role/mission/craftsmanship alignment via `agb persona` capsule injection, not inline prose;
- posture-aware role/rule (`trusted_local`, `private_authenticated`, `public_webapp`);
- central artifact/interface/boundary and artifact feel;
- concrete forbidden shortcuts;
- slices with `paths:`, `core_proof_required:`, and `persona:` reference — no OR-escape unlock conditions;
- `03-ux-contract.md` Path Map with at least one `sample_can_satisfy: false` operator acceptance row per user-facing path;
- `04-handover.md` tells the truth briefly and explicitly lists not-production-grade gaps.

Self-scored evidence is forbidden. Reviews are operational walkthroughs with observed outcomes. `state.json` is always derived by `agb state derive`, never written by an agent.
