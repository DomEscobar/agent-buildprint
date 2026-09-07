# Select one primary genre; borrow only necessary branches

These are negotiable scope examples, not automatic feature commitments. Each branch uses the same asset, placement, input and milestone contracts. Only test mechanics actually included; backlog does not become implementation work.

## Brawler — deep branch
**Proposed slice:** one arena, one fighter, one enemy type, one attack, one defensive action if essential, one short wave, victory, defeat and restart. Defer combos, loot, skill trees, bosses, online play and large rosters unless central to the user goal.

### Ground plane and state
Use ground position `(x,y)` plus independent visual height `z` for belt-scrolling play. Feet anchor projects ground position; jumping changes `z`, not the collider's ground origin. Sort bodies by ground feet Y plus stable tie-breaker, not head/top-left. Define depth-lane attack reach separately from horizontal reach and sprite width. Side-on arena games instead use the engine's selected gravity/ground convention; do not mix the two models.

Define `idle → move → anticipation → active → recovery → idle`, plus hurt, knockback, death and permitted defense/air transitions. Record input buffering, cancel rules, invulnerability, facing lock/turn permission and priority when attack/defense/hurt coincide. Animation timing is in milliseconds or simulation ticks with a declared fixed step, never render frames.

Example attack contract (tune after graybox): six frames with durations `[80,60,50,50,90,110]` ms; frames 0–1 anticipation, 2–3 active, 4–5 recovery. Hitbox is a ground-relative rectangle, e.g. forward reach 0.8 world units and depth tolerance 0.3, not the entire weapon picture. These numbers are illustrative, not universal balance rules. A stable swing ID permits each target to take damage once unless a multi-hit action explicitly specifies intervals. Hitstop must define whether simulation, animation and input buffers pause; no frame-rate-dependent repeated hits.

### Combat acceptance table
| Contract | Positive proof | Negative/boundary proof |
| --- | --- | --- |
| Contact windows | Active frame at valid reach deals one hit | Anticipation/recovery, wrong lane, behind-facing and out-of-range do not hit |
| Identity and animation | Same costume, scale and seed lineage in walk/strike/hurt | Edited face/weapon silhouette or reversed handedness requires rejection/approval |
| Damage ownership | One swing hits two distinct enemies once each if intended | Staying overlapped does not drain health every update |
| Interruption | Hurt/death cancels allowed states and clears stale attack | Attack+hurt on same tick follows documented priority |
| Movement | Diagonal speed normalized; knockback hits scene bounds safely | Wall pushing, low FPS and tab resume do not tunnel or teleport |
| Defense/air if included | Documented invulnerability/height rule works | Visual jump alone does not imply undocumented immunity |
| Enemy loop | Enemy telegraphs, approaches and attacks without stacking unfairly | Cannot attack while dead/stunned or beyond allowed lane |
| Lifecycle | Wave clears to victory, player defeat shows restart | Restart clears enemies, timers, hit IDs, audio and held input |

Debug overlays show feet, ground footprint, hurtbox, active hitbox, facing, lane distance and state clock. Record actual contact in slow playback and at game speed; a static box diagram is not enough. Separate engine-independent combat tests from in-engine binding tests so correct math cannot hide a wrong runtime frame map.

## Platformer
**Proposed slice:** one short course, one jump, one hazard, one checkpoint only if essential, one exit. Graybox jump arc, acceleration, gravity, landing and camera before art. Negotiate coyote time, jump buffer and variable-height jump; do not assume them mandatory. Source animation must preserve intentional rise/fall offsets without moving the collision origin twice.

Test grounded/air transitions, ceiling contact, slopes/one-way platforms only if used, edge landings, high-speed sweeps, hazard death and restart. A cardinal grid flood fill cannot prove jump reachability: add engine trajectory/replay tests from spawn through required platforms to exit, including missed-jump failure. Art silhouette is not a collision polygon. Camera and mobile controls must reveal landing targets and allow direction+jump together.

## Farming/life sim
**Proposed slice:** one plot, one crop, one growth cycle, one harvest/sell objective. Ask whether time advances by action, clock or sleep. Use `empty → tilled → planted → watered → grown → harvested`; state transitions enforce inventory/energy rules chosen for this slice. Saving is included only if agreed, then reload must preserve crop stage, time and inventory atomically.

Test one seed cannot plant twice, one harvest cannot pay twice, day rollover is deterministic, input cannot interact through a blocking object, and restart/undo returns the agreed state. Make tool range, selected tile and crop readiness legible on touch. Trees use trunk footprints independent from canopy. Large seasons/NPC/economy systems remain backlog until the bounded loop is approved.

## Puzzle
**Proposed slice:** one mechanic, a small hand-verified level set with a stated count, success feedback, undo and restart. Define board coordinates, legal moves and state serialization before decorative effects. Separate logical turns from animation so rapid taps cannot enqueue illegal double moves.

Test a known solution through production input, invalid move, softlock/deadlock policy, undo through victory, and exact restart. Generated puzzles need a solver or recorded solution witness **using the same rules**; visual symmetry does not prove solvability. Placement rules may be angular or grid-tight; foliage spacing defaults are irrelevant. Confirm controls at mobile sizes and avoid color-only logic cues.

## Multiplayer branch (only if agreed)
Choose local shared-device versus online. Local requires independent player input ownership and camera/respawn policy. Online requires documented authority, clock/tick, join/leave, ownership, reconciliation, disconnect/reconnect and trust boundaries. Test two actual clients under latency and dropped connections, reject unauthorized state mutations and isolate rooms. WSS transport proof is separate from HTTP and gameplay synchronization. If no server/device proof is possible, online remains blocked—not “multiplayer-ready.”
