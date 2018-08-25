//classes
import Timer from "./Timer.js";
import Level from "./Level.js";
//funcs
import { createMario } from "./entities.js";
import { loadLevel } from "./Loaders.js";

import Keyboard from "./KeyboardState.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.scrollWidth;
ctx.scale(2, 2);

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  const gravity = 2000;
  mario.pos.set(64, 180);

  level.entities.add(mario);

  const SPACE = 32;

  const input = new Keyboard();
  input.addMapping(SPACE, keyState => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.listenTo(window);

  const timer = new Timer(1 / 60);
  timer.update = deltaTime => {
    level.update(deltaTime);
    level.comp.draw(ctx);

    mario.vel.y += gravity * deltaTime;
  };

  timer.start();
});
