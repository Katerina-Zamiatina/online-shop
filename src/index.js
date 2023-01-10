import './sass/index.scss';
import ProductDetails from './pages/productPage/detailsProduct';
import NotFound from './pages/notFoundPage/notFound';
import Cart from './pages/cartPage/cart';
import HomePage from './pages/mainPage/homePage';
import { parseRequestUrl } from './controllers/utils';

// interface IPage {
//   afterRender?: () => Promise<void>;
//   render: () => string;
// }

// interface IRoute {
//   '/': IPage;
//   '/product/:id': IPage;
//   '/cart': IPage;
//   '404': {
//     render: () => string;
//   };
// }

// const routes: IRoute = {
//   '/': HomePage,
//   '/product/:id': ProductDetails,
//   '/cart': Cart,
//   '404': NotFound,
// };

// export async function router() {
//   const request = parseRequestUrl();
//   const parseUrl =
//     (request.resource ? `/${request.resource}` : '/') +
//     (request.id ? '/:id' : '') +
//     (request.verb ? `/${request.verb}/` : '');
//   const page = routes[parseUrl as keyof IRoute]
//     ? routes[parseUrl as keyof IRoute]
//     : NotFound;

//   const main = <Element>document.getElementById('main-container');
//   main.innerHTML = page.render() as string;
//   if (page.afterRender) {
//     console.log(page.afterRender);
//     await page.afterRender();
//   }
// }

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

alert(
  'Нажаль ми не встигли доробити до кінця 💔   Дуже просимо, по можливості, перевірити у четверг 12.01.2023 😘 Дякуємо за розуміння! Лінк на пул реквест в консолі.'
);

console.log(
  'Link to Pull Request',
  'https://github.com/Katerina-Zamiatina/online-shop/pull/21'
);
