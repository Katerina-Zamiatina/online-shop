import { getCartProducts } from './localStorage';

export function parseRequestUrl() {
  const address = document.location.hash.slice(1).split('?')[0];
  const queryString =
    document.location.hash.slice(1).split('?').length === 2
      ? document.location.hash.slice(1).split('?')[1]
      : '';
  const url = address.toLowerCase() || '/';
  const req = url.split('/');
  const query = queryString.split('=');

  return {
    resource: req[1],
    id: req[2],
    verb: req[3],
    name: query[0],
    value: query[1],
  };
}

export async function rerender(component, container) {
  document.getElementById(container).innerHTML =
    await component.render();
  await component.afterRender();
}

export function redirect() {
  document.location.hash = '/';
}
