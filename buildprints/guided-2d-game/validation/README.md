# Shared manifest validation — bounded starter implementation

Original packet code, zero npm dependencies, Node.js 20+. The fixture is an original geometric two-cell PNG, **not game art or a miniature game**. No paid service or external script is used. Checks operate on actual decoded image bytes and the manifest that the loader returns.

## Run
From repository root:

```sh
node buildprints/guided-2d-game/validation/check.mjs buildprints/guided-2d-game/validation/fixtures/manifest.json
node --test buildprints/guided-2d-game/validation/contracts.test.mjs
```

In an applied project, run `check.mjs` against the **real runtime manifest path**, not `fixtures/manifest.json`. Integrate that command into its build/CI. Paths are relative to the manifest's directory; keep approved static images there or below. The Node loader rejects escaping symlinks. Unknown schema, broken decode, unsupported PNG export, wrong hash or invalid contract exits nonzero. Receipt reports manifest byte hash, loaded image byte hashes and static route coverage—not visual or gameplay approval.

## Production integration
1. Adopt the contract or write a reviewed adapter for your engine's real manifest format. Do not create a parallel proof manifest maintained by hand. For Tiled/Godot, compile once and validate the exact output/resources the game loads; retain source-to-output mapping.
2. At browser scene boot, import `loadBrowserManifest` from `load-browser.mjs` and await the same-origin JSON manifest URL. Register textures from `loaded.decoded.get(asset.id).resource` (the **already decoded canvas**), not a second image download. Consume `loaded.manifest.assets` frame layout/timing and `loaded.manifest.scenes` positions/footprints for animation, physics and rendering. Capture `loaded.receipt` in the milestone. Map these data to actual engine APIs selected in setup; this packet does not pretend to supply a universal engine binding.
3. Fail visibly if loading/validation throws. A local fixture page is not a substitute for this boot boundary. Manifest objects/receipts are deeply frozen; decoded pixel/canvas resources remain runtime-private and must not be modified after validation. Edits need a new validated load and receipt.
4. Both editor/manual placement and generated placement call `acceptPlacementProposal(candidateManifest, loaded.decoded)` before acceptance; persist only its validated result. Reload and validate at runtime too. Asset changes first load/decode new resources; old decoded maps must not certify new bytes.
5. Add engine binding tests asserting actual loaded frame indices, scale, anchor, feet/physics origin, layers and state timings. In a temporary copy, corrupt one referenced rect/placement and confirm **the production loader** rejects it. Exercise real controls and record motion on target devices; fixture tests prove none of that.

The browser adapter enforces same-origin manifest/assets, expected JSON/PNG MIME and HTTP success, decodes with `createImageBitmap`, and preserves the canvas for engine registration. Hashes cover fetched PNG bytes, while alpha checks cover actual decoded pixels. It requires a secure-context Web Crypto API, Canvas 2D and createImageBitmap. Its source is provided; **no real browser execution is claimed for this packet**. Test its behavior in the applying engine/browser. Browser color management/premultiplication can alter transparent RGB, so visual alpha-fringe review remains mandatory.

## Schema by reference
`fixtures/manifest.json` is the canonical, runnable example. It is intentionally small enough to read. Do not change its approval text to imply in-game acceptance.

| Field | Contract |
| --- | --- |
| `schema` | `guided-2d-game/manifest/v1` |
| `pixelsPerWorldUnit`, `tileWorldSize` | Positive global density and world-unit tile side |
| `assets[].path` | Relative static filename; no traversal, URL, query/token, fragment or external generation link |
| dimensions + `sha256` | Match decoded image and exact loaded bytes; no aesthetic filesize minimum |
| `role` | body, shadow, vfx or tile; only body assets occupy physical footprints in this starter |
| `scale`, `nativePixelsPerWorldUnit` | One shared action scale; native density divided by scale equals scene density |
| `provenance` | Source, license, approval and source seed hash; metadata presence cannot prove rights/visual identity |
| `animationSeedSha256`, `facing` | Same source identity lineage hash and explicit facing; human checks enforce appearance/mirroring |
| `sheet` | Integer cell width/height, columns/rows/count, margin/gutter; exact decoded layout dimensions |
| `anchor` | Shared cell-pixel feet origin; not a per-frame opaque-bounds auto-fit |
| `frames[]` | Row-major exact source rect, durationMs, phase, offset with reason if nonzero, threshold-derived opaqueBounds |
| `action: attack` | Ordered anticipation → active → recovery phases; gameplay hitboxes/ticks require engine tests |
| `footprint` | Positive rectangle relative to feet in world units, independent from visual bounds/canopy |
| `allowedTerrain` | Permissions across all footprint-touched cells |
| `scenes[].bounds`, `terrain` | Rectangular whole-tile bounds, exact row/column grid and enumerated terrain types |
| `layers` | Explicit blocking flag and fixed/feet-y sorting policy (renderer must implement the latter) |
| `allowOverlap` | Explicit layer-pair exceptions; otherwise overlapping physical footprints fail, including same-layer pairs |
| `placements` | Unique ID, asset, feet world position, occupancy layer and tags |
| `visualOverscan` | Explicit allowed visual overhang beyond world bounds; physical bounds remain strict |
| `spacing`, `adjacency` | Scene-specific tag-pair minimum feet distance / directed maximum-neighbor distance; empty arrays mean no such rule |
| `navigation` | Relative actor footprint, allowed terrain, spawn and required target cells (zero-based, tile-center traversal) |

Bounds use half-open rectangles; touching edges do not collide. Navigation tests swept cardinal steps as well as endpoints so thin blockers are not skipped. Outputs report reachable cells, not a claim that the scene is fun, visually correct or physically traversable by every controller.

## Coverage and limits
Tests cover actual file loading and corruption, hashes/provenance, all five PNG filters, unsupported exports, sheet/frame layout, alpha versus black artwork, shared scale/anchor, intentional displacement, phase order, density, terrain, layers/overlap, spacing/adjacency, bounds, footprint clearance, thin-blocker sweep, disconnected routes, safe paths and shared manual/generated acceptance. Negative cases mutate the manifest consumed by the same loader; they are intentionally invalid test inputs, never parallel fake production evidence.

The Node PNG decoder deliberately supports **non-interlaced RGBA8 PNG** only. Normalize an export explicitly or use a maintained full decoder adapter for indexed/grayscale/RGB/interlaced/other formats; never silently skip decoding. Its 16,777,216 decoded-pixel cap is a memory-safety ceiling, not a file-quality rule. This small decoder is not a hardened untrusted-upload service. The browser adapter supports browser-decodable PNG; for Node/browser parity adopt the narrower RGBA8 export contract.

Not implemented: engine registration, frame-to-hitbox binding, physics, dynamic/rotated/polygon collision, platform jump paths, diagonal path planning, automatic canopy splitting, visual/semantic rights verification, seamless tile aesthetics, image generation, provider clients, multiplayer or browser automation. Shadow/VFX/tile assets can be validated but their scene rendering needs explicit engine layers; they are not physical placement objects in this starter. Add engine-specific validators/tests without weakening shared checks. No automatic validator can certify the look or feel: use the contact sheet, motion, overlays and full runtime QA in `references/qa.md`.
