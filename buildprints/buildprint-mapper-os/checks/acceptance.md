# Mapper OS Acceptance Checklist

- [ ] Default mapper run creates discovery/evidence/quality output only.
- [ ] Selected extraction creates `selected-buildprint/`.
- [ ] Medium, large, and full-suite selected outputs include `CAPABILITY_INDEX.md` and `capabilities/`.
- [ ] Every included capability has `CAPABILITY.md`, `VERIFICATION.md`, and `IMPLEMENTATION.md`.
- [ ] Every `OBSERVED` claim cites source path and line or section.
- [ ] Census hints never assert product behavior, absence, parity, provider completeness, persistence, or readiness.
- [ ] Included/excluded/blocked/test-only capability statuses are complete.
- [ ] No included capability is placeholder-backed, mock-backed, no-op, skeleton, deterministic-adapter-only, static-shell-only, or in-memory-only where persistence is claimed.
- [ ] Medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy selected outputs include an architecture topology gate.
- [ ] Selected outputs include a capability depth matrix that distinguishes `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, and `FAKE_OR_PLACEHOLDER_FAIL`.
- [ ] Downstream execution plan names first slice, first verification gate, architecture/depth gates, repair loop, and stop condition.
- [ ] Qualification label is one of `DISCOVERY_ONLY`, `SELECTED_UNQUALIFIED`, or `QUALIFIED_SOURCE_INDEPENDENT`.
- [ ] Public wording avoids validated/production-ready/complete/end-to-end unless qualified evidence exists.
