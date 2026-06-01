# Agent Prompt

You are implementing the Open MiroFish Swarm Prediction Workbench from this Buildprint. Build the actual usable product loop.

Preserve the five-step prediction workflow: graph build, environment setup, simulation, report generation, and deep interaction. Preserve the graph canvas as a first-class inspection surface.

Replace direct Zep Cloud dependency with a graph-memory port and a free/open-source local backend. The recommended default is Graphiti plus FalkorDB. Keep LLM provider choice configurable through OpenAI-compatible base URL, model, and key settings.

Do not fake graph, simulation, report, memory search, or chat behavior. Missing provider credentials are blockers or local-only states, not success. Persist state across restarts. Verify the browser canvas and the first local loop before handover.
