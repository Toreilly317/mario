export default class Matrix {
  constructor() {
    this.grid = [];
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = new Array();
    }
    this.grid[x][y] = value;
  }

  get(x, y) {
    const column = this.grid[x];
    if (column) {
      return column[y];
    }
    return undefined;
  }

  forEach(callback) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }
}
