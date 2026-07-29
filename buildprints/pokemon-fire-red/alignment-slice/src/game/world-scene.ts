import Phaser from "phaser";
import { TILE_SIZE, tileFrame } from "./atlas";
import type { CompoundMatrix, StampDefinition } from "./compound-catalog";
import type { InputState } from "./input";
import { PlayerController } from "./player";
import {
  frameForTile,
  SEQUENCE_CATALOG,
  SOLO_TILE_KEYS,
  type SoloTileKey,
  STAMP_CATALOG,
} from "./tile-catalog";
import {
  createWorldCollision,
  type Sequence,
  type Stamp,
  type WorldDefinition,
} from "./world-model";
import { WORLD_PROP_CATALOG } from "./world-prop-catalog";

export class WorldScene extends Phaser.Scene {
  private player?: PlayerController;

  constructor(
    private readonly touch: InputState,
    private readonly world: WorldDefinition,
  ) {
    super(`world-${world.id}`);
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
    for (const stamp of this.world.stamps) this.drawStamp(stamp);
    for (const sequence of this.world.sequences) this.drawSequence(sequence);
    for (const decoration of this.world.decorations) {
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
    for (const prop of this.world.worldProps) {
      this.add
        .image(
          prop.position.x * TILE_SIZE,
          prop.position.y * TILE_SIZE,
          "world",
          tileFrame(WORLD_PROP_CATALOG[prop.prop].source),
        )
        .setOrigin(0)
        .setDepth(8);
    }
    const collision = createWorldCollision(this.world);
    this.player = new PlayerController(
      this,
      this.touch,
      this.world.spawn,
      collision.sweepPosition,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.world.width * TILE_SIZE,
      this.world.height * TILE_SIZE,
    );
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.cameras.main.setZoom(this.world.cameraZoom);
    this.cameras.main.roundPixels = true;
    const root = document.querySelector<HTMLElement>("#game");
    root?.setAttribute("data-world-semantic-ready", "true");
    root?.setAttribute("data-world-id", this.world.id);
    root?.setAttribute(
      "data-world-grid",
      `${this.world.width}x${this.world.height}`,
    );
    root?.setAttribute(
      "data-world-stamps",
      `${this.world.stamps.length}/${Object.keys(STAMP_CATALOG).length}`,
    );
    root?.setAttribute(
      "data-world-props",
      `${this.world.worldProps.length}/${Object.keys(WORLD_PROP_CATALOG).length}`,
    );
    const usedGrounds = new Set<SoloTileKey>();
    for (let y = 0; y < this.world.height; y += 1) {
      for (let x = 0; x < this.world.width; x += 1) {
        usedGrounds.add(this.world.terrainAt({ x, y }));
      }
    }
    root?.setAttribute(
      "data-world-grounds",
      `${usedGrounds.size}/${SOLO_TILE_KEYS.length}`,
    );
    root?.setAttribute(
      "data-world-sequences",
      `${this.world.sequences.length}/${Object.keys(SEQUENCE_CATALOG).length}`,
    );
    const actualAuthoringUnits =
      this.world.stamps.length +
      this.world.worldProps.length +
      usedGrounds.size +
      this.world.sequences.length;
    const totalAuthoringUnits =
      Object.keys(STAMP_CATALOG).length +
      Object.keys(WORLD_PROP_CATALOG).length +
      SOLO_TILE_KEYS.length +
      Object.keys(SEQUENCE_CATALOG).length;
    root?.setAttribute(
      "data-world-authoring-units",
      `${actualAuthoringUnits}/${totalAuthoringUnits}`,
    );
    root?.setAttribute("data-world-collision-model", "cell-mask");
    this.syncRuntimeState();
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
    root.setAttribute("data-player-collision", this.player.collision);
  }

  private drawGround(): void {
    for (let y = 0; y < this.world.height; y += 1) {
      for (let x = 0; x < this.world.width; x += 1) {
        const frame = frameForTile(this.world.terrainAt({ x, y }));
        this.add
          .image(x * TILE_SIZE, y * TILE_SIZE, "world", frame)
          .setOrigin(0)
          .setDepth(0);
      }
    }
  }

  private drawStamp(stamp: Stamp): void {
    const definition: StampDefinition = STAMP_CATALOG[stamp.stamp];
    this.drawCompoundMatrix(definition.cells, stamp.destination, 5);
    if (definition.overlay !== undefined) {
      this.drawCompoundMatrix(definition.overlay, stamp.destination, 6);
    }
  }

  private drawCompoundMatrix(
    matrix: CompoundMatrix,
    destination: { readonly x: number; readonly y: number },
    depth: number,
  ): void {
    for (const [y, row] of matrix.entries()) {
      for (const [x, cell] of row.entries()) {
        if (cell === null) continue;
        this.add
          .image(
            (destination.x + x) * TILE_SIZE,
            (destination.y + y) * TILE_SIZE,
            "world",
            tileFrame(cell.source),
          )
          .setOrigin(0)
          .setDepth(depth);
      }
    }
  }

  private drawSequence(sequence: Sequence): void {
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
