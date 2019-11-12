const posIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const shipCount = {
  carrier: 1,
  battleship: 1,
  cruiser: 2,
  submarine: 2,
  destroyer: 3,
};

const shipSizes = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

const gameBoard = () => {
  const shipPerBoard = { ...shipCount };
  const ships = [];
  const missedAttacks = [];
  const hitAttacks = [];
  const playedPositions = [];
  const positions = [];
  const boundaries = [];
  const reset = () => {
    Object.assign(shipPerBoard, shipCount);
    ships.splice(0);
    missedAttacks.splice(0);
    hitAttacks.splice(0);
    playedPositions.splice(0);
    positions.splice(0);
    boundaries.splice(0);
  };
  const isFilled = () => Object.values(shipPerBoard).every(val => val === 0);
  const isAllSunk = () => ships.every(ship => ship.isSunk());
  const positionIsOnBoard = pos => {
    if (pos.length !== 2) {
      return false;
    }
    const [row, col] = pos;
    if (!posIndex.includes(row) || !posIndex[col]) {
      return false;
    }
    return true;
  };

  const positionIsValid = pos => {
    if (positionIsOnBoard(pos)) {
      return !boundaries.includes(pos);
    }
    return false;
  };

  const updateBoundary = position => {
    const addNewPosition = newPos => {
      if (positionIsValid(newPos)) {
        boundaries.push(newPos);
        return true;
      }
      return false;
    };

    const createAndAddNewBoundaryCombinations = pos => {
      const [row, col] = pos;
      const posX = posIndex.indexOf(row);
      const posY = col * 1;

      [
        pos,
        posIndex[posX - 1] + posY,
        posIndex[posX - 1] + (posY + 1),
        posIndex[posX - 1] + (posY - 1),
        posIndex[posX] + (posY + 1),
        posIndex[posX] + (posY - 1),
        posIndex[posX + 1] + posY,
        posIndex[posX + 1] + (posY + 1),
        posIndex[posX + 1] + (posY - 1),
      ].forEach(addNewPosition);
    };

    position.forEach(createAndAddNewBoundaryCombinations);
  };

  const refreshBoundary = () => {
    boundaries.splice(0);
    updateBoundary(positions);
  };

  const isValidType = type => shipPerBoard[type] > 0;
  const isValid = ship => {
    const { position, shipType } = ship;
    return isValidType(shipType) && position.every(positionIsValid);
  };

  const placeShip = ship => {
    const newShip = ship;
    const { position, shipType } = newShip;
    if (isValid(newShip)) {
      shipPerBoard[shipType] -= 1;
      positions.push(...position);
      updateBoundary(position);
      ships.push(newShip);
      return true;
    }
    return false;
  };

  const getRandNo = () => Math.floor(Math.random() * 10);

  const isNotBounded = (x, y) => x < 0 || x > 9 || y < 0 || y > 9;

  const getRandomCellIndex = (
    takenPositions = [],
    visited = [],
    newRow = getRandNo(),
    newCol = getRandNo(),
  ) => {
    if (visited.includes(posIndex[newRow] + newCol) || isNotBounded(newRow, newCol)) {
      return false;
    }

    if (!takenPositions.includes(posIndex[newRow] + newCol)) {
      return [newRow, newCol];
    }

    visited.push(posIndex[newRow] + newCol);

    return (
      getRandomCellIndex(takenPositions, visited, newRow + 1, newCol + 1) ||
      getRandomCellIndex(takenPositions, visited, newRow + 1, newCol - 1) ||
      getRandomCellIndex(takenPositions, visited, newRow - 1, newCol + 1) ||
      getRandomCellIndex(takenPositions, visited, newRow - 1, newCol - 1) ||
      getRandomCellIndex(takenPositions, visited, newRow, newCol + 1) ||
      getRandomCellIndex(takenPositions, visited, newRow, newCol - 1) ||
      getRandomCellIndex(takenPositions, visited, newRow - 1, newCol) ||
      getRandomCellIndex(takenPositions, visited, newRow + 1, newCol)
    );
  };

  const getRandomCell = takenPositions => {
    const [row, col] = getRandomCellIndex(takenPositions);
    return posIndex[row] + col;
  };

  const generateRandomShips = ship => {
    reset();
    const getRandomShipSpace = length => {
      const newSpaceIsValid = space => {
        if (space.every(positionIsValid)) {
          return space;
        }
        return false;
      };
      const getNewSpace = (row, col, size, dir = { x: 1, y: 0 }, newSpace = []) => {
        let len = size;
        const { y, x } = dir;
        const newRow = row + x;
        const newCol = col + y;

        newSpace.push(posIndex[row] + col);
        len -= 1;
        if (len > 0) {
          getNewSpace(newRow, newCol, len, dir, newSpace);
        }
        return newSpace;
      };
      const [row, col] = getRandomCellIndex(boundaries);

      return (
        newSpaceIsValid(getNewSpace(row, col, length, { x: 0, y: 1 })) ||
        newSpaceIsValid(getNewSpace(row, col, length, { x: 1, y: 0 }))
      );
    };

    const shipTypes = Object.keys(shipPerBoard);
    shipTypes.forEach(type => {
      while (isValidType(type)) {
        const shipSpace = getRandomShipSpace(shipSizes[type]);
        if (shipSpace) {
          placeShip(ship(type, shipSpace));
        }
      }
    });

    return ships;
  };

  const findShipIndex = pos => ships.findIndex(({ position }) => position.includes(pos));
  const findShip = pos => ships.find(({ position }) => position.includes(pos));

  const generateFullPosition = (head, isHorizontal, shipType) => {
    const size = shipSizes[shipType];
    const tempPosition = [];
    tempPosition.push(head);
    let i = 1;
    if (isHorizontal) {
      while (i < size) {
        tempPosition.push(head[0] + (head[1] * 1 + i));
        i += 1;
      }
    } else {
      const newIndex = posIndex.findIndex(e => e === head[0]);
      while (i < size) {
        tempPosition.push(posIndex[newIndex + i] + head[1]);
        i += 1;
      }
    }
    return tempPosition;
  };

  const placeShipOnBoard = (ship, pos, shipType) => {
    const position = generateFullPosition(pos, true, shipType);
    if (placeShip(ship(shipType, position))) {
      return true;
    }
    return false;
  };

  const moveShip = (ship, oldPosition) => {
    const shipIndex = findShipIndex(oldPosition);
    const { position, shipType } = ships[shipIndex];
    const isHorizontal = position[0][0] === position[1][0];
    const removeShip = () => {
      ships.splice(shipIndex, 1);
      shipPerBoard[shipType] += 1;
      position.forEach(value => {
        const index = positions.findIndex(mark => mark === value);
        positions.splice(index, 1);
      });
      refreshBoundary();
    };

    const displace = newPosition => {
      removeShip();
      const fullPosition = generateFullPosition(newPosition, isHorizontal, shipType);
      if (placeShip(ship(shipType, fullPosition))) {
        return true;
      }
      placeShip(ship(shipType, position));
      return false;
    };

    const rotate = () => {
      removeShip();
      const changeDirection = generateFullPosition(oldPosition, !isHorizontal, shipType);
      if (placeShip(ship(shipType, changeDirection))) {
        return true;
      }
      placeShip(ship(shipType, position));
      return false;
    };
    return { displace, rotate };
  };

  const receiveAttack = pos => {
    if (positionIsOnBoard(pos)) {
      if (playedPositions.includes(pos)) {
        return false;
      }
      playedPositions.push(pos);
      const targetShip = findShip(pos);
      if (targetShip && targetShip.hit(pos)) {
        hitAttacks.push(pos);
        return true;
      }
      missedAttacks.push(pos);
      return false;
    }
    return false;
  };

  return {
    placeShip,
    receiveAttack,
    isAllSunk,
    missedAttacks,
    hitAttacks,
    generateRandomShips,
    ships,
    isFilled,
    getRandomCell,
    placeShipOnBoard,
    moveShip,
    reset,
  };
};

export default gameBoard;
