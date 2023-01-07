// import {
//   setStartFilter,
//   getFilteredItems,
// } from '../../../controllers/getFilteredItem';
import { products } from '../../../controllers/apiService';
import Products from '../products/products';

const categoriesName = [...setStartFilter('category')];
const brandsName = [...setStartFilter('brand')];
let allCheckBoxes = [];
let filteredProducts = [];
const filters = {
  category: [],
  brand: [],
  price: [],
  discount: [],
};

// export async function getFilteredItems() {
//   allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
//   allCheckBoxes.forEach(el =>
//     el.addEventListener('change', () => updateProducts())
//   );
// }

function getCheckboxesValue(checkboxes) {
  const values = [];
  checkboxes.forEach(el => {
    if (el.checked) {
      values.push(el.value);
      if (el.name === 'category') {
        filters.category.push(el.value);
      }
      if (el.name === 'brand') {
        filters.brand.push(el.value);
      }
    }
  });
  filters.category = getUnique(filters.category).filter(el =>
    values.includes(el)
  );
  filters.brand = getUnique(filters.brand).filter(el => values.includes(el));
  return values;
}

const getUnique = arr => arr.filter((el, i) => i === arr.indexOf(el));

async function updateProducts() {
  const checkedValues = getCheckboxesValue(Array.from(allCheckBoxes));
  if (checkedValues.length >= 0) {
    filteredProducts = filterProducts();
  }
  if (checkedValues < 0) {
    filteredProducts = [...products];
  }
  const filteredList = Products.render(filteredProducts);
  console.log('!!!', filteredList);
  return filteredList;
  // product.renderFilteredProducts(filteredProducts);
}

export function setStartFilter(key = 'category') {
  const arrProd = [...products];
  const filters = [...new Set(arrProd.map(el => el[key]))].sort();
  const result = [...filters].map(filter => {
    return {
      ids: arrProd.filter(el => el[key] === filter).map(el => el.id),
      name: filter,
      count: arrProd.filter(el => el[key] === filter).length,
    };
  });
  return result;
}

function filterProducts() {
  const filterKeys = Object.keys(filters);
  return products.filter(item => {
    return filterKeys.every(key => {
      if (!filters[key].length) return true;
      return filters[key].find(filter => {
        return filter === item[key];
      });
    });
  });
}

const Aside = {
  render: async () => {
    allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
    allCheckBoxes.forEach(el =>
      el.addEventListener('change', () => {
        console.log(filteredProducts)
        updateProducts();
      })
    );
    return `<aside class="filter" id="aside-container">
    <div class="filter_btns">
          <button type="button" class="filter_btn">Clear Filters</button>
          <button type="button" class="filter_btn">Copy link</button>
        </div>
        <h3 class="filter_title">Category</h3>
        <form class="category-filter" id="category">
        ${categoriesName
          .map(
            cat => `<div class="filter_item"><input  type="checkbox" name="category" value="${cat.name}" id="${cat.name}"/>
                    <label class="filter_item-name" name="category" for="${cat.name}">${cat.name}</label>
                    <span class="stock">${cat.count}/${cat.count}</span></div>`
          )
          .join('')}
        </form>
        <h3 class="filter_title">Brand</h3>
        <form class="brand-filter" id="brand">
        ${brandsName
          .map(
            brand => `<div class="filter_item"><input class="filter_item" type="checkbox" name="brand" value="${brand.name}" id="${brand.name}"/>
                    <label class="filter_item-name" name="category" for="${brand.name}">${brand.name}</label>
                    <span class="stock">${brand.count}/${brand.count}</span></div>`
          )
          .join('')}
        </form>
        <h3 class="filter_title">Price</h3>
        <div class="price-slider">
          <div class="price-input" id='priceInfo'>
            <span class="input-min price-info">10</span>
            <div class="separator">price</div>
            <span class="input-max price-info">1749</span>
            </div>
            <div class="slider">
                <div class="progress" id="priceProgress"></div>
            </div>
            <fieldset class="range-input" req="" gid="" id="priceDual">
                <input type="range" class="range-min range_price" min="10" max="1749" value="10" step="100" evt="change" handlers="doubles">
                <input type="range" class="range-max range_price" min="10" max="1749" value="1749" step="100" evt="change" handlers="doubles">
            </fieldset>
        </div>
        <h3 class="filter_title">Stock</h3>
        <div class="stock-slider"> <div class="rating-input" id='ratingInfo'>
        <span class="input-min rating-info">2</span>
        <div class="separator">stock</div>
        <span class="input-max rating-info">150</span>
        </div>
        <div class="slider">
            <div class="progress" id="ratingProgress"></div>
        </div>
        <fieldset class="range-input" req="" gid="" id="ratingDual">
            <input type="range" class="range-min range_stock" min="2" max="150" value="2" step="1" evt="change" handlers="doubles">
            <input type="range" class="range-max range_stock" min="2" max="150" value="150" step="1" evt="change" handlers="doubles">
        </fieldset>
        </div>
        </aside>`;
  },
};

export default Aside;
