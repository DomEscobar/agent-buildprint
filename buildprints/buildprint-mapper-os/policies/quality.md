# Quality Policy

Buildprint Mapper quality is judged by whether a downstream AI builder can build the mapped artifact without guessing, silently shrinking scope, losing design responsibility, or shipping fake success.

## Invariants

- Preserve artifact identity and golden path before file structure.
- Preserve observable behavior, not source internals for their own sake.
- Preserve the central output quality bar, not only that an output exists.
- Keep selected `BUILDPRINT.md` generic: AI-builder role, responsibility, perfection alignment, read order; no product-specific mapped-source details.
- Put product contract facts in `blueprint.yaml`, `01-project-setup.md`, `02-ui-identity.md`, and phase objectives.
- YAML routes; Markdown teaches/builds.
- Phase files are comprehensive product objectives, not mini schemas.
- Setup creates the architecture and local skill harness before UI/operator identity; the default harness contains `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, and `verify-and-review`, with optional profiles selected only when the artifact type needs them. UI/operator decisions happen in `02-ui-identity.md` before phase implementation.
- `02-ui-identity.md` is a mandatory UI identity for UI-bearing artifacts, not a cosmetic note.
- Every phase reads `02-ui-identity.md` as standing comprehension, user-language, and visual identity responsibility.
- UI identity must define a product metaphor, dominant object, primary gesture/manipulation, forbidden default silhouette, and screenshot-level acceptance criteria. A UI identity that can be satisfied by a generic dashboard, renamed workbench, card grid, or proof console is invalid.
- Claims stay conservative until the built product path is verified.
- Selected packets must separate `phase_core_passed` from `claim_qualified`; a phase can prove its local core loop while the final product claim remains blocked by UI, architecture, provider, decision, or review evidence.

## Anti-slop requirements

Selected packets must explicitly reject:

- placeholders and lorem ipsum;
- functionless buttons, inert tabs, dead navigation, or swallowed errors;
- mocked/sample data counted as live/operator proof;
- fake provider success when credentials/runtime/network did not run;
- raw JSON as the main user experience when a product surface is required;
- generic dashboards that name capabilities but implement no loop;
- technically input-derived output that remains domain-generic, interchangeable, or useless;
- polished shells whose central artifact could fit unrelated inputs with superficial text swaps;
- confusing/generic/ugly UI treated as finished product;
- weak UI moodboards with only phrases like “clean, modern, intuitive”;
- UI identities that only improve labels, palette, spacing, icons, or status copy around the same generic layout silhouette;
- completion from prose, screenshots alone, or unchecked happy paths.

## UI/style quality bar

For UI-bearing artifacts, `02-ui-identity.md` must open with UX importance and understandability, include a small checklist, and then define a strong identity schema: product metaphor, dominant object, primary gesture/manipulation, forbidden default silhouette, design thesis, style direction, color tokens, typography, layout/spatial rhythm, component language, motion, empty/loading/error/blocked states, anti-generic rules, and phase obligation. If the UI identity could fit ten unrelated products unchanged, it is too generic. First-run comprehension is necessary but not sufficient; for creative, generative, editor, or operator tools, the emotional/operational affordance and primary manipulation are required quality gates.

Generated `docs/DESIGN.md` must be a construction contract, not taste prose or a moodboard. It must contain exact tokens, type scale, layout contract, component specs, state matrix, implementation mapping, screenshot acceptance, and banned patterns. Claims in `docs/DESIGN.md` must map to selectors, component names, or `file:line` evidence when the app exists.

For UI-bearing artifacts, `.buildprint/ui-evidence.md` must ground major identity, design, and action-surface claims in screenshot paths or source `file:line` evidence. Identity prose is not evidence. Prose-only UI evidence, missing screenshot files, or a first viewport whose only action is "type and send" cannot qualify a final product claim.

The silhouette rejection section must name the adjacent at-risk silhouette the chosen layout is structurally closest to, and state the concrete structural and visual treatment that distinguishes it. Token, palette, copy, spacing, label, or icon changes alone do not count as a distinguishing treatment.

The proof obligations section must include an anti-silhouette distinctiveness screenshot check that compares the shipped first-screen screenshot against both the forbidden silhouette and the named adjacent silhouette and fails if they are indistinguishable once copy is ignored. Mechanical checks (overlap, clipping, viewport, focus) do not satisfy this obligation on their own.

If the source lacks style direction, the mapper should force a decision protocol, not a longer moodboard. The builder must infer a precise design system from product purpose, audience, workflow density, risk, and artifact type, then record the chosen and rejected directions before building UI.

## Phase quality bar

Every phase must name a concrete building objective, the context to read, `02-ui-identity.md` design responsibility, forbidden shortcuts, proof before moving on, and handoff facts. A phase can stop on a real blocker, but it cannot pass from edits alone.

## Output quality bar

Every selected packet must define the central output contract for the mapped artifact. That contract should name the central output, its primitives, quality signals, unacceptable generic substitutes, reviewer acceptance questions, and claim gates. If these are missing, downstream agents can build something structurally correct but semantically weak.

## Proven implementation requirements

Selected packets must identify source-derived hard technical domains that are unrealistic or fragile to hand-roll casually. Examples: fixed-format export, rich text or inline editing, document extraction, drag/reorder/canvas interaction, charts/diagrams/visual primitives, provider SDKs or OAuth/webhooks/external APIs, background jobs/export tasks/queues, persistence migrations, and file/object storage.

Buildprint Mapper should keep the packet stack-neutral while still requiring proven libraries, SDKs, runtimes, platform services, or explicit equivalent proof. Missing package/runtime proof becomes a blocker or claim ceiling. It is not permission to replace the product with a shallow implementation.

## Architecture quality bar

Setup must produce a best-effort architecture, not a thin stack list. `docs/architecture.md` must name the scalability seams (data growth, concurrency, load, feature growth) and where the design absorbs that growth without a rewrite; the maintainability boundaries (module ownership, separation of concerns, testability) that keep later phases from forcing a rewrite; and the enforced coding standards (SOLID, KISS, DRY, typed boundaries, explicit error handling) with the lint, format, and type-check gates that enforce them. A thin or default architecture that omits scalability, maintainability, or coding standards is a setup failure, not a minimal-scope win.

For UI-bearing artifacts, `docs/architecture.md` must include `Framework And Styling Decisions`: selected frontend framework/runtime, selected styling/design-system path, rejected alternatives, proof commands, and a mapping from the chosen tools to stateful screen composition, component states, design tokens, and responsive viewport proof. Static DOM, plain CSS, static/vanilla WebUI, or custom DOM scripting is allowed only with an explicit `ui_stack_exception` that explains why a framework is inappropriate and what proof covers equivalent state complexity.

## Typed proof bar

Quality gates should be selected, not sprayed everywhere.

- Add desktop/mobile visual inspection only when the artifact has human-facing responsive surfaces.
- Add long-text or long-content stress only when the artifact renders editable/generated/document-like content.
- Add content-specificity checks only when the artifact generates, transforms, summarizes, recommends, or composes output.
- Add install/configure/idempotency/retry/audit proof when the artifact is an integration, plugin, service, CLI, or automation.
- Mark irrelevant proof paths as not applicable instead of bloating the packet.

The handover should still name what proof was selected, what ran, what failed, and what remains unproven.

When a generated artifact is a redesign or rerun, critical review should include screenshot delta review. It should fail if old and new screenshots differ mostly by palette, copy, labels, spacing, iconography, or section titles while preserving the same dominant surface, interaction model, central object, flow, and information hierarchy.

## Review stance

The checker is a smoke alarm for structure and stale artifacts. Product quality is enforced by hostile critical review with an independent fresh-context reviewer, evidence-bound rubric scores, objective auto-fail triggers, phase objectives, direct runtime/browser/API checks, design review against the UI identity, and honest handoff. The builder must not score its own work; self-graded reviews are invalid regardless of numeric score.

## Artifact verification gate

Before the critical review can pass, `agb verify ui .` must be run and `.buildprint/artifact-check.md` must report PASS. The gate has two tiers:

**Tier 1 — Deterministic CLI checks** (`agb verify ui`): unambiguous literal violations that the agent cannot self-pass:
- `decisions-stub`: `.buildprint/decisions.md` still contains the empty stub while phases are complete.
- `raw-json-in-dom`: built UI renders payloads via `JSON.stringify(..., null, 2)` bound to `.textContent`/`innerHTML`.
- `context-leakage`: rendered output contains internal runtime tokens (`--TURN`, `context_source`, `recent_messages`, `session_checkpoint`).
- `forbidden-words`: built UI markup uses exact words or phrases that the project's own `docs/ui-identity.md` declares forbidden.

**Tier 2 — AI classifier judgment** (critical-review Track B): "does the silhouette look like a generic dashboard or proof console?" stays an AI reviewer judgment call; it is never replaced by regex pattern matching. The independent reviewer receives only screenshots + `docs/ui-identity.md` and returns a structured verdict.

## Decisions hard-stop

Before any phase work begins, `.buildprint/decisions.md` must be filled with confirmed answers (or explicit blockers) for all five hard-stop questions from `00-questions.md`. A build that runs phases with the empty stub is a setup failure. Scope-presentation mismatch (building a broad UI while posture is a local proof or mock-only) is a hard-stop, not an assumable default.

## Three-track pass requirement

Critical review PASS requires all three tracks to be clear:
- **Track A** (runtime/proof): echo/canned output absent; independent reviewer.
- **Track B** (product/UI): artifact-check PASS; no forbidden silhouette; no raw JSON in DOM; no context leakage; no dead controls.
- **Track C** (decisions/honesty): `decisions.md` filled; no scope-presentation mismatch.

A review may not reach PASS or PENDING_RECHECK by resolving only Track A while Track B or Track C failures remain open.
