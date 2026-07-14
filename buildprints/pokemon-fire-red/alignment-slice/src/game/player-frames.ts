import type { Direction } from "./input";

export const PLAYER_TEXTURE_KEY = "player-source";
export const PLAYER_FRAME_X = {
  down: [0, 17, 34],
  left: [52, 68, 85],
  right: [52, 68, 85],
  up: [102, 119, 136],
} as const satisfies Record<Direction, readonly [number, number, number]>;

export type PlayerFrameIndex = 0 | 1 | 2;

export const playerFrameRef = (
  direction: Direction,
  index: PlayerFrameIndex,
) => ({
  key: PLAYER_TEXTURE_KEY,
  frame: `${direction}-${index}`,
});
