# 02-provider-upload-outline-loop

## How to implement this phase

Before writing code, read `03-phases/phase-flow.md`, `.buildprint/next-agent.md` if it exists, current project `AGENTS.md` if it exists, `BUILDPRINT.md`, `01-project-setup.md`, and `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact. Extend the first loop into the real input pipeline: provider configuration, prompt/document upload, settings validation, outline streaming/review, and template preselection. Keep missing credentials as blockers, not silent fallback to fake live success.

## Building objective

Build the provider-aware generation intake. Users must be able to configure or review text and image provider state, choose slide count/language/tone/verbosity/instructions, enable or disable table of contents/title slide/web search, upload supported document categories, and receive validation that points to the exact missing input or provider setting. The outline stage must stream or progressively reveal the generated outline, allow review and edits, preserve the outline in durable state, and let users select a built-in template before generating slides.

For deterministic proof, implement a structured local generator that uses prompt and extracted document text to produce topic-specific outlines. It must reject generic repeated output by comparing generated outline terms against the input. If real providers are configured, prove one text provider path and one image-provider readiness path; otherwise mark them blocked.

## DO NOT

- Do not accept uploaded files and then ignore their content.
- Do not allow `Auto` language with documents if the implementation cannot reliably infer it.
- Do not stream random text that later fails JSON/schema parsing.
- Do not show stock/image provider success without checking the selected provider.
- Do not let template selection be a cosmetic label.
- Do not bury validation in console logs.
- Do not ship placeholders, lorem ipsum, empty wrappers, functionless buttons, inert navigation, swallowed errors, fake progress, or mocked/sample data counted as real proof.

## Minimum proof before moving on

- Upload proof covers prompt-only and at least one document-backed generation fixture.
- Validation proof covers missing prompt/document, missing language when required, missing provider key/model, and unavailable stock image provider.
- Outline proof shows progressive generation, editable outline rows, persisted outline readback, and selected template state.
- Provider proof is either one live text/image provider check or explicit blocker rows with deterministic mode proof.
- Browser inspection covers upload and outline screens on desktop and a narrow viewport for no horizontal overflow and reachable actions.

## Handoff note

Record supported file categories, provider modes proven/blocked, outline fixtures, template selected, and any document extraction limitations.
