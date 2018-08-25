export default class Trait {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.warn(`unhandled update call in trait ${this.name}`);
  }
}
