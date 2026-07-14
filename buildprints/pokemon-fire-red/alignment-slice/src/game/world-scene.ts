import Phaser from "phaser";
import type { InputState } from "./input";
import { PlayerController } from "./player";
import {
  frameForStampTile,
  frameForTile,
  SEQUENCE_CATALOG,
  STAMP_CATALOG,
} from "./tile-catalog";
import {
  GROUND_TILE,
  isPathTile,
  PATH_TILE,
  TILE_SIZE,
  WORLD_DECORATIONS,
  WORLD_HEIGHT,
  WORLD_SEQUENCES,
  WORLD_STAMPS,
  WORLD_WIDTH,
} from "./world-data";

export class WorldScene extends Phaser.Scene {
  private player?: PlayerController;

  constructor(private readonly touch: InputState) {
    super("world");
  }

  preload(): void {
    this.load.spritesheet("world", "assets/kanto-world.png", {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.image("player-source", "assets/player-npc.png");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#173f37");
    this.drawGround();
    for (const stamp of WORLD_STAMPS) this.drawStamp(stamp);
    for (const sequence of WORLD_SEQUENCES) this.drawSequence(sequence);
    for (const decoration of WORLD_DECORATIONS) {
      this.add
        .image(
          decoration.position.x * TILE_SIZE,
          decoration.position.y * TILE_SIZE,
          "world",
          frameForTile(decoration.tile),
        )
        .setOrigin(0)
        .setDepth(8);
    }
    this.player = new PlayerController(this, this.touch, { x: 17, y: 10 });
    this.cameras.main.setBounds(
      0,
      0,
      WORLD_WIDTH * TILE_SIZE,
      WORLD_HEIGHT * TILE_SIZE,
    );
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.cameras.main.setZoom(2);
    this.cameras.main.roundPixels = true;
  }

  update(_time: number, delta: number): void {
    this.player?.update(delta);
    this.syncRuntimeState();
  }

  private syncRuntimeState(): void {
    if (this.player === undefined) return;
    const root = document.querySelector<HTMLElement>("#game");
    if (root === null) return;
    root.setAttribute("data-player-x", this.player.sprite.x.toFixed(2));
    root.setAttribute("data-player-y", this.player.sprite.y.toFixed(2));
    root.setAttribute("data-player-facing", this.player.direction);
  }

  private drawGround(): void {
    for (let y = 0; y < WORLD_HEIGHT; y += 1) {
      for (let x = 0; x < WORLD_WIDTH; x += 1) {
        const frame = frameForTile(
          isPathTile({ x, y }) ? PATH_TILE : GROUND_TILE,
        );
        this.add
          .image(x * TILE_SIZE, y * TILE_SIZE, "world", frame)
          .setOrigin(0)
          .setDepth(0);
      }
    }
  }

  private drawStamp(stamp: (typeof WORLD_STAMPS)[number]): void {
    const definition = STAMP_CATALOG[stamp.stamp];
    for (let y = 0; y < definition.size.y; y += 1) {
      for (let x = 0; x < definition.size.x; x += 1) {
        this.add
          .image(
            (stamp.destination.x + x) * TILE_SIZE,
            (stamp.destination.y + y) * TILE_SIZE,
            "world",
            frameForStampTile(stamp.stamp, { x, y }),
          )
          .setOrigin(0)
          .setDepth(5);
      }
    }
  }

  private drawSequence(sequence: (typeof WORLD_SEQUENCES)[number]): void {
    const definition = SEQUENCE_CATALOG[sequence.sequence];
    for (const [index, tile] of definition.tiles.entries()) {
      this.add
        .image(
          (sequence.position.x + index) * TILE_SIZE,
          sequence.position.y * TILE_SIZE,
          "world",
          frameForTile(tile),
        )
        .setOrigin(0)
        .setDepth(8);
    }
  }
}
