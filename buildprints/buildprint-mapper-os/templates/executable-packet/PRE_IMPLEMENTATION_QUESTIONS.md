# PRE_IMPLEMENTATION_QUESTIONS

Purpose: resolve or safely default the few decisions that change security, scope, provider behavior, persistence, deployment, or qualification before coding starts.

Rules:

- Ask at most five blocking questions total.
- Do not ask quality-tier, lazy/simple, team-choice, style-preference, or source-answerable questions.
- If the user is unavailable, proceed with the concrete safe defaults below and record them in local run state.
- Keep `SELECTED_UNQUALIFIED` until runtime evidence proves the promotion gates.

## Blocking Questions

1. Provider mode: should this run use live external providers, or deterministic no-network adapters?
2. Persistence mode: should this run use local durable storage, or a named external database?
3. Deployment posture: local dev only, or a named public deployment target?
4. Data safety: may the run import real user/source data, or only local fixtures?
5. Destructive actions: are any destructive/admin actions authorized, or must they remain disabled?

## Safe Defaults

- Provider mode: deterministic no-network adapters.
- Persistence mode: local durable filesystem or SQLite.
- Deployment posture: local dev only.
- Data safety: local fixtures only; no real user data import.
- Destructive actions: disabled unless explicitly approved.
- Qualification: keep `SELECTED_UNQUALIFIED`; do not claim live-provider, public-deployment, production, or full parity proof.
