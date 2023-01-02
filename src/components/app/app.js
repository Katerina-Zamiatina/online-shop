import { getFilteredItems } from '../controllers/getFilteredItem';
import { drawAside } from '../pages/mainPage/aside/filter';
import Product from '../pages/mainPage/products/products';
import NotFound from '../pages/notFoundPage/notFound';
import Cart from '../pages/cartPage/cart';

const routes = {
  // '/': HomeScreen,
  // '/product/:id': ProductScreen,
  '/cart': Cart,
  '/cart/:id': Cart,
  '/404': NotFound,
};

class App {
  async start() {
    drawAside();
    getFilteredItems();
  }
}

export default App;
