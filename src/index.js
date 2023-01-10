import './sass/index.scss';
import ProductDetails from './pages/productPage/detailsProduct';
import NotFound from './pages/notFoundPage/notFound';
import Cart from './pages/cartPage/cart';
import HomePage from './pages/mainPage/homePage';
import { parseRequestUrl } from './controllers/utils';

const routes = {
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
  const page = routes[parseUrl] ? routes[parseUrl] : NotFound;
  const main = document.getElementById('main-container');
  main.innerHTML = await page.render();
  if (page.afterRender) await page.afterRender();
}

router();
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

// alert(
//   'Нажаль ми не встигли доробити до кінця 💔   Дуже просимо, по можливості, перевірити у четверг 12.01.2023 😘 Дякуємо за розуміння!'
// );

// console.log("Link to Pull Request",'https://github.com/Katerina-Zamiatina/online-shop/pull/21');
