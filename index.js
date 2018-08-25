//classes
import Compositer from "./Compositer.js";

//funcs
import { loadLevel } from "./loaders.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.scrollWidth;
ctx.scale(2, 2);

Promise.all([
  loadBackgroundSprites(),
  loadLevel("1-1"),
  loadMarioSprite()
]).then(([backgroundSprites, level, marioSprite]) => {
  const comp = new Compositer();
  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  const update = () => {
    comp.draw(ctx);
    pos.x += 2;
    pos.y += 2;

    requestAnimationFrame(update);
  };
  update();
});
