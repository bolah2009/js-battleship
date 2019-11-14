[![Maintainability](https://api.codeclimate.com/v1/badges/c82295c5b142228f6276/maintainability)](https://codeclimate.com/github/bolah2009/js-testing/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c82295c5b142228f6276/test_coverage)](https://codeclimate.com/github/bolah2009/js-testing/test_coverage)
[![Build Status](https://travis-ci.com/bolah2009/js-testing.svg?branch=master)](https://travis-ci.com/bolah2009/js-testing)
[![codecov](https://codecov.io/gh/bolah2009/js-testing/branch/master/graph/badge.svg)](https://codecov.io/gh/bolah2009/js-testing)
[![Netlify Status](https://api.netlify.com/api/v1/badges/526dd003-4558-4a03-b291-ba07e9eee51a/deploy-status)](https://app.netlify.com/sites/js-battleship/deploys)

# PROJECT: Battleship

This is the final project of the Main JavaScript curriculum at [Microverse](https://www.microverse.org/) - @microverseinc

The objective is to create a [battleship game](<https://en.wikipedia.org/wiki/Battleship_(game)>) using Test Driven Development. The features of the app also include:

- Randomise ships on grid
- Place ships manually using drag and drop
- Rotate ship positions by clicking on the ship
- Start and Reset game
- Uses JavaScript Module Pattern and Factory Function
- Uses Document Fragment Web API for creating elements
- HTML Drag and Drop API
- Testing with Jest
- Linting with ESLint and Stylelint
- Continuos Integration with Travis and Codecov

### Development

- Clone the project

```bash
git clone https://github.com/bolah2009/js-battleship.git

```

- Install Dependencies

```bash
npm install
```

- Run test

```bash
npm run test
```

- Run linter (eslint and stylelint)

```bash
npm run lint:check
```

- Run Prettier

```bash
npm run format:check
```

- Run Script (Development mode)

```bash
npm run dev
```

- Run Script (Production mode)

```bash
npm run build
```

- Start server

```bash
npm run start
```

### [Assignment link](https://www.theodinproject.com/courses/javascript/lessons/battleship)

### [Live link](https://bolah2009.github.io/js-battleship/)

### How to play (Rules of the Game)

The game is played on two grids, one is the `Ocean Grid` and the other is the `Target Grid`.

On one grid (`Ocean Grid`) the player arranges ships and records the shots by the opponent. On the other grid (`Target Grid`), the player records their shots.

Before play begins, the player secretly arranges their ships on their primary grid. Each ship occupies some consecutive squares on the grid, arranged either horizontally or vertically.
The arrangement can be randomised using the `Randomise` button or be placed manually using the `Place ships` button and using drag and drop to place ships on the grid horizontally. Clicking on a ship rotates the position vertically when in horizontal poition and vice versa.

The number of squares for each ship is determined by the type of the ship. The ships cannot overlap, that is, only one ship can occupy any given square in the grid and ships can not be placed beside each other.

The types and numbers of ships allowed are the same for each player.

| Number per Grid | Class of ship | Size |
| --------------- | ------------- | ---- |
| 1               | Carrier       | 5    |
| 1               | Battleship    | 4    |
| 2               | Cruiser       | 3    |
| 2               | Submarine     | 3    |
| 3               | Destroyer     | 2    |

After the ships have been positioned, the game proceeds in a series of rounds when the `Start Game` button is clicked. The `Reset Game` button can be clicked at any time during the game to stop and restart the game.

In each round, each player takes a turn to click on a target square in the opponent's grid which is to be shot at. The attacking player "target" grid is marked with red for "hit", black for "miss".

If all of a player's ships have been sunk, the game is over and their opponent wins.

Learn more about [the game here](<https://en.wikipedia.org/wiki/Battleship_(game)>)

### Screenshot

![Screenshot 1](https://user-images.githubusercontent.com/36057474/68652960-ea8b8980-052a-11ea-80f7-4250cd83ea41.png)

![Screenshot 2](https://user-images.githubusercontent.com/36057474/68653265-a482f580-052b-11ea-9e19-e630f0f8ebc2.png)

### Authors

- [@bolah2009](https://github.com/bolah2009/)
