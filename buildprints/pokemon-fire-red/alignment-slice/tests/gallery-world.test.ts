import { describe, expect, it } from "vitest";
import { AtlasAuthoring } from "../src/game/atlas-classification";
import { GALLERY_WORLD } from "../src/game/gallery-world";
import {
  ATLAS_CLASSIFICATION,
  STAMP_CATALOG,
  TILE_CATALOG,
} from "../src/game/tile-catalog";
import { createWorldCollision } from "../src/game/world-model";
import {
  WORLD_PROP_CATALOG,
  WORLD_PROP_KEYS,
} from "../src/game/world-prop-catalog";

describe("Atlas Park semantic world", () => {
  const expectedWorldPropKeys = [
    "plazaRoundMarker",
    "plazaSlateInset",
    "plazaVioletInset",
    "plazaSandInset",
    "streetTwinPost",
    "streetBlueBench",
    "streetOrangeBench",
    "plazaRoundMarkerAlt",
    "greenShrubSmall",
    "streetTwinPostAlt",
    "streetBlueBenchAlt",
    "streetOrangeBenchAlt",
    "greenConiferSmall",
    "planterGreen",
    "planterOrange",
    "greenShrubTall",
    "autumnTreeSmall",
    "autumnConiferSmall",
    "marketStallLeft",
    "marketStallRight",
    "autumnTreeTall",
  ] as const;

  it("places every authorable compound exactly through its semantic key", () => {
    const placed = new Set(GALLERY_WORLD.stamps.map(({ stamp }) => stamp));

    expect(GALLERY_WORLD.stamps).toHaveLength(
      Object.keys(STAMP_CATALOG).length,
    );
    expect(placed).toEqual(new Set(Object.keys(STAMP_CATALOG)));
  });

  it("places every single-authorable world prop through a semantic key", () => {
    const classifiedSources = ATLAS_CLASSIFICATION.filter(
      ({ authoring }) => authoring === AtlasAuthoring.Single,
    ).map(({ source }) => `${source.x},${source.y}`);
    const catalogSources = WORLD_PROP_KEYS.map((key) => {
      const { source } = WORLD_PROP_CATALOG[key];
      return `${source.x},${source.y}`;
    });
    const placedKeys = GALLERY_WORLD.worldProps.map(({ prop }) => prop);

    expect(placedKeys).toEqual(expectedWorldPropKeys);
    expect(WORLD_PROP_KEYS).toEqual(expectedWorldPropKeys);
    expect(new Set(catalogSources)).toEqual(new Set(classifiedSources));
    expect(catalogSources).toHaveLength(new Set(catalogSources).size);
  });

  it("keeps the world-prop exhibit below the location plaque", () => {
    expect(GALLERY_WORLD.worldProps.map(({ position }) => position)).toEqual([
      { x: 2, y: 6 },
      { x: 4, y: 6 },
      { x: 6, y: 6 },
      { x: 8, y: 6 },
      { x: 10, y: 6 },
      { x: 12, y: 6 },
      { x: 14, y: 6 },
      { x: 2, y: 8 },
      { x: 4, y: 8 },
      { x: 6, y: 8 },
      { x: 8, y: 8 },
      { x: 10, y: 8 },
      { x: 12, y: 8 },
      { x: 14, y: 8 },
      { x: 2, y: 10 },
      { x: 4, y: 10 },
      { x: 6, y: 10 },
      { x: 8, y: 10 },
      { x: 10, y: 10 },
      { x: 12, y: 10 },
      { x: 14, y: 10 },
    ]);
  });

  it("exercises every solo-authorable terrain and the complete cable sequence", () => {
    const usedTerrain = new Set<string>();
    for (let y = 0; y < GALLERY_WORLD.height; y += 1) {
      for (let x = 0; x < GALLERY_WORLD.width; x += 1) {
        usedTerrain.add(GALLERY_WORLD.terrainAt({ x, y }));
      }
    }

    expect(usedTerrain).toEqual(
      new Set(["grassBase", "pavementBase", "pathBase", "plazaBase"]),
    );
    expect(GALLERY_WORLD.sequences).toEqual([
      { sequence: "cableBoundary", position: { x: 22, y: 15 } },
    ]);
    expect(TILE_CATALOG.waterBase.placement).toBe("stamp-only");
  });

  it("keeps spawn and gallery corridors walkable", () => {
    const collision = createWorldCollision(GALLERY_WORLD);

    expect(collision.isBlocked(GALLERY_WORLD.spawn)).toBe(false);
    for (const waypoint of GALLERY_WORLD.waypoints) {
      expect(collision.isBlocked(waypoint)).toBe(false);
    }
  });

  it("blocks representative compounds, the cable sequence, and world bounds", () => {
    const collision = createWorldCollision(GALLERY_WORLD);

    expect(collision.isBlocked({ x: 18, y: 9 })).toBe(true);
    expect(collision.isBlocked({ x: 34, y: 9 })).toBe(true);
    expect(collision.isBlocked({ x: 10, y: 24 })).toBe(true);
    expect(collision.isBlocked({ x: 22, y: 15 })).toBe(true);
    for (const prop of GALLERY_WORLD.worldProps) {
      expect(collision.isBlocked(prop.position)).toBe(true);
    }
    expect(collision.isBlocked({ x: 0, y: 0 })).toBe(true);
  });

  it("keeps every compound cell inside the gallery bounds", () => {
    for (const placement of GALLERY_WORLD.stamps) {
      const stamp = STAMP_CATALOG[placement.stamp];
      for (const matrix of [
        stamp.cells,
        "overlay" in stamp ? stamp.overlay : [],
      ]) {
        for (const [y, row] of matrix.entries()) {
          for (const [x, cell] of row.entries()) {
            if (cell === null) continue;
            expect(placement.destination.x + x).toBeLessThan(
              GALLERY_WORLD.width,
            );
            expect(placement.destination.y + y).toBeLessThan(
              GALLERY_WORLD.height,
            );
          }
        }
      }
    }
  });
});
