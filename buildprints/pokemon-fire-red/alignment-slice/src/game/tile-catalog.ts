import type { GridPoint } from "./atlas";
import { tileFrame } from "./atlas";

export const TilePlacement = {
  Repeatable: "repeatable",
  Single: "single",
  SequenceOnly: "sequence-only",
  StampOnly: "stamp-only",
} as const;

export type TilePlacement = (typeof TilePlacement)[keyof typeof TilePlacement];

export type TileDefinition = {
  readonly source: GridPoint;
  readonly frame: number;
  readonly placement: TilePlacement;
  readonly label: string;
  readonly collision: boolean;
};

const defineTile = (
  source: GridPoint,
  placement: TilePlacement,
  label: string,
  collision: boolean,
): TileDefinition => ({
  source,
  frame: tileFrame(source),
  placement,
  label,
  collision,
});

export const TILE_CATALOG = {
  grassBase: defineTile(
    { x: 1, y: 1 },
    TilePlacement.Repeatable,
    "ground.grass.base",
    false,
  ),
  dirtBase: defineTile(
    { x: 18, y: 6 },
    TilePlacement.Repeatable,
    "ground.dirt.base",
    false,
  ),
  fenceLeftEnd: defineTile(
    { x: 0, y: 8 },
    TilePlacement.SequenceOnly,
    "fence.horizontal.left-end",
    true,
  ),
  fenceMiddle: defineTile(
    { x: 2, y: 8 },
    TilePlacement.SequenceOnly,
    "fence.horizontal.middle",
    true,
  ),
  fenceRightEnd: defineTile(
    { x: 4, y: 8 },
    TilePlacement.SequenceOnly,
    "fence.horizontal.right-end",
    true,
  ),
  marketRoofLeft: defineTile(
    { x: 7, y: 10 },
    TilePlacement.StampOnly,
    "building.market.roof-left",
    true,
  ),
} as const;

export type TileKey = keyof typeof TILE_CATALOG;
export type SoloTileKey = "grassBase" | "dirtBase";
export type SequenceTileKey = "fenceLeftEnd" | "fenceMiddle" | "fenceRightEnd";

export type StampDefinition = {
  readonly source: GridPoint;
  readonly size: GridPoint;
  readonly label: string;
  readonly collision: "solid" | "open";
};

export const STAMP_CATALOG = {
  pondWalkway: {
    source: { x: 9, y: 6 },
    size: { x: 12, y: 3 },
    label: "water.pond-with-walkway",
    collision: "solid",
  },
  plazaBuilding: {
    source: { x: 16, y: 8 },
    size: { x: 8, y: 3 },
    label: "building.plaza-wide",
    collision: "solid",
  },
  treeBlock: {
    source: { x: 4, y: 10 },
    size: { x: 8, y: 5 },
    label: "trees.block-eight-by-five",
    collision: "solid",
  },
  lowerMarket: {
    source: { x: 8, y: 13 },
    size: { x: 10, y: 4 },
    label: "market.lower-row",
    collision: "solid",
  },
} as const satisfies Record<string, StampDefinition>;

export type StampKey = keyof typeof STAMP_CATALOG;

export const frameForStampTile = (key: StampKey, offset: GridPoint): number => {
  const stamp = STAMP_CATALOG[key];
  return tileFrame({
    x: stamp.source.x + offset.x,
    y: stamp.source.y + offset.y,
  });
};

export type SequenceDefinition = {
  readonly tiles: readonly SequenceTileKey[];
  readonly label: string;
  readonly collision: boolean;
};

export const SEQUENCE_CATALOG = {
  fenceHorizontalShort: {
    tiles: [
      "fenceLeftEnd",
      "fenceMiddle",
      "fenceMiddle",
      "fenceMiddle",
      "fenceMiddle",
      "fenceRightEnd",
    ],
    label: "fence.horizontal.short",
    collision: true,
  },
} as const satisfies Record<string, SequenceDefinition>;

export type SequenceKey = keyof typeof SEQUENCE_CATALOG;

export const frameForTile = (key: TileKey): number => TILE_CATALOG[key].frame;
