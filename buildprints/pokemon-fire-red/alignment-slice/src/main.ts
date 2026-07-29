import Phaser from "phaser";
import { GALLERY_WORLD } from "./game/gallery-world";
import { bindTouchControls, createInputState } from "./game/input";
import { InspectorScene } from "./game/inspector-scene";
import { STARTER_WORLD } from "./game/world-data";
import type { WorldDefinition } from "./game/world-model";
import { WorldScene } from "./game/world-scene";
import "./style.css";

const touch = createInputState();
bindTouchControls(touch);

const query = new URLSearchParams(window.location.search);
const inspect = import.meta.env.DEV && query.get("inspect") === "1";
const world: WorldDefinition =
  query.get("map") === "gallery" ? GALLERY_WORLD : STARTER_WORLD;
const renderer =
  query.get("renderer") === "canvas" ? Phaser.CANVAS : Phaser.AUTO;
document.body.classList.toggle("is-inspector", inspect);

const setText = (selector: string, value: string): void => {
  const element = document.querySelector<HTMLElement>(selector);
  if (element !== null) element.textContent = value;
};

if (!inspect) {
  setText("[data-map-eyebrow]", world.presentation.eyebrow);
  setText("[data-map-title]", world.presentation.title);
  setText("[data-map-location]", world.presentation.location);
  setText("[data-map-conditions]", world.presentation.conditions);
  setText("[data-map-footer]", world.presentation.footer);
  const mapSwitch =
    document.querySelector<HTMLAnchorElement>("[data-map-switch]");
  if (mapSwitch !== null) {
    mapSwitch.textContent = world.presentation.switchLabel;
    mapSwitch.href = world.presentation.switchHref;
  }
}

new Phaser.Game({
  type: renderer,
  parent: "game",
  width: inspect ? 960 : 480,
  height: inspect ? 920 : 320,
  backgroundColor: "#173f37",
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  scale: {
    mode: Phaser.Scale.NONE,
  },
  scene: inspect ? [InspectorScene] : [new WorldScene(touch, world)],
});
