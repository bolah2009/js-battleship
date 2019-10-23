import ship from '../src/modules/ship';

const battleshipShip = ship('battleship', ['A1', 'A2', 'A3', 'A4']);
const cruiserShip = ship('cruiser', ['G1', 'H1', 'I1']);
const destroyerShip = ship('destroyer', ['C1', 'C2']);
const submarineShip = ship('submarine', ['A1']);

test('it returns an object', () => {
  expect(typeof destroyerShip).toBe('object');
});

test('it includes size of the ship', () => {
  expect(destroyerShip.size).toBeGreaterThan(0);
});

describe('types of ships', () => {
  test('the submarine is a single-decker - single-funnel with size 1', () => {
    expect(submarineShip.size).toBe(1);
  });

  test('the destroyer is a two-decker - two-funnel with size 2', () => {
    expect(destroyerShip.size).toBe(2);
  });

  test('the cruiser is a three-decker - three-funnel with size 3', () => {
    expect(cruiserShip.size).toBe(3);
  });

  test('the battleship is a four-decker - four-funnel with size 4', () => {
    expect(battleshipShip.size).toBe(4);
  });
});

test('it includes positions of where it has been hit', () => {
  const hitPosition = 'C1';
  destroyerShip.hit(hitPosition);
  expect(destroyerShip.hits).toContain(hitPosition);
});

describe('hit() method', () => {
  test('takes a string as position returns true if the ship is in the same position', () => {
    expect(battleshipShip.hit('A1')).toBeTruthy();
  });

  test('returns false if the ship is not in the same position', () => {
    expect(battleshipShip.hit('H1')).toBeFalsy();
  });

  test('returns false if the ship has been hit in the same position', () => {
    destroyerShip.hit('C1');
    expect(destroyerShip.hit('C1')).toBeFalsy();
  });
});

describe('isSunk() method', () => {
  test('returns true if all position of the ship has been hit', () => {
    submarineShip.hit('A1');
    expect(submarineShip.isSunk()).toBeTruthy();
  });

  test('returns false if one or more of the ship position have not been hit', () => {
    cruiserShip.hit('G1');
    expect(cruiserShip.isSunk()).toBeFalsy();
    cruiserShip.hit('H1');
    expect(cruiserShip.isSunk()).toBeFalsy();
    cruiserShip.hit('G1');
    expect(cruiserShip.isSunk()).toBeFalsy();
    cruiserShip.hit('A1');
    expect(cruiserShip.isSunk()).toBeFalsy();
    cruiserShip.hit('I1');
    expect(cruiserShip.isSunk()).toBeTruthy();
  });
});

test('throws an error when wrong ship type is passed', () => {
  expect(() => ship('wrongship', ['A1', 'A2'])).toThrow(/wrong type/);
});

test('throws an error when wrong ship position is passed', () => {
  expect(() => ship('submarine', ['A1', 'A2'])).toThrow(/wrong position/);
});
