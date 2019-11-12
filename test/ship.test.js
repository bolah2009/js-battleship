import ship from '../src/modules/models/ship';

const carrierShip = ship('carrier', ['A1', 'A2', 'A3', 'A4', 'A5']);
const battleshipShip = ship('battleship', ['C1', 'C2', 'C3', 'C4']);
const cruiserShip = ship('cruiser', ['G1', 'H1', 'I1']);
const submarineShip = ship('submarine', ['G4', 'G5', 'G6']);
const destroyerShip = ship('destroyer', ['E1', 'E2']);

test('it returns an object', () => {
  expect(typeof destroyerShip).toBe('object');
});

test('it includes size of the ship', () => {
  expect(destroyerShip.size).toBeGreaterThan(0);
});

describe('types of ships', () => {
  test('the destroyer is a two-decker - two-funnel with size 2', () => {
    expect(destroyerShip.size).toBe(2);
  });

  test('the submarine is a three-decker - three-funnel with size 3', () => {
    expect(submarineShip.size).toBe(3);
  });

  test('the cruiser is a three-decker - three-funnel with size 3', () => {
    expect(cruiserShip.size).toBe(3);
  });

  test('the battleship is a four-decker - four-funnel with size 4', () => {
    expect(battleshipShip.size).toBe(4);
  });

  test('the carrier is a five-decker - five-funnel with size 5', () => {
    expect(carrierShip.size).toBe(5);
  });
});

test('it includes positions of where it has been hit', () => {
  const hitPosition = 'E1';
  destroyerShip.hit(hitPosition);
  expect(destroyerShip.hits).toContain(hitPosition);
});

describe('hit() method', () => {
  test('takes a string as position returns true if the ship is in the same position', () => {
    expect(battleshipShip.hit('C1')).toBeTruthy();
  });

  test('returns false if the ship is not in the same position', () => {
    expect(battleshipShip.hit('H1')).toBeFalsy();
  });

  test('returns false if the ship has been hit in the same position', () => {
    destroyerShip.hit('E1');
    expect(destroyerShip.hit('E1')).toBeFalsy();
  });
});

describe('isSunk() method', () => {
  test('returns true if all position of the ship has been hit', () => {
    destroyerShip.hit('E1');
    destroyerShip.hit('E2');
    expect(destroyerShip.isSunk()).toBeTruthy();
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
