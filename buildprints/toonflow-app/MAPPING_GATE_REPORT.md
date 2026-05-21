# MAPPING_GATE_REPORT

Work directory: /root/mapper-os-tests/toonflow-new-mapping-20260521-171514

## Result

Full-suite real mapping generated from local source checkout `./source-real` at commit `122d2aa431d3240fea3eab491e6fbc690bb088cb`.

Qualification status: `SELECTED_UNQUALIFIED`.

The selected Buildprint is safe for a downstream implementation agent as a scope-preserving source-backed contract, but not safe to treat as qualified or implementation-proven. Browser/runtime/provider/security/reversal proof remains blocked.

## Outputs

- `mapping/discovery/`: source reading plan, discovery queue, claim register, system map, candidates.
- `mapping/evidence/EVIDENCE_LEDGER.json`: source-backed evidence ledger.
- `mapping/quality/PROMOTION_GATE.md`: promotion blockers and gate status.
- `mapping/CURRENT_STATE.md`, `mapping/manifest.json`.
- `selected-buildprint/`: full-suite Buildprint spine plus 15 capability packs. Patched after import to current Mapper OS team-stack artifact shape.

## Capability Count And Status

- Total capabilities: 15
- INCLUDED_READY: 0
- INCLUDED_NEEDS_PROOF: 11
- INCLUDED_BLOCKED: 0
- INCLUDED_RISKY_REQUIRES_HARDENING: 4
- OUT_OF_SCOPE_BY_USER_ONLY: 0
- TEST_ONLY_MOCK: 0
- REAL_IMPLEMENTED: 0
- CONTRACT_SEAM_ONLY: 14
- BLOCKED_WITH_REASON: 1

## Commands Run

- `rg --files mapper-os`
- `rg --files source-real`
- `sed -n` / `nl -ba` inspections of Mapper OS requirements and source files.
- `find Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes` and `rg` inspections of env/auth/routes/db/provider surfaces.
- Output generation via `node generate_mapping_outputs.js`.
- `find mapping selected-buildprint -maxdepth 3 -type f | sort`: output tree listed successfully.
- Required selected-buildprint file existence loop: all required spine files present.
- Capability pack count check: 15 capability directories after removing stale empty `source-access-blocker` directory; each product capability has CAPABILITY/VERIFICATION/IMPLEMENTATION/CONTRACTS files.
- `node -e` JSON parse check for `mapping/evidence/EVIDENCE_LEDGER.json`, `mapping/manifest.json`, and `selected-buildprint/manifest.json`: passed.
- `node -e` CAPABILITY_INDEX required-column check: passed for Source evidence, Product obligation, Required topology, UI/UX, API, Domain logic, Persistence/state, Provider/runtime, Failure states, Proof command, Proof artifact, Negative test, Runtime/browser evidence, Depth status, Promotion blocker.
- Generated-output secret scan for common key/token/private-key/default-credential patterns: no matches.
- `git -C source-real status --short`: no source checkout modifications reported.
- `node --check Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:data/serve/app.js`: passed.
- `node -e` package/script inspection: package name `toonflow`, version `1.1.7`, 39 dependencies, 17 devDependencies, scripts inspected.
- `yarn lint`: blocked because `yarn` is not installed in the environment.
- `test -d Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:node_modules`: node_modules missing, so dependency-backed TypeScript/build/runtime checks were not run.
- Completion notification attempt: `openclaw message send --channel telegram --target telegram:579539601 --account default ...` failed in this sandbox. First run failed because OpenClaw tried to write runtime plugin deps under read-only `/root/.openclaw`; retry with temporary writable OpenClaw state timed out while staging runtime deps under network-restricted execution. No confirmed send result was returned.

## Evidence Coverage

Evidence covers manifests, runtime entrypoints, route generation, auth middleware, socket namespaces, project/novel/script/asset/production routes, provider adapter system, VM sandbox, SQLite init, OSS file service, memory/embedding, skill management, Electron/Docker packaging, bundled static web, and docs product workflow.

## Blockers

- Browser/Electron proof not run.
- Live/sandbox provider proof not run.
- Dependency install/build may be unavailable; any failure must be recorded rather than treated as absence of scope.
- Security hardening required for auth, uploads, programmable provider VM, and destructive admin operations.
- Persistence restart/readback/delete/export proof not run.
- Clean-room reversal not run.
- Frontend source topology unavailable beyond bundled minified web artifact.

## Downstream Safety

Safe to hand to a downstream implementation agent for max-quality implementation planning and first-slice coding. Not safe for qualification, parity claims, or production-readiness claims until proof ledger rows close.
