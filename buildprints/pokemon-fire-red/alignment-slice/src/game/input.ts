export const DIRECTIONS = ["up", "down", "left", "right"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export type InputState = Record<Direction, boolean>;

export const createInputState = (): InputState => ({
  up: false,
  down: false,
  left: false,
  right: false,
});

const isDirection = (value: string | undefined): value is Direction =>
  value !== undefined && DIRECTIONS.some((direction) => direction === value);

export const bindTouchControls = (state: InputState): (() => void) => {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>("[data-direction]");
  const cleanups: Array<() => void> = [];

  for (const button of buttons) {
    const direction = button.getAttribute("data-direction") ?? undefined;
    if (!isDirection(direction)) {
      continue;
    }
    const start = (event: PointerEvent): void => {
      event.preventDefault();
      state[direction] = true;
      button.setPointerCapture(event.pointerId);
    };
    const stop = (event: PointerEvent): void => {
      event.preventDefault();
      state[direction] = false;
    };
    button.addEventListener("pointerdown", start);
    button.addEventListener("pointerup", stop);
    button.addEventListener("pointercancel", stop);
    cleanups.push(() => {
      button.removeEventListener("pointerdown", start);
      button.removeEventListener("pointerup", stop);
      button.removeEventListener("pointercancel", stop);
    });
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
};
