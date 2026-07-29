import type { AtlasSource } from "./compound-catalog";

export type WorldPropDefinition = {
  readonly source: AtlasSource;
  readonly label: string;
  readonly collision: boolean;
};

const prop = (source: AtlasSource, label: string): WorldPropDefinition => ({
  source,
  label,
  collision: true,
});

export const WORLD_PROP_CATALOG = {
  plazaRoundMarker: prop({ x: 6, y: 2 }, "plaza.marker.round"),
  plazaSlateInset: prop({ x: 14, y: 2 }, "plaza.inset.slate"),
  plazaVioletInset: prop({ x: 6, y: 5 }, "plaza.inset.violet"),
  plazaSandInset: prop({ x: 14, y: 5 }, "plaza.inset.sand"),
  streetTwinPost: prop({ x: 5, y: 8 }, "street.post.twin"),
  streetBlueBench: prop({ x: 6, y: 8 }, "street.bench.blue"),
  streetOrangeBench: prop({ x: 7, y: 8 }, "street.bench.orange"),
  plazaRoundMarkerAlt: prop({ x: 14, y: 8 }, "plaza.marker.round-alt"),
  greenShrubSmall: prop({ x: 22, y: 8 }, "plant.green.shrub-small"),
  streetTwinPostAlt: prop({ x: 5, y: 9 }, "street.post.twin-alt"),
  streetBlueBenchAlt: prop({ x: 6, y: 9 }, "street.bench.blue-alt"),
  streetOrangeBenchAlt: prop({ x: 7, y: 9 }, "street.bench.orange-alt"),
  greenConiferSmall: prop({ x: 22, y: 9 }, "plant.green.conifer-small"),
  planterGreen: prop({ x: 16, y: 10 }, "plant.planter.green"),
  planterOrange: prop({ x: 17, y: 10 }, "plant.planter.orange"),
  greenShrubTall: prop({ x: 22, y: 10 }, "plant.green.shrub-tall"),
  autumnTreeSmall: prop({ x: 22, y: 11 }, "plant.autumn.tree-small"),
  autumnConiferSmall: prop({ x: 22, y: 12 }, "plant.autumn.conifer-small"),
  marketStallLeft: prop({ x: 16, y: 13 }, "market.stall.left"),
  marketStallRight: prop({ x: 17, y: 13 }, "market.stall.right"),
  autumnTreeTall: prop({ x: 22, y: 13 }, "plant.autumn.tree-tall"),
} as const satisfies Record<string, WorldPropDefinition>;

export type WorldPropKey = keyof typeof WORLD_PROP_CATALOG;

export const WORLD_PROP_KEYS = [
  "plazaRoundMarker",
  "plazaSlateInset",
  "plazaVioletInset",
  "plazaSandInset",
  "streetTwinPost",
  "streetBlueBench",
  "streetOrangeBench",
  "plazaRoundMarkerAlt",
  "greenShrubSmall",
  "streetTwinPostAlt",
  "streetBlueBenchAlt",
  "streetOrangeBenchAlt",
  "greenConiferSmall",
  "planterGreen",
  "planterOrange",
  "greenShrubTall",
  "autumnTreeSmall",
  "autumnConiferSmall",
  "marketStallLeft",
  "marketStallRight",
  "autumnTreeTall",
] as const satisfies readonly WorldPropKey[];
