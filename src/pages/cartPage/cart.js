import {
  getCartProducts,
  setCartProducts,
} from '../../controllers/localStorage';
import { parseRequestUrl, rerender } from '../../controllers/utils';
import { getProductById } from '../../controllers/apiService';

function addToCart(prod, forceUpdate = false) {
  let cartProducts = getCartProducts();
  const existProduct = cartProducts.find(el => el === prod);
  if (existProduct) {
    if (forceUpdate) {
      cartProducts = cartProducts.map(el => (el === existProduct ? prod : el));
    }
  } else {
    cartProducts = [...cartProducts, prod];
  }
  setCartProducts(cartProducts);
  if (forceUpdate) {
    rerender(Cart, 'main-container');
  }
}

function removeFromCart(id) {
  setCartProducts(getCartProducts().filter(el => el.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(Cart, 'main-container');
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
        description: product.description,
        discount: product.discountPercentage,
        raiting: product.raiting,
        quantity: 1,
      });
    }
    const cartProducts = getCartProducts();
    return `<div class="content cart">
                ${
                  cartProducts.length === 0
                    ? `<div>Cart is empty. <a href="/#/">Go Shopping</a>`
                    : `<div class="cart-list_top">
                    <h2>Products in Cart</h3>
                    <div class="page-control">
                        <div _ngcontent-lhl-c28="" class="limit">
                            LIMIT:
                            <input _ngcontent-lhl-c28="" type="number" min="1" class="ng-valid ng-dirty ng-touched" max="18">
                        </div>
                        <div _ngcontent-lhl-c28="" class="page-numbers">
                            PAGE:
                            <button _ngcontent-lhl-c28=""> &lt; </button>
                            <span _ngcontent-lhl-c28="" class="page" id="page-number">1</span>
                            <button _ngcontent-lhl-c28=""> &gt; </button>
                        </div>
                    </div>
                </div>
                <div class="cart-list">
                    <ul class="cart-list_container">
                        </li>
                            ${cartProducts
                              .map(
                                (item, idx) => `<li class="item">
                            <span class="item_num" id="item-num">${
                              idx + 1
                            }</span>
                            <div class="item_image">
                                <img src="${item.images[0]}" alt="${
                                  item.title
                                }"/>
                            </div>
                            <div class="item_details">
                                <div class="item_title">
                                    <a href="/#/product/${item.product}">${
                                  item.title
                                }</a>
                                </div>
                                <div class="item_descrip">${
                                  item.description
                                }</div>
                                <div class="item_info>
                                      <div>Rating: ${item.raiting}</div>
                                      <div>Discount: ${item.discount}%</div>
                                </div>
                                <div _ngcontent-lhl-c25="" class="number-control">
                                    <div _ngcontent-lhl-c25="" class="stock-control"> Stock: ${
                                      item.stock
                                    }</div>
                                    <div>Qty:
                                        <select class="qty-select" id="${
                                          item.product
                                        }">
                                            ${[...Array(item.stock).keys()].map(
                                              x =>
                                                item.quantity === x + 1
                                                  ? `<option selected value="${
                                                      x + 1
                                                    }">${x + 1}</option>`
                                                  : `<option  value="${
                                                      x + 1
                                                    }">${x + 1}</option>`
                                            )}
                                        </select>
                                        <button type="button" class="delete-button" id="${
                                          item.product
                                        }">
                                            Delete
                                        </button>
                                    </div>
                                    <div _ngcontent-lhl-c25="" class="amount-control"> €${
                                      item.price
                                    }.00 </div>
                                </div>
                            </div>
                            <div class="cart-price">
                                ${item.price}
                            </div>
                        </li>`
                              )
                              .join('\n')}
                    </ul>
                </div>
                <div _ngcontent-lhl-c28="" class="total-cart">
                    <h2 _ngcontent-lhl-c28="">Summary</h2>
                    <div _ngcontent-lhl-c28="" class="total-price">
                        <span _ngcontent-lhl-c28="">Products:</span> ${cartProducts.reduce(
                          (a, c) => a + c.quantity,
                          0
                        )}
                    </div>
                    <div _ngcontent-lhl-c28="" class="total-price old-price">
                        <span _ngcontent-lhl-c28="">Total:</span>
                        €${cartProducts.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}.00
                    </div>

                    // <div _ngcontent-lhl-c28="" class="appl-codes">
                    //     <h3 _ngcontent-lhl-c28="">Applied codes</h3>
                    //     <div _ngcontent-lhl-c28="" class="applied-promo"> Rolling Scopes School - 10% - <span _ngcontent-lhl-c28="">DROP</span></div>
                    //     <div _ngcontent-lhl-c28="" class="applied-promo"> EPAM Systems - 10% - <span _ngcontent-lhl-c28="">DROP</span></div>
                    // </div>

                    <span _ngcontent-lhl-c28="" class="promo-ex">Promo for test: 'RS', 'EPM'</span>
                    <div _ngcontent-woy-c28="" class="promo-code">
                        <input _ngcontent-woy-c28="" type="search" placeholder="Enter promo code" class="ng-pristine ng-valid ng-touched">
                    </div>
                    <button _ngcontent-lhl-c28="" id="btnBuy" class="btnBuy">BUY NOW</button>
                </div>`
                }
            </div>`;
  },
};

export default Cart;
