# Garden Budget

Spend a bounded amount of work on architecture and UX quality:

## Required seams

- `ontology` or equivalent domain module: deterministic evidence-sensitive generation.
- `repository` or equivalent persistence module: save/load/export state.
- `provider` or equivalent adapter: deterministic local status and missing-live-provider honesty.
- UI module: no dead controls; clear states.

## Required garden pass

Before final handover, improve at least three of:

- extraction quality and tests;
- local persistence/readback;
- UX empty/loading/error/success states;
- export structure;
- accessibility labels;
- separation of domain logic from DOM/server;
- no-fake provider status.

Document the garden choices in `HANDOVER.md`.
