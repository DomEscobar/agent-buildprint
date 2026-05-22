# Design Quality Bar

## Product Category

- Category: operational creative-production workbench.
- Primary user: solo creator or operator turning long-form text into storyboard and media planning artifacts.
- Work density: compact, scan-friendly, with dense artifacts organized by stage.

## Taste Direction

- Aesthetic direction: editorial production console with clear artifact hierarchy.
- Interaction feel: precise, low-friction, status-aware, and recoverable.
- Motion target: restrained transitions only for state changes or task progress.
- Density target: information-rich but not cramped; panels should support repeated review.

## Visual Hierarchy

- Primary object: the current project pipeline stage and its persisted artifacts.
- Secondary objects: provider mode, task status, validation warnings, and export limitations.
- Persistent status: claim qualification, deterministic provider mode, and blocked live-provider state.
- Blocked/error emphasis: visible inline panels with recovery action or explicit blocker text.

## Forbidden Generic Patterns

- Generic dashboard cards as the main app.
- Decorative marketing hero or onboarding splash as the first working screen.
- Raw manifest or JSON-first UI as product completion.
- One-note dark dashboard palette with no artifact hierarchy.
- UI that looks complete while adapters, persistence, or proof are fake.

## Interaction Polish

- Every visible action has a working behavior, disabled reason, or explicit blocker.
- Stage navigation preserves project context.
- Long-running deterministic provider operations expose pending/running/success/failure state.
- Export actions produce a preview, downloaded file, copied payload, or blocker artifact.
- Destructive/reset actions require confirmation or remain disabled.

## Accessibility Gates

- Keyboard path covers project create/select, import, extraction, storyboard selection, export, and confirmation.
- Focus states are visible and not hidden by custom styling.
- Status and errors use text labels, not color alone.
- Form controls and icon buttons have accessible names.

## Responsive Gates

- Desktop screenshot required for storyboard board with timeline and inspector.
- Narrow/mobile screenshot required for stacked board/inspector and wrapped status controls.
- Text must not clip in provider status, storyboard row labels, task errors, or export sections.
- Header controls and status pills must wrap without overlapping content.

## Required Screenshot Set

- Empty: new project with no imported chapters or storyboard data.
- Loading: provider or media task running.
- Error: malformed input or malformed provider output.
- Blocked: missing live provider credentials or blocked destructive/final-video action.
- Success/ready: hydrated project with chapters, events, script artifacts, storyboard rows, media records, and export preview.
- Restart/readback: same project state after reload/restart.
