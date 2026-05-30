# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not authoritative; packet snapshots and local runtime state decide the work.

## Production-quality alignment

Your job is not to make the packet green. Your job is to build the smallest credible version of the product or capability the packet describes.

A phase does not pass because routes exist, buttons click, tests are green, or screenshots were saved. A phase passes only when three proof layers are true:

1. Functional proof — the user path or callable path executes through real app/service/domain/state boundaries.
2. Semantic proof — the generated artifacts, data, decisions, or outputs are meaningful for the mapped domain, not canned filler.
3. Experience proof — the result looks and behaves like the intended product/capability, not a scaffold, generic dashboard, raw CRUD screen, toy simulation, or proof harness.

If any layer is weak, mark the phase blocked or partial. Do not launder weak work through passing tests.

## Cheap-pass rejection

Reject and repair these patterns before claiming progress:

- Decorative canvases: token bubbles, static node labels, fake zoom/pan/layout controls, no selection, no edge meaning, no inspector, no graph-state change.
- Toy runtimes: timelines filled with templated phrases, no causal state, no stop/retry/recovery, no platform/tool-specific behavior.
- Shallow AI/provider mode: deterministic output that is honest but trivial; canned reports/chats that echo counts instead of reasoning over state.
- Generic UI: default forms, stacked cards, admin panels, raw JSON/text lists, visible internal ids, phase/proof/test vocabulary, mock/debug buttons on the user surface.
- Fake controls: any visible control without an exercised effect in browser/e2e/API proof.
- Evidence inflation: one smoke test or screenshot reused to qualify unrelated browser, worker, security, provider, or lifecycle claims.

Deterministic/sandbox mode is allowed, but it must preserve the shape, depth, failure modes, and UX expectations of the live path. “No live credentials” is not permission to build a toy.

## Product judgment loop

Before each implementation slice, write the intended user-visible artifact in one sentence: “A real user can now …”. Then build toward that sentence.

Before `phase_core_passed`, add a short Product Quality Review to the phase proof:

- What would make this look fake or low-effort?
- Which screenshot/trace proves the main artifact is domain-specific and interactive?
- What semantic output proves the domain model is not filler?
- What remains blocked, and which claim stays unqualified?

If the honest review says “this is technically working but lame,” the phase is not done.

## Setup and proof minimums

Create the real project scaffold required by `02-project-setup.md` before phase code. Use a production-grade stack appropriate to the selected mode. UI-bearing products need a component model, styling system, accessible states, responsive layout, and domain-specific interaction surfaces. Non-UI outputs need equivalent developer/operator quality: stable APIs, clear errors, traces, dry-run/rollback where relevant, and consumer examples.

Follow `03-phases/phase-flow.md` for phase-run artifacts and evidence mechanics, but keep the transcript focused: implement, verify, critique, repair, record. Do not repeat packet prose as proof.

Use claim typing honestly: `target`, `core_pass`, `claim_upgrade`, or `blocker`. Review prose is not implementation proof. Live provider, public deployment, auth/security, worker/lifecycle, and visual-quality claims need direct matching artifacts.
