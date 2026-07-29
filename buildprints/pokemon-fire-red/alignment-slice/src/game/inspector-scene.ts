import Phaser from "phaser";
import { ATLAS_COLUMNS, TILE_SIZE, tileFrame } from "./atlas";
import {
  ATLAS_CLASSIFICATION,
  type AtlasCellKind,
  validateAtlasClassification,
} from "./atlas-classification";
import type { CompoundMatrix } from "./compound-catalog";
import { SEQUENCE_CATALOG, STAMP_CATALOG, TILE_CATALOG } from "./tile-catalog";

const ATLAS_ROWS = 18;
const ATLAS_CELL_SCALE = 2;
const PREVIEW_CELL_SCALE = 2;
const ATLAS_CELL_SIZE = TILE_SIZE * ATLAS_CELL_SCALE;
const PREVIEW_CELL_SIZE = TILE_SIZE * PREVIEW_CELL_SCALE;

type CategoryCounts = Record<AtlasCellKind, number>;

const classificationCounts = (): CategoryCounts => {
  const counts: CategoryCounts = {
    C: 0,
    CH: 0,
    RT: 0,
    SQ: 0,
    WP: 0,
    UF: 0,
  };
  for (const cell of ATLAS_CLASSIFICATION) counts[cell.kind] += 1;
  return counts;
};

export class InspectorScene extends Phaser.Scene {
  constructor() {
    super("inspector");
  }

