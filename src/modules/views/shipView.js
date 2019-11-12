import createFragment from './fragments';

const shipView = () => {
  const shipTypes = [
    {
      shipType: 'carrier',
      noPerPlayer: 1,
      size: 5,
    },
    {
      shipType: 'battleship',
      noPerPlayer: 1,
      size: 4,
    },
    {
      shipType: 'cruiser',
      noPerPlayer: 2,
      size: 3,
    },
    {
      shipType: 'submarine',
      noPerPlayer: 2,
      size: 3,
    },
    {
      shipType: 'destroyer',
      noPerPlayer: 3,
      size: 2,
    },
  ];
  const createShipGroups = () => {
    const createShip = (shipType, id) => `
         <div class="${shipType} ship" data-name=${shipType} data-type="ship" id=${id} draggable=true></div>`;
    const createPort = (shipType, id) => `
         <div class="port ${shipType}-port">
         ${createShip(shipType, id)}</div>`;
    let groups = '';
    const createGroup = port => `<div class="ship-group d-flex">${port}</div>`;
    const addShipsToGroups = ({ shipType, noPerPlayer }) => {
      let ports = '';
      let i = noPerPlayer;
      while (i > 0) {
        const id = `${shipType}-0${i}`;
        ports += createPort(shipType, id);
        i -= 1;
      }
      groups += createGroup(ports);
    };
    shipTypes.forEach(addShipsToGroups);

    return groups;
  };

  const html = `<h3 class="info">
                 Drag the ships to the grid, to rotate position click on the ship
                </h3>
                ${createShipGroups()}`;

  const attributes = [{ name: 'class', value: 'ships d-none' }];

  return createFragment({ html, attributes });
};

export default shipView;
