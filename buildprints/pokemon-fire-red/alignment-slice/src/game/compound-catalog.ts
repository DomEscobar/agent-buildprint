import type { GridPoint } from "./atlas";

export type AtlasX =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26;

export type AtlasY =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;

export type AtlasSource = {
  readonly x: AtlasX;
  readonly y: AtlasY;
};

export type CompoundCell = {
  readonly source: AtlasSource;
  readonly role: string;
  readonly collision: boolean;
};

export type CompoundMatrix = readonly (readonly (CompoundCell | null)[])[];

export type StampDefinition = {
  readonly label: string;
  readonly cells: CompoundMatrix;
  readonly overlay?: CompoundMatrix;
};

const cell = (
  x: AtlasX,
  y: AtlasY,
  role: string,
  collision: boolean,
): CompoundCell => ({ source: { x, y }, role, collision });

// biome-ignore format: preserve the atlas matrices as spatially auditable rows
export const STAMP_CATALOG = {
  grassTransition: {
    label: "ground.grass.transition",
    cells: [
      [cell(0, 0, "north-west", false), cell(1, 0, "north", false), cell(2, 0, "north-east", false)],
      [cell(0, 1, "west", false), cell(1, 1, "fill", false), cell(2, 1, "east", false)],
      [cell(0, 2, "south-west", false), cell(1, 2, "south", false), cell(2, 2, "south-east", false)],
    ],
  },
  pond: {
    label: "water.pond.complete",
    cells: [
      [cell(8, 6, "north-west-shore", true), cell(9, 6, "north-shore", true), cell(10, 6, "north-east-shore", true)],
      [cell(8, 7, "west-shore", true), cell(9, 7, "water-fill", true), cell(10, 7, "east-shore", true)],
      [cell(8, 8, "south-west-shore", true), cell(9, 8, "south-shore", true), cell(10, 8, "south-east-shore", true)],
    ],
  },
  greenGrove: {
    label: "trees.green.grove",
    cells: [
      [cell(18, 8, "canopy-left", true), cell(19, 8, "canopy-middle", true), cell(20, 8, "canopy-right", true)],
      [cell(18, 9, "mid-left", true), cell(19, 9, "mid-middle", true), cell(20, 9, "mid-right", true)],
      [cell(18, 10, "trunk-left", true), cell(19, 10, "trunk-middle", true), cell(20, 10, "trunk-right", true)],
    ],
  },
  greenTallTreeLeft: {
    label: "trees.green.tall-left",
    cells: [[cell(16, 8, "canopy", true)], [cell(16, 9, "trunk", true)]],
  },
  greenTallTreeRight: {
    label: "trees.green.tall-right",
    cells: [[cell(17, 8, "canopy", true)], [cell(17, 9, "trunk", true)]],
  },
  greenTopiary: {
    label: "trees.green.topiary",
    cells: [
      [cell(21, 8, "canopy", true)],
      [cell(21, 9, "middle", true)],
      [cell(21, 10, "trunk", true)],
    ],
  },
  autumnGrove: {
    label: "trees.autumn.grove",
    cells: [
      [cell(18, 11, "canopy-left", true), cell(19, 11, "canopy-middle", true), cell(20, 11, "canopy-right", true)],
      [cell(18, 12, "mid-left", true), cell(19, 12, "mid-middle", true), cell(20, 12, "mid-right", true)],
      [cell(18, 13, "trunk-left", true), cell(19, 13, "trunk-middle", true), cell(20, 13, "trunk-right", true)],
    ],
  },
  autumnTallTreeLeft: {
    label: "trees.autumn.tall-left",
    cells: [[cell(16, 11, "canopy", true)], [cell(16, 12, "trunk", true)]],
  },
  autumnTallTreeRight: {
    label: "trees.autumn.tall-right",
    cells: [[cell(17, 11, "canopy", true)], [cell(17, 12, "trunk", true)]],
  },
  autumnTopiary: {
    label: "trees.autumn.topiary",
    cells: [
      [cell(21, 11, "canopy", true)],
      [cell(21, 12, "middle", true)],
      [cell(21, 13, "trunk", true)],
    ],
  },
  storefrontShutter: {
    label: "building.storefront.garage-shutter",
    cells: [
      [cell(8, 13, "lintel-left", true), cell(9, 13, "lintel-middle", true), cell(10, 13, "lintel-right", true)],
      [cell(8, 14, "shutter-left", true), cell(9, 14, "shutter-middle", true), cell(10, 14, "shutter-right", true)],
    ],
  },
  civicBuilding: {
    label: "building.civic.complete",
    cells: [
      [cell(8, 3, "roof-left", true), cell(9, 3, "roof-middle", true), cell(9, 3, "roof-middle", true), cell(10, 3, "roof-right", true)],
      [cell(8, 5, "eave-left", true), cell(9, 5, "eave-middle", true), cell(9, 5, "eave-middle", true), cell(10, 5, "eave-right", true)],
      [cell(16, 4, "wall-left", true), cell(20, 4, "wall-middle-left", true), cell(22, 4, "wall-middle-right", true), cell(16, 4, "wall-right", true)],
      [cell(16, 5, "lower-wall-left", true), cell(20, 5, "lower-wall-middle-left", true), cell(22, 5, "lower-wall-middle-right", true), cell(16, 5, "lower-wall-right", true)],
      [cell(16, 7, "foundation-left", true), cell(7, 15, "door-left", true), cell(8, 15, "door-right", true), cell(16, 7, "foundation-right", true)],
    ],
    overlay: [
      [null, null, null, null],
      [null, null, null, null],
      [null, cell(11, 16, "window-left", true), cell(11, 16, "window-right", true), null],
      [cell(11, 15, "pillar-left", true), cell(11, 17, "awning-left", true), cell(11, 17, "awning-right", true), cell(11, 15, "pillar-right", true)],
      [cell(11, 15, "post-left", true), null, null, cell(11, 15, "post-right", true)],
    ],
  },
} as const satisfies Record<string, StampDefinition>;

export type StampKey = keyof typeof STAMP_CATALOG;

const CIVIC_ONLY_SOURCES = new Set(["7,15", "8,15", "11,15", "11,16", "11,17"]);

export const isCivicMatrixOnlySource = ({ x, y }: GridPoint): boolean =>
  CIVIC_ONLY_SOURCES.has(`${x},${y}`);
