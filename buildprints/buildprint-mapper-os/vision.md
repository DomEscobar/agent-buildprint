# Mapper OS Vision Guide

This file is Mapper OS guidance, not a selected-packet output file. Do not emit `vision.md` into generated Buildprint packets.

Use this guide when generating product-mode packets and mixed packets with product/UI phases. Its job is to make the generated `BUILDPRINT.md` and `02-project-setup.md` point downstream agents toward a desirable product, not a technically aligned but ugly local MVP.

## Generation Target

For product/UI-bearing output, synthesize the product vision into:

- `BUILDPRINT.md` `## Product brief`
- `BUILDPRINT.md` `## Final product at a glance`
- `02-project-setup.md` `## Experience quality contract`
- `02-project-setup.md` Foundation scaffold requirement for implementation-project `ui-identity.md`
- UI-bearing phase `## Product outcome`, `## UX/UI requirements`, and `## Proof gate`

Do not create a packet-level `vision.md`. The vision must be embedded into the files agents already read early.

## Product Brief Standard

The product brief must make the target feel concrete in the first seconds of reading.

- Product: name the category and product shape, not the source brand.
- Primary outcome: name the user-visible result in one sentence.
- Primary users: name the real operator/user archetypes.
- Main surfaces: name the work surfaces that must exist in the first implementation.
- What this packet must not become: reject generic MVP, static demo, source clone, and any domain-specific ugly fallback.

Avoid technical route inventories, component names, framework names, and internal source nouns unless they are the product domain itself.

## Final Product Standard

`BUILDPRINT.md` must include a concise product dream:

- Golden path: one paragraph that reads like a real workflow through a real product.
- Surfaces: one line per major surface, each tied to a phase.
- Done looks like: observable end states that distinguish a product from a proof shell.

For UI-bearing products, the final product must also communicate visual quality: what the first viewport shows, how domain objects are represented, what states are visible, and what would make the app feel production-grade.

## Visual Product Standard

Generate product-specific visual direction. Do not say only "polished" or "production-grade".

Name:

- primary layout model, such as canvas plus inspector, timeline plus detail, table plus preview, chat plus context, cockpit, studio, or document workspace;
- domain objects and their visual anatomy;
- density target and interaction tempo;
- state language for empty, loading, blocked, running, success, failed, retry, selected, approved, or equivalent states;
- first-viewport proof: what must be visible without reading logs or raw JSON;
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

## Setup Standard

`02-project-setup.md` must turn the product vision into implementation setup:

- require implementation-project `ui-identity.md` for UI-bearing products;
- require `ui-identity.md` to derive visual identity, layout rules, interaction principles, state matrix, responsive behavior, accessibility baseline, and screenshot critique from `BUILDPRINT.md`;
- keep architecture, persistence, provider, runtime, auth, deployment, and test decisions separate from product dream prose;
- avoid repeating the full phase protocol.

## Phase Standard

UI-bearing phases must name at least one concrete interaction depth item:

- drag/pan/zoom/resize: name the pointer/transform behavior that proves real manipulation;
- editing: name what field changes, how it persists, and how readback proves it;
- async work: name queued/running/progress/done/failed/retry/cancel states;
- persistence: name entities that must survive restart;
- screenshot proof: name the visual change or state that must appear.

Functional browser assertions do not upgrade `visual_quality_gate` unless screenshot critique rejects the ugly-output patterns above.
