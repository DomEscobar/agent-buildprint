import type { GridPoint } from "./atlas";
import { tileFrame } from "./atlas";
import {
  ATLAS_CLASSIFICATION,
  AtlasAuthoring,
  type AtlasClassificationCell,
  type AtlasClassificationIssue,
  type AtlasClassificationIssueCode,
  type AtlasClassificationResult,
  validateAtlasClassification,
} from "./atlas-classification";
import {
  isCivicMatrixOnlySource,
  STAMP_CATALOG,
  type StampDefinition,
  type StampKey,
} from "./compound-catalog";

export type {
  AtlasClassificationCell,
  AtlasClassificationIssue,
  AtlasClassificationIssueCode,
  AtlasClassificationResult,
  StampDefinition,
  StampKey,
};
export {
  ATLAS_CLASSIFICATION,
  AtlasAuthoring,
  isCivicMatrixOnlySource,
  STAMP_CATALOG,
  validateAtlasClassification,
};

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
  pavementBase: defineTile(
    { x: 9, y: 1 },
    TilePlacement.Repeatable,
    "ground.pavement.base",
    false,
  ),
  pathBase: defineTile(
    { x: 1, y: 4 },
    TilePlacement.Repeatable,
    "ground.path.beige-base",
    false,
  ),
  plazaBase: defineTile(
    { x: 9, y: 4 },
    TilePlacement.Repeatable,
    "ground.plaza.gray-base",
    false,
  ),
  waterBase: defineTile(
    { x: 9, y: 7 },
    TilePlacement.StampOnly,
    "water.fill.compound-only",
    true,
  ),
  dirtBase: defineTile(
    { x: 18, y: 6 },
    TilePlacement.StampOnly,
    "road.orange.compound-fragment",
    false,
  ),
  cableBoundaryLeft: defineTile(
    { x: 0, y: 8 },
    TilePlacement.SequenceOnly,
    "boundary.cable.left",
    true,
  ),
  cableBoundaryJoinLeft: defineTile(
    { x: 1, y: 8 },
    TilePlacement.SequenceOnly,
    "boundary.cable.join-left",
    true,
  ),
  cableBoundaryJoinRight: defineTile(
    { x: 2, y: 8 },
    TilePlacement.SequenceOnly,
    "boundary.cable.join-right",
    true,
  ),
  cableBoundaryRight: defineTile(
    { x: 3, y: 8 },
    TilePlacement.SequenceOnly,
    "boundary.cable.right",
    true,
  ),
  cableTerminal: defineTile(
    { x: 4, y: 8 },
    TilePlacement.SequenceOnly,
    "boundary.cable.terminal",
    true,
  ),
} as const;

export type TileKey = keyof typeof TILE_CATALOG;
export type SoloTileKey =
  | "grassBase"
  | "pavementBase"
  | "pathBase"
  | "plazaBase";
export const SOLO_TILE_KEYS = [
  "grassBase",
  "pavementBase",
  "pathBase",
  "plazaBase",
] as const satisfies readonly SoloTileKey[];
export type SequenceTileKey =
  | "cableBoundaryLeft"
  | "cableBoundaryJoinLeft"
  | "cableBoundaryJoinRight"
  | "cableBoundaryRight"
  | "cableTerminal";

export type SequenceDefinition = {
  readonly tiles: readonly SequenceTileKey[];
  readonly label: string;
  readonly collision: boolean;
};

export const SEQUENCE_CATALOG = {
  cableBoundary: {
    tiles: [
      "cableBoundaryLeft",
      "cableBoundaryJoinLeft",
      "cableBoundaryJoinRight",
      "cableBoundaryRight",
    ],
    label: "boundary.cable.contiguous",
    collision: true,
  },
} as const satisfies Record<string, SequenceDefinition>;

export type SequenceKey = keyof typeof SEQUENCE_CATALOG;

export const isSoloAuthorableSource = (source: GridPoint): boolean =>
  ATLAS_CLASSIFICATION.some(
    (cell) =>
      cell.source.x === source.x &&
      cell.source.y === source.y &&
      (cell.authoring === AtlasAuthoring.Repeatable ||
        cell.authoring === AtlasAuthoring.Single),
  );

export const frameForTile = (key: TileKey): number => TILE_CATALOG[key].frame;
