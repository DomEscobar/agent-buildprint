import { describe, expect, it } from "vitest";
import { playerFrameRef } from "../src/game/player-frames";
import * as catalog from "../src/game/tile-catalog";
import {
  isBlocked,
  sweepPosition,
  WORLD_DECORATIONS,
  WORLD_HEIGHT,
  WORLD_SEQUENCES,
  WORLD_STAMPS,
  WORLD_WIDTH,
} from "../src/game/world-data";
import { pixelPoint, pixelVector } from "../src/game/world-model";

describe("world alignment data", () => {
  it("keeps world placements semantic and inside bounds", () => {
    for (const placement of [
      ...WORLD_STAMPS,
      ...WORLD_SEQUENCES,
      ...WORLD_DECORATIONS,
    ]) {
      expect(Object.hasOwn(placement, "frame")).toBe(false);
    }
    expect(WORLD_WIDTH).toBe(34);
    expect(WORLD_HEIGHT).toBe(22);

    for (const placement of WORLD_STAMPS) {
      const stamp = catalog.STAMP_CATALOG[placement.stamp];
      for (const matrix of [
        stamp.cells,
        "overlay" in stamp ? stamp.overlay : [],
      ]) {
        for (const [y, row] of matrix.entries()) {
          for (const [x, cell] of row.entries()) {
            if (cell === null) continue;
            expect(placement.destination.x + x).toBeGreaterThanOrEqual(0);
            expect(placement.destination.y + y).toBeGreaterThanOrEqual(0);
            expect(placement.destination.x + x).toBeLessThan(WORLD_WIDTH);
            expect(placement.destination.y + y).toBeLessThan(WORLD_HEIGHT);
          }
        }
      }
    }

    for (const placement of WORLD_SEQUENCES) {
      const sequence = catalog.SEQUENCE_CATALOG[placement.sequence];
      for (const [x] of sequence.tiles.entries()) {
        expect(placement.position.x + x).toBeGreaterThanOrEqual(0);
        expect(placement.position.x + x).toBeLessThan(WORLD_WIDTH);
        expect(placement.position.y).toBeGreaterThanOrEqual(0);
        expect(placement.position.y).toBeLessThan(WORLD_HEIGHT);
      }
    }

    for (const decoration of WORLD_DECORATIONS) {
      expect(decoration.position.x).toBeGreaterThanOrEqual(0);
      expect(decoration.position.x).toBeLessThan(WORLD_WIDTH);
      expect(decoration.position.y).toBeGreaterThanOrEqual(0);
      expect(decoration.position.y).toBeLessThan(WORLD_HEIGHT);
    }
  });

  it("keeps the player spawn and main path walkable", () => {
    expect(isBlocked({ x: 10, y: 8 })).toBe(false);
    expect(isBlocked({ x: 10, y: 9 })).toBe(false);
    expect(isBlocked({ x: 11, y: 9 })).toBe(false);
  });

  it("uses the loaded player source texture for every animation frame", () => {
    expect(playerFrameRef("down", 1)).toEqual({
      key: "player-source",
      frame: "down-1",
    });
  });

  it("sweeps large movement deltas without tunneling through world bounds", () => {
    const result = sweepPosition(
      pixelPoint(16 * 2, 16 * 2),
      pixelVector(-240, 0),
    );
    expect(result.x).toBeGreaterThanOrEqual(16 + 7);
    expect(result.y).toBe(16 * 2);
  });
});
