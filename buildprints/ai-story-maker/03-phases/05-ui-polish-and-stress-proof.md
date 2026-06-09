# 05 UI Polish And Stress Proof

## How to implement this phase

Read `02-ui-identity.md`, generated `docs/ui-identity.md`, `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` first. Then run the local frontend UI skill's slop review and screen-state checks. This phase is not cosmetic cleanup; it is where the product proves that the good Canva-like UX survives real content, density, blocked providers, and responsive constraints.

## Building objective

Stress and polish the full production canvas experience. Build or load fixtures with long project names, long episode titles, long English script content, optional translated script content, long director plans, long storyboard tables, 50+ storyboard frames, assets with original and derived variants, failed media items, missing provider credentials, disconnected assistant state, and a narrow viewport. Inspect and repair the UI until the canvas remains understandable and operational.

Polish should protect product comprehension. The route should make active project/episode, canvas controls, assistant status, node states, selected media, blocked actions, and next creative steps obvious. Controls should use icon buttons with tooltips where appropriate. Buttons must fit their labels. Text should wrap or scroll in the right region. The assistant drawer should resize/collapse cleanly. Node cards should keep stable dimensions or scroll ownership so content changes do not destroy layout.

Run screenshot inspection at desktop and narrow viewport. Check for overlapping controls, clipped text, hidden primary actions, page-level horizontal overflow, broken zoom controls, modal overflow, unreadable dense content, and stale/default empty states. Compare the product against `02-ui-identity.md`; if it reads as a generic dashboard, repair the dominant surface before continuing.

## DO NOT

- Do not treat a prettier palette as UI completion.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not remove density needed for production work just to make screenshots sparse.
- Do not leave long text, multilingual labels, or generated media to break card dimensions.
- Do not ignore narrow viewport because the product is canvas-heavy; prove a minimum usable mode.
- Do not let provider-blocked states look like successful generation.
- Do not keep dead controls because "future phase" if the controls are visible.

## Minimum proof before moving on

- Desktop screenshot inspected with assistant open.
- Narrow viewport screenshot inspected with assistant collapsed/drawer mode.
- Long-content fixtures tested for script, storyboard table, and storyboard frames.
- 50+ storyboard frames remain inspectable through scroll/zoom without page-level overflow.
- Missing provider, failed generation, disconnected assistant, and empty episode states are visible and understandable.
- At least one concrete UI weakness found during review is repaired, or the handoff explains why none was found.

## Handoff note

Record fixture names, viewport sizes, screenshots inspected, UI defects found/fixed, remaining defects, and whether the product still matches the canvas-editor identity.
