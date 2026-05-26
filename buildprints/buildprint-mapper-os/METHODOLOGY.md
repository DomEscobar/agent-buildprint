# Mapper OS Methodology

Mapper OS turns an existing project, repo, or product brief into an executable Buildprint packet that a fresh agent can implement without returning to the source project.

The current methodology is **phase-flow replay with evidence honesty**: every generated packet must teach a downstream agent how to enter the work, run a bounded implementation slice, prove what changed, review it from multiple angles, and hand off the next slice without faking production completeness.

## Core Invariant

A Buildprint is not a summary and not a vibe spec. It is a source-independent execution contract.

A valid Mapper OS output must preserve:

1. **Scope fidelity** — do not silently shrink the requested product or feature set.
2. **Phase executability** — each phase has a concrete entry point, files to read, outputs to create, proof gate, repair route, and handoff rule.
3. **Evidence honesty** — runtime claims are only upgraded when proof exists; blockers stay blockers.
4. **Review discipline** — architecture, UX, and QA reviews must answer their required headings with concrete evidence, not generic approval.
5. **Fresh-agent isolation** — the generated packet must be enough for a clean downstream agent; it must not require source-repo access or parent-directory spelunking.

## End-to-End Flow

### 1. Source census

Mapper OS first inspects the source safely enough to identify product surfaces, data flows, UI/API boundaries, external providers, runtime constraints, and risk areas.

The census can inform extraction, but it must not become the final product contract by itself. Claims need evidence.

### 2. Scope selection

The mapper chooses or confirms the target Buildprint scope:

- explicit user-selected scope;
- strongest coherent candidate;
- full-suite decomposition when the source is broad;
- discovery-only if the scope is unsafe or under-specified.

The selected scope must keep the real product shape. If the source has multiple major capabilities, the packet should preserve them as phases rather than flattening into a toy first slice.

### 3. Source-independent distillation

The mapper converts source facts into implementation contracts:

- product jobs and user outcomes;
- state and data ownership;
- API, UI, worker, provider, and persistence contracts;
- verification gates;
- blocker boundaries;
- external-provider modes;
- deferred phases and handoff dependencies.

The downstream packet must not rely on the original repo path, private files, or hidden context.

### 4. Executable packet generation

