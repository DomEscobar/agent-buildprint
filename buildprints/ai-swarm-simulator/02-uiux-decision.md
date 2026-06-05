# 02 UI/UX Decision

UX is a must. It matters as much as the implementation because the user only experiences the artifact through its surfaces, states, copy, controls, motion, and feedback. A powerful backend hidden behind a confusing, generic, or ugly interface is not a finished product. The experience must be understandable, intentional, and coherent before later phases claim progress.

Small checklist before applying this style constitution:

- Can a first-time user understand what this artifact is, what to do first, and what state it is in?
- Can a first-time user complete the example scenario without reading documentation, logs, or technical detail drawers?
- Is the screen split into clear task views instead of one giant cockpit of every possible panel?
- Does the visual direction feel intentionally designed for this artifact rather than copied from a generic dashboard?
- Are colors, typography, spacing, components, and motion defined concretely enough for another agent to implement consistently?
- Are empty, loading, error, and blocked states understandable without reading logs or source code?
- Are all visible controls expected to work, validate, navigate, or explain a blocker?
- Would a demanding human call this product surface polished, or just “technically present”?

This file is the style constitution for the artifact. Every later phase that touches human-facing UI must obey it before claiming progress.

This artifact is UI-bearing. Its interface must not become a generic SaaS dashboard or a raw technical demo. The UI is a premium simulation workbench: a place where the user feels they are controlling a living intelligence system with clarity, depth, and precision.

Clarity outranks atmosphere. The default user is a first-time, non-technical user who does not know what graph memory, providers, runtimes, traces, readback, blockers, or local report history mean. The product may expose those technical terms in detail views, docs, logs, and advanced mode, but the primary UI must explain the workflow in everyday language.

## 1. Design thesis

The product should feel like a dark glassmorphism intelligence lab: calm, precise, cinematic, and deeply interactive. It should communicate that complex graph/simulation activity is happening under the surface, but the user remains in control through clear panels, readable states, and elegant interaction feedback. The experience should feel closer to a polished creative command canvas than to an admin CRUD dashboard.

The first impression must be: “I know what to do first, I can try a realistic example immediately, I know what the system understood, and I can see whether a real swarm can run.” It must not feel like a Tailwind starter, Bootstrap admin screen, academic notebook, plain file uploader, static graph screenshot, generic purple-gradient AI demo, or one massive control room where every subsystem competes for attention. The interface should invite exploration while staying disciplined enough for operator work.

## 2. Chosen style direction

Use **dark glassmorphism command canvas** as the style direction.

The visual world is a deep navy/black spatial canvas with layered translucent control panels, luminous graph accents, soft blur, thin borders, restrained gradients, and precise status chips. Panels should feel like frosted instruments floating over a dark simulation field. The graph/canvas area is the hero, not a decoration. Inspector panels, provider status, run controls, and report sections should feel like modular instruments surrounding the canvas.

The style should be creative and premium, but not chaotic. No candy colors everywhere. No random neon. Accent light should be used to clarify hierarchy: primary action, selected node, active run, provider status, blocked state, and report highlight.

## 3. Color system

Use concrete tokens and keep them consistent:

```txt
background-deep: #05070D
background-canvas: #080D19
background-gradient-a: #0B1020
background-gradient-b: #111827
surface-glass: rgba(255, 255, 255, 0.06)
surface-glass-strong: rgba(255, 255, 255, 0.10)
surface-panel: rgba(15, 23, 42, 0.72)
surface-panel-solid: #111827
border-subtle: rgba(255, 255, 255, 0.12)
border-strong: rgba(148, 163, 184, 0.28)
primary: #7C5CFF
primary-glow: rgba(124, 92, 255, 0.42)
accent-cyan: #22D3EE
accent-cyan-glow: rgba(34, 211, 238, 0.34)
accent-violet: #A78BFA
success: #34D399
warning: #FBBF24
danger: #FB7185
blocked: #F97316
text-main: #F8FAFC
text-secondary: #CBD5E1
text-muted: #94A3B8
text-faint: #64748B
focus-ring: rgba(34, 211, 238, 0.72)
```

The background should use subtle radial gradients and optional fine noise/grain so it feels atmospheric, not flat. Main panels use translucent glass with blur and thin borders. Primary action uses violet; live graph/selection energy uses cyan; success/warning/danger/blocked colors are semantic and should not be reused as decoration. Text must stay high contrast. Never place muted gray text on low-contrast glass.

