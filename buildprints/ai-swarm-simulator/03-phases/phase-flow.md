# Phase Flow

Use this loop for every active phase.

1. Read the phase file and restate the product intention in one or two sentences.
2. Apply `requires_roles` and the role-specific blocks in the phase.
3. Build the smallest real usable product slice for the phase.
4. Improve the obvious next user action if it is local, safe, and central.
5. Run the relevant checks named by the phase.
6. Remove visible slop: dead controls, placeholder text, raw JSON surfaces, fake provider success, broken responsive layout, and swallowed errors.
7. Record only useful handover facts: what works, what was checked, what remains blocked, and the next atomic action.

Rules:

- Missing LLM or graph-memory credentials do not lower the quality bar. They create visible blocked states and handover blockers.
- Deterministic fixtures are allowed for local smoke tests only when clearly labeled.
- The graph/canvas must be inspected in a browser before any handover that claims UI readiness.
- Do not proceed to a later phase by hiding broken central behavior from an earlier phase.
