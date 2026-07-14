import type { GridPoint } from "./atlas";
import { TILE_SIZE } from "./atlas";
import type {
  SequenceKey,
  SoloTileKey,
  StampDefinition,
  StampKey,
  TileKey,
} from "./tile-catalog";
import { SEQUENCE_CATALOG, STAMP_CATALOG, TILE_CATALOG } from "./tile-catalog";

export const WORLD_WIDTH = 34;
export const WORLD_HEIGHT = 22;

export type Stamp = {
  readonly stamp: StampKey;
  readonly destination: GridPoint;
};

export type Decoration = {
  readonly tile: SoloTileKey;
  readonly position: GridPoint;
};

export type Sequence = {
  readonly sequence: SequenceKey;
  readonly position: GridPoint;
};

export type { GridPoint };
export { TILE_SIZE };

export const WORLD_STAMPS = [
  {
    stamp: "pondWalkway",
    destination: { x: 9, y: 3 },
  },
  {
    stamp: "plazaBuilding",
    destination: { x: 22, y: 3 },
  },
  {
    stamp: "treeBlock",
    destination: { x: 24, y: 13 },
  },
  {
    stamp: "lowerMarket",
    destination: { x: 3, y: 15 },
  },
] as const satisfies readonly Stamp[];

export const GROUND_TILE = "grassBase" satisfies TileKey;
export const PATH_TILE = "dirtBase" satisfies TileKey;

export const isPathTile = ({ x, y }: GridPoint): boolean =>
  (x >= 16 && x <= 17) || (y >= 9 && y <= 10 && x >= 6 && x <= 28);

export const WORLD_SEQUENCES = [
  { sequence: "fenceHorizontalShort", position: { x: 8, y: 7 } },
] as const satisfies readonly Sequence[];

export const WORLD_DECORATIONS: readonly Decoration[] = [];

export const isSoloDecorationTile = (key: TileKey): boolean => {
  switch (TILE_CATALOG[key].placement) {
    case "repeatable":
    case "single":
      return true;
    case "sequence-only":
    case "stamp-only":
      return false;
  }
};

type CollisionRect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

const isInsideRect = ({ x, y }: GridPoint, rect: CollisionRect): boolean =>
  x >= rect.x &&
  y >= rect.y &&
  x < rect.x + rect.width &&
  y < rect.y + rect.height;

const collisionRects = (): readonly CollisionRect[] => [
  ...WORLD_STAMPS.flatMap((stamp) => {
    const definition: StampDefinition = STAMP_CATALOG[stamp.stamp];
    if (definition.collision === "open") return [];
    return [
      {
        x: stamp.destination.x,
        y: stamp.destination.y,
        width: definition.size.x,
        height: definition.size.y,
      },
    ];
  }),
  ...WORLD_SEQUENCES.flatMap((sequence) => {
    const definition = SEQUENCE_CATALOG[sequence.sequence];
    if (!definition.collision) return [];
    return [
      {
        x: sequence.position.x,
        y: sequence.position.y,
        width: definition.tiles.length,
        height: 1,
      },
    ];
  }),
  ...WORLD_DECORATIONS.flatMap((decoration) => {
    if (!TILE_CATALOG[decoration.tile].collision) return [];
    return [
      {
        x: decoration.position.x,
        y: decoration.position.y,
        width: 1,
        height: 1,
      },
    ];
  }),
];

export const isBlocked = ({ x, y }: GridPoint): boolean => {
  if (x < 1 || y < 1 || x >= WORLD_WIDTH - 1 || y >= WORLD_HEIGHT - 1) {
    return true;
  }
  return collisionRects().some((rect) => isInsideRect({ x, y }, rect));
};

const canOccupy = ({ x, y }: GridPoint): boolean => {
  const inset = 7;
  const corners = [
    { x: x - inset, y: y - inset },
    { x: x + inset, y: y - inset },
    { x: x - inset, y: y + inset },
    { x: x + inset, y: y + inset },
  ] as const;
  return corners.every(
    (corner) =>
      !isBlocked({
        x: Math.floor(corner.x / TILE_SIZE),
        y: Math.floor(corner.y / TILE_SIZE),
      }),
  );
};

export const sweepPosition = (
  start: GridPoint,
  movement: GridPoint,
): GridPoint => {
  const steps = Math.max(
    1,
    Math.ceil(Math.max(Math.abs(movement.x), Math.abs(movement.y)) / 4),
  );
  const increment = { x: movement.x / steps, y: movement.y / steps };
  let current = start;
  for (let step = 0; step < steps; step += 1) {
    const next = { x: current.x + increment.x, y: current.y + increment.y };
    if (!canOccupy(next)) break;
    current = next;
  }
  return current;
};
