# 02 UI Identity

UX is a must. It matters as much as implementation because this product is an editing environment: the user only knows whether it works through the canvas, nodes, controls, generated media states, chat feedback, persistence, and recovery behavior. A powerful agent backend hidden behind a confusing, generic, or ugly interface is not a finished product.

This file runs after `01-project-setup.md` and before `03-phases/*`. Generate a local `docs/ui-identity.md` or `UI-IDENTITY.md` before implementation phases begin.

## Checklist before any UI phase

- Load the local `frontend-ui-product-design` skill created in `01-project-setup.md`.
- Generate `docs/ui-identity.md` in the implementation project before coding phase UI.
- Keep the production canvas as the dominant object.
- Preserve the Canva/Figma-like editing feel: a white infinite surface, visible spatial objects, compact tool controls, clear selection/preview affordances, and calm creative focus.
- Reject generic dashboard/card-grid/admin-shell layouts as the main product surface.
- Prove desktop and narrow-viewport behavior with screenshot inspection, not confidence.

## Skill loading protocol

Before identity generation, load the local frontend skill:

- Prefer `.codex/skills/frontend-ui-product-design/SKILL.md` or `.claude/skills/frontend-ui-product-design/SKILL.md` when present.
- Also accept `.agents/skills/frontend-ui-product-design/SKILL.md`.
- Read only references relevant to canvas editors, including `references/screen-states.md`, design tokens, component states, mobile floor, and slop review.
- If the skill is missing, return to `01-project-setup.md`; do not improvise UI from memory.

Before implementation, think deeply and reason from the artifact: the product, user, golden path, central output, workflow density, risk, and review proof. The generated identity must make autonomous product reasoning explicit rather than copying a generic style.

## Product identity thesis

The product is a short-drama production canvas. It helps creators move from source text and episode script to production plan, assets, storyboard frames, and video workbench without losing context. The first screen of the selected scope must make one thing obvious: the user is working on an episode as a connected creative pipeline, not browsing a dashboard of unrelated modules.

The UI should feel like a calm creative editor with production-grade controls. It should borrow the clarity of Canva/Figma style surfaces: a large white artboard, minimal chrome, precise icon controls, visible zoom/pan affordances, object cards that can be inspected, and a persistent assistant panel that helps advance the scene. It must not feel like a SaaS admin console, a proof viewer, a task tracker, or a decorative AI chat page.

## Creative product concept

The product metaphor is a production wall for one episode. The dominant object is the infinite episode canvas. The primary gesture is spatial production: pan, zoom, select, inspect, drag, refresh, auto-layout, open a node, edit the artifact, and ask the agent to continue the next production step.

The moment-to-moment manipulation is not "fill a form and click generate." It is "shape the episode as a chain of visible creative artifacts." The user should see the script, director plan, storyboard table, assets, storyboard frames, and final workbench as connected parts of one episode. Generated media should have states the user can trust: not generated, generating, completed, failed with reason, selected, previewed, edited, and persisted.

## Silhouette rejection

Desktop silhouette:

- left icon rail for project/workflow/settings navigation;
- full-height white canvas region as the visual center;
- floating episode selector and compact icon buttons near the canvas top;
- zoom/pan controls anchored to the canvas;
- draggable connected nodes across the canvas;
- right-side assistant drawer that can resize/collapse and never hides the whole canvas unintentionally.

Narrow/mobile silhouette:

- keep the canvas as the primary surface;
- collapse the right assistant into a drawer or tab;
- keep zoom/pan/fit controls reachable;
- prevent horizontal page overflow outside the canvas viewport;
- preserve readable node previews through scroll/zoom, not by squeezing all nodes into tiny cards.

Forbidden silhouette:

- The forbidden default silhouette includes generic dashboard, renamed workbench, card grid, and proof console variants.
- dashboard home as the main experience;
- grid of feature cards with "Script", "Assets", "Storyboard", and "Video" labels but no spatial pipeline;
- chat-only page where outputs are hidden in messages;
- raw JSON/debug workbench;
- static flow diagram that cannot be edited, panned, persisted, or read back.
- proof console or evaluator page with prettier labels.

## First-run comprehension contract

Within 10 seconds, a first-time user should understand:

- which project and episode are active;
- where the production pipeline lives;
- that the visible nodes are the episode's script, plan, assets, storyboard, and video workbench;
- how to refresh or auto-layout the canvas;
- how to open or collapse the assistant panel;
- which provider or media actions are currently blocked.

The first useful action should be explicit: select an episode if none is selected, then ask the assistant to continue production or open a node to inspect/edit its content. Empty states must tell the user the next creative action, not show generic "no data" boxes.

## User-language map

Use user-facing product language:

- "Project", "Episode", "Script", "Director plan", "Assets", "Storyboard table", "Storyboard frames", "Video workbench", "Generate image", "Generate video", "Refresh canvas", "Auto layout", "Assistant", "Provider settings".

Allowed Chinese-first state terms when the implementation supports Chinese UI:

- `未生成`, `生成中`, `已完成`, `生成失败`.

Keep internal terms out of the main UI:

- `flowData`, `socket`, `provider_live`, `proof`, `mapper`, `phase`, `schema`, `node id`, `workMap`, `raw response`, `fixture`.

Those may appear only in developer docs, logs, diagnostics, or test names.

## Chosen style direction

Choose a high-contrast, minimal creative editor style:

- white and near-white canvas surfaces;
- fine dotted background grid for spatial orientation;
- black primary actions for decisive controls;
- soft gray rails and containers;
- compact icon-first controls;
- small colored status accents for active/connected/failed/generating states;
- media previews as the richest visual material.

Rejected adjacent styles:

