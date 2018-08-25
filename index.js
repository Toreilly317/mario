//classes
import Compositor from "./Compositor.js";
import Timer from "./Timer.js";

//funcs
import { createMario } from "./entities.js";
import { loadLevel } from "./Loaders.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { loadBackgroundSprites } from "./sprites.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.scrollWidth;
ctx.scale(2, 2);

Promise.all([createMario(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    //comp.layers.push(backgroundLayer);

    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1 / 60);
    timer.update = deltaTime => {
      comp.draw(ctx);
      mario.update(deltaTime);

      mario.vel.y += gravity;
    };

    timer.start();
  }
);
