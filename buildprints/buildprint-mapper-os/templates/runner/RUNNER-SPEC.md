# Runner Specification

These commands are built into `bin/agb.js` — no separate install required. All four are extensions of the existing `agb` CLI.

## Commands

### `agb persona`

Builds a system-prompt block for a subagent session. Reads persona from `templates/teams/`, not injected inline — the file path is the stable identity anchor.

```
agb persona --slice <path/to/slice.yaml> --role build|acceptance [--packet-dir <path>]
```

**Inputs read:**
- `slice.yaml` (required)
- `templates/teams/<persona>.md` — capsule file referenced by `persona:` field in slice.yaml (build role)
- `templates/teams/acceptance-hostile-reviewer.md` (acceptance role)
- `templates/executable-packet/02-architecture.md` (appended as required reading)
- `templates/executable-packet/03-ux-contract.md` — path sections for paths declared in slice.yaml

**Output:** Markdown text on stdout, ready to paste as system prompt into a fresh agent session.

```
## System Identity
<capsule content>

## Required Reading
### Architecture
<02-architecture.md excerpt>
### UX Contract paths for this slice
<03-ux-contract.md sections for slice paths>

## Scope
Slice: <id>   Role: <build|acceptance>   UX contract version: <hash>
Paths: ...   Core proof required: ...

## State Rule
Never write state.json. ...
```

**Exit codes:** 0 = success, 1 = slice.yaml missing/invalid or capsule file missing.

---

### `agb state derive`

Derives `state.json` from evidence files. This is the **only** writer of `state.json`.

```
agb state derive [--project-dir <path>] [--packet-dir <path>]
```

**Inputs read:**
- `slices/*/acceptance-result.json`
- `gates/*/result.json`
- `gates/gate-index.yaml`
- `templates/executable-packet/blueprint.yaml` (current posture)
- `templates/executable-packet/03-ux-contract.md` (contract version hash)

**Derivation rules:**

Slice status:
- No `acceptance-result.json` → `not-started`
- `contract_version` does not match current ux-contract hash → `stale`
- `overall_slice_status: complete`, all `core_proof_required` paths have `upgrades_claim: true` → `complete`
- `overall_slice_status: partial` or any core path not `pass` → `partial`
- `overall_slice_status: fail` → `fail`

Gate status:
- No `result.json` and gate is active for current posture → `pending`
- `status: inactive` with non-null `inactive_reason` → `inactive`
- `status: passed`, `requires_human_signoff: false` → `passed`
- `status: passed`, `requires_human_signoff: true`, `signoff_by` non-empty and non-agent → `passed`

Overall: `complete` only when all slices are `complete` and all active gates are `passed`.

**Written file:** `.buildprint/state.json` with `derived_by: "agb state derive"` (drift check validates this field).

**Exit codes:** 0 = success, 1 = error.

---

### `agb drift check`

Runs mechanical tripwire checks against file evidence. No running app required.

```
agb drift check [--project-dir <path>] [--packet-dir <path>]
```

**Built-in rules:**

| Rule id | Check | Fail condition |
|---|---|---|
| `no-slice-without-path-map` | Every dir under `slices/` (except `_template`) has a `slice.yaml` | Missing slice.yaml |
| `every-path-id-traces` | Every path_id in `slices/*/slice.yaml#paths` exists in `03-ux-contract.md` Path Map | Unknown path id |
| `operator-acceptance-present` | At least one acceptance row with `sample_can_satisfy: false` in ux-contract | No OPERATOR row |
| `no-state-self-write` | `state.json` has `derived_by: "agb state derive"` | Agent wrote state.json directly |
| `contract-version-current` | `acceptance-result.json#contract_version` matches current ux-contract hash | Stale result |
| `no-fake-provider` | No hardcoded fake-provider patterns in non-test files | Fake provider |
| `no-plaintext-secrets` | No plaintext secret patterns outside `.env` files | Exposed secret |

**Output:** one line per rule: `✓ PASS <id>` or `✗ FAIL <id> — <reason>`.

**Exit codes:** 0 = all rules pass or skip, 1 = one or more rules fail.

---

### `agb slice status`

Prints a human-readable status report. Requires `state.json` to exist (run `agb state derive` first).

```
agb slice status [--project-dir <path>]
```

**Example output:**

```
Slice status  (derived 2026-06-03T10:00:00Z)
────────────────────────────────────────────────────────────
✓ 01-onboarding                      complete
✗ 02-graph-canvas                    partial  — operator-input-to-output: missing provider
○ 03-simulation                      not-started

Gate status
────────────────────────────────────────────────────────────
~ security                           inactive (trusted_local posture)
~ observability                      inactive (trusted_local posture)

Overall: PARTIAL
```

**Exit codes:** 0 = overall_status complete, 1 = partial or not-started.

## Constraints

- Pure Node.js standard library — no extra packages, no agent SDKs, no HTTP requests.
- No shared state between invocations. Read files, write files, exit.
- Persona content lives in `templates/teams/*.md`. The CLI reads and prints it; it is never embedded as a hidden injection.
- `state.json` is always derived, never written by an agent directly.
