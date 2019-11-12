import ship from './ship';
import player from './player';
import gameBoard from './gameboard';

const battleShip = () => {
  const playerOne = player(gameBoard(), false);
  playerOne.placeShips({ ship });

  const playerTwo = player(gameBoard());
  playerTwo.placeShips({ ship });

  let currentPlayer = playerOne;
  let opponentPlayer = playerTwo;
  let isOn = false;
  const isGameOn = () => isOn;
  const isValidAttack = pos => !currentPlayer.attackedPositions.includes(pos);

  const changePlayer = () => {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
      opponentPlayer = playerOne;
    } else {
      currentPlayer = playerOne;
      opponentPlayer = playerTwo;
    }
  };

  const randomiseShips = () => currentPlayer.board.generateRandomShips(ship);

  const clearBoard = () => {
    isOn = false;
    currentPlayer.board.reset();
  };

  const reset = () => {
    isOn = false;
    [playerOne, playerTwo].forEach(singlePlayer => {
      singlePlayer.reset(gameBoard());
      singlePlayer.placeShips({ ship });
    });
  };

  const moveShip = position => currentPlayer.board.moveShip(ship, position);

  const placeShipOnBoard = (currentPosition, shipName) => {
    const {
      board: { placeShipOnBoard: placeShip },
    } = currentPlayer;
    return placeShip(ship, currentPosition, shipName);
  };

  const winStatus = () => {
    if (playerOne.board.isAllSunk()) {
      return 'Player Two';
    }

    if (playerTwo.board.isAllSunk()) {
      return 'Player One';
    }
    return false;
  };

  const play = (pos = '') => {
    if (currentPlayer.takeTurn(opponentPlayer.board, pos)) {
      return true;
    }
    changePlayer();
    return false;
  };

  const start = () => {
    if (currentPlayer.board.isFilled()) {
      isOn = true;
      return true;
    }
    return false;
  };

  const randomPosition = () => currentPlayer.generateRandomPosition();

  return {
    randomiseShips,
    clearBoard,
    reset,
    moveShip,
    placeShipOnBoard,
    start,
    play,
    isGameOn,
    isValidAttack,
    winStatus,
    randomPosition,
  };
};

export default battleShip;
