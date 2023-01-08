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
  addProductToCart,
  toggleBuyBtns,
} from '../../controllers/localApi';

const aside = Aside.render();
const searchBar = SearchWrapper.render();

function updateProductsList() {
  const list = Products.render(updatedProducts);
  const productContainer = document.getElementById('products-container');
  productContainer.innerHTML =
    updatedProducts.length > 0 ? list : `<h2>NOTHING FOUND</h2>`;
}

function changeDisplay() {
  const containerCards = document.getElementById('wrapperProductCards');
  const button3x3 = document.getElementById('display3x3');
  const button2x2 = document.getElementById('display2x2');
  button2x2.addEventListener('click', () => {
    containerCards.classList.add('wrapperProductCards');
    containerCards.classList.remove('changeDisplayCard');
  });
  button3x3.addEventListener('click', () => {
    containerCards.classList.remove('wrapperProductCards');
    containerCards.classList.add('changeDisplayCard');
  });
}

const HomePage = {
  afterRender: async () => {
    // refs
    const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
    const clearBtn = document.getElementById('clear-checked');
    const select = document.getElementById('sortSelect');
    const search = document.getElementById('searchBar');
    const found = document.getElementById('foundNum');
    const copyBtn = document.getElementById('copy');
    const buyBtns = document.querySelectorAll('.addProduct');
    const deleteBtns = document.querySelectorAll('.deleteProduct');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
    });
    // Sort
    select.addEventListener('change', e => {
      e.preventDefault();
      sortProducts(e);
      found.innerHTML = updatedProducts.length;
      updateProductsList();
    });

    // Search
    search.addEventListener('input', async e => {
      e.preventDefault();
      const searchQuery = e.target.value;
      searchProducts(searchQuery);
      updateProductsList();
      found.innerHTML = updatedProducts.length;
    });

    // Change Display
    changeDisplay();

    // Filter
    allCheckBoxes.forEach(el =>
      el.addEventListener('change', async () => {
        updateFilteredProducts(allCheckBoxes);
        found.innerHTML = updatedProducts.length;
        updateProductsList();
      })
    );

    clearBtn.addEventListener('click', () => {
      clearCheckbox(allCheckBoxes);
      updateProductsList();
    });

    // Buy&delete
    buyBtns.forEach(b => {
      b.addEventListener('click', e => {
        toggleBuyBtns(buyBtns, deleteBtns, e);
        // b.classList.add('hide');
        const product = products.filter(el => el.id === Number(b.id));
        addProductToCart(product[0], true);
      });
    });

    deleteBtns.forEach(b => {
      b.addEventListener('click', e => {
        toggleBuyBtns(buyBtns, deleteBtns, e);
        // b.classList.add('hide');
      });
    });
  },

  render: async () => {
    return `${aside}
    <div class="right-side" id="right-side">
      ${searchBar}
      <div id="products-container" class="productCard">${Products.render(
        updatedProducts
      )}</div>
    </div>`;
  },
};

export default HomePage;
