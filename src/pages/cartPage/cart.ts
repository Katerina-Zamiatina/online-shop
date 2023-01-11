import { parseRequestUrl, rerender } from '../../controllers/utils';
import { getProductById } from '../../controllers/localApi';
import {
  toggleInCart,
  updateCart,
  getCart,
} from '../../controllers/localStorage';
import { products } from '../../data/data';

const top = `<div class="cart-list_top">
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
            </div>`;

const Cart = {
  afterRender: async () => {
    const selectedQty = document.getElementsByClassName('qty-select');
    Array.from(selectedQty).forEach(el => {
      el.addEventListener('change', e => {});
    });
  },
  render: () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = getProductById(Number(request.id));
    }
    const cartStorage = getCart();
    const idInCart = Object.keys(cartStorage);
    const productsInCart = products.filter(prod =>
      idInCart.includes(prod.id.toString())
    );
    console.log(productsInCart);

    return `<div class="content cart">
                  ${
                    productsInCart.length === 0
                      ? `<div>Cart is empty. <a href="/#/">Go Shopping</a></div>`
                      : `<div class="cart-left">${top}
                            <div class="cart-list">
                              <ul class="cart-list_container">
                                      ${productsInCart
                                        .map(
                                          (item, idx) => `<li class="item">
                                      <span class="item_num" id="item-num">${
                                        idx + 1
                                      }</span>
                                      <div class="item_image"><img src="${
                                        item.thumbnail
                                      }" alt="${item.title}"/></div>
                                      <div class="item_details">
                                          <div class="item_title">
                                            <a href="/#/product/${item.id}">${
                                            item.title
                                          }</a>
                                          </div>
                                          <div class="item_descrip">${
                                            item.description
                                          }</div>
                                          <div class="extra-info">
                                            <div>Rating: ${item.rating}</div>
                                            <div>Discount: ${
                                              item.discountPercentage
                                            }%</div>
                                          </div>
                                      </div>
                                      <div class="item_info">
                                          <div _ngcontent-lhl-c25="" class="number-control">
                                            <div _ngcontent-lhl-c25="" class="stock-control"> Stock: ${
                                              item.stock
                                            }</div>
                                            <div>Qty:<select class="qty-select" id="${item}">
                                                        ${[
                                                          ...Array(
                                                            item.stock
                                                          ).keys(),
                                                        ].map(x =>
                                                          item.stock === x + 1
                                                            ? `<option selected value="${
                                                                x + 1
                                                              }">${
                                                                x + 1
                                                              }</option>`
                                                            : `<option  value="${
                                                                x + 1
                                                              }">${
                                                                x + 1
                                                              }</option>`
                                                        )}
                                                      </select>
                                            </div>
                                            <div _ngcontent-lhl-c25="" class="amount-control"> €${
                                              item.price
                                            }.00 </div>
                                          </div>
                                          <button type="button" class="delete-button" id="${item}">Delete</button>
                                        </div>
                                  </li>`
                                        )
                                        .join('\n')}
                              </ul>
                            </div>
                        </div>
                        <div _ngcontent-lhl-c28="" class="total-cart">
                          <h2 _ngcontent-lhl-c28="" class="sum_title">Summary</h2>
                          <div _ngcontent-lhl-c28="" class="total-products">
                            <span _ngcontent-lhl-c28="">Products:</span> ${productsInCart.reduce(
                              (a, c) => a + c.stock,
                              0
                            )}
                          </div>
                          <div _ngcontent-lhl-c28="" class="total-price old-price">
                            <span _ngcontent-lhl-c28="">Total:</span>
                            € ${productsInCart.reduce(
                              (a, c) => a + c.price * c.stock,
                              0
                            )}.00
                          </div>

                          <div _ngcontent-lhl-c28="" class="appl-codes hide">
                          <h3 _ngcontent-lhl-c28="">Applied codes</h3>
                          <div _ngcontent-lhl-c28="" class="applied-promo"> Rolling Scopes School - 10% - <span _ngcontent-lhl-c28="">DROP</span></div>
                          <div _ngcontent-lhl-c28="" class="applied-promo"> EPAM Systems - 10% - <span _ngcontent-lhl-c28="">DROP</span></div>
                          </div>


                          <div _ngcontent-woy-c28="" class="promo-code">
                              <input _ngcontent-woy-c28="" type="search" placeholder="Enter promo code" class="ng-pristine ng-valid ng-touched">
                          </div>
                          <div _ngcontent-lhl-c28="" class="promo-ex">Promo for test: 'RS', 'EPM'</div>
                          <button _ngcontent-lhl-c28="" id="btnBuy" class="btnBuy">BUY NOW</button>
                        </div>`
                  }
              </div>`;
  },
};

export default Cart;
