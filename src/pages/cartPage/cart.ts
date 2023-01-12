import { parseRequestUrl, rerender } from '../../controllers/utils';
import { getProductById } from '../../controllers/localApi';
import {
  toggleInCart,
  updateCart,
  getCart,
  getProdInCartNum,
  getCountofOneProd,
  getProdSum,
} from '../../controllers/localStorage';
import { products } from '../../data/data';

const cartStorage = getCart();
let total = getProdInCartNum();
let totalSum = getProdSum();
const idsInCart = Object.keys(cartStorage);
const values = Object.values(cartStorage);

// function update(spanForNum: NodeListOf<HTMLElement>) {
//   spanForNum.forEach((s: HTMLElement) => {
//     idsInCart.forEach(id => {
//       s.id === id ? (s.innerHTML = cartStorage[id].count) : '';
//     });
//   });
// }

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
    // Refs
    const plusProd = document.querySelectorAll('.item-increase-button');
    const minusProd = document.querySelectorAll('.item-reduce-button');
    const deleteProd = document.querySelectorAll('.deleteBtn');
    const sumOfProd: NodeListOf<HTMLElement> =
      document.querySelectorAll('.item-quantity');
    const amountControls = document.querySelectorAll('.amount-control');
    const countSumCart = <HTMLElement>document.querySelector('.totalItems');
    const commonSumCart = <HTMLElement>document.querySelector('.total-in-cart');
    const totalProdSummary = <HTMLElement>(
      document.querySelector('.summaryProds')
    );
    const totalPriceSummary = <HTMLElement>(
      document.querySelector('.summaryPrice')
    );
    const cartStorage = getCart();
    const idsInCart = Object.keys(cartStorage);
    const values = Object.values(cartStorage);
    // let total = getProdInCartNum();
    // let totalSum = getProdSum();
    countSumCart.innerText = total.toString();
    commonSumCart.innerText = totalSum.toString();

    // Add,delete in cart
    plusProd.forEach(btn => {
      const btnId = btn.id.toString();
      const prodId = idsInCart.filter(id => id === btnId);
      const prodPrice = cartStorage[btnId].price;
      const spanForNum = Array.from(sumOfProd).filter(s => s.id === btnId);
      const count = getCountofOneProd(Number(btnId));
      spanForNum[0].innerText = count.toString();
      btn.addEventListener('click', () => {
        if (prodId[0] === btnId) {
          toggleInCart(btnId, 1, values[0].price);
          total += 1;
          totalSum += Number(prodPrice);
          countSumCart.innerText = total.toString();
          commonSumCart.innerText = totalSum.toString();
          totalProdSummary.innerText = total.toString();
          totalPriceSummary.innerText = totalSum.toString();
        }
        const count = getCountofOneProd(Number(btnId));
        spanForNum[0].innerText = count.toString();
      });
    });

    minusProd.forEach(btn => {
      const btnId = btn.id.toString();
      const prodId = idsInCart.filter(id => id === btnId);
      const prodPrice = cartStorage[btnId].price;
      const spanForNum = Array.from(sumOfProd).filter(s => s.id === btnId);
      const count = getCountofOneProd(Number(btnId));
      spanForNum[0].innerText = count.toString();
      btn.addEventListener('click', () => {
        if (prodId[0] === btnId) {
          toggleInCart(btnId, -1, values[0].price);
          total -= 1;
          totalSum -= Number(prodPrice);
          countSumCart.innerText = total.toString();
          commonSumCart.innerText = totalSum.toString();
          totalProdSummary.innerText = total.toString();
          totalPriceSummary.innerText = totalSum.toString();
        }
        const count = getCountofOneProd(Number(btnId));
        spanForNum[0].innerText = count.toString();
      });
    });
  },

  render: () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = getProductById(Number(request.id));
    }
    const cartStorage = getCart();
    const idsInCart = Object.keys(cartStorage);
    const productsInCart = products.filter(prod =>
      idsInCart.includes(prod.id.toString())
    );

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

                                            <div class="quantity-buttons-container">
                                              <div class="item-reduce-button" id="${
                                                item.id
                                              }"></div>
                                              <p class="item-quantity" id="${
                                                item.id
                                              }">1</p>
                                              <div class="item-increase-button" id="${
                                                item.id
                                              }"></div>
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
                            <span _ngcontent-lhl-c28="">Products:</span> <span class="summaryProds">${total}</span>
                          </div>
                          <div _ngcontent-lhl-c28="" class="total-price old-price">
                            <span _ngcontent-lhl-c28="">Total: € </span><span class="summaryPrice">${totalSum}</span>
                             .00
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
