import {
  getCartProducts,
  setCartProducts,
} from '../../controllers/localStorage';
import { parseRequestUrl, rerender } from '../../controllers/utils';
import { getProductById } from '../../controllers/apiService';

function addToCart(prod, forceUdate = false) {
  let cartProducts = getCartProducts();
  const existProduct = cartProducts.find(el => el === prod);
  if (existProduct) {
    if (forceUdate) {
      cartProducts = cartProducts.map(el => (el === existProduct ? prod : el));
    }
  } else {
    cartProducts = [...cartProducts, prod];
  }
  setCartProducts(cartProducts);
  if (forceUdate) {
    rerender(Cart);
  }
}

function removeFromCart(id) {
  setCartProducts(getCartProducts().filter(el => el.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(Cart);
  }
}

const Cart = {
  afterRender: async () => {
    const selectedQty = document.getElementsByClassName('qty-select');
    Array.from(selectedQty).forEach(el => {
      el.addEventListener('change', e => {
        const prod = getCartProducts().find(x => x.product === el.id);
        addToCart({ ...prod, quantity: Number(e.target.value) }, true);
      });
    });
    const deleteBtns = document.getElementsByClassName('delete-button');
    Array.from(deleteBtns).forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.id);
      });
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProductById(request.id);
      addToCart({
        product: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        stock: product.stock,
        quantity: 1,
      });
    }
    const cartProducts = getCartProducts();
    return `    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          ${
            cartProducts.length === 0
              ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
              : cartProducts
                  .map(
                    item => `
            <li>
              <div class="cart-image">
                <img src="${item.images[0]}" alt="${item.title}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">
                    ${item.title}
                  </a>
                </div>
                <div>
                  Qty:
                  <select class="qty-select" id="${item.product}">
                  ${[...Array(item.stock).keys()].map(x =>
                    item.quantity === x + 1
                      ? `<option selected value="${x + 1}">${x + 1}</option>`
                      : `<option  value="${x + 1}">${x + 1}</option>`
                  )}
                  </select>
                  <button type="button" class="delete-button" id="${
                    item.product
                  }">
                    Delete
                  </button>
                </div>
              </div>
              <div class="cart-price">
                ${item.price}
              </div>
            </li>
            `
                  )
                  .join('\n')
          }
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal (${cartProducts.reduce((a, c) => a + c.quantity, 0)} items)
            :
            $${cartProducts.reduce((a, c) => a + c.price * c.quantity, 0)}
          </h3>
          <button id="checkout-button" class="primary fw">
            Proceed to Checkout
          </button>
      </div>
    </div>
    `;
  },
};

export default Cart;
