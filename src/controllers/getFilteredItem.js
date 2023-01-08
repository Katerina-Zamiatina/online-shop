import { products } from './apiService';
import Products from '../pages/mainPage/products/products';

let allCheckBoxes = [];
let filteredProducts = [];
// const productsContainer = document.getElementById('productCard');

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
  console.log('!!!', filteredProducts);
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

// export const setFilter = (key = 'category', arr = [...products]) => {
//   // console.log('key:', key, arr.length);
//   const listFilter = setStartFilter(key);
//   const res = [...listFilter].map(el => {
//     el.count = arr.filter(elm => elm[key] === el.name).length;
//     el.ids = arr.filter(elm => elm[key] === el.name).map(({ id }) => id);

//     console.log('EL', el.count);
//     return el;
//   });
//   return res;
// };

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
