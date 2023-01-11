import Aside from './aside/Aside';
import SearchWrapper from './searchBar';
import Products from './products/products';
import { products } from '../../data/data';
import {
  updatedProducts,
  sortProducts,
  searchProducts,
  clearCheckbox,
  updateFilteredProducts,
  toggleBuyBtns,
} from '../../controllers/localApi';
import {
  toggleInCart,
  setBtnState,
  getProdInCartNum,
  getCartCount,
  getProdSum,
  updateBtnState,
  getBtnState,
} from '../../controllers/localStorage';
import { CheckBoxData, FilterNameType, Btns } from '../../types';

let categoriesName = [...setStartFilter('category')];
let brandsName = [...setStartFilter('brand')];

function updateProductsList() {
  const list = Products.render(updatedProducts);
  const productContainer = <Element>(
    document.getElementById('products-container')
  );
  productContainer.innerHTML =
    updatedProducts.length > 0 ? list : `<h2>NOTHING FOUND</h2>`;
}

function changeDisplay() {
  const containerCards = <Element>(
    document.getElementById('wrapperProductCards')
  );
  const button3x3 = <Element>document.getElementById('display3x3');
  const button2x2 = <Element>document.getElementById('display2x2');
  button2x2.addEventListener('click', () => {
    containerCards.classList.add('wrapperProductCards');
    containerCards.classList.remove('changeDisplayCard');
  });
  button3x3.addEventListener('click', () => {
    containerCards.classList.remove('wrapperProductCards');
    containerCards.classList.add('changeDisplayCard');
  });
}

function setStartFilter(key: FilterNameType) {
  const arrProd = [...updatedProducts];
  const checkFilters = [...new Set(arrProd.map(el => el[key]))];
  const result = [...checkFilters].map(filter => {
    return {
      ids: arrProd.filter(el => el[key] === filter).map(el => el.id),
      name: filter,
      count: arrProd.filter(el => el[key] === filter).length,
      found: arrProd.filter(el => el[key] === filter).length,
    };
  });
  return result;
}

const HomePage = {
  afterRender: async () => {
    // refs
    const allCheckBoxes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('input[type=checkbox]');
    const clearBtn = <Element>document.getElementById('clear-checked');
    const select = <HTMLSelectElement>document.getElementById('sortSelect');
    const search = <HTMLInputElement>document.getElementById('searchBar');
    const found = <Element>document.getElementById('foundNum');
    const copyBtn = <Element>document.getElementById('copy');
    const buyBtns = document.querySelectorAll('.addProduct');
    const prodInCart = <Element>document.querySelector('.totalItems');
    const totalSum = <Element>document.querySelector('.total-in-cart');

    prodInCart.textContent = getProdInCartNum().toString();
    totalSum.textContent = getProdSum().toString();

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
    });
    // Sort
    select.addEventListener('change', e => {
      e.preventDefault();
      sortProducts(e);
      found.innerHTML = updatedProducts.length.toString();
      updateProductsList();
    });

    // Search
    search.addEventListener('input', async e => {
      e.preventDefault();
      const { target } = e;
      const searchQuery = (<HTMLInputElement>target).value;
      searchProducts(searchQuery);
      updateProductsList();
      found.innerHTML = updatedProducts.length.toString();
    });

    // Change Display
    changeDisplay();

    // Filter

    allCheckBoxes.forEach(el =>
      el.addEventListener('change', async () => {
        updateFilteredProducts(allCheckBoxes);
        found.textContent = updatedProducts.length.toString();
        updateProductsList();
      })
    );

    clearBtn.addEventListener('click', () => {
      clearCheckbox(allCheckBoxes);
      updateProductsList();
    });

    // Buy&delete
    buyBtns.forEach(b => {
      const btnState = getBtnState();
      const btnStateId = Object.keys(btnState);
      const button = <HTMLButtonElement>b;
      btnStateId.forEach(index => {
        if (index === button.id) {
          button.dataset.added = 'true';
        }
      });
      if (button.dataset.added === 'true') {
        button.innerHTML = 'Delete';
      }
      b.addEventListener('click', (e: Event) => {
        const product = products.filter(el => el.id === Number(b.id));
        const { id, price } = product[0];
        const item = <Btns>e.target;
        const dataset = item.dataset.added;
        toggleInCart(id.toString(), 1, price.toString());
        toggleBuyBtns(button);
        prodInCart.textContent = getProdInCartNum().toString();
        totalSum.textContent = getProdSum().toString();
      });
    });
  },

  render: () => {
    const aside = Aside.render(categoriesName, brandsName);
    const searchBar = SearchWrapper.render();
    const prodList = Products.render(updatedProducts);
    return `${aside}
    <div class="right-side" id="right-side">
      ${searchBar}
      <div id="products-container" class="productCard">${prodList}</div>
    </div>`;
  },
};

export default HomePage;
