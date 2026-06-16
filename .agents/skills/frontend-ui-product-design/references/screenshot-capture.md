# Screenshot Capture

Use this whenever a UI-bearing surface needs visual proof: during UI build verification and during critical review. A screenshot obligation that does not say how, at what width, or where to save does not get executed.

## Tool Chain (first available wins)

1. Playwright MCP when available: precise viewport control, full-page capture, and explicit filenames.
2. The IDE or Cursor browser screenshot tool when Playwright MCP is absent.
3. A project end-to-end or screenshot script if one exists.
4. Last resort: ask the user to provide screenshots at the named viewports and states. Do not skip the visual proof and do not claim it from code review alone.

## Viewports

Capture full-page at each width for every key surface:

- Mobile 375
- Tablet 768
- Desktop 1280
- Wide 1440

## States

Capture the default first screen plus the product's real states: empty, loading or streaming, error, blocked, success, a selected/active state, and one dense or long-content fixture.

## Save Location And Naming

Save to `.buildprint/screenshots/` with descriptive names that encode surface, state, and width, for example `conversation-default-desktop-1280.png` or `conversation-error-mobile-375.png`.

## Analyze Each Capture

Compare every screenshot against `docs/ui-identity.md`: the dominant surface is dominant, the forbidden and adjacent silhouettes are not matched, hierarchy reads, and there is no overflow, clipping, overlap, or unreadable text. Confirm keyboard focus is visible where relevant.

## Rules

- A screenshot is not proof unless its viewport and state are named.
- Never claim responsive proof from desktop-only captures.
- For a redesign or rerun, capture before and after for the delta review.
