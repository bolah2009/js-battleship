const player = (newBoard, isComputer = true) => {
  let board = newBoard;
  const isComputerPlayer = isComputer;
  const attackedPositions = [];
  const generateRandomPosition = () => board.getRandomCell(attackedPositions);
  const reset = emptyBoard => {
    board = emptyBoard;
    attackedPositions.splice(0);
    return board;
  };

  const placeShips = ({ ships, ship } = {}) => {
    if (ship || isComputerPlayer) {
      board.generateRandomShips(ship);
    } else if (ships) {
      ships.forEach(newShip => board.placeShip(newShip));
    }
    return board.isFilled();
  };

  const takeTurn = (opponentBoard, pos) => {
    attackedPositions.push(pos);
    return opponentBoard.receiveAttack(pos);
  };

  return {
    placeShips,
    takeTurn,
    attackedPositions,
    generateRandomPosition,
    board,
    reset,
  };
};

export default player;
