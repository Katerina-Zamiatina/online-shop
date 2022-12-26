// import { products } from './apiService';
// import Product from '../pages/mainPage/products/products';

// const product = new Product();
// let allCheckBoxes = [];
// let filteredProducts = [];
// let actualCategories = [];

// const filters = {
//   category: [],
//   brand: [],
//   price: [],
//   discount: [],
// };

// export async function getFilteredItems() {
//   allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
//   allCheckBoxes.forEach(el =>
//     el.addEventListener('change', () => updateProducts(el))
//   );
// }

// function getCheckboxesValue(checkboxes) {
//   const values = [];
//   checkboxes.forEach(el => {
//     if (el.checked) {
//       if (el.name === 'category') {
//         filters[category]?.includes(el.value)
//           ? filters.category.push(el.value)
//           : '';
//       }
//       if (el.name === 'barnd') {
//         filters.brand.includes(el.name) ? filters.brand.push(el.value) : '';
//       }
//       values.push(el.value);
//       console.log('FFFF', filters);
//     }
//   });
//   return values;
// }

// function keepResult(result, selectedFilters) {
//   let keep = true;
//   for (let i = 0; i < selectedFilters.length; i++) {
//     if (result[selectedFilters[i].filter] !== selectedFilters[i].filterValue) {
//       keep = false;
//       break;
//     }
//   }
//   return keep;
// }

// function listFilterValues(filter) {
//   return products
//     .map(el => el[filter])
//     .filter((x, i, a) => a.indexOf(x) === i)
//     .sort();
// }

// function filterResults(selectedFilters) {
//   let filteredProducts = [];
//   for (let i = 0; i < products.length; i++) {
//     if (keepResult(products[i], selectedFilters))
//       filteredProducts.push(products[i]);
//   }
//   return filteredProducts;
// }

