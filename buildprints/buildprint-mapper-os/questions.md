# Mapper OS Questions

The mapper should not ask a long questionnaire before discovery. Use safe defaults, run soft discovery, then ask contextual questions. After discovery, ask only 3-5 required decisions; rows 6-7 below are appendix decisions used only when needed to unblock implementation.

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
| 4 | Production-grade selected scope? | Prevents lazy MVP output | Smaller complete scope; included capabilities must be real | |
| 5 | Fidelity / parity target? | Controls validation depth and safe claims | contract-parity + runtime-parity for included product/app features | |
| 6 | Provider/export/full-parity posture? | Prevents accidental expensive or false parity claims | Exclude provider/export unless real implementation is selected; mocks only as test fixtures | |
| 7 | Capabilities to exclude rather than fake? | Keeps scope honest | Cut hard features from scope instead of mocking/placeholding them | |

## Appendix — ask only if touched

Add subsystem-specific questions only after that subsystem is observed or selected.
