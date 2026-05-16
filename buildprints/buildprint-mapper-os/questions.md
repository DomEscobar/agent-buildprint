# Mapper OS Questions

The mapper should not ask a long questionnaire before discovery. Use safe defaults, run soft discovery, then ask contextual questions.

## Minimal preflight

Ask only if unclear or unsafe:

| # | Decision | Safe default | Human answer |
|---|---|---|---|
| 1 | Read/export boundary | Read source/docs/tests/config names; export generated Buildprint files only; never copy secrets or `.env` values | |
| 2 | Mapping goal | Discover candidates first, then ask which to extract | |
| 3 | Portability preference | Keep product behavior portable; source stack is reference | |

## Decisions after soft discovery

| # | Decision | Why it matters | Safe default | Human answer |
|---|---|---|---|---|
| 1 | Which candidate/system scope should be extracted? | Sets output boundary | Highest-confidence product scope | |
| 2 | Preserve source stack or keep portable? | Controls implementation constraints | Keep portable | |
| 3 | Target stack, if any? | Needed only for cross-stack rebuild | Not set yet | |
| 4 | Fidelity / parity target? | Controls validation depth and safe claims | workflow-proof + contract-parity; add runtime QA for UI products when cheap | |
| 5 | Provider/export/full-parity posture? | Prevents accidental expensive or false parity claims | mock providers; manifest/preview export; no full clone unless explicit | |
| 6 | MVP vs out-of-scope capabilities? | Prevents vague clone/sludge | Use capability baseline safe defaults | |

## Appendix — ask only if touched

Add subsystem-specific questions only after that subsystem is observed or selected.
