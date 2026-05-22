# Source Evidence

The implementation must be source-independent, but these source observations explain why the capability exists.

- /root/MiroFish/README.md:89-93 lists graph building, memory injection, and GraphRAG construction.
- /root/MiroFish/backend/app/api/graph.py:260-522 starts asynchronous graph building, chunking, Zep graph creation, ontology setting, episode processing, and task completion.
- /root/MiroFish/backend/app/api/graph.py:534-622 exposes task status, graph data retrieval, and graph deletion.
- /root/MiroFish/frontend/src/components/GraphPanel.vue:17-220 renders graph, loading/empty states, legend, and node/edge detail panels.

Evidence status: `OBSERVED` for cited source surfaces, `INCLUDED_NEEDS_PROOF` for future clean-room implementation readiness.
