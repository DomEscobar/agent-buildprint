import Phaser from "phaser";
import type { GridPoint } from "./atlas";
import { TILE_SIZE } from "./atlas";
import type { Direction, InputState } from "./input";
import {
  PLAYER_FRAME_X,
  PLAYER_TEXTURE_KEY,
  playerFrameRef,
} from "./player-frames";
import { sweepPosition } from "./world-data";

const SPEED = 54;

export class PlayerController {
  readonly sprite: Phaser.GameObjects.Sprite;
  private readonly keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly w: Phaser.Input.Keyboard.Key;
  private readonly a: Phaser.Input.Keyboard.Key;
  private readonly s: Phaser.Input.Keyboard.Key;
  private readonly d: Phaser.Input.Keyboard.Key;
  private facing: Direction = "down";

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly touch: InputState,
    spawn: GridPoint,
  ) {
    this.registerFrames();
    this.registerAnimations();
    this.sprite = scene.add.sprite(
      spawn.x * TILE_SIZE + 8,
      spawn.y * TILE_SIZE + 8,
      PLAYER_TEXTURE_KEY,
      "down-1",
    );
    this.sprite.setDepth(20);
    const keyboard = scene.input.keyboard;
    if (keyboard === null) throw new TypeError("Keyboard input is unavailable");
    this.keys = keyboard.createCursorKeys();
    this.w = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update(deltaMs: number): void {
    const direction = this.readDirection();
    if (direction === null) {
      this.sprite.anims.stop();
      this.sprite.setFrame(`${this.facing}-1`);
      return;
    }
    this.facing = direction;
    const distance = (SPEED * deltaMs) / 1000;
    const movement = this.vectorFor(direction, distance);
    const next = sweepPosition(
      { x: this.sprite.x, y: this.sprite.y },
      movement,
    );
    this.sprite.setPosition(next.x, next.y);
    this.sprite.setFlipX(direction === "left");
    this.sprite.play(`${direction}-walk`, true);
  }

  get direction(): Direction {
    return this.facing;
  }

  private registerFrames(): void {
    const texture = this.scene.textures.get(PLAYER_TEXTURE_KEY);
    for (const direction of ["down", "up", "left", "right"] as const) {
      for (const [index, x] of PLAYER_FRAME_X[direction].entries()) {
        texture.add(`${direction}-${index}`, 0, x, 0, 16, 16);
      }
    }
  }

  private registerAnimations(): void {
    for (const direction of ["down", "up", "left", "right"] as const) {
      this.scene.anims.create({
        key: `${direction}-walk`,
        frames: ([0, 1, 2, 1] as const).map((index) =>
          playerFrameRef(direction, index),
        ),
        frameRate: 8,
        repeat: -1,
      });
    }
  }

  private readDirection(): Direction | null {
    if (this.keys.up.isDown || this.w.isDown || this.touch.up) return "up";
    if (this.keys.down.isDown || this.s.isDown || this.touch.down)
      return "down";
    if (this.keys.left.isDown || this.a.isDown || this.touch.left)
      return "left";
    if (this.keys.right.isDown || this.d.isDown || this.touch.right)
      return "right";
    return null;
  }

  private vectorFor(direction: Direction, distance: number): GridPoint {
    switch (direction) {
      case "up":
        return { x: 0, y: -distance };
      case "down":
        return { x: 0, y: distance };
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
    }
  }
}
