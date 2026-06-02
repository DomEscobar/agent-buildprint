# Phase 01 — Project Workspace And Ontology Loop

## Product intention

Give the user a credible first minute: upload seed material, describe a prediction requirement, create a project workspace, and see ontology generation progress/readback. The artifact should already feel like a simulation workspace, not a file uploader with detached API output.

## Build

- Build the first-run screen with PDF/MD/TXT upload, prompt input, validation, loading, and recoverable error states.
- Create backend/API state for projects: id, name, uploaded file metadata, extracted text, requirement, status, ontology, analysis summary, graph id, timestamps, and error.
- Parse supported files into text with size/type limits and readable failures.
- Implement ontology generation through an LLM provider adapter with explicit missing-credential and provider-error states.
- Persist project files/metadata and support project detail/list readback.
- Preserve bilingual-ready labels for the main workflow if the chosen UI stack supports it.
- Route the user from the first screen into the project workspace and make reload/readback work for existing project ids.

## Quality bar

- A small text/markdown file plus prompt creates a project or produces a clear provider-blocked state.
- The project page shows current status, ontology entities/relationships when present, and the next action.
- Missing files, unsupported formats, missing prompt, oversized files, and provider-missing cases are visible and actionable.
- Reloading an existing project does not lose files, prompt, ontology, or error state.

## Do not ship

- A launch button that only navigates without preserving the uploaded work.
- Raw provider JSON as the primary ontology experience.
- Canned ontology output when the LLM provider did not run.
- A hidden file parsing failure that later makes graph build fail mysteriously.


### Visual/product feel requirement

The first loop must already establish the polished MiroFish feel: clean full-screen workflow, motion between steps, tactile clickable controls, and no raw JSON as the main outcome.
