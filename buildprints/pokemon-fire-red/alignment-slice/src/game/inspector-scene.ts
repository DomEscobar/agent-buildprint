import Phaser from "phaser";
import { ATLAS_COLUMNS } from "./atlas";
import { SEQUENCE_CATALOG, STAMP_CATALOG, TILE_CATALOG } from "./tile-catalog";

const ROWS = 18;

export class InspectorScene extends Phaser.Scene {
  constructor() {
    super("inspector");
  }

  preload(): void {
    this.load.image("world-atlas", "assets/kanto-world.png");
    this.load.image("player-atlas", "assets/player-npc.png");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#0b1f1e");
    const catalogSummary = this.catalogSummary();
    document
      .querySelector<HTMLElement>("#game")
      ?.setAttribute("data-inspector-catalog", catalogSummary);
    this.add.image(8, 8, "world-atlas").setOrigin(0).setScale(2);
    for (let row = 0; row < ROWS; row += 1) {
      for (let column = 0; column < ATLAS_COLUMNS; column += 1) {
        const label = String(row * ATLAS_COLUMNS + column);
        this.add.text(16 + column * 32, 10 + row * 32, label, {
          color: "#fff1a8",
          fontFamily: "monospace",
          fontSize: "7px",
          backgroundColor: "#0b1f1ecc",
        });
      }
    }
    this.add.image(8, 610, "player-atlas").setOrigin(0).setScale(3);
    this.add.text(
      480,
      610,
      "Player source · 16×16\ndown: 0,17,34\nside: 52,68,85\nup: 102,119,136\nY: 0",
      {
        color: "#f2e8c9",
        fontFamily: "monospace",
        fontSize: "14px",
        lineSpacing: 6,
      },
    );
    this.add.text(480, 710, catalogSummary, {
      color: "#f2e8c9",
      fontFamily: "monospace",
      fontSize: "10px",
      lineSpacing: 4,
    });
  }

  private catalogSummary(): string {
    const tiles = Object.entries(TILE_CATALOG)
      .map(
        ([key, tile]) =>
          `${key}: ${tile.label} frame=${tile.frame} ${tile.placement}`,
      )
      .join("\n");
    const stamps = Object.entries(STAMP_CATALOG)
      .map(
        ([key, stamp]) =>
          `${key}: ${stamp.label} ${stamp.size.x}x${stamp.size.y}`,
      )
      .join("\n");
    const sequences = Object.entries(SEQUENCE_CATALOG)
      .map(
        ([key, sequence]) =>
          `${key}: ${sequence.label} ${sequence.tiles.join(">")}`,
      )
      .join("\n");

    return `Tile catalog\n${tiles}\n\nStamp catalog\n${stamps}\n\nSequence catalog\n${sequences}`;
  }
}
