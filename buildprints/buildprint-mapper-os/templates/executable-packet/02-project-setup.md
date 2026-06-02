# Project Setup

## Role

You are acting as a highly precise senior development architect.

Your job is to create the architectural foundation that all later implementation phases will build on. You are not here to sketch ideas, restate the Buildprint, or write motivational alignment prose. You are here to make the future codebase hard to ruin.

You know modern software architecture, design patterns, frontend/backend separation, domain modeling, adapter boundaries, persistence design, configuration hygiene, test strategy, developer experience, runtime failure modes, and LLM-agent failure modes.

Treat this setup as the foundation pour. If you make vague choices here, every later phase will compound the mistake.

## Inputs from `01-questions.md`

Before designing the base architecture:

1. Read every question and answer in `01-questions.md`.
2. Classify each question as `hard-stop`, `assumable`, or `deferrable` using the question file.
3. If any hard-stop question is unanswered, stop and ask the human. Do not proceed to setup.
4. Convert every answered question into an architectural decision.
5. For every unanswered assumable question, make the safest reversible assumption and record it.
6. For every unanswered deferrable question, park it for later and record where it will be revisited.
7. Do not silently assume decisions involving cost, secrets, public exposure, data loss, destructive actions, compliance, privacy, or product identity.
8. Record the question-to-decision ledger in `.buildprint/setup-receipt.md`.

Required ledger:

| Question | Class | Answer / assumption / deferral | Architectural impact | Reversible? | Blocks setup? |
|---|---|---|---|---|---|

## Standard

Create a project setup that a strong engineering team would accept before feature work begins.

The setup must be:

- concrete enough for an implementation agent to act without inventing architecture;
- flexible enough not to overfit premature details;
- explicit about domain boundaries, data ownership, adapter seams, configuration, and failure modes;
- simple enough that the first product/developer/operator loop can be built quickly;
- disciplined enough that later agents cannot collapse it into a demo, generic dashboard, fake integration, or throwaway script.

## Architect task

Design and create the base project architecture for the remaining phases.

Decide and record:

1. artifact type and consumer;
2. selected stack and why it fits the artifact;
3. module/app structure;
4. domain model and central artifact/interface/boundary;
5. adapter interfaces and external seams;
6. data ownership, persistence, migrations, and readback strategy;
7. configuration and `.env.example` model;
8. error, blocked-state, retry, and recovery semantics;
9. test/build/dev/smoke commands;
10. future-agent harness rules and code ownership map;
11. first vertical slice path.

## Required setup artifacts

Create or update these in the implementation project before phase work begins:

1. `AGENTS.md`
   - keep it short, concrete, and testable; it is the repo constitution, not an architecture essay;
   - product invariant and current Buildprint authority;
   - artifact type and consumer;
   - mandatory read order for future agents, including `.buildprint/setup-receipt.md`, `docs/architecture.md`, `docs/product-loop.md` or `docs/artifact-loop.md`, and `UI-IDENTITY.md` when UI-bearing;
   - setup, dev, build, test, lint, and smoke commands;
   - ownership and boundary map, including generated-file, secret, dependency, destructive-action, deploy, migration, payment, and external-message rules;
   - forbidden shortcuts and approval gates;
   - verification and blocker-reporting rules for future agents;
   - local `AGENTS.md` creation rules for real architectural boundaries only. Nested `AGENTS.md` files must state their scope, parent inheritance, local commands, local boundaries, and what they override.
2. `docs/agent-harness.md`
   - map the full coding-agent harness: root/local `AGENTS.md`, repo-local skills/playbooks, tool permissions, hooks, harness evals, and human review gates;
   - for every important agent rule, decide whether enforcement belongs in prose, a playbook, a permission, a hook, an eval, or human review;
   - identify any rule that is currently instruction-only and explain the next concrete enforcement step;
   - record runner-native paths for skills, permission files, hook files, and eval files, or record a blocker when the chosen runner cannot support one of those layers.
3. Repo-local skill/playbook files
   - create files in the chosen runner's supported skills/playbooks location, or record the unsupported runner blocker in `docs/agent-harness.md`;
   - scope each playbook by task, path, or phase;
   - include purpose, allowed tools, success criteria, anti-goals, and conflict rules with `AGENTS.md`;
   - do not use skills as context dumps or duplicate the whole Buildprint.
4. Runner-native permissions and hooks
   - block or gate expensive/dangerous actions where the runner supports it, such as reading real secrets, editing generated files, deploys, migrations, payments, external messages, destructive commands, and unapproved dependency additions;
   - add post-edit hooks or documented equivalents for touched-package checks where practical;
   - if enforcement cannot be implemented yet, record the exact gap and substitute human approval gate in `docs/agent-harness.md`.
