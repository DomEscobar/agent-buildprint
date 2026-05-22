# Source Evidence

The implementation must be source-independent, but these source observations explain why the capability exists.

- /root/MiroFish/README.md:89-93 lists report generation and deep interaction with the post-simulation environment.
- /root/MiroFish/backend/app/api/report.py:25-200 starts asynchronous report generation for a simulation and graph.
- /root/MiroFish/backend/app/api/report.py:277-467 retrieves, lists, downloads, and deletes reports.
- /root/MiroFish/backend/app/api/report.py:472-564 implements ReportAgent chat against simulation and graph context.
- /root/MiroFish/backend/app/services/report_agent.py:1-10 describes report planning, ReACT generation, tool use, and chat.

Evidence status: `OBSERVED` for cited source surfaces, `INCLUDED_NEEDS_PROOF` for future clean-room implementation readiness.
