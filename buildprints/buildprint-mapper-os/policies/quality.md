# Quality Policy

Mapper OS quality is judged by whether a downstream AI builder can build the mapped artifact without guessing, silently shrinking scope, or shipping fake success.

## Invariants

- Preserve artifact identity and golden path before file structure.
- Preserve observable behavior, not source internals for their own sake.
- YAML routes; Markdown teaches/builds.
- Phase files are comprehensive product objectives, not mini schemas.
- Setup and UI/operator decisions happen before phase implementation.
- Claims stay conservative until the built product path is verified.

## Anti-slop requirements

Selected packets must explicitly reject:

- placeholders and lorem ipsum;
- functionless buttons, inert tabs, dead navigation, or swallowed errors;
- mocked/sample data counted as live/operator proof;
- fake provider success when credentials/runtime/network did not run;
- raw JSON as the main user experience when a product surface is required;
- generic dashboards that name capabilities but implement no loop;
- completion from prose, screenshots alone, or unchecked happy paths.

## Phase quality bar

Every phase must name a concrete building objective, the context to read, forbidden shortcuts, proof before moving on, and handoff facts. A phase can stop on a real blocker, but it cannot pass from edits alone.

## Review stance

The checker is a smoke alarm for structure and stale artifacts. Product quality is enforced by the Buildprint prose, phase objectives, direct runtime/browser/API checks, and honest handoff.
