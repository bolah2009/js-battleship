import greatPlayer from '../src';

test('it returns an string', () => {
  expect(typeof greatPlayer()).toBe('string');
});

test('it greats a player', () => {
  expect(greatPlayer()).toBe('Hello, friend');
  expect(greatPlayer('bola')).toBe('Hello, bola');
});
