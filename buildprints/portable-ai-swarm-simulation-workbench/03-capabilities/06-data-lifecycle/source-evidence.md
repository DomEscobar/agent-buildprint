# Source Evidence

The implementation must be source-independent, but these source observations explain why the capability exists.

- /root/MiroFish/backend/app/models/project.py:101-280 persists project metadata, files, and extracted text under upload storage.
- /root/MiroFish/backend/app/api/graph.py:36-117 lists, gets, resets, and deletes projects.
- /root/MiroFish/backend/app/api/simulation.py:788-987 lists simulations and builds enriched history records.
- /root/MiroFish/backend/app/api/report.py:358-467 lists, downloads, and deletes reports.
- /root/MiroFish/backend/app/services/simulation_runner.py:231-305 reloads run state from disk.

Evidence status: `OBSERVED` for cited source surfaces, `INCLUDED_NEEDS_PROOF` for future clean-room implementation readiness.
