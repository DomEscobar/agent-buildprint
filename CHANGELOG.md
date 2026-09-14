# Changelog

## 0.1.0 — 2026-09-14

`0.1.0` packages the opt-in local runtime and the Full Standalone Isometric Game packet. This entry describes package contents; it is not an npm-publication claim or a Linux CI result.

### Added

- Opt-in `agb/runtime/v2` manifests with immutable revisions, resumable state, explicit loop transitions, defects and returns.
- Candidate and evidence byte binding, plus optional phase receipt routing for the standalone isometric packet.
- Declarative skill-file routing: `loop next` and `state status` show required and applicable optional files. File hashes establish availability only; AGB never installs, executes, copies or injects skills into an agent context.
- The bundled standalone packet, whose framework remains separately pinned and built locally.

### Changed

- The packet chooses an asset technique before any optional provider route. WaveSpeed, RetroDiffusion and Media4Agents are conditional project choices; supplied, licensed and authored art are evaluated against the same approved target.
- Routine implementation verification follows the approved contract unless it explicitly opts out. Paid providers, uploads, reusable-skill writes, publishing and deployment still require their own authority.

### Compatibility and limits

- Manifests without `runtime: { "schema": "agb/runtime/v2", ... }` retain legacy behavior. Existing snapshots and `.buildprint` state are not migrated or reinterpreted automatically.
- Npm publishing does not update website-hosted manifests or existing snapshots. A remote v2 start still needs a manifest SHA-256 from a separately trusted source.
- The CLI verifies structure, hashes and recorded claims. It does not perform visual judgment, prove gameplay, authenticate a reviewer, or prove an agent read a skill.
- Windows supports the runtime with documented filesystem limitations: directory fsync and POSIX atomicity guarantees do not apply, and network/shared filesystem recovery remains operator-led. See [the runtime guide](docs/cli-runtime-v2.md#windows-filesystem-behavior).