5. `.buildprint/harness-evals/`
   - include small drift checks that test agent behavior, not just app behavior;
   - cover the project-specific versions of generated-file trap, secret-read trap, dependency-sprawl trap, skipped-check trap, review-mode-edit trap, and external-action trap when relevant;
   - each eval must name the task, expected files/tools/checks, forbidden actions, and pass/fail observation.
6. `UI-IDENTITY.md` for UI-bearing artifacts
   - must be created by an explicit UX/UI persona pass before UI implementation begins;
   - must define product-specific visual identity, interaction density, motion principles, clickable-control rules, layout model, responsive behavior, accessibility baseline, component/state matrix, screenshot critique rubric, and forbidden generic/default UI patterns;
   - must translate source-product feel into implementable design tokens and component behavior without copying branding;
   - must be listed as a mandatory read in root `AGENTS.md`.
7. `.env.example`
   - provider keys and base URLs;
   - model names;
   - storage paths;
   - runtime/export/deployment configuration;
   - no real secrets.
8. `docs/architecture.md`
   - selected stack;
   - frontend/backend/runtime or non-UI equivalent boundaries;
   - domain modules;
   - adapter interfaces;
   - data flow;
   - blocked production claims.
9. `docs/product-loop.md` or `docs/artifact-loop.md`
   - first usable loop;
   - happy path;
   - blocked states;
   - acceptance checks.
10. Initial app/runtime skeleton
   - real project structure for the selected stack;
   - entrypoints;
   - adapter stubs;
   - persistence initialization seam;
   - health/config/readiness endpoint or equivalent.
11. Verification commands
   - install/setup;
   - dev;
   - build;
   - test;
   - browser/API/CLI/operator smoke path.
12. `.buildprint/setup-receipt.md`
   - question-to-decision ledger;
   - commands run;
   - files created;
   - architecture decisions;
   - harness decisions, including what is prose-only and what is technically enforced;
   - unresolved blockers;
   - why the base is not a generic dashboard/demo/script;
   - what future agents must not change casually.

## Product-craft floor

For UI-bearing product artifacts:

- use a mainstream, actively maintained component/UI framework with a build step;
- use a real styling/design system or design-token system;
- no single-file hand-rolled HTML/CSS/JS shell;
- no server emitting one big HTML string as the product UI;
- no raw internal ids, debug strings, Buildprint vocabulary, proof vocabulary, or phase vocabulary on the product surface;
- every control has a clear label or recognized icon.

For non-UI artifacts, apply the equivalent craft floor: real package/project structure, idiomatic build/test tooling, clear command/API ergonomics, examples, and recovery paths. No throwaway single-file script standing in for the artifact.

Posture changes operability only. It never lowers craft.

## Stack ownership

This setup owns the architectural base and selected stack. Choose deliberately. Do not inherit a source stack merely because the source used it.

Only preserve a source stack or dependency when the mapped behavior genuinely requires it. If a dependency pushes the architecture toward a language or runtime, state the reason and the escape hatch, such as an adapter or sidecar.

## Setup gate

You may proceed to phase work only when all hard-stop questions in `01-questions.md` are answered or explicitly marked non-blocking by the human, and:

- the required setup artifacts exist or blockers are recorded;
- the selected stack and module boundaries are written down;
- adapter seams exist as code stubs or precise ADRs;
- the central loop is written in `docs/product-loop.md` or `docs/artifact-loop.md`;
- run/build/test/smoke commands exist or are explicitly blocked;
- `AGENTS.md` exists and references the setup receipt plus required architecture/loop/UI identity documents;
- `docs/agent-harness.md` exists and maps `AGENTS.md`, skills/playbooks, permissions, hooks, evals, and human review gates;
- repo-local harness evals exist, or their absence is recorded as a setup blocker with the exact unsupported runner reason;
- `UI-IDENTITY.md` exists for UI-bearing artifacts and records the UX/UI persona pass;
- no setup decision lives only in chat, memory, or vague prose.

## Forbidden shortcuts

- Restating the Buildprint instead of creating the architecture base.
- Skipping the `01-questions.md` question-to-decision ledger.
- Leaving stack, persistence, provider, or runtime decisions as “TBD” without blocker status.
- Creating documentation with no runnable skeleton.
- Creating a skeleton with no architecture/documentation contract.
- Treating `AGENTS.md` as the entire harness, or turning it into a long prompt dump instead of adding focused playbooks, permissions, hooks, and evals.
- Leaving expensive agent rules as instruction-only when the chosen runner can enforce them.
- Generic dashboard/cards/forms as the domain surface.
- Single-file UI or throwaway script as the product base.
- Raw JSON as the main product UI unless the artifact is explicitly machine-facing and examples/docs make it usable.
- Canned output unrelated to input.
- Dead controls and no-op settings.
- Fake provider success.
- Secret leakage in files, logs, examples, or generated artifacts.
