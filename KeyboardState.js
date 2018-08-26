const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  constructor() {
    //holds the current state of a given key
    this.keyStates = new Map();

    //holds the callback funcs for a key code
    this.keyMap = new Map();
  }

  addMapping(code, cb) {
    this.keyMap.set(code, cb);
  }

  handleEvent(evt) {
    const { code } = evt;

    if (!this.keyMap.has(code)) {
      return;
    }

    evt.preventDefault();

    const keyState = event.type === "keydown" ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);

    this.keyMap.get(code)(keyState);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach(eventName => {
      window.addEventListener(eventName, evt => {
        this.handleEvent(evt);
      });
    });
  }
}
