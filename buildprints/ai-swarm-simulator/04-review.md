# Review

Run this as a skeptical artifact review, not as a paperwork pass.

## Core Loop

1. Start from a clean local state.
2. Open the app and upload a small supported seed file.
3. Enter a prediction requirement and create the project.
4. Generate ontology or verify the blocked LLM state.
5. Build graph or verify the blocked graph-memory state.
6. Prepare simulation and inspect profiles/config, or verify the blocked provider state.
7. Run a short simulation and inspect timeline/actions, or verify the blocked runtime state.
8. Generate a report and open/download it, or verify the blocked report state.
9. Ask a follow-up question in the interaction surface, or verify blocked chat state.

## State Readback

- Reload project, simulation, run, and report routes after meaningful transitions.
- Restart the backend if the chosen persistence posture promises restart recovery.
- Confirm that project files, ontology, graph id, simulation config, run traces, report sections, and logs are read back from persisted state, not from incidental component memory.

## Vary Inputs

- Try missing prompt, missing file, unsupported file, oversized file, and a second prompt/file combination.
- Change simulation max rounds and confirm run state reflects it.
- Ask two different report/chat questions and verify responses or blocked states differ.

## Controls And Boundaries

- Click graph refresh, layout toggles, start, stop, close environment, report download, chat target changes, and destructive confirmations where included.
- Trigger provider-missing states by running without credentials.
- Verify delete/reset controls require confirmation and do not silently remove unrelated state.

## Anti-Fake Review

Look for generic dashboard smell, fake intelligence, raw JSON dumped as the main experience, placeholder copy, dead controls, swallowed errors, undocumented public methods, fake adapter seams, canned output, missing persistence/traces/readback, and absent next actions.

Fix local, safe, central defects before handover. Leave only real blockers such as missing credentials, provider sandbox access, or unresolved deployment policy.

## Blocker Semantics

Provider-live, public-deployment, and production_readiness claims remain blocked until they are directly verified. Local checks can support local confidence; they do not upgrade the claim.


## Extra review checks from remap request

- Confirm Source/origin is https://github.com/666ghj/MiroFish, not only the published Buildprint package path.
- Confirm the UI preserves a sleek, clickable, motion-rich MiroFish/Canva-like product feeling rather than a static dashboard.
- Confirm Zep Cloud is not required; graph memory goes through an open-source adapter path or an honest local-runtime blocker.
- Confirm LLM provider settings are dynamic and OpenAI-compatible, not hardcoded to one vendor.
