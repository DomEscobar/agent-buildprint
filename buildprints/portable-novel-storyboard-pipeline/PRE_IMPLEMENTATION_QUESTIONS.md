# PRE_IMPLEMENTATION_QUESTIONS

Purpose: resolve or safely default high-impact execution decisions before coding the first capability.

Rules:

- Ask at most five blocking questions total.
- Do not ask the user to choose a quality tier, a lazy/simple mode, or a team.
- Do not ask questions answerable from this packet or Toonflow source evidence.
- If the user is unavailable, use the safe defaults below and continue with `project-workspace-auth`.
- Keep `SELECTED_UNQUALIFIED` until runtime proof exists in `.buildprint/evidence/evidence-ledger.jsonl`.

## Blocking Questions

1. Provider mode: should live text/image/video providers be used now, or deterministic no-network adapters?
2. Persistence mode: should the implementation use local durable filesystem/SQLite, or a named external database?
3. Deployment posture: should this stay local dev, or target a named public deployment?
4. Data safety: may real user/source data be imported, or only local fixtures?
5. Destructive actions: are any destructive/admin actions authorized, or should all remain disabled?

## Safe Defaults For This Packet

- Provider mode: deterministic no-network adapters for text, image, and video behavior.
- Persistence mode: local durable filesystem or SQLite with restart/readback proof.
- Deployment posture: local dev only.
- Data safety: local fixtures only; no real user data import.
- Destructive actions: disabled unless explicitly approved.
- First capability: `project-workspace-auth`.
- Qualification: keep `SELECTED_UNQUALIFIED`; do not claim Toonflow clone, live-provider parity, public deployment, Electron parity, exact UI/canvas parity, final stitched-video export, or production readiness.
