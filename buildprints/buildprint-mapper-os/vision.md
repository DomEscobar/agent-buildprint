# Mapper OS Vision Guide

This file is Mapper OS guidance, not a selected-packet output file. Do not emit `vision.md` into generated Buildprint packets.

Use this guide when generating product-mode packets and mixed packets with UI or product-facing phases. For developer/operator modes, translate the same taste principles into adoption clarity, command/API ergonomics, observability, and recovery. Its job is to make generated packets point downstream agents toward a desirable artifact, not a technically aligned but ugly local MVP.

## Generation target

For product/UI-bearing output, synthesize the product vision into:

- `BUILDPRINT.md` mission and senior product/developer/operator engineer contract;
- `02-project-setup.md` artifact type, first loop, central artifact/interface/boundary, fake-feel risk, quality rules, and forbidden shortcuts;
- phase `## Product intention`, `## Build`, `## Quality bar`, and `## Do not ship` sections;
- `04-review.md` screenshot/browser/product-review rejection rules where UI matters.

Do not create a packet-level `vision.md`. The vision must be embedded into files agents read early.

## Product brief standard

The product brief must make the target feel concrete in the first seconds of reading.

- Product: name the category and product shape, not the source brand.
- Primary outcome: name the user-visible result in one sentence.
- Primary users: name the real operator/user archetypes.
- Main surfaces: name the work surfaces that must exist in the first implementation.
- What this packet must not become: reject generic MVP, static demo, source clone, and any domain-specific ugly fallback.

Avoid technical route inventories, component names, framework names, and internal source nouns unless they are the product domain itself.

## Central artifact standard

Name the thing the product is really about: document, chat thread, board, canvas, trace, run, dataset, workflow, profile, plan, graph, incident, request, or equivalent.

The artifact must be useful, editable/queryable/inspectable where appropriate, and connected to state. It must not be decoration around a generic form.

## Visual product standard

Product craft is posture-independent. `trusted_local` lowers operability, never visual quality. For UI-bearing products at every posture, require a real component/UI framework with a build step plus a design/styling system, decided in phase 00. A single-file hand-rolled HTML/CSS/JS shell or a server emitting one HTML string is never an acceptable product UI.

Generate product-specific visual direction. Do not say only "polished" or "production-grade".

Name:

- primary layout model, such as canvas plus inspector, timeline plus detail, table plus preview, chat plus context, cockpit, studio, or document workspace;
- domain objects and their visual anatomy;
- density target and interaction tempo;
- state language for empty, loading, blocked, running, success, failed, retry, selected, approved, or equivalent states;
- first-viewport expectation: what must be visible without reading logs or raw JSON;
- screenshot rejection rules.

Reject:

- generic dashboards;
- stacked default forms;
- bare graph demos;
- static card boards;
- raw text-list substitutes for rich domain objects;
- dead controls or no-op buttons;
- local MVP/admin test harness visuals;
- screenshots that only prove elements exist.

## Setup standard

`02-project-setup.md` must turn the artifact vision into implementation alignment:

- first artifact-type loop to make usable first;
- central artifact and why it is the right shape;
- state that must persist/read back;
- provider/deployment boundaries to keep honest;
- first fake-feel risk;
- local build/test/smoke commands;
- product quality rules;
- forbidden shortcuts.

Keep architecture, persistence, provider, runtime, auth, deployment, and test decisions as concise constraints, not long protocol prose.

## Phase standard

UI-bearing phases should name concrete interaction depth where relevant:

- drag/pan/zoom/resize: name pointer/transform behavior that proves real manipulation;
- editing: name what field changes, how it persists, and how readback proves it;
- async work: name queued/running/progress/done/failed/retry/cancel states;
- persistence: name entities that must survive restart;
- review: name visual or behavior changes the final reviewer must inspect.

Functional assertions do not make a product good. The review must reject ugly, fake, generic, or dead behavior directly.
