import battleShip from '../src/modules/models/battleship';

test('it returns an object', () => {
  expect(typeof battleShip()).toBe('object');
});

const game = battleShip();

test('randomiseShips() method: generates 9 different ships and place on the board', () => {
  const oldShips = game.randomiseShips();

  expect(oldShips).toHaveLength(9);

  const newShips = battleShip().randomiseShips();
  expect(newShips).toHaveLength(9);

  expect(oldShips).not.toBe(newShips);
});

test('start() method: return true when player board is filled with valid ships`', () => {
  game.clearBoard();
  expect(game.start()).toBeFalsy();
  game.randomiseShips();
  expect(game.start()).toBeTruthy();
});

test('isGameOn() method: checks if board is filled and ready to play the game', () => {
  game.reset();
  expect(game.isGameOn()).toBeFalsy();
  game.randomiseShips();
  game.start();
  expect(game.isGameOn()).toBeTruthy();
});

test('placeShipOnBoard() method: takes a position and ship name as string and place ships on the board ', () => {
  game.clearBoard();

  expect(game.placeShipOnBoard('A0', 'carrier')).toBeTruthy();

  expect(game.placeShipOnBoard('A6', 'battleship')).toBeTruthy();

  expect(game.placeShipOnBoard('C1', 'cruiser')).toBeTruthy();
  expect(game.placeShipOnBoard('E1', 'cruiser')).toBeTruthy();

  expect(game.placeShipOnBoard('C6', 'submarine')).toBeTruthy();
  expect(game.placeShipOnBoard('E6', 'submarine')).toBeTruthy();
  expect(game.placeShipOnBoard('E7', 'submarine')).toBeFalsy();

  expect(game.placeShipOnBoard('G1', 'destroyer')).toBeTruthy();
  expect(game.placeShipOnBoard('G4', 'destroyer')).toBeTruthy();
  expect(game.placeShipOnBoard('I1', 'destroyer')).toBeTruthy();
  expect(game.placeShipOnBoard('G8', 'destroyer')).toBeFalsy();
});

test('moveShip() method: takes a position and returns a object with `displace` and `rotate`', () => {
  const moveShip = game.moveShip('A1');

  expect(moveShip).toHaveProperty('displace');
  expect(moveShip).toHaveProperty('rotate');
});

test('play() method: takes a position and returns true when a player get a hit otherwise it returns false and change current player`', () => {
  let i = 200;
  while (i > 0) {
    i -= 1;
    const randPos = game.randomPosition();
    expect(game.isValidAttack(randPos)).toBeTruthy();
    game.play(randPos);
    if (game.winStatus()) {
      break;
    }
  }

  expect(game.winStatus()).toBeTruthy();
  expect(game.winStatus()).toMatch('Player');
});
