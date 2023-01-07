import { drawAside } from './aside/filter';
import Aside from './aside/Aside';
import SearchWrapper from './searchBar';
import Products from './products/products';
import { getFilteredItems } from '../../controllers/getFilteredItem';
import { parseRequestUrl } from '../../controllers/utils';
import { products } from '../../data/data';
import { handleSelect } from './searchBar/sortProducts';
import { handleSearchInput } from './searchBar/searchProduct';

const filters = await Aside.render();
const list = await Products.render(products);
const searchBar = SearchWrapper.render();

export function updateProductsList() {
  const newList = parseCatalogList(createCatalogCard);
  const content =
    list.length > 0 ? list.join('').toString() : notFountProduct();
  catalogProductFound.innerHTML = list.length.toString();
  catalogList.innerHTML = content;
}

async function updateProdsList(items) {
  if (items.length > 0) {
  }
  const refreshProds = await Products.render(items);
  return `${refreshProds}`;
}

const HomePage = {
  afterRender: async () => {
    let prods;
    const productsContainer = document.querySelector('.productCard');
    // Sort
    const select = document.getElementById('sortSelect');
    select.addEventListener('change', async e => {
      prods = await handleSelect(e);
      console.log(prods.length);
      productsContainer.innerHTML = prods;
    });
    (function localStorageSort() {
      if (localStorage.selectedIndex !== undefined) {
        select.selectedIndex = localStorage.selectedIndex;
      }
      select.onchange = function () {
        localStorage.selectedIndex = this.selectedIndex;
      };
    })();
    // Search
    const search = document.getElementById('searchBar');
    if (window.localStorage) {
      let elements = document.querySelectorAll('[name]');

      for (let i = 0, length = elements.length; i < length; i++) {
        (function (element) {
          let name = element.getAttribute('name');

          element.value = localStorage.getItem(name) || '';

          element.onkeyup = function () {
            localStorage.setItem(name, element.value);
          };
        })(elements[i]);
      }
    }
    search.addEventListener('input', async e => {
      productsContainer.innerHTML = await handleSearchInput(e);
    });
    // Change Display
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
  },

  render: async () => {
    // const { value } = parseRequestUrl();
    return `${filters}<div class="right-side" id="right-side">${searchBar}<div id="productCard" class="productCard">${list}</div></div>`;
  },
};

function drawHomePage() {
  drawAside();
  getFilteredItems();
}

export default HomePage;
