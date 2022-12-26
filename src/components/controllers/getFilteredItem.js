import { products } from './apiService';
import Product from '../pages/mainPage/products/products';

const product = new Product();
let allCheckBoxes = [];
let filteredProducts = [];
let actualCategories = [];

const filters = {
  category: [],
  brand: [],
  price: [],
  discount: [],
};

export async function getFilteredItems() {
  allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
  allCheckBoxes.forEach(el =>
    el.addEventListener('change', () => updateProducts())
  );
}

// export const getKeyItems = (
//   key = 'category',
//   value = '',
//   arr = [...products]
// ) => {
//   console.log("ARR", arr)
//   const keyList = `arr${key}Name`;
//   console.log('keyList',keyList);
//   if (!!value) return [...arr];
//   // if (value.length !== [keyList].length) {
//   //   return console.log(`error ${value.length}!=${[keyList].length}`);
//   // }
//   const valFlt = [...keyList].filter((_, i) => !!value[i]);
//   console.log('valFlt', valFlt);
//   const ar = [...arr].filter((el, i) => valFlt.includes(el[key]));
//   console.log('ar',ar);
//   return ar;
// };

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
    filteredProducts = filterPlainArray();
  }
  if (checkedValues < 0) {
    filteredProducts = [...products];
  }
  product.renderFilteredProducts(filteredProducts);
}

function filterPlainArray() {
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
