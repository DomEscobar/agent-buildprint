# Quality Policy

Mapper OS quality is judged by whether a downstream AI builder can build the mapped artifact without guessing, silently shrinking scope, losing design responsibility, or shipping fake success.

## Invariants

- Preserve artifact identity and golden path before file structure.
- Preserve observable behavior, not source internals for their own sake.
- Preserve the central output quality bar, not only that an output exists.
- Keep selected `BUILDPRINT.md` generic: AI-builder role, responsibility, perfection alignment, read order; no product-specific mapped-source details.
- Put product contract facts in `blueprint.yaml`, `01-project-setup.md`, `02-uiux-decision.md`, and phase objectives.
- YAML routes; Markdown teaches/builds.
- Phase files are comprehensive product objectives, not mini schemas.
- Setup and UI/operator decisions happen before phase implementation.
- `02-uiux-decision.md` is a mandatory style constitution for UI-bearing artifacts, not a cosmetic note.
- Every phase reads `02-uiux-decision.md` as standing design/style responsibility.
- Claims stay conservative until the built product path is verified.

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
- completion from prose, screenshots alone, or unchecked happy paths.

## UI/style quality bar

For UI-bearing artifacts, `02-uiux-decision.md` must open with UX importance and understandability, include a small checklist, and then define a strong style schema: design thesis, style direction, color tokens, typography, layout/spatial rhythm, component language, motion, empty/loading/error/blocked states, anti-generic rules, and phase obligation. If the style constitution could fit ten unrelated products unchanged, it is too generic.

If the source lacks style direction, the mapper should force a decision protocol, not a longer moodboard. The builder must infer a precise design system from product purpose, audience, workflow density, risk, and artifact type, then record the chosen and rejected directions before building UI.

## Phase quality bar

Every phase must name a concrete building objective, the context to read, `02-uiux-decision.md` design responsibility, forbidden shortcuts, proof before moving on, and handoff facts. A phase can stop on a real blocker, but it cannot pass from edits alone.

## Output quality bar

Every selected packet must define the central output contract for the mapped artifact. That contract should name the central output, its primitives, quality signals, unacceptable generic substitutes, reviewer acceptance questions, and claim gates. If these are missing, downstream agents can build something structurally correct but semantically weak.

## Typed proof bar

Quality gates should be selected, not sprayed everywhere.

- Add desktop/mobile visual inspection only when the artifact has human-facing responsive surfaces.
- Add long-text or long-content stress only when the artifact renders editable/generated/document-like content.
- Add content-specificity checks only when the artifact generates, transforms, summarizes, recommends, or composes output.
- Add install/configure/idempotency/retry/audit proof when the artifact is an integration, plugin, service, CLI, or automation.
- Mark irrelevant proof paths as not applicable instead of bloating the packet.

The handover should still name what proof was selected, what ran, what failed, and what remains unproven.

## Review stance

The checker is a smoke alarm for structure and stale artifacts. Product quality is enforced by the Buildprint prose, phase objectives, direct runtime/browser/API checks, design review against the style constitution, and honest handoff.
