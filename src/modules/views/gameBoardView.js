import createFragment from './fragments';
import shipView from './shipView';

const gameBoardView = () => {
  const posIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cell = (id, player) => `<td 
  class="cell" data-type="cell" 
  data-name=${id} data-player=${player}></td>`;
  const createRows = (pos, player) => {
    const col = [];
    let i = 0;
    while (i < 10) {
      col.push(cell(pos + i, player));
      i += 1;
    }
    return `<tr>${col.join('')}</tr>`;
  };

  const createColumns = player => {
    const row = [];
    let i = 0;
    while (i < 10) {
      row.push(createRows(posIndex[i], player));
      i += 1;
    }
    return `<tbody>${row.join('')}</tbody>`;
  };

  const createHTML = player => `<table class="table">${createColumns(player)}</table>`;

  const attributes = board => [{ name: 'class', value: `table-container ${board}` }];

  const player = createFragment({
    attributes: attributes('player-board'),
    html: createHTML('current'),
  });

  const opponent = createFragment({
    attributes: attributes('opponent-board'),
    html: createHTML('opponent'),
  });

  const boardsWrapper = createFragment({
    attributes: [{ name: 'class', value: 'boards-wrapper d-flex jc-c' }],
  });

  const createBoards = () => {
    const boards = boardsWrapper;
    boards.firstElementChild.appendChild(shipView());
    boards.firstElementChild.appendChild(player);
    boards.firstElementChild.appendChild(opponent);
    return boards;
  };

  return createBoards();
};

export const refreshBoard = () => {
  const oldBoard = document.querySelector('.boards-wrapper');
  const newBoard = gameBoardView();

  oldBoard.parentNode.replaceChild(newBoard, oldBoard);
};

export default gameBoardView;
