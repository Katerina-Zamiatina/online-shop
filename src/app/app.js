import { getFilteredItems } from '../controllers/getFilteredItem';
import { drawAside } from '../pages/mainPage/aside/filter';
import Products from '../pages/mainPage/products/products';
import ProductDetails from '../pages/productPage/detailsProduct'
import NotFound from '../pages/notFoundPage/notFound';
import Cart from '../pages/cartPage/cart';
import HomePage from '../pages/mainPage/homePage';
import drawHomePage from '../pages/mainPage/homePage';
import { parseRequestUrl } from '../controllers/utils';

const routes = {
  '/': HomePage,
  '/product/:id': ProductDetails,
  '/cart': Cart,
  '/cart/:id': Cart,
  '/404': NotFound,
};

export async function router() {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}/` : '');
  const page = routes[parseUrl] ? routes[parseUrl] : NotFound;
  const main = document.getElementById('main-container');
  main.innerHTML = await page.render();
  if (page.afterRender) await page.afterRender();
}

class App {
  start() {
    // drawHomePage();
    router();
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
    // drawAside();
    // getFilteredItems();
  }
}

export default App;
