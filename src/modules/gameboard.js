const gameBoard = () => {
  const shipPerBoard = {
    battleship: 1,
    cruiser: 2,
    destroyer: 3,
    submarine: 4,
  };
  const ships = [];
  const missedAttacks = [];
  const positions = [];
  const isAllSunk = () => ships.every(ship => ship.isSunk());
  const positionIsTaken = pos => positions.includes(pos);
  const isValidPosition = pos => !pos.some(positionIsTaken);
  const isValidType = type => shipPerBoard[type] > 0;
  const isValid = ship => {
    const { position, shipType } = ship;
    return isValidType(shipType) && isValidPosition(position);
  };

  const placeShip = ship => {
    const newShip = ship;
    const { position, shipType } = newShip;
    if (isValid(newShip)) {
      shipPerBoard[shipType] -= 1;
      positions.push(...position);
      ships.push(newShip);
      return true;
    }
    return false;
  };

  const findShip = pos => ships.find(({ position }) => position.includes(pos));

  const receiveAttack = pos => {
    if (positionIsTaken(pos)) {
      const targetShip = findShip(pos);
      return targetShip.hit(pos);
    }
    missedAttacks.push(pos);
    return false;
  };

  return {
    placeShip,
    receiveAttack,
    isAllSunk,
    missedAttacks,
  };
};

export default gameBoard;