- dark futuristic AI studio: too theatrical and fights the source UI's calm editing canvas;
- pastel marketing SaaS: too decorative and weak for production work;
- dense enterprise dashboard: loses the creative canvas;
- single-hue purple/blue gradient product: too generic for an editor and conflicts with media inspection.

## Layout model before stack

The desktop layout should allocate almost all space to the canvas. Navigation should be narrow, persistent, icon-led, and secondary. The assistant panel is important but supporting: it should summarize progress, show model/connection state, accept commands, and expose settings/reconnect/clear-memory actions without stealing the whole surface.

Node cards must size to content without causing page-level overflow. The canvas owns spatial overflow through pan/zoom; inner node content owns scroll only when text or media grids are too large. Dialogs for editing script, plan, storyboard table, and image/video details must use wide modal surfaces with clear save/cancel semantics.

## Screen-state contract

Visible now on the production route:

- active project/episode title or selector;
- connected canvas nodes;
- refresh and layout controls;
- zoom/fit controls;
- assistant connection state;
- current generation or blocked provider status when relevant.

Reachable but hidden:

- full script/plan/table editors;
- image edit/generation flow;
- video workbench detail;
- provider settings;
- memory clear/reconnect confirmation.

Must not be visible together:

- every settings panel and the production canvas as equal permanent regions;
- multiple large modal editors;
- raw provider diagnostics and user media preview unless explicitly in a diagnostic drawer;
- blocking guide overlays after the user has already completed first-run orientation.

## Interaction model

Canvas interactions:

- pan, zoom, fit, auto-layout, and refresh must work visibly;
- nodes must retain positions during flow-data updates;
- drag handles should be obvious but not noisy;
- layout should align the main production chain left-to-right with assets below script, avoiding overlap.

Node interactions:

- script, director plan, and storyboard table open markdown editors with preview/readback;
- assets show original and derived media with generation states, delete actions, preview tools, and failed-state reasons;
- storyboard frames support selection, batch actions, preview all, scale control, insert-between affordances, delete/edit, and failed-state reasons;
- workbench opens video prompt/generation controls and shows references, model/resolution settings, generated video history, and batch actions.

Assistant interactions:

- sending while disconnected or generating should be disabled or clearly blocked;
- stop, reconnect, memory clear, think-level controls, and suggestions should have direct feedback;
- assistant-generated mutations must update canvas state and save/read back.

## Component language

Use compact controls and professional editing affordances:

- icon buttons with tooltips for refresh, layout, collapse, zoom, fit, delete, edit, upload, generate, preview, settings;
- segmented/radio controls for canvas wheel mode and generation mode;
- select controls for episode, model, resolution, aspect ratio, and provider;
- tags for states, frame numbers, asset type, selected count, and connected state;
- cards only for canvas nodes, media items, modals, and repeated project items, not as nested page sections;
- dialogs for destructive actions and full editors;
- drawers for assistant/settings when space is constrained.

Empty/loading/error/blocked states must be designed as first-class component states, not afterthought copy.

Radii should be restrained: 4-8px for cards and controls, with the source-like black title chips allowed on node cards. Motion should be functional: slide assistant panel, hover reveal image tools, small loading spinner, generation progress, no decorative animations that distract from media inspection.

## Color and typography tokens

Use exact semantic color tokens with typography, state colors, and focus treatment:

- `canvas-bg`: `#ffffff`
- `app-bg`: `#f0f0f0`
- `rail-bg`: `#ffffff`
- `text-primary`: `#111111`
- `text-secondary`: `#6b7280`
- `border-subtle`: `#e5e7eb`
- `control-primary`: `#000000`
- `control-primary-text`: `#ffffff`
- `accent-active`: `#10b981`
- `accent-warning`: `#f59e0b`
- `accent-danger`: `#ef4444`
- `accent-info`: `#2563eb`
- `canvas-grid-dot`: `#d7dbe2`

Typography:

- use a system sans stack with Chinese glyph support;
- 12px for dense tags/meta;
- 14px for body and controls;
- 16px for node titles;
- 20-24px for route/project headings;
- avoid hero-scale type inside the product surface;
- no negative letter spacing and no viewport-scaled fonts.

## Content stress fixtures

The UI must survive:

- long project names and long episode titles;
- long Chinese script paragraphs;
- long director plan and storyboard tables;
- 50+ storyboard frames;
- assets with no source image, failed image, generated image, and many derived variants;
- video generation with multiple references and failed provider response;
- disconnected assistant socket;
- missing provider credentials;
- narrow viewport with assistant collapsed;
- desktop viewport with assistant open and canvas still usable.

## Proof obligations

Before any completion claim:

- browser proof of login to project to production canvas;
- screenshot inspection on desktop with assistant open;
- screenshot inspection on a narrow viewport with assistant collapsed or drawer mode;
- pan/zoom/fit/auto-layout interaction proof;
- edit/readback proof for at least one text node;
- save/readback proof for `flowData` after a canvas mutation;
- blocked provider proof when credentials are missing;
- generated media proof only when real provider credentials and sandbox access are available;
- no overlap, no clipped controls, no unreadable text, no page-level horizontal overflow, and reachable primary actions.
- screenshot delta review or an equivalent inspection must catch the most likely UI failure: drifting into a generic dashboard or static graph instead of a canvas editor.

## Anti-generic rules

Do not build:

- functionless buttons or dead controls;
- a generic dashboard;
- a renamed workbench with feature cards;
- a pretty chat shell;
- a static graph with inert nodes;
- raw JSON previews as the main product surface;
- dead provider buttons;
- fake "generated" media from placeholder fixtures;
- proof/evaluator vocabulary in user-facing surfaces;
- proof labels, proof terms, or evaluator language in the main product UI;
- UI that drops the white canvas, black controls, compact editor affordances, and right assistant relationship that define the product.
