import createFragment from './fragments';
import gameBoardView from './gameBoardView';

const mainView = () => {
  const board = gameBoardView();
  const createHeaderElement = () => {
    const html = `<h1>Battleship</h1>
                  <input value="Help" class="button details" type="button" data-type="control" data-action="details">
                  <p id="info" class="notification">Place the ships</p>`;
    const attributes = [{ name: 'class', value: 'status d-flex jc-sa' }];
    const element = 'header';
    return createFragment({ html, attributes, element });
  };

  const createControlPanel = () => {
    const attributes = [{ name: 'class', value: 'control-panel d-flex jc-c' }];
    const html = `
    <input value="Randomize" class="button" type="button" data-type="control" data-action="random"/>
    <input value="Place Ships" class="button" type="button" data-type="control" data-action="place-ships"/>
    <input value="Start Game"  class="button" type="button" data-type="control" data-action="start"/>  
    <input value="Reset Game"  class="button" type="button" data-type="control" data-action="reset" disabled="true"/>
    <label class="button computer d-none">
      <div>Play with computer?</div>
      <div class="choice">
      <span id="no">No</span>
      <span class="switch">
      <input class="computer-player" checked type="checkbox" data-type="control" data-action="computer"/>
      <span class="slider"></span>
      </span>
      <span id="yes">Yes</span>
      </div>
    </label>`;

    return createFragment({ html, attributes });
  };

  const fragment = document.createDocumentFragment();
  fragment.appendChild(createHeaderElement());
  fragment.appendChild(board);
  fragment.appendChild(createControlPanel());
  return fragment;
};

export default mainView;
