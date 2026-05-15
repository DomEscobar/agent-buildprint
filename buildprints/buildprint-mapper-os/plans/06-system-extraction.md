# Phase 06 — System Buildprint extraction

For a full large project, generate a hierarchical package:

- top-level architecture,
- module index,
- module Buildprints,
- dependency graph,
- phased plan,
- cross-cutting contracts,
- validation matrix per module.

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
