export const createBackgroundLayer = (level, sprites) => {
  const buffer = document.createElement("canvas");
  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext("2d");

  level.tiles.grid.forEach((column, x) => {
    column.forEach((tile, y) => {
      sprites.drawTile(tile.name, context, x, y);
    });
  });

  return context => {
    context.drawImage(buffer, 0, 0);
  };
};

export const createSpriteLayer = entities => {
  return context => {
    entities.forEach(entity => {
      entity.draw(context);
    });
  };
};
