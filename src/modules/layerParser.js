const parse = (() => {
  const layer = () => {
    const isBlocked = (player, layer) => {
      const above = layer.getTileAtWorldXY(player.x, player.y - 16, true).properties.collides;
      const bellow = layer.getTileAtWorldXY(player.x, player.y + 16, true).properties.collides;
      const onLeft = layer.getTileAtWorldXY(player.x - 16, player.y, true).properties.collides;
      const onRight = layer.getTileAtWorldXY(player.x + 16, player.y, true).properties.collides;
      return {
        above,
        bellow,
        onLeft,
        onRight,
      };
    };

    const isFatal = (player, layer, isAlive) => {
      if (layer.getTileAtWorldXY(player.x, player.y, true).y >= 34 && isAlive) {
        return true;
      }
      return false;
    };


    return {
      hasFoe,
      isBlocked,
      isFatal,
    };
  };
})();

export default layerParser;
