export const TILE_SIZE = 16;
export const ATLAS_COLUMNS = 27;

export type GridPoint = {
  readonly x: number;
  readonly y: number;
};

export const tileFrame = ({ x, y }: GridPoint): number => y * ATLAS_COLUMNS + x;
