import { describe, expect, it } from "vitest";
import { ATLAS_COLUMNS, tileFrame } from "../src/game/atlas";
import { playerFrameRef } from "../src/game/player-frames";
import {
  SEQUENCE_CATALOG,
  STAMP_CATALOG,
  TILE_CATALOG,
  TilePlacement,
} from "../src/game/tile-catalog";
import {
  isBlocked,
  isSoloDecorationTile,
  sweepPosition,
  WORLD_DECORATIONS,
  WORLD_HEIGHT,
  WORLD_SEQUENCES,
  WORLD_STAMPS,
  WORLD_WIDTH,
} from "../src/game/world-data";

const ATLAS_ROWS = 18;

describe("world alignment data", () => {
  it("maps atlas coordinates to stable frame ids", () => {
    expect(tileFrame({ x: 0, y: 0 })).toBe(0);
    expect(tileFrame({ x: 1, y: 1 })).toBe(28);
    expect(tileFrame({ x: 26, y: 17 })).toBe(485);
  });

  it("keeps the player spawn and main path walkable", () => {
    expect(isBlocked({ x: 10, y: 8 })).toBe(false);
    expect(isBlocked({ x: 10, y: 9 })).toBe(false);
    expect(isBlocked({ x: 11, y: 9 })).toBe(false);
  });

  it("derives collision from placed stamps and sequences", () => {
    expect(isBlocked({ x: 9, y: 3 })).toBe(true);
    expect(isBlocked({ x: 8, y: 7 })).toBe(true);
    expect(isBlocked({ x: 14, y: 7 })).toBe(false);
  });

  it("provides distinct authored world stamps", () => {
    expect(WORLD_STAMPS).toHaveLength(4);
    expect(
      new Set(
        WORLD_STAMPS.map((stamp) => {
          const definition = STAMP_CATALOG[stamp.stamp];
          return `${definition.source.x}:${definition.source.y}`;
        }),
      ).size,
    ).toBe(4);
    expect(WORLD_SEQUENCES).toHaveLength(1);
    expect(WORLD_DECORATIONS).toHaveLength(0);
  });

  it("keeps complex tiles behind named stamps or sequences", () => {
    expect(TILE_CATALOG.fenceLeftEnd.placement).toBe(
      TilePlacement.SequenceOnly,
    );
    expect(TILE_CATALOG.marketRoofLeft.placement).toBe(TilePlacement.StampOnly);

    for (const decoration of WORLD_DECORATIONS) {
      expect(isSoloDecorationTile(decoration.tile)).toBe(true);
    }
  });

  it("records transition sequences with their ordered edge pieces", () => {
    expect(SEQUENCE_CATALOG.fenceHorizontalShort.tiles).toEqual([
      "fenceLeftEnd",
      "fenceMiddle",
      "fenceMiddle",
      "fenceMiddle",
      "fenceMiddle",
      "fenceRightEnd",
    ]);
  });

  it("keeps catalog source rectangles and placements inside proven bounds", () => {
    for (const tile of Object.values(TILE_CATALOG)) {
      expect(tile.source.x).toBeGreaterThanOrEqual(0);
      expect(tile.source.y).toBeGreaterThanOrEqual(0);
      expect(tile.source.x).toBeLessThan(ATLAS_COLUMNS);
      expect(tile.source.y).toBeLessThan(ATLAS_ROWS);
    }

    for (const stamp of Object.values(STAMP_CATALOG)) {
      expect(stamp.source.x + stamp.size.x).toBeLessThanOrEqual(ATLAS_COLUMNS);
      expect(stamp.source.y + stamp.size.y).toBeLessThanOrEqual(ATLAS_ROWS);
    }

    for (const stamp of WORLD_STAMPS) {
      const definition = STAMP_CATALOG[stamp.stamp];
      expect(stamp.destination.x + definition.size.x).toBeLessThanOrEqual(
        WORLD_WIDTH,
      );
      expect(stamp.destination.y + definition.size.y).toBeLessThanOrEqual(
        WORLD_HEIGHT,
      );
    }
  });

  it("uses the loaded player source texture for every animation frame", () => {
    expect(playerFrameRef("down", 1)).toEqual({
      key: "player-source",
      frame: "down-1",
    });
  });

  it("sweeps large movement deltas without tunneling into the pond", () => {
    const result = sweepPosition({ x: 16 * 22, y: 16 * 4 }, { x: -240, y: 0 });
    expect(result.x).toBeGreaterThanOrEqual(16 * 21 + 7);
    expect(result.y).toBe(16 * 4);
  });
});
