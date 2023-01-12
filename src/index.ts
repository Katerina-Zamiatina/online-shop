import './sass/index.scss';
import ProductDetails from './pages/productPage/detailsProduct';
import NotFound from './pages/notFoundPage/notFound';
import Cart from './pages/cartPage/cart';
import HomePage from './pages/mainPage/homePage';
import { parseRequestUrl } from './controllers/utils';
import './pages/buyForm/buyForm';

interface IPage {
  afterRender: () => void;
  render: () => string | Promise<string>;
}
interface I404 {
  render: () => string;
}
interface IRoute {
  [k: string]: IPage | I404;
}

const routes: IRoute = {
  '/': HomePage,
  '/product/:id': ProductDetails,
  '/cart': Cart,
  '/404': NotFound,
};

export async function router() {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}/` : '');
  const page = routes[<keyof IRoute>parseUrl]
    ? routes[<keyof IRoute>parseUrl]
    : NotFound;
  const main = <Element>document.getElementById('main-container');
  main.innerHTML = <string>page.render();
  if (page !== NotFound) (<IPage>page).afterRender();
}

router();
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

console.log(
  'Link to Pull Request',
  'https://github.com/Katerina-Zamiatina/online-shop/pull/21'
);
