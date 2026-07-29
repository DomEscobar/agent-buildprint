import type { GridPoint } from "./atlas";
import { TILE_SIZE } from "./atlas";
import type {
  SequenceKey,
  SoloTileKey,
  StampKey,
  TileKey,
} from "./tile-catalog";
import { TILE_CATALOG } from "./tile-catalog";
import { createWorldCollision, type WorldDefinition } from "./world-model";

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

export const PLAYER_SPAWN = { x: 17, y: 10 } as const satisfies GridPoint;

export const WALKABLE_WAYPOINTS = [
  PLAYER_SPAWN,
  { x: 10, y: 10 },
  { x: 24, y: 10 },
  { x: 17, y: 16 },
] as const satisfies readonly GridPoint[];

export const WORLD_STAMPS = [
  { stamp: "pond", destination: { x: 14, y: 6 } },
  { stamp: "civicBuilding", destination: { x: 20, y: 6 } },
  { stamp: "greenTallTreeLeft", destination: { x: 6, y: 3 } },
  { stamp: "greenTallTreeRight", destination: { x: 7, y: 3 } },
  { stamp: "greenGrove", destination: { x: 18, y: 12 } },
  { stamp: "greenTopiary", destination: { x: 30, y: 8 } },
  { stamp: "autumnGrove", destination: { x: 11, y: 17 } },
  { stamp: "autumnTallTreeLeft", destination: { x: 11, y: 12 } },
  { stamp: "autumnTallTreeRight", destination: { x: 12, y: 12 } },
  { stamp: "autumnTopiary", destination: { x: 3, y: 13 } },
  { stamp: "storefrontShutter", destination: { x: 4, y: 18 } },
] as const satisfies readonly Stamp[];

export const GROUND_TILE = "grassBase" satisfies SoloTileKey;
export const PATH_TILE = "pathBase" satisfies SoloTileKey;

export const isPathTile = ({ x, y }: GridPoint): boolean => {
  const northSouthSpine = x >= 16 && x <= 17;
  const townCrossing = y >= 9 && y <= 10 && x >= 5 && x <= 28;
  const pondApproach = y >= 6 && y <= 7 && x >= 9 && x <= 17;
  const civicApproach = x >= 21 && x <= 22 && y >= 11 && y <= 12;
  const lowerApproach = y >= 15 && y <= 16 && x >= 11 && x <= 17;
  return (
    northSouthSpine ||
    townCrossing ||
    pondApproach ||
    civicApproach ||
    lowerApproach
  );
};

export const WORLD_SEQUENCES = [
  { sequence: "cableBoundary", position: { x: 16, y: 9 } },
] as const satisfies readonly Sequence[];

export const WORLD_DECORATIONS: readonly Decoration[] = [];

export const STARTER_WORLD = {
  id: "starter",
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT,
  cameraZoom: 2,
  spawn: PLAYER_SPAWN,
  waypoints: WALKABLE_WAYPOINTS,
  terrainAt: (point: GridPoint) =>
    isPathTile(point) ? PATH_TILE : GROUND_TILE,
  stamps: WORLD_STAMPS,
  sequences: WORLD_SEQUENCES,
  decorations: WORLD_DECORATIONS,
  worldProps: [],
  presentation: {
    eyebrow: "Viridian Edge",
    title: "A quiet road north",
    location: "Route Grove",
    conditions: "Morning · Clear",
    footer: "Explore the pond, market path, and cedar grove.",
    switchLabel: "Visit Atlas Park",
    switchHref: "/?map=gallery",
  },
} as const satisfies WorldDefinition;

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

const STARTER_COLLISION = createWorldCollision(STARTER_WORLD);

export const isBlocked = STARTER_COLLISION.isBlocked;
export const sweepPosition = STARTER_COLLISION.sweepPosition;
