import ship from '../src/modules/ship';
import gameBoard from '../src/modules/gameboard';

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

  describe('types of ships', () => {
    const newBoard = gameBoard();

    test('it accepts only 1 "battleship" ship', () => {
      const firstShip = newBoard.placeShip(
        ship('battleship', ['A1', 'A2', 'A3', 'A4']),
      );
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(
        ship('battleship', ['C1', 'C2', 'C3', 'C4']),
      );
      expect(secondShip).toBeFalsy();
    });

    test('it accepts 2 "cruiser" ships', () => {
      const firstShip = newBoard.placeShip(ship('cruiser', ['C1', 'C2', 'C3']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(
        ship('cruiser', ['E1', 'E2', 'E3']),
      );
      expect(secondShip).toBeTruthy();
      const thirdShip = newBoard.placeShip(ship('cruiser', ['G1', 'G2', 'G3']));
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

    test('it accepts 4 "submarine" ships', () => {
      const firstShip = newBoard.placeShip(ship('submarine', ['A6']));
      expect(firstShip).toBeTruthy();
      const secondShip = newBoard.placeShip(ship('submarine', ['B8']));
      expect(secondShip).toBeTruthy();
      const thirdShip = newBoard.placeShip(ship('submarine', ['I5']));
      expect(thirdShip).toBeTruthy();
      const fourthShip = newBoard.placeShip(ship('submarine', ['I4']));
      expect(fourthShip).toBeTruthy();
      const fifthShip = newBoard.placeShip(ship('submarine', ['18']));
      expect(fifthShip).toBeFalsy();
    });
  });
});

describe('receiveAttack() method: takes a coordinate and determines whether or not the attack hit a ship', () => {
  test('returns true when a ship is attacked', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    board.placeShip(newShip);
    expect(board.receiveAttack('A1')).toBeTruthy();
  });

  test('returns false when no ship is positioned on the coordinate passed', () => {
    const board = gameBoard();
    const newShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
    board.placeShip(newShip);
    expect(board.receiveAttack('C1')).toBeFalsy();
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

test('isAllSunk() method: reports whether or not all of their ships have been sunk', () => {
  const newBoard = gameBoard();

  newBoard.placeShip(ship('cruiser', ['C1', 'C2', 'C3']));
  newBoard.placeShip(ship('destroyer', ['G4', 'G5']));
  newBoard.placeShip(ship('submarine', ['A6']));
  newBoard.placeShip(ship('submarine', ['B8']));
  expect(newBoard.isAllSunk()).toBeFalsy();
  newBoard.receiveAttack('B8');
  expect(newBoard.isAllSunk()).toBeFalsy();
  const validPositions = ['C1', 'C2', 'C3', 'G4', 'G5', 'A6'];
  validPositions.forEach(pos => newBoard.receiveAttack(pos));
  expect(newBoard.isAllSunk()).toBeTruthy();
});
