# Phase 03: Ontology And Graph Build

## Product intention

Turn seed documents and a prediction requirement into an inspectable graph world. Ontology generation and graph build must be observable, resumable enough for local use, and visibly connected to the canvas.

## Build

- Parse PDF, Markdown, and text files with encoding handling.
- Generate ontology entity and relation types through the provider-neutral LLM client.
- Persist ontology, analysis summary, extracted text, and chunk settings.
- Build graph memory from text chunks using the graph-memory port.
- Poll and display graph-build task progress.
- Load graph data into the canvas immediately after build completion.

## Quality Bar

- Changing the input files or requirement changes ontology/graph output.
- Entity and relation type chips can be inspected before graph build.
- Graph build progress represents real backend stages.
- Graph id and project state are persisted after completion.

## Do not ship

- Canned ontology output.
- Graph counts that are not derived from the graph-memory backend.
- Success if graph readback fails.
