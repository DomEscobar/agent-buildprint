import { describe, expect, it } from "vitest";
import { ATLAS_COLUMNS, type GridPoint, tileFrame } from "../src/game/atlas";
import type { StampDefinition } from "../src/game/compound-catalog";
import * as catalog from "../src/game/tile-catalog";

const ATLAS_ROWS = 18;
const ATLAS_CELL_COUNT = ATLAS_COLUMNS * ATLAS_ROWS;
const sourceKey = ({ source }: { readonly source: GridPoint }): string =>
  `${source.x},${source.y}`;

describe("atlas catalog", () => {
  it("maps atlas coordinates to stable frame ids", () => {
    expect(tileFrame({ x: 0, y: 0 })).toBe(0);
    expect(tileFrame({ x: 1, y: 1 })).toBe(28);
    expect(tileFrame({ x: 26, y: 17 })).toBe(485);
  });

  it("classifies every atlas cell exactly once", () => {
    const coordinates = catalog.ATLAS_CLASSIFICATION.map(sourceKey);

    expect(catalog.ATLAS_CLASSIFICATION).toHaveLength(ATLAS_CELL_COUNT);
    expect(new Set(coordinates)).toHaveLength(ATLAS_CELL_COUNT);
    expect(coordinates).toEqual(
      expect.arrayContaining(
        Array.from({ length: ATLAS_ROWS }, (_, y) =>
          Array.from({ length: ATLAS_COLUMNS }, (_, x) => `${x},${y}`),
        ).flat(),
      ),
    );
  });

  it("keeps classified compound stamp sources out of solo authoring", () => {
    for (const stamp of Object.values(catalog.STAMP_CATALOG)) {
      const definition: StampDefinition = stamp;
      const cells = [definition.cells, definition.overlay ?? []]
        .flatMap((matrix) => matrix.flat())
        .filter((cell) => cell !== null);

      for (const cell of cells) {
        const classification = catalog.ATLAS_CLASSIFICATION.find(
          ({ source }) =>
            source.x === cell.source.x && source.y === cell.source.y,
        );
        if (classification?.kind === "C") {
          expect(catalog.isSoloAuthorableSource(cell.source)).toBe(false);
        }
      }
    }
  });

  it("keeps audited grass solo-authorable and water compound-only", () => {
    expect(catalog.TILE_CATALOG.grassBase.placement).toBe("repeatable");
    expect(catalog.isSoloAuthorableSource({ x: 1, y: 1 })).toBe(true);
    expect(catalog.TILE_CATALOG.waterBase.placement).toBe("stamp-only");
    expect(catalog.isSoloAuthorableSource({ x: 9, y: 7 })).toBe(false);
  });

  it("reconciles atlas totals after fragment promotion", () => {
    const totals = new Map<string, number>();
    for (const cell of catalog.ATLAS_CLASSIFICATION) {
      totals.set(cell.kind, (totals.get(cell.kind) ?? 0) + 1);
    }

    expect(totals).toEqual(
      new Map([
        ["C", 258],
        ["CH", 72],
        ["RT", 4],
        ["SQ", 10],
        ["WP", 21],
        ["UF", 121],
      ]),
    );
    for (const coordinate of "16,8 16,9 17,8 17,9 16,11 16,12 17,11 17,12".split(
      " ",
    )) {
      const cell = catalog.ATLAS_CLASSIFICATION.find(
        ({ source }) => `${source.x},${source.y}` === coordinate,
      );
      expect(cell?.authoring).toBe("stamp-only");
    }
  });

  it("uses explicit compound cells with per-cell collision", () => {
    for (const stamp of Object.values(catalog.STAMP_CATALOG)) {
      expect(Object.hasOwn(stamp, "source")).toBe(false);
      expect(Object.hasOwn(stamp, "size")).toBe(false);
      expect(stamp.cells.length).toBeGreaterThan(0);

      for (const row of stamp.cells) {
        for (const cell of row) {
          if (cell === null) continue;
          expect(sourceKey(cell)).toMatch(/^\d+,\d+$/);
          expect(cell.role).not.toHaveLength(0);
          expect(typeof cell.collision).toBe("boolean");
        }
      }
    }
  });

  it("models the complete civic building and overlay", () => {
    const civic = catalog.STAMP_CATALOG.civicBuilding;
    const civicCells = civic.cells.flat();
    const civicOverlay = civic.overlay.flat();

    expect(civic.cells).toHaveLength(5);
    for (const row of civic.cells) expect(row).toHaveLength(4);
    expect(civicCells.every((cell) => cell.collision)).toBe(true);
    expect(
      civicOverlay
        .filter((cell) => cell !== null)
        .every((cell) => cell.collision),
    ).toBe(true);
    expect(
      new Set(civicOverlay.filter((cell) => cell !== null).map(sourceKey)),
    ).toEqual(new Set(["11,15", "11,16", "11,17"]));

    for (const cell of [...civicCells, ...civicOverlay]) {
      if (cell === null) continue;
      expect(catalog.isSoloAuthorableSource(cell.source)).toBe(false);
    }
  });

  it("removes false broad stamps and uses the contiguous cable", () => {
    for (const retiredKey of [
      "pondWalkway",
      "plazaBuilding",
      "treeBlock",
      "lowerMarket",
    ]) {
      expect(Object.hasOwn(catalog.STAMP_CATALOG, retiredKey)).toBe(false);
    }
    expect(
      Object.hasOwn(catalog.SEQUENCE_CATALOG, "fenceHorizontalShort"),
    ).toBe(false);
    expect(
      catalog.SEQUENCE_CATALOG.cableBoundary.tiles.map((key) =>
        sourceKey(catalog.TILE_CATALOG[key]),
      ),
    ).toEqual(["0,8", "1,8", "2,8", "3,8"]);
  });

  it("rejects duplicate, missing, malformed, and out-of-bounds cells", () => {
    const classification = catalog.ATLAS_CLASSIFICATION;
    const first = classification[0];
    expect(first).toBeDefined();
    if (first === undefined) return;

    const duplicate = [...classification.slice(0, -1), first];
    const missing = classification.slice(0, -1);
    const outOfBounds = [
      { ...first, source: { x: ATLAS_COLUMNS, y: 0 } },
      ...classification.slice(1),
    ];
    const malformed = [{ ...first, kind: "WP" }, ...classification.slice(1)];
    const issueCodes = (candidate: readonly unknown[]): readonly string[] => {
      const result = catalog.validateAtlasClassification(candidate);
      return result.valid ? [] : result.issues.map(({ code }) => code);
    };

    expect(issueCodes(duplicate)).toContain("duplicate");
    expect(issueCodes(missing)).toContain("missing");
    expect(issueCodes(outOfBounds)).toContain("out-of-bounds");
    expect(issueCodes(malformed)).toContain("invalid-cell");
  });
});