The generated `selected-buildprint/` packet is the artifact a future agent runs. Its spine is:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/phase-index.yaml
03-phases/phase-flow.md
03-phases/<phase-id>.md
04-evaluation.md
05-evidence/evidence-ledger.jsonl
05-evidence/evidence-ledger.schema.json
generated/agent-prompt.md
```

The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only. Runtime implementation evidence must be appended to `.buildprint/evidence/evidence-ledger.jsonl` inside the fresh workspace.

### 5. Phase-flow execution

Each implementation phase must begin with:

```md
## How to implement this phase
```

A downstream agent must read, in order:

1. `selected-buildprint/BUILDPRINT.md`
2. `selected-buildprint/01-questions.md`
3. `selected-buildprint/02-project-setup.md`
4. `selected-buildprint/blueprint.yaml`
5. `selected-buildprint/03-phases/phase-index.yaml`
6. `selected-buildprint/03-phases/phase-flow.md`
7. the active phase file
8. `selected-buildprint/04-evaluation.md`
9. `selected-buildprint/05-evidence/evidence-ledger.jsonl`
10. `selected-buildprint/05-evidence/evidence-ledger.schema.json`

Before claiming implementation proof, the agent creates:

```text
.buildprint/phase-runs/<phase-id>/plan.md
.buildprint/phase-runs/<phase-id>/team.md
.buildprint/phase-runs/<phase-id>/handoffs/*.md
.buildprint/phase-runs/<phase-id>/returns/*.md
.buildprint/phase-runs/<phase-id>/reviews/architecture.md
.buildprint/phase-runs/<phase-id>/reviews/ux.md
.buildprint/phase-runs/<phase-id>/reviews/qa.md
.buildprint/phase-runs/<phase-id>/proof.md
.buildprint/progress.md
.buildprint/next-agent.md
.buildprint/state.json
```

This forces a local multi-role loop even when one model is doing the work.

### 6. Bounded team simulation

The phase-run artifacts represent the minimum useful specialist loop:

- **product architect** — preserves product shape, dependencies, and next-phase boundaries;
- **integration/runtime** — checks API, provider, worker, and execution paths;
- **data persistence** — checks state shape, storage, migrations, and lifecycle;
- **UX/UI craft** — checks screens, states, accessibility, and responsive behavior;
- **security boundary** — checks secrets, uploads, auth, destructive actions, and provider risks;
- **test and verification** — runs proof gates and names remaining gaps.

The point is not bureaucracy. The point is to prevent a single-agent implementation from collapsing product, UX, QA, and security into one unexamined “done”.

### 7. Proof gates and repair

Every phase has a named proof gate. A proof gate can pass, fail, or produce an honest blocker.

The repair loop is:

```text
failed check
-> observed failure
-> contract or capability gap
-> focused repair
-> rerun check
-> pass or blocker
```

A blocker is valid only when it is explicit, scoped, and prevents overclaiming. Examples: missing provider credentials, sandboxed browser launch failure, network restriction, unavailable external service, or absent approval for external calls.

### 8. Evidence ledger rules

Runtime evidence rows must conform to `selected-buildprint/05-evidence/evidence-ledger.schema.json` and include at least:

- `artifact_id`
- `type`
- `phase_id`
- `status`
- `source`
- `proves`
- `proof_type`
- `provider_mode`
- `upgrades_claim`

Valid statuses are:

```text
missing, passed, proven, blocked, failed, skipped
```

`proves` must be an array.

Do **not** set `upgrades_claim: true` when evidence is missing, synthetic, partial, blocked, sandbox-limited, network-limited, credential-limited, or only a dry-run harness check.

Do **not** claim `no_fake_scan_pass` unless an actual no-fake scan command or artifact exists and ran.

### 9. Review contract

Architecture, UX, and QA reviews must be substantive. They must answer the required headings with concrete evidence from files, commands, states, and blockers.

Acceptable review verdicts can include scoped debt, but not vague approval. A review that says “looks good” without proof is a failure.

Required review posture:

- name what passed;
- name what is not proven;
- name blocked production claims;
- name required repair before stronger evidence;
- preserve next-phase boundaries.

### 10. Replay evaluation

Mapper OS quality is judged by running the generated packet with a fresh agent in an isolated temp workspace.

The replay scorer checks that the downstream agent:

- follows the read order;
- handles questions/setup gates honestly;
- uses phase-flow artifacts;
- writes runtime evidence only to `.buildprint/evidence/evidence-ledger.jsonl`;
- validates evidence schema;
- does not over-upgrade blocker evidence;
- does not fake no-fake scans;
- does not route through obsolete packet files;
- does not enumerate parent context or source directories;
- produces meaningful architecture, UX, and QA reviews.

Dry-runs are useful for harness mechanics. Real replay and outcome judging are required for product-level confidence.

## What Changed in This Methodology

The old packet model could describe a product and pass static checks while leaving too much ambiguity for the implementing agent. The new flow makes the packet executable by construction:

- phase files contain explicit implementation entry grammar;
- `phase-flow.md` acts as the phase constitution;
- generated packets include evidence schema and runtime ledger separation;
- downstream agents must create phase-run state, handoffs, returns, reviews, proof, progress, and next-agent files;
- scorers distinguish product failure from runtime interruption;
- evidence honesty is enforced before outcome judging;
- blocker-qualified work cannot be reported as production proof.

## Definition of Done

A Mapper OS change is done only when these are true:

1. Generated selected-output packet passes deterministic structural checks.
2. Negative fixtures still fail for the right reasons.
3. Dry-run replay passes for harness mechanics.
4. A real mapped packet can be replayed by a fresh agent.
5. Runtime evidence is schema-valid and honest.
6. Review files are substantive.
7. Outcome judge passes or clearly names remaining gaps.
8. Any external/provider/browser limitation is recorded as a blocker, not hidden as success.

For the MiroFish validation run that established this methodology, final evidence was:

- mapping passed;
- packet checks passed;
- map judge passed with `ship-with-notes`;
- replay/build passed from kept workspace `/tmp/mapper-replay-rDH0JF`;
- outcome judge passed with `ship-with-notes`;
- final flow report passed.

## Anti-Patterns

Do not:

- patch only a fixture when the generator contract is wrong;
- treat dry-run replay as product proof;
- scan parent directories for source context during replay;
- write runtime evidence into packaged seed evidence;
- claim live provider proof from deterministic fallback;
- claim browser/runtime proof from static string checks;
- mark blocked or synthetic evidence as `upgrades_claim: true`;
- allow review files to become ceremonial approvals;
- silently shrink scope to make a green gate easier.

The methodology is intentionally strict because Mapper OS is training future agents how to work. A green check that teaches weaker behavior is a regression.
