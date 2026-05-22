# Source Evidence

The implementation must be source-independent, but these source observations explain why the capability exists.

- /root/MiroFish/README.md:89-93 identifies environment setup, entity extraction, persona generation, and agent configuration injection.
- /root/MiroFish/backend/app/api/simulation.py:165-229 creates simulations from project and graph ids.
- /root/MiroFish/backend/app/api/simulation.py:359-625 prepares simulations, reads graph entities, generates profiles/config, and reports progress.
- /root/MiroFish/backend/app/api/simulation.py:990-1283 exposes profiles and configuration including realtime partial-read endpoints.

Evidence status: `OBSERVED` for cited source surfaces, `INCLUDED_NEEDS_PROOF` for future clean-room implementation readiness.
