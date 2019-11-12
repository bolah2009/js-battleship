import ship from '../src/modules/models/ship';
import gameBoard from '../src/modules/models/gameboard';
import player from '../src/modules/models/player';

test('it returns an object', () => {
  expect(typeof player()).toBe('object');
});

describe('placeShips() method', () => {
  test('should be able to place an array of valid ships', () => {
    const newBoard = gameBoard();
    const newPlayer = player(newBoard, false, 'Player 1');
    const ships = [
      ship('carrier', ['C0', 'C1', 'C2', 'C3', 'C4']),
      ship('battleship', ['F0', 'F1', 'F2', 'F3']),
      ship('cruiser', ['E5', 'E6', 'E7']),
      ship('cruiser', ['J6', 'J7', 'J8']),
      ship('submarine', ['H3', 'H4', 'H5']),
      ship('submarine', ['H7', 'H8', 'H9']),
      ship('destroyer', ['C6', 'C7']),
      ship('destroyer', ['J3', 'J4']),
      ship('destroyer', ['I1', 'J1']),
    ];

    expect(newPlayer.placeShips({ ships })).toBeTruthy();
  });

  test('returns false when player pass no ship', () => {
    const newBoard = gameBoard();
    const newPlayer = player(newBoard, false, 'Player 2');
    expect(newPlayer.placeShips()).toBeFalsy();
  });

  test('should be able to generate valid random ships', () => {
    const newBoard = gameBoard();
    const newPlayer = player(newBoard, false, 'Player 1');
    expect(newPlayer.placeShips({ ship })).toBeTruthy();
  });

  test('should be able to generate valid random ships for computer player', () => {
    const newBoard = gameBoard();
    const newPlayer = player(newBoard);
    expect(newPlayer.placeShips({ ship })).toBeTruthy();
  });
});

test('takeTurn() should be able to take turns in attacking opponent ships', () => {
  const playerOneBoard = gameBoard();
  const playerOne = player(playerOneBoard, false);

  const computerBoard = gameBoard();
  const computerPlayer = player(computerBoard);

  playerOne.placeShips({ ship });
  computerPlayer.placeShips({ ship });

  playerOne.takeTurn(computerPlayer.board, 'A2');
  computerPlayer.takeTurn(playerOne.board, 'B3');

  expect(playerOne.attackedPositions).toContain('A2');
  expect(playerOne.attackedPositions).toContain('A2');
});

test('reset() replace old board with a new one and set attacked positions to empty', () => {
  const playerOneBoard = gameBoard();
  const playerOne = player(playerOneBoard, false);

  const computerBoard = gameBoard();
  const computerPlayer = player(computerBoard);

  playerOne.placeShips({ ship });
  computerPlayer.placeShips({ ship });

  expect(playerOne.attackedPositions).toHaveLength(0);
  playerOne.takeTurn(computerPlayer.board, 'A2');
  playerOne.takeTurn(computerPlayer.board, 'A3');
  playerOne.takeTurn(computerPlayer.board, 'A3');
  expect(playerOne.attackedPositions).toHaveLength(3);
  playerOne.reset(gameBoard());
  expect(playerOne.attackedPositions).toHaveLength(0);
});

test('generateRandomPosition() should generate more than 50 random attack positions for computer', () => {
  const playerOneBoard = gameBoard();
  const playerOne = player(playerOneBoard, false);

  const computerBoard = gameBoard();
  const computerPlayer = player(computerBoard);

  playerOne.placeShips({ ship });
  computerPlayer.placeShips({ ship });

  let count = 50;
  while (count > 0) {
    const randPos = computerPlayer.generateRandomPosition();
    computerPlayer.takeTurn(playerOne.board, randPos);
    expect(computerPlayer.attackedPositions).toContain(randPos);
    count -= 1;
  }
});
