# Phase 06 - System Extraction

## Goal

Create a hierarchical system package only when the user explicitly requests full-system mode.

## Keep in context

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `templates/ARCHITECTURE_VIEWS.md`

## Steps

- Define the project-level system boundary.
- Split module-level Buildprints by coherent ownership and validation scope.
- Record cross-module dependencies, shared contracts, and excluded areas.
- Keep each module smaller and complete.

## Do not

- Use system mode to avoid candidate selection.
- Flatten a large repo into one vague package.
- Hide module-specific risks in a generic architecture overview.

## Exit criteria

- System package and module boundaries are explicit.
- Each module has its own validation and no-fake gates.

## Validation evidence

- `ARCHITECTURE_VIEWS.md` and module manifests identify boundaries and dependencies.
