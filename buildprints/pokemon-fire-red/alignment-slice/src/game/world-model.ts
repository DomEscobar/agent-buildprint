import type { GridPoint } from "./atlas";
import { TILE_SIZE } from "./atlas";
import type {
  SequenceKey,
  SoloTileKey,
  StampDefinition,
  StampKey,
} from "./tile-catalog";
import { SEQUENCE_CATALOG, STAMP_CATALOG, TILE_CATALOG } from "./tile-catalog";
import { WORLD_PROP_CATALOG, type WorldPropKey } from "./world-prop-catalog";

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

export type WorldProp = {
  readonly prop: WorldPropKey;
  readonly position: GridPoint;
};

export type WorldPresentation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly location: string;
  readonly conditions: string;
  readonly footer: string;
  readonly switchLabel: string;
  readonly switchHref: string;
};

export type WorldDefinition = {
  readonly id: "starter" | "gallery";
  readonly width: number;
  readonly height: number;
  readonly cameraZoom: 1 | 2;
  readonly spawn: GridPoint;
  readonly waypoints: readonly GridPoint[];
  readonly terrainAt: (point: GridPoint) => SoloTileKey;
  readonly stamps: readonly Stamp[];
  readonly sequences: readonly Sequence[];
  readonly decorations: readonly Decoration[];
  readonly worldProps: readonly WorldProp[];
  readonly presentation: WorldPresentation;
};

export type PixelPoint = {
  readonly space: "pixel-point";
  readonly x: number;
  readonly y: number;
};

export type PixelVector = {
  readonly space: "pixel-vector";
  readonly x: number;
  readonly y: number;
};

export const pixelPoint = (x: number, y: number): PixelPoint => ({
  space: "pixel-point",
  x,
  y,
});

export const pixelVector = (x: number, y: number): PixelVector => ({
  space: "pixel-vector",
  x,
  y,
});

export type WorldCollision = {
  readonly isBlocked: (point: GridPoint) => boolean;
  readonly sweepPosition: (
    start: PixelPoint,
    movement: PixelVector,
  ) => PixelPoint;
};

const cellKey = ({ x, y }: GridPoint): string => `${x},${y}`;

export const createWorldCollision = (
  world: WorldDefinition,
): WorldCollision => {
  const blocked = new Set<string>();

  for (const placement of world.stamps) {
    const definition: StampDefinition = STAMP_CATALOG[placement.stamp];
    for (const matrix of [definition.cells, definition.overlay ?? []]) {
      for (const [y, row] of matrix.entries()) {
        for (const [x, cell] of row.entries()) {
          if (cell?.collision === true) {
            blocked.add(
              cellKey({
                x: placement.destination.x + x,
                y: placement.destination.y + y,
              }),
            );
          }
        }
      }
    }
  }

  for (const placement of world.sequences) {
    const definition = SEQUENCE_CATALOG[placement.sequence];
    for (const [x, tile] of definition.tiles.entries()) {
      if (TILE_CATALOG[tile].collision) {
        blocked.add(
          cellKey({
            x: placement.position.x + x,
            y: placement.position.y,
          }),
        );
      }
    }
  }

  for (const decoration of world.decorations) {
    if (TILE_CATALOG[decoration.tile].collision) {
      blocked.add(cellKey(decoration.position));
    }
  }

  for (const prop of world.worldProps) {
    if (WORLD_PROP_CATALOG[prop.prop].collision) {
      blocked.add(cellKey(prop.position));
    }
  }

  const isBlocked = ({ x, y }: GridPoint): boolean =>
    x < 1 ||
    y < 1 ||
    x >= world.width - 1 ||
    y >= world.height - 1 ||
    blocked.has(cellKey({ x, y }));

  const canOccupy = ({ x, y }: PixelPoint): boolean => {
    const inset = 7;
    const corners = [
      pixelPoint(x - inset, y - inset),
      pixelPoint(x + inset, y - inset),
      pixelPoint(x - inset, y + inset),
      pixelPoint(x + inset, y + inset),
    ] as const;
    return corners.every(
      (corner) =>
        !isBlocked({
          x: Math.floor(corner.x / TILE_SIZE),
          y: Math.floor(corner.y / TILE_SIZE),
        }),
    );
  };

  const sweepPosition = (
    start: PixelPoint,
    movement: PixelVector,
  ): PixelPoint => {
    const steps = Math.max(
      1,
      Math.ceil(Math.max(Math.abs(movement.x), Math.abs(movement.y)) / 4),
    );
    const increment = { x: movement.x / steps, y: movement.y / steps };
    let current = start;
    for (let step = 0; step < steps; step += 1) {
      const next = pixelPoint(current.x + increment.x, current.y + increment.y);
      if (!canOccupy(next)) break;
      current = next;
    }
    return current;
  };

  return { isBlocked, sweepPosition };
};
