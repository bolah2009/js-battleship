// Type of ship                             Size  Number per player
// battleship /four-decker /four-funnel     4   1
// cruiser /three-decker /three-funnel      3   2
// destroyer /two-decker /two-funnel        2   3
// submarine /single-decker /single-funnel  1   4

const shipTypes = {
  battleship: {
    size: 4,
    noPerPlayer: 1,
    sunk: false,
  },
  cruiser: {
    size: 3,
    noPerPlayer: 2,
    sunk: false,
  },
  destroyer: {
    size: 2,
    noPerPlayer: 3,
    sunk: false,
  },
  submarine: {
    size: 1,
    noPerPlayer: 4,
    sunk: false,
  },
};

const validateShipType = type => {
  if (shipTypes[type] === undefined) {
    throw new Error(`${type} is a wrong type of ship`);
  }
};

const validateShipPosition = (position, type) => {
  if (position.length !== shipTypes[type].size) {
    throw new Error(`${position} is a wrong position for ${type} ship`);
  }
};

const ship = (type, position) => {
  validateShipType(type);
  validateShipPosition(position, type);
  const { size } = shipTypes[type];
  const shipPosition = position;
  const hits = [];
  const isSunk = () => size === hits.length;
  const hit = pos => {
    if (shipPosition.includes(pos) && !hits.includes(pos)) {
      hits.push(pos);
      return true;
    }
    return false;
  };

  return {
    size,
    isSunk,
    hit,
    hits,
    position,
    shipType: type,
  };
};

export default ship;
