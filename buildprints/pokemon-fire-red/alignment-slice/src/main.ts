import Phaser from "phaser";
import { bindTouchControls, createInputState } from "./game/input";
import { InspectorScene } from "./game/inspector-scene";
import { WorldScene } from "./game/world-scene";
import "./style.css";

const touch = createInputState();
bindTouchControls(touch);

const inspect =
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get("inspect") === "1";
document.body.classList.toggle("is-inspector", inspect);

new Phaser.Game({
  type: Phaser.AUTO,
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
  scene: inspect ? [InspectorScene] : [new WorldScene(touch)],
});
