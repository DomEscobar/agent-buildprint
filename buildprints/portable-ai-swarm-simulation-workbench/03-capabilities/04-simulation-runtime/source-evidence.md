# Source Evidence

The implementation must be source-independent, but these source observations explain why the capability exists.

- /root/MiroFish/README.md:89-93 describes dual-platform parallel simulation and dynamic temporal memory updates.
- /root/MiroFish/backend/app/api/simulation.py:1451-1641 starts simulations with platform, max rounds, graph-memory update, force restart, and readiness checks.
- /root/MiroFish/backend/app/api/simulation.py:1644-1700 stops simulations and persists paused state.
- /root/MiroFish/backend/app/services/simulation_runner.py:196-205 states responsibilities for background OASIS runs, action parsing, realtime status, and stop/resume operations.

Evidence status: `OBSERVED` for cited source surfaces, `INCLUDED_NEEDS_PROOF` for future clean-room implementation readiness.