Forbidden color behavior: bright white full-page backgrounds, random rainbow gradients, default blue links/buttons, unrelated pastel cards, red/green status without labels, and color-only state communication.

## 4. Typography system

Typography should feel technical, elegant, and controlled. Use a distinctive modern display face for major headings if available, paired with a highly readable sans-serif for body text. If exact fonts are not installed, choose fonts with a geometric/technical character rather than default browser typography.

Headings should be confident and spacious: large title, tight line-height, normal letter spacing, strong weight. Body copy should be readable with generous line-height. Metadata, provider details, run ids, node ids, and trace labels may use a mono or technical font, but avoid making the whole interface look like a terminal.

Suggested scale:

```txt
hero-title: 40-56px / 0.95-1.05 line-height / 700-800 weight
section-title: 18-24px / 1.15 line-height / 650-750 weight
panel-title: 13-15px uppercase or compact title / 600-700 weight
body: 14-16px / 1.5-1.65 line-height / 400-500 weight
metadata: 11-13px / 1.35 line-height / mono or technical sans
button-label: 13-14px / 600-700 weight
```

Avoid cramped labels, inconsistent font sizes, and generic “dashboard card title + paragraph” rhythm. Important state labels should be short, sharp, and readable at a glance.

## 5. Layout and spatial rhythm

The primary layout is a **multi-view command workbench**, not a single endless dashboard. Users must be able to move between focused task views while preserving shared project state:

- **Start**: example scenario picker, custom scenario input, current readiness summary, and one obvious next action.
- **Map**: graph/canvas as the dominant surface with a plain-language summary and optional inspector.
- **Run**: local or provider-backed swarm run controls, agent roles, readiness blockers, and step log.
- **Report**: draft report, source/provenance references, continue-from-section actions, and limitations.
- **Projects**: saved local projects, export/delete/resume, storage state, and advanced details.

Desktop can show a compact top or left navigation plus one secondary side panel for context. Mobile must use the same task views as a segmented control or bottom navigation; it must not stack every panel into a long technical scroll by default.

The first screen must expose the product loop through the Start view. It should not open with a marketing hero, blank upload card alone, or a giant all-panels workbench. A user should immediately understand: choose an example or add a scenario here, then move through Map, Run, Report, and Projects as needed.

Use generous spacing and controlled density: 8px micro spacing, 12/16px component spacing, 24/32px panel spacing, 48px major layout breathing room. Panels should align to a clear grid but may overlap subtly to create depth. The graph canvas can break the grid visually; controls should remain predictable.

Responsive behavior: on smaller screens, stack panels into the same beginner flow while preserving the graph as the primary surface once seed material exists. Do not collapse critical controls into hidden menus without clear affordances.

## 5a. Novice workflow contract

The default visible workflow is:

1. **Start** — example scenario picker, seed material input, upload, and a plain explanation of what will happen.
2. **See what the system understood** — graph/canvas readback with a plain summary before technical node/edge details.
3. **Check readiness** — one top-level status banner answering: can I run a real swarm yet, why not, and what should I do next?
4. **Read the report** — structured findings with source, graph, and run references in human-readable language.
5. **Continue** — refine the scenario, focus the graph, change run settings, or continue from a report section.

Every stage needs one primary action. Secondary controls can exist, but they must not compete with the next obvious step. Technical names must be paired with or hidden behind plain names:

- Graph memory -> What the swarm remembers
- Provider missing -> AI service not connected
- Runtime blocked -> Real simulation unavailable
- Readback state -> Saved locally
- Trace -> Step log
- Local report -> Draft report
- Blocked -> Needs setup

Blocked copy must sound like user guidance, not implementation notes. Use "Real simulation unavailable: connect an AI service or run the local runtime setup" instead of "runtime/provider blocked". Advanced detail panels may include the exact adapter, provider, runtime, run id, trace id, and storage path.

## 5b. Example-first onboarding

The product must include at least three built-in example scenarios that demonstrate the app without pretending they prove live provider success. Examples should be realistic, short, and named by user intent, not system internals:

- **Improve a product launch plan**
- **Find risks in a hiring process**
- **Coordinate a support incident**

The Start view must show what each example will demonstrate: map the situation, find the main risk, run the local dry run, and produce a draft report. A user should be able to select an example and land in the Map view with the app explaining what changed.

Example data must be labeled as sample/local. It may prove parsing, graph rendering, local runtime, reports, persistence, and navigation. It must not prove real AI service connection, external graph memory, or production deployment.

