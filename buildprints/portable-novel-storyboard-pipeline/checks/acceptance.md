# Acceptance Checklist

- [ ] `START_HERE.md` and `blueprint.yaml` are the active router.
- [ ] The active capability packet is implemented before unrelated packets are loaded.
- [ ] `09-evidence/evidence-ledger.jsonl` records proof or blocker rows for each capability.
- [ ] Browser runtime proof covers real rendered states, not a static dashboard.
- [ ] Persistence restart/readback proof passes.
- [ ] Provider proof is deterministic by default and live-provider claims remain blocked without credentials.
- [ ] Security boundary review covers auth, uploads, provider secrets, and destructive actions.
- [ ] Clean-room proof excludes Toonflow source imports.
- [ ] Claims avoid Toonflow clone, route/API parity, provider parity, Electron parity, and final stitched-video parity.
