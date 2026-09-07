# Media4Agents URL sprites — Asset-Maker contract

Authoritative integration reference **for this packet**, based on the user-supplied [Media4Agents](https://media4agents.com/) provider interface dated **2026-09-07**. No PNG was fetched and no live generation, account access, billing or output layout was verified. This companion does not replace the essential WaveSpeed capabilities in [the quality contract](providers-and-sources.md#asset-maker-quality-contract).

## Direct URL and safety boundary
Write the PNG URL **directly into game code**; the **first load triggers asset generation**:

```text
https://media4agents.com/m/{PUBLIC_MEDIA4AGENTS_TOKEN}/{name}.png?prompt={subject-description}&style=pixel_game_asset&size={size}&model=retrodiffusion&assetType={assetType}
```

- Configure the provider-designated **public URL token** in the applying game; it must stay in **every URL**. This public repository contains only `{PUBLIC_MEDIA4AGENTS_TOKEN}`, never an account-specific token. The public token is intentionally visible to browsers; **no private API credentials belong in browser code**, URLs or public source. Private provider setup stays host-side.
- Use one short **kebab-case name per asset**, e.g. `knight-right`. URL-encode the prompt with `encodeURIComponent`. Describe only the subject, materials, view, palette and visual details; **do not say “pixel art”** (the style parameter supplies that).
- Obtain the user's paid-use approval, cap and allowed attempts **before any first load**, including browser previews, prefetch, preload, crawlers or QA. Rendering these templates with a real public token can spend. This packet's checks must remain offline; do not request PNGs, even with HEAD, to verify documentation.
- Under the **supplied provider contract, reusing the exact same URL is free**. Store and reuse the identical string, including token, name, query order and encoding. A changed URL is **not assumed free**: prompt/size/flag edits, renamed assets, reordered parameters and cache-busting timestamps are not retries. Freeze approved URLs; do not automatically generate variants after failure. If a load times out, show an error and offer bounded, explicit retry of that exact URL; reconcile uncertainty with the operator rather than inventing job endpoints.
- `size` is **generation resolution, not display size**. Scale with CSS or engine transforms and nearest-neighbor/pixelated rendering, not by changing the generation URL. Keep rights, provenance and actual loaded-byte hashes with release evidence.

## Select exactly one workflow per URL
Do not mix workflow flags; `style=pixel_game_asset` and `model=retrodiffusion` apply to all four.

| `assetType` | Use | Allowed `size` | Workflow flags |
| --- | --- | --- | --- |
| `game_sprite` | Standalone character, prop, item, icon or object | `16x16`, `32x32`, `64x64`, `128x128`, `256x256` | **Require `removeBackground=true`**; no animation flag |
| `texture` | One seamless repeating surface | `64x64`, `128x128`, `256x256` | Background removal **off** (`removeBackground=false`); no animation flag |
| `tileset` | Connecting Wang-style tileset | `16x16`, `32x32` | Size denotes **ONE TILE**, not the whole sheet; no sprite/animation flags |
| `spritesheet` | Animation sheet | `48x48` | **Require `animation=walking`, `walking_idle` or `vfx`**; no standalone-sprite flag |

`48x48` is the supported spritesheet request value, **not evidence of the returned sheet's final dimensions, frame dimensions/count, grid or timing**. Inspect actual decoded output, build a contact sheet, declare source rectangles/anchors/timing, then verify the animation in the game before approval. Inspect Wang tile ordering/adjacency before importing into a map; do not infer its sheet layout from one-tile size. Repeating textures need a 3×3 seam review.

## Four complete template URLs
These are inert text templates, not asset previews. Replace only the public-token placeholder after approval in the applying game; do not commit the configured account value here.

**Standalone knight facing right, sword and shield:**
```text
https://media4agents.com/m/{PUBLIC_MEDIA4AGENTS_TOKEN}/knight-right.png?prompt=knight%20facing%20right%20with%20steel%20sword%20and%20oak%20shield%2C%20side%20view%2C%20silver%20armor%2C%20navy%20tabard%2C%20gold%20trim&style=pixel_game_asset&size=64x64&model=retrodiffusion&assetType=game_sprite&removeBackground=true
```

**Mossy dungeon stone floor:**
```text
https://media4agents.com/m/{PUBLIC_MEDIA4AGENTS_TOKEN}/mossy-floor.png?prompt=mossy%20dungeon%20stone%20floor%2C%20top-down%20view%2C%20slate%20gray%20blocks%2C%20olive%20moss%20in%20cracks%2C%20worn%20edges&style=pixel_game_asset&size=128x128&model=retrodiffusion&assetType=texture&removeBackground=false
```

**Grass/dirt connecting tiles with small stones:**
```text
https://media4agents.com/m/{PUBLIC_MEDIA4AGENTS_TOKEN}/grass-dirt.png?prompt=grass%20and%20dirt%20ground%20with%20small%20stones%2C%20top-down%20view%2C%20sage%20green%20grass%2C%20ochre%20soil%2C%20gray%20pebbles&style=pixel_game_asset&size=32x32&model=retrodiffusion&assetType=tileset
```

**Knight walking:**
```text
https://media4agents.com/m/{PUBLIC_MEDIA4AGENTS_TOKEN}/knight-walk.png?prompt=knight%20facing%20right%20with%20steel%20sword%20and%20oak%20shield%2C%20side%20view%2C%20silver%20armor%2C%20navy%20tabard%2C%20gold%20trim&style=pixel_game_asset&size=48x48&model=retrodiffusion&assetType=spritesheet&animation=walking
```

## Browser game integration (Canvas 2D)
Use the installed engine rather than migrating it. This small Canvas 2D integration fits a browser-first game: call once from approved scene boot, retain the returned image, and use it in the **real render loop**. It draws the standalone sprite, not an assumed animation slice. Add a canvas `id="game"` and a status element `id="asset-status" role="status" aria-live="polite"` in the game's HTML. Default approval is false; changing it is not itself user authorization.

```js
const PUBLIC_MEDIA4AGENTS_TOKEN = "{PUBLIC_MEDIA4AGENTS_TOKEN}";
const subject = "knight facing right with steel sword and oak shield, side view, silver armor, navy tabard, gold trim";
// Keep this exact string for subsequent loads; never append a cache-buster.
const knightUrl = `https://media4agents.com/m/${PUBLIC_MEDIA4AGENTS_TOKEN}/knight-right.png?prompt=${encodeURIComponent(subject)}&style=pixel_game_asset&size=64x64&model=retrodiffusion&assetType=game_sprite&removeBackground=true`;

async function loadKnight({ paidUseApproved = false } = {}) {
  const canvas = document.getElementById("game");
  const status = document.getElementById("asset-status");
  canvas.hidden = true;
  if (!paidUseApproved || PUBLIC_MEDIA4AGENTS_TOKEN.includes("{")) {
    status.textContent = "Asset load blocked: record spend approval and configure the public URL token first.";
    return null; // No Image/src, prefetch or network activity before approval.
  }
  status.textContent = "Loading knight; first generation may take time…";
  const image = new Image();
  // Required for an origin-clean canvas/export; verify provider CORS after approval.
  image.crossOrigin = "anonymous";
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => finish(new Error("Asset load timed out")), 120000);
      function finish(error) {
        clearTimeout(timer);
        image.onload = null;
        image.onerror = null;
        error ? reject(error) : resolve();
      }
      image.onload = () => finish();
      image.onerror = () => finish(new Error("Asset load failed"));
      image.src = knightUrl; // Direct PNG URL: first request can generate/spend.
    });
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) throw new Error("Empty image");
    // Example scene resolution, independent of generation size.
    canvas.width = 320;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 128, 64); // Retain image for actual game-loop drawing.
    canvas.hidden = false;
    status.textContent = "Knight loaded; visual and runtime QA still required.";
    return image;
  } catch {
    status.textContent = "Knight unavailable. Check network/CORS/provider status; retry only the exact approved URL. A timeout does not cancel generation or prove no charge.";
    return null; // No automatic retry, replacement URL or invisible missing sprite.
  }
}
// In the applying game's approved boot path:
// const knight = await loadKnight({ paidUseApproved: recordedApprovalCoversThisUrl });
// Gate scene start on knight !== null, then draw the retained image in its render loop.
```

```css
#game { width: 640px; max-width: 100%; height: auto; image-rendering: pixelated; }
```

CSS enlarges the 320×180 scene without changing the URL; prefer integer display scale where practical. For Phaser, use its existing loader with the **same URL string**, visible progress/load-error handling and `pixelArt: true`; register animation frames only from the inspected layout, never guessed `48x48` frame dimensions.

This example is **not** production validation or browser/CORS proof. The [starter manifest loader](../validation/README.md#media4agents-direct-urls) deliberately accepts same-origin static PNGs only. For direct URL production loading, use a reviewed adapter that fetches the approved URL once, checks MIME/decode/hash/dimensions and validates that same resource before engine registration, or approve a static export for the existing loader. Do not put provider URLs in the static manifest or bypass its checks. Sheet slicing, identity/alpha review and actual movement/animation recordings remain required by [QA](qa.md).