## 5c. Information architecture rules

Do not show all major surfaces at once. At most one primary task view and one contextual side panel should dominate the viewport.

Required navigation labels:

- `Start`
- `Map`
- `Run`
- `Report`
- `Projects`

Required view responsibilities:

- Start owns scenario input, examples, current status, and first-run guidance.
- Map owns graph exploration and "what the system understood."
- Run owns readiness, swarm controls, agents, and step log.
- Report owns findings, continuation, provenance, and limitations.
- Projects owns saved work, export/delete, resume, and storage detail.

Technical details belong in expandable panels inside the relevant view. A user should never need to understand adapter names, run ids, trace ids, storage paths, or provider base URLs to complete the example path.

## 6. Component language

Panels/cards: frosted glass, 16-24px radius, thin translucent border, soft shadow, backdrop blur, subtle inner highlight. Dense data panels can be slightly more solid for readability.

Buttons: pill or rounded-rectangle controls with clear hierarchy. Primary buttons use violet with soft glow only on hover/focus/active. Secondary buttons are glass outlines. Disabled buttons must explain why when hovered/clicked or adjacent to blocker text.

Inputs: dark translucent fields with visible border, strong focus ring, clear labels, helper text, and error text. API/provider key fields must signal secrecy and never echo secrets plainly.

Status chips: compact pills with icon/dot, label, and semantic color. Examples: `AI service not connected`, `Scenario understood`, `Real simulation unavailable`, `Report needs refresh`, `Live run`. Status must never rely on color alone.

Graph nodes/edges: nodes should feel luminous and selectable, with selected state using cyan glow and a clear inspector link. Edges should be readable but not overpowering. Hover should reveal relationship labels or concise metadata. Empty graph should show an inviting structured placeholder explaining the next action.

Inspector/report panels: use layered sections, collapsible details only where useful, and clear source/simulation references. Reports should read like polished analysis, not raw markdown dumped into a box.

Modals/toasts: use sparingly. Prefer inline blocked/error panels when the user needs to act. Toasts are for confirmation, not for hiding important failure details.

## 7. Motion and interaction feel

Motion should feel smooth, deliberate, and state-driven. Use fade/slide for panel appearance, gentle hover lift for interactive cards, cyan pulse for selected graph nodes, shimmer/skeleton for extraction/report generation, and timeline progress for simulation runs.

Motion must clarify what changed: input processed, graph updated, node selected, simulation started, report generated, blocker appeared. Do not add random loops or decorative bouncing. Use easing that feels premium and calm. Respect reduced-motion preferences: replace animated movement with opacity/state changes when needed.

Interactive controls must provide feedback within the same surface: pressed state, loading state, success/error/blocker state. A click with no visible response is a defect.

## 8. Empty, loading, error, and blocked states

Empty states should teach the next action: “Add a scenario to show what the swarm should inspect,” not “No data.” Loading states should name the user-visible process: reading scenario, saving what the swarm remembers, checking AI service, running simulation, generating report. Error states should say what failed and what the user can try next. Blocked states should be honest about missing provider keys, unavailable graph adapter, missing simulation runtime, failed persistence, or deployment limitations.

Blocked state visual language: amber/orange accent, glass warning panel, concise reason, next action, and affected capability. Do not show green success while a provider/runtime is missing. Do not hide blockers in logs only.

## 9. Anti-generic rules

Forbidden:

- generic white SaaS dashboard;
- default Tailwind starter look;
- Bootstrap/admin-template layout;
- unstyled browser inputs or default buttons;
- random purple gradients without system logic;
- inconsistent border radius, shadows, or spacing;
- static decorative graph bubbles;
- dead tabs, inert filters, fake toggles, or functionless buttons;
- fake activity feeds or canned reports presented as real output;
- raw JSON dumps as the main user experience;
- optimistic success toasts without runtime proof;
- low-contrast gray text on glass;
- visual polish that does not preserve real state and interaction behavior.

If the UI starts drifting into any of these, stop feature work and repair the style/schema violation before advancing.

## 10. Phase obligation

Every later phase that touches UI must obey this style schema. New components must use these tokens, typography rules, layout rhythm, component language, motion principles, and state treatments. If a phase adds backend behavior that affects the user, it must also add or update the visible state in this design language.

A phase cannot claim UI progress if it adds functionality behind a generic or broken interface. The product must become more visually coherent and more operationally honest with each phase.

Browser proof must include checks for beginner copy and actionable blocked-state guidance, not only node counts or build success.
