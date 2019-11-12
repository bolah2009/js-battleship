const createFragment = (props = { element: 'div', html: '', attributes: [] }) => {
  const { element = 'div', html = '', attributes = [] } = props;
  const documentFragment = document.createDocumentFragment();
  const newElement = document.createElement(element);
  newElement.innerHTML = html;
  if (attributes.length) {
    attributes.forEach(({ name, value }) => {
      newElement.setAttribute(name, value);
    });
  }
  documentFragment.appendChild(newElement);
  return documentFragment;
};

export default createFragment;
