import Compositor from "./Compositor.js";

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
  }
  update(deltaTime) {
    this.entities.forEach(entitiy => {
      entity.update(deltaTime);
    });
  }
}
