# Vision: Buildprint Mapper OS

Mapper OS should make AI builders better at reconstruction, not better at filling schemas.

The target output is a readable execution manual for a product-minded coding agent. It should teach the artifact identity, golden path, setup posture, UI/operator experience, phase flow, fake-success boundaries, and handover expectations without polluting the selected start file with product-specific source baggage.

## Why phase-driven

Phases are narrative and buildable. They let the mapper say: here is the coherent product path, here is what to read, here is what to build, here is what not to fake, here is the design responsibility, and here is what proves it.

The obsolete model failed because tiny implementation documents compressed judgment into file names and runner mechanics. The new model keeps routing in YAML and puts real building knowledge in Markdown.

## Why BUILDPRINT.md is generic

A downstream builder needs the first file to orient their behavior: you are responsible, perfection matters, fake success is not allowed, read in this order. Product-specific details belong after that orientation. If the first file carries mapped-source names, old repo names, or source-specific implementation trivia, it teaches the builder to imitate stale source context instead of building the selected artifact cleanly.

## Why 01-ui-identity.md is mandatory

UX is not polish after the “real work.” The user experiences the artifact through surfaces, states, copy, controls, motion, and feedback. A confusing or generic interface is an implementation failure. Mapper OS therefore forces a detailed UI identity early, then requires every phase to read it so design responsibility survives backend/runtime/report/verification work.

## Desired downstream behavior

A fresh coding agent should:

1. read the generic AI-builder briefing and read order;
2. answer only hard-stop questions;
3. create the setup foundation;
4. read the UI identity and understand why UX matters;
5. load only the active phase;
6. keep `01-ui-identity.md` open as design responsibility;
7. build the smallest real product path for that phase;
8. verify directly, including visible UX/state behavior when relevant;
9. record a concise, honest handover.
