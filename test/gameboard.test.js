import ship from '../src/modules/models/ship';
import gameBoard from '../src/modules/models/gameboard';

test('it returns an object', () => {
  expect(typeof gameBoard()).toBe('object');
});

describe('placeShip() method: place ships at specific coordinates by calling the ship function', () => {
  test('returns true for valid ships', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    expect(board.placeShip(newShip)).toBeTruthy();
  });

  test('returns false and reject ship when coordinates is taken', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    expect(board.placeShip(newShip)).toBeTruthy();
    expect(board.placeShip(newShip)).toBeFalsy();
  });

  test('returns false and reject ship for invalid coordinates format', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'K4']);
    expect(board.placeShip(newShip)).toBeFalsy();
    expect(board.placeShip(ship('submarine', ['A9', 'A10', 'A11']))).toBeFalsy();
    expect(board.placeShip(ship('submarine', ['3A', 'A4', 'B5']))).toBeFalsy();
  });

  describe('types of ships', () => {
    const newBoard = gameBoard();

    test('it accepts only 1 "carrier" ship', () => {
      const firstShip = newBoard.placeShip(ship('carrier', ['A0', 'A1', 'A2', 'A3', 'A4']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(ship('carrier', ['C0', 'C1', 'C2', 'C3', 'C4']));
      expect(secondShip).toBeFalsy();
    });

    test('it accepts only 1 "battleship" ship', () => {
      const firstShip = newBoard.placeShip(ship('battleship', ['A6', 'A7', 'A8', 'A9']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(ship('battleship', ['C1', 'C2', 'C3', 'C4']));
      expect(secondShip).toBeFalsy();
    });

    test('it accepts 2 "cruiser" ships', () => {
      const firstShip = newBoard.placeShip(ship('cruiser', ['C1', 'C2', 'C3']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(ship('cruiser', ['E1', 'E2', 'E3']));
      expect(secondShip).toBeTruthy();
      const thirdShip = newBoard.placeShip(ship('cruiser', ['G1', 'G2', 'G3']));
      expect(thirdShip).toBeFalsy();
    });

    test('it accepts 2 "submarine" ships', () => {
      const firstShip = newBoard.placeShip(ship('submarine', ['C6', 'C7', 'C8']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(ship('submarine', ['E8', 'F8', 'G8']));
      expect(secondShip).toBeTruthy();
      const thirdShip = newBoard.placeShip(ship('submarine', ['I5', 'I6', 'I7']));
      expect(thirdShip).toBeFalsy();
    });

    test('it accepts 3 "destroyer" ships', () => {
      const firstShip = newBoard.placeShip(ship('destroyer', ['G1', 'G2']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(ship('destroyer', ['G4', 'G5']));
      expect(secondShip).toBeTruthy();
      const thirdShip = newBoard.placeShip(ship('destroyer', ['I1', 'I2']));
      expect(thirdShip).toBeTruthy();
      const fourthShip = newBoard.placeShip(ship('destroyer', ['I4', 'I5']));
      expect(fourthShip).toBeFalsy();
    });
  });
});

describe('placeShipOnBoard() method: takes a single coordinate, generates a full position and place ships at the full position', () => {
  test('returns true for valid single positions', () => {
    const board = gameBoard();
    expect(board.placeShipOnBoard(ship, 'A1', 'carrier')).toBeTruthy();
    expect(board.placeShipOnBoard(ship, 'C1', 'battleship')).toBeTruthy();
    expect(board.placeShipOnBoard(ship, 'E1', 'cruiser')).toBeTruthy();
    expect(board.placeShipOnBoard(ship, 'G1', 'submarine')).toBeTruthy();
    expect(board.placeShipOnBoard(ship, 'I1', 'destroyer')).toBeTruthy();
  });

  test('returns false and reject ship when coordinates is taken', () => {
    const board = gameBoard();
    expect(board.placeShipOnBoard(ship, 'A1', 'carrier')).toBeTruthy();
    expect(board.placeShipOnBoard(ship, 'A6', 'battleship')).toBeFalsy();
    expect(board.placeShipOnBoard(ship, 'A9', 'cruiser')).toBeFalsy();
  });
});

describe('moveShip() method: takes the ship function and an initail postion and returns an object that can "rotate" or "displace" the ship', () => {
  const board = gameBoard();
  board.placeShipOnBoard(ship, 'A1', 'carrier');

  const newShip = ship('destroyer', ['H9', 'I9']);
  board.placeShip(newShip);

  const validMovingShip = board.moveShip(ship, 'A1');
  const invalidMovingShip = board.moveShip(ship, 'H9');

  test('returns an object', () => {
    expect(typeof validMovingShip).toBe('object');
  });

  test('it uses the "rotate" property to reposition ship from vertical to horizontal and vice versa', () => {
    expect(validMovingShip.rotate()).toBeTruthy();
    expect(invalidMovingShip.rotate()).toBeFalsy();
  });

  test('it uses the "displace" property to move ship from intail position to another position', () => {
    expect(validMovingShip.displace('C5')).toBeTruthy();
    expect(validMovingShip.displace('H9')).toBeFalsy();
  });
});

describe('receiveAttack() method: takes a coordinate and determines whether or not the attack hit a ship', () => {
  test('returns true when a ship is attacked', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    board.placeShip(newShip);
    expect(board.receiveAttack('A1')).toBeTruthy();
    expect(board.hitAttacks).toContain('A1');
  });

  test('returns false and save position to missed attacks when no ship is positioned on the coordinate passed', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    board.placeShip(newShip);
    expect(board.receiveAttack('C1')).toBeFalsy();
    expect(board.missedAttacks).toContain('C1');
  });

  test('returns false for invalid positions and already played positions', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    board.placeShip(newShip);
    expect(board.receiveAttack('K1')).toBeFalsy();
    expect(board.receiveAttack('K10')).toBeFalsy();
    expect(board.receiveAttack('A1')).toBeTruthy();
    expect(board.receiveAttack('A1')).toBeFalsy();
  });
});

test('it uses the "missedAttacks" property to keep track of all missed attacks', () => {
  const board = gameBoard();
  const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
  board.placeShip(newShip);
  board.receiveAttack('A1');
  expect(board.missedAttacks).toEqual([]);
  board.receiveAttack('C1');
  expect(board.missedAttacks).toContain('C1');
});

test('it uses the "hitAttacks" property to keep track of all hit attacks', () => {
  const board = gameBoard();
  const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
  board.placeShip(newShip);
  board.receiveAttack('C1');
  expect(board.hitAttacks).toEqual([]);
  board.receiveAttack('A1');
  expect(board.hitAttacks).toContain('A1');
});

test('isAllSunk() method: reports whether or not all of their ships have been sunk', () => {
  const newBoard = gameBoard();

  newBoard.placeShip(ship('cruiser', ['C1', 'C2', 'C3']));
  newBoard.placeShip(ship('destroyer', ['G4', 'G5']));
  expect(newBoard.isAllSunk()).toBeFalsy();
  newBoard.receiveAttack('C1');
  expect(newBoard.isAllSunk()).toBeFalsy();
  const validPositions = ['C2', 'C3', 'G4', 'G5'];
  validPositions.forEach(pos => newBoard.receiveAttack(pos));
  expect(newBoard.isAllSunk()).toBeTruthy();
});

test('generateRandomShips() method fills the board with ships of random positions', () => {
  const newBoard = gameBoard();
  const newShip = ship;

  expect(newBoard.isFilled()).toBeFalsy();
  expect(newBoard.ships).toHaveLength(0);
  newBoard.generateRandomShips(newShip);

  expect(newBoard.isFilled()).toBeTruthy();
  expect(newBoard.ships).toHaveLength(9);
});

test('getRandomCell() method generates valid random positions from the board', () => {
  const newBoard = gameBoard();
  expect(newBoard.getRandomCell()).toHaveLength(2);
});
