# Acceptance Criteria

Pass only if all are true:

- Local start command works from a clean output directory.
- First-user path works without credentials: create project -> add evidence -> generate ontology -> inspect entities/relations -> reload/readback -> export JSON.
- Different seed evidence produces visibly different ontology output.
- State survives reload or restart through local persistence.
- Provider/live runtime surfaces are honest: deterministic local mode, missing-config blocker, or disabled; never fake live success.
- UI includes useful empty/loading/error/success states.
- Implementation separates UI, domain ontology logic, persistence, and tests enough for extension.
- Verification includes automated tests and a manual/browser-like smoke path.
- `HANDOVER.md` states exact run command, gates, smoke path, known defects, and next improvement.
