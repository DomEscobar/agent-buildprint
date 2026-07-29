import type { GridPoint } from "./atlas";
import type { SoloTileKey } from "./tile-catalog";
import type { WorldDefinition, WorldProp } from "./world-model";
import { WORLD_PROP_KEYS } from "./world-prop-catalog";

const GALLERY_WORLD_PROPS: readonly WorldProp[] = WORLD_PROP_KEYS.map(
  (prop, index) => ({
    prop,
    position: {
      x: 2 + (index % 7) * 2,
      y: 6 + Math.floor(index / 7) * 2,
    },
  }),
);

const galleryTerrainAt = ({ x, y }: GridPoint): SoloTileKey => {
  const storefrontCourt = x >= 3 && x <= 14 && y >= 21 && y <= 29;
  if (storefrontCourt) return "pavementBase";

  const civicPlaza = x >= 32 && x <= 46 && y >= 3 && y <= 14;
  if (civicPlaza) return "plazaBase";

  const northSouthWalk = x >= 23 && x <= 24;
  const galleryCrossing = y >= 15 && y <= 17 && x >= 3 && x <= 45;
  if (northSouthWalk || galleryCrossing) return "pathBase";

  return "grassBase";
};

export const GALLERY_WORLD = {
  id: "gallery",
  width: 48,
  height: 32,
  cameraZoom: 1,
  spawn: { x: 24, y: 18 },
  waypoints: [
    { x: 24, y: 18 },
    { x: 12, y: 16 },
    { x: 36, y: 16 },
    { x: 24, y: 28 },
  ],
  terrainAt: galleryTerrainAt,
  stamps: [
    { stamp: "pond", destination: { x: 18, y: 9 } },
    { stamp: "grassTransition", destination: { x: 22, y: 9 } },
    { stamp: "civicBuilding", destination: { x: 34, y: 9 } },
    { stamp: "storefrontShutter", destination: { x: 10, y: 24 } },
    { stamp: "greenTallTreeLeft", destination: { x: 18, y: 23 } },
    { stamp: "greenTallTreeRight", destination: { x: 19, y: 23 } },
    { stamp: "greenGrove", destination: { x: 22, y: 22 } },
    { stamp: "greenTopiary", destination: { x: 27, y: 22 } },
    { stamp: "autumnTallTreeLeft", destination: { x: 30, y: 23 } },
    { stamp: "autumnTallTreeRight", destination: { x: 31, y: 23 } },
    { stamp: "autumnGrove", destination: { x: 34, y: 22 } },
    { stamp: "autumnTopiary", destination: { x: 38, y: 22 } },
  ],
  sequences: [{ sequence: "cableBoundary", position: { x: 22, y: 15 } }],
  decorations: [],
  worldProps: GALLERY_WORLD_PROPS,
  presentation: {
    eyebrow: "Semantic field map",
    title: "Atlas Park",
    location: "Atlas Park",
    conditions: "38 units · 12 compounds · 21 props · 4 grounds · 1 cable",
    footer:
      "Walk every approved prop, ground, cable, building, water, and tree exhibit.",
    switchLabel: "Visit Route Grove",
    switchHref: "/",
  },
} as const satisfies WorldDefinition;
