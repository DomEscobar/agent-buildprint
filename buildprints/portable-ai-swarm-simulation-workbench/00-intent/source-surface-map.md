# Source Surface Map

- SRC-001: /root/MiroFish/README.md:34-93 product promise, workflow, and broad scope
- SRC-002: /root/MiroFish/backend/app/config.py:14-78 provider, upload, chunking, simulation, and report configuration
- SRC-003: /root/MiroFish/backend/app/api/graph.py:36-622 project, upload, ontology, graph task, graph data, delete/reset routes
- SRC-004: /root/MiroFish/backend/app/api/simulation.py:48-1740 entity, simulation creation, preparation, config/profile, start/stop/run-status/history routes
- SRC-005: /root/MiroFish/backend/app/api/report.py:25-620 report generation, report retrieval/lifecycle, chat, progress/section routes
- SRC-006: /root/MiroFish/backend/app/services/* graph, ontology, profile, simulation, report, Zep tools, IPC, runtime services
- SRC-007: /root/MiroFish/backend/app/models/project.py:17-280 project persistence model and file/text storage
- SRC-008: /root/MiroFish/backend/app/models/task.py:16-172 in-memory async task status model
- SRC-009: /root/MiroFish/frontend/src/views/MainView.vue:1-260 workbench shell, graph/split/workbench layout, step routing, upload-to-graph flow
- SRC-010: /root/MiroFish/frontend/src/components/GraphPanel.vue:17-220 graph visualization and details UI
- SRC-011: /root/MiroFish/package.json:1-18, /root/MiroFish/backend/pyproject.toml:1-41, /root/MiroFish/frontend/package.json:1-22 stack and dependency evidence

Source evidence is for traceability only. Downstream implementers must rely on this packet, not the original checkout.
