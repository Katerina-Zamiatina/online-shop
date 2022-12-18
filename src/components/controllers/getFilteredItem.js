import { getProductsByCategory, getAllCategories } from './apiService';
import Products from '../pages/mainPage/products/products';

const categories = await getAllCategories();
let filteredProducts = [];

export async function getFilteredItems() {
  const allProducts = new Products();
  const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');

  Array.prototype.forEach.call(allCheckBoxes, function (el) {
    el.addEventListener('change', () => {
      updateProducts(el, allCheckBoxes);
    });
  });
}

function getCheckboxesValue(checkboxes) {
  const values = [];
  checkboxes.forEach(el => {
    if (el.checked) {
      values.push(el.value);
    }
  });
  return values;
}

async function updateProducts(el, check) {
  const value = el.value;
  const checkboxesValue = getCheckboxesValue(Array.from(check));
  let { products } = await getProductsByCategory(value);
  filteredProducts.push(products);

  if (checkboxesValue.length > 0) {
    filteredProducts = filteredProducts
      .flat()
      .filter(el => checkboxesValue.includes(el.category));
  } else {
    filteredProducts = [];
  }

  console.log('P', filteredProducts);
}