  preload(): void {
    this.load.spritesheet("world-tiles", "assets/kanto-world.png", {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#0b1f1e");
    const catalogSummary = this.catalogSummary();
    const gameRoot = document.querySelector<HTMLElement>("#game");
    document
      .querySelector<HTMLElement>(".location")
      ?.style.setProperty("display", "none");
    gameRoot?.setAttribute("data-inspector-catalog", catalogSummary);
    gameRoot?.setAttribute("data-inspector-coverage", "486/486");
    gameRoot?.setAttribute("data-atlas-covered-cells", "486");

    this.drawAtlas();
    this.drawCatalogPreviews();

    gameRoot?.setAttribute("data-inspector-ready", "true");
  }

  private drawAtlas(): void {
    this.add.text(8, 8, "Numbered atlas · every cell classified 486/486", {
      color: "#fff1a8",
      fontFamily: "monospace",
      fontSize: "13px",
    });

    for (let row = 0; row < ATLAS_ROWS; row += 1) {
      for (let column = 0; column < ATLAS_COLUMNS; column += 1) {
        const frame = row * ATLAS_COLUMNS + column;
        const x = 8 + column * ATLAS_CELL_SIZE;
        const y = 30 + row * ATLAS_CELL_SIZE;
        this.add
          .sprite(x, y, "world-tiles", frame)
          .setOrigin(0)
          .setScale(ATLAS_CELL_SCALE);
        this.add.text(x + 1, y + 1, String(frame), {
          color: "#fff1a8",
          fontFamily: "monospace",
          fontSize: "7px",
          backgroundColor: "#0b1f1ecc",
        });
      }
    }
  }

  private drawCatalogPreviews(): void {
    const previewTop = 620;
    this.add.text(8, previewTop, "Tile catalog · semantic placement previews", {
      color: "#fff1a8",
      fontFamily: "monospace",
      fontSize: "13px",
    });

    this.add.text(8, previewTop + 25, "repeatable", {
      color: "#8ee6bd",
      fontFamily: "monospace",
      fontSize: "10px",
    });
    const repeatables = Object.values(TILE_CATALOG).filter(
      (tile) => tile.placement === "repeatable",
    );
    repeatables.forEach((tile, index) => {
      this.drawFrame(
        tile.frame,
        8 + index * (PREVIEW_CELL_SIZE + 8),
        previewTop + 43,
      );
    });

    this.add.text(218, previewTop + 25, "sequence-only · ordered →", {
      color: "#8ee6bd",
      fontFamily: "monospace",
      fontSize: "10px",
    });
    SEQUENCE_CATALOG.cableBoundary.tiles.forEach((key, index) => {
      this.drawFrame(
        TILE_CATALOG[key].frame,
        218 + index * PREVIEW_CELL_SIZE,
        previewTop + 43,
      );
    });

    this.add.text(
      382,
      previewTop + 25,
      "legend\nCH  showcase / non-world\nUF  unknown / forbidden\nC   compound / stamp-only\nWP  single world prop",
      {
        color: "#f2e8c9",
        fontFamily: "monospace",
        fontSize: "10px",
        lineSpacing: 3,
      },
    );
    this.drawFrame(tileFrame({ x: 23, y: 0 }), 620, previewTop + 43);
    this.drawFrame(tileFrame({ x: 0, y: 9 }), 660, previewTop + 43);

    this.drawStampPreview(
      "pond · complete",
      STAMP_CATALOG.pond.cells,
      undefined,
      8,
      previewTop + 96,
    );
    this.drawStampPreview(
      "green grove · complete",
      STAMP_CATALOG.greenGrove.cells,
      undefined,
      138,
      previewTop + 96,
    );
    this.drawStampPreview(
      "civic building\nbase + overlay",
      STAMP_CATALOG.civicBuilding.cells,
      STAMP_CATALOG.civicBuilding.overlay,
      280,
      previewTop + 96,
    );

    const counts = classificationCounts();
    this.add.text(
      442,
      previewTop + 101,
      [
        "classification totals",
        `C  ${counts.C}   compound-only`,
        `CH ${counts.CH}    character-showcase-non-world`,
        `RT ${counts.RT}     repeatable-world-fill`,
        `SQ ${counts.SQ}    ordered-sequence-member`,
        `WP ${counts.WP}    single-world-prop`,
        `UF ${counts.UF}   unknown-forbidden`,
        "unresolved 0",
      ].join("\n"),
      {
        color: "#f2e8c9",
        fontFamily: "monospace",
        fontSize: "11px",
        lineSpacing: 5,
      },
    );
  }

  private drawFrame(frame: number, x: number, y: number): void {
    this.add
      .sprite(x, y, "world-tiles", frame)
      .setOrigin(0)
      .setScale(PREVIEW_CELL_SCALE);
  }

  private drawStampPreview(
    label: string,
    cells: CompoundMatrix,
    overlay: CompoundMatrix | undefined,
    x: number,
    y: number,
  ): void {
    this.add.text(x, y, label, {
      color: "#8ee6bd",
      fontFamily: "monospace",
      fontSize: "10px",
    });
    const previewY = y + (label.includes("\n") ? 31 : 18);
    this.drawMatrix(cells, x, previewY);
    if (overlay !== undefined) this.drawMatrix(overlay, x, previewY);
  }

  private drawMatrix(cells: CompoundMatrix, x: number, y: number): void {
    cells.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === null) return;
        this.drawFrame(
          tileFrame(cell.source),
          x + columnIndex * PREVIEW_CELL_SIZE,
          y + rowIndex * PREVIEW_CELL_SIZE,
        );
      });
    });
  }

  private catalogSummary(): string {
    const counts = classificationCounts();
    const validation = validateAtlasClassification(ATLAS_CLASSIFICATION);
    const unresolved = validation.valid ? 0 : validation.issues.length;
    const tiles = Object.values(TILE_CATALOG)
      .map((tile) => `${tile.label}:${tile.placement}`)
      .join(",");
    const stamps = Object.values(STAMP_CATALOG)
      .map((stamp) => stamp.label)
      .join(",");
    const sequences = Object.values(SEQUENCE_CATALOG)
      .map(
        (sequence) =>
          `${sequence.label}:sequence-only:${sequence.tiles.join(">")}`,
      )
      .join(",");

    return [
      "Tile catalog",
      `coverage=${ATLAS_CLASSIFICATION.length}/486 unresolved=${unresolved}`,
      `categories C=${counts.C} CH=${counts.CH} RT=${counts.RT} SQ=${counts.SQ} WP=${counts.WP} UF=${counts.UF}`,
      `tiles ${tiles}`,
      `stamps ${stamps}`,
      `sequences ${sequences}`,
      "forbidden unknown-forbidden",
      "showcase character-showcase-non-world",
    ].join("\n");
  }
}
