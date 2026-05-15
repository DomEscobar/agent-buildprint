# Phase 06 — System Buildprint extraction

For a full large project, generate a hierarchical package:

- top-level architecture,
- module index,
- module Buildprints,
- dependency graph,
- phased plan,
- cross-cutting contracts,
- validation matrix per module,
- edge-case/failure-mode matrix per module,
- product QA journeys across modules.

The goal is not to summarize everything; it is to preserve navigable structure.


## Product proof requirement

For a System Buildprint that describes a product or app, include a final proof phase:

- build a minimal runnable app/MVP from the Buildprint without reading the original repo,
- set it up on the user's machine,
- expose the local or public URL used for QA,
- run smoke tests/build checks,
- run Playwright CLI browser QA if there is a UI,
- report what is product-complete, what is mocked, and what remains a gap.

The proof target is not exact clone/parity. The proof target is that the Buildprint can guide a coding agent to a coherent runnable product-shaped implementation with traceable gaps.


## System precision requirements

Each module Buildprint must state:

- MVP-required vs optional/future,
- public/product responsibilities,
- owned state and invariants,
- dependencies and forbidden dependencies,
- edge cases/failure modes,
- acceptance checks,
- QA journeys if user-facing,
- confidence and evidence citations.

The top-level System Buildprint must include a dependency graph and cross-module flows so a coding agent understands ordering and integration risk.
