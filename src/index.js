import mainView from './modules/views/mainView';
import battleship from './modules/models/battleship';
import { refreshBoard } from './modules/views/gameBoardView';

const getElement = (selector, parent = document) => parent.querySelector(selector);

const mainContent = getElement('#content');
mainContent.appendChild(mainView());

const shipPort = () => getElement('.ships');
const playerBoard = () => getElement('.player-board');
const opponentBoard = () => getElement('.opponent-board');
const infoElement = getElement('#info');
const controlPanel = getElement('.control-panel');
const randomButton = getElement('[data-action="random"]');
const startButton = getElement('[data-action="start"]');
const resetButton = getElement('[data-action="reset"]');
const placeShipButton = getElement('[data-action="place-ships"]');
const computerButton = getElement('[data-action="computer"]');
const getCurrentShip = shipType => getElement(`.ship.${shipType}`, shipPort());
const getBoardCell = pos => getElement(`[data-name=${pos}]`, playerBoard());

const game = battleship();

const gameStatus = message => {
  infoElement.textContent = message;
};

const disableButtons = (bol = true) => {
  const startButtons = [computerButton, placeShipButton, randomButton, startButton];
  resetButton.disabled = !bol;
  startButtons.forEach(button => {
    button.disabled = bol;
  });
};

const appendShipsToBoard = () => {
  const ships = game.randomiseShips();
  const placeOnBoard = ({ position, shipType }) => {
    const currentShip = getCurrentShip(shipType);
    const cell = getBoardCell(position[0]);
    if (position.length > 1 && position[0][0] !== position[1][0]) {
      currentShip.classList.add('rotate');
    }
    cell.appendChild(currentShip);
  };

  ships.forEach(placeOnBoard);
};

const placeShipsOnBoard = () => {
  game.clearBoard();
  refreshBoard();
  shipPort().classList.remove('d-none');
  opponentBoard().classList.add('d-none');
  gameStatus('Please, drag ships and drop on the board.');
};

const handleDragEvent = event => {
  const { dataTransfer, target } = event;
  if (!target.dataset || !target.dataset.type || target.dataset.type !== 'ship') {
    return false;
  }

  dataTransfer.setData('text/plain', target.id);
  dataTransfer.setData('shipName', target.dataset.name);
  dataTransfer.setData('source', target.parentNode.dataset.type);
  dataTransfer.setData('sourcePosition', target.parentNode.dataset.name);
  dataTransfer.dropEffect = 'move';
  return true;
};

const handleDragOverEvent = event => {
  const { target } = event;
  event.preventDefault();
  if (!target.dataset || !target.dataset.type || target.dataset.type !== 'cell') {
    return false;
  }
  return true;
};

const handleDropEvent = event => {
  const { target, dataTransfer } = event;
  event.preventDefault();
  if (!target.dataset || !target.dataset.type || target.dataset.type !== 'cell') {
    return false;
  }

  const shipID = dataTransfer.getData('text/plain');
  const shipName = dataTransfer.getData('shipName');
  const source = dataTransfer.getData('source');
  const sourcePosition = dataTransfer.getData('sourcePosition');
  const currentPosition = target.dataset.name;
  if (source === 'cell') {
    const movingShip = game.moveShip(sourcePosition);
    if (movingShip.displace(currentPosition)) {
      target.appendChild(document.getElementById(shipID));
      return true;
    }
    gameStatus('Sorry, Can not move ship from current position to an invalid position!');
    return false;
  }
  if (game.placeShipOnBoard(currentPosition, shipName)) {
    target.appendChild(document.getElementById(shipID));
    return true;
  }
  gameStatus('Sorry, Can not move ship to an invalid position!');
  return false;
};

const rotateShip = ({
  target,
  target: {
    dataset: { type },
    parentNode: {
      dataset: { type: parentType, name },
    },
  },
}) => {
  if (!type || !parentType || parentType !== 'cell' || type !== 'ship') {
    return;
  }

  if (game.moveShip(name).rotate()) {
    target.classList.toggle('rotate');
    return;
  }
  target.classList.add('error');
  gameStatus('Can not rotate ship, invalid position!');
  setInterval(() => target.classList.remove('error'), 1500);
};

const toggleShipEvents = toggleEventListener => {
  toggleEventListener('dragstart', handleDragEvent);
  toggleEventListener('dragover', handleDragOverEvent);
  toggleEventListener('drop', handleDropEvent);
  toggleEventListener('dragend', handleDragEvent);
  toggleEventListener('click', rotateShip);
};

const startGame = () => {
  if (game.start()) {
    shipPort().classList.add('d-none');
    opponentBoard().classList.remove('d-none');
    disableButtons();
    gameStatus('Game Starts, Player One make your move!');
    toggleShipEvents(document.removeEventListener);
    return;
  }
  gameStatus('Place all your ships or use randomise to place ships!');
};

const resetGame = () => {
  game.reset();
  refreshBoard();
  appendShipsToBoard();
  gameStatus('Game Reset, Player One place your ships!');
  disableButtons(false);
  toggleShipEvents(document.addEventListener);
};

const handleControls = ({
  target: {
    dataset: { type, action },
  },
}) => {
  if (!type || type !== 'control') {
    return;
  }
  switch (action) {
    case 'random':
      refreshBoard();
      appendShipsToBoard();
      break;
    case 'place-ships':
      placeShipsOnBoard();
      break;
    case 'start':
      startGame();
      break;
    case 'reset':
      resetGame();
      break;
    case 'computer':
      break;
    default:
      break;
  }
};

const playGame = ({
  target,
  target: {
    dataset: { name, player },
  },
}) => {
  if (!player || player !== 'opponent' || !game.isGameOn()) {
    return;
  }

  const checkWinner = () => {
    if (game.winStatus()) {
      gameStatus(`${game.winStatus()} wins the game... !!!`);
      document.removeEventListener('click', playGame);
      return true;
    }
    return false;
  };

  if (game.isValidAttack(name)) {
    if (game.play(name)) {
      target.classList.add('attacked');
      gameStatus('Good Hit! Play again...');
      checkWinner();
    } else {
      document.removeEventListener('click', playGame);
      target.classList.add('missed');
      gameStatus('Missed Hit! Player Two time...');
      let randPos = game.randomPosition();
      const opponentCell = pos => getElement(`[data-name=${pos}]`, playerBoard());
      while (game.play(randPos)) {
        gameStatus('Nice Hit! Playing again...');
        opponentCell(randPos).classList.add('attacked');
        if (checkWinner()) {
          return;
        }
        randPos = game.randomPosition();
      }
      opponentCell(randPos).classList.add('missed');
      gameStatus('Missed Hit! Player One time...');
      document.addEventListener('click', playGame);
    }
    return;
  }
  gameStatus('Choose a valid position...');
};

const startApp = () => {
  toggleShipEvents(document.addEventListener);
  controlPanel.addEventListener('click', handleControls);
  document.addEventListener('click', playGame);

  appendShipsToBoard();
};

startApp();
