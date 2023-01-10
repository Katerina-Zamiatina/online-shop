import { products } from '../data/data';
import { IProduct, FilterNameType } from '../types';
import { setCart } from './localStorage';

const initialProducts = products;
export let updatedProducts = products;

const checkFilters: ICheckFilters = {
  brand: [],
  category: [],
};

const range = {
  price: { min: '10', max: '1749' },
  stock: { min: '2', max: '150' },
};

export const getProductById = (id: number) => {
  return products.filter(item => item.id === id);
};

// Search by query
export function searchProducts(query: string) {
  query = query.toUpperCase();
  if (query !== '') {
    updatedProducts = updatedProducts.filter(card => {
      return (
        card.title.toUpperCase().includes(query) ||
        card.brand.toUpperCase().includes(query) ||
        card.price.toString().includes(query) ||
        card.discountPercentage.toString().includes(query) ||
        card.stock.toString().includes(query)
      );
    });
  } else {
    updatedProducts = products;
  }
}

// Sort

export function sortProducts(e: Event) {
  const optionValue = (e.target as HTMLInputElement).value;
  switch (optionValue) {
    case 'priceDESK':
      function comparePriceDESK(a: { price: number }, b: { price: number }) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }
      updatedProducts.sort(comparePriceDESK).reverse();
      break;
    case 'priceASK':
      function comparePriceASK(a: { price: number }, b: { price: number }) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }
      updatedProducts.sort(comparePriceASK);
      break;
    case 'discountDESK':
      function compareDiscountDESK(
        a: { discountPercentage: number },
        b: { discountPercentage: number }
      ) {
        if (a.discountPercentage < b.discountPercentage) {
          return -1;
        }
        if (a.discountPercentage > b.discountPercentage) {
          return 1;
        }
        return 0;
      }
      updatedProducts.sort(compareDiscountDESK).reverse();
      break;
    case 'discountASK':
      function compareDiscountASK(
        a: { discountPercentage: number },
        b: { discountPercentage: number }
      ) {
        if (a.discountPercentage < b.discountPercentage) {
          return -1;
        }
        if (a.discountPercentage > b.discountPercentage) {
          return 1;
        }
        return 0;
      }
      updatedProducts.sort(compareDiscountASK);
      break;
    case 'stockDESK':
      function compareStockDESK(a: { stock: number }, b: { stock: number }) {
        if (a.stock < b.stock) {
          return -1;
        }
        if (a.stock > b.stock) {
          return 1;
        }
        return 0;
      }
      updatedProducts.sort(compareStockDESK).reverse();
      break;
    case 'stockASK':
      function compareStockASK(a: { stock: number }, b: { stock: number }) {
        if (a.stock < b.stock) {
          return -1;
        }
        if (a.stock > b.stock) {
          return 1;
        }
        return 0;
      }
      updatedProducts.sort(compareStockASK);
      break;
  }
  return updatedProducts;
}

// Search by checkboxes
interface ICheckFilters {
  brand: Array<string>;
  category: Array<string>;
}

function getCheckboxesValue(checkboxes: Array<HTMLInputElement>) {
  const values: Array<string> = [];
  checkboxes.forEach(el => {
    if (el.checked) {
      values.push(el.id);
      if (el.name === 'category') {
        checkFilters.category.push(el.id);
      }
      if (el.name === 'brand') {
        checkFilters.brand.push(el.id);
      }
    }
  });
  checkFilters.category = getUnique(checkFilters.category).filter(
    (el: string) => values.includes(el)
  );
  checkFilters.brand = getUnique(checkFilters.brand).filter((el: string) =>
    values.includes(el)
  );

  return values;
}

const getUnique = (arr: Array<string>) =>
  arr.filter((el, i) => i === arr.indexOf(el));

export function updateFilteredProducts(
  checkboxes: NodeListOf<HTMLInputElement>
) {
  const checkedValues: Array<string> = getCheckboxesValue(
    Array.from(checkboxes)
  );
  if (checkedValues.length >= 0) {
    updatedProducts = filterProducts();
  }
  if (checkedValues.length < 0) {
    updatedProducts = [...products];
  }
  return updatedProducts;
}

function filterProducts() {
  const filterKeys: Array<string> = Object.keys(checkFilters);
  console.log(filterKeys);
  return products.filter(item => {
    return filterKeys.every((key: string) => {
      if (!checkFilters[key as keyof ICheckFilters].length) return true;
      return checkFilters[key as keyof ICheckFilters].find(filter => {
        return filter === item[key as keyof ICheckFilters];
      });
    });
  });
}

export function clearCheckbox(checked: NodeListOf<HTMLInputElement>) {
  updatedProducts = [...products];
  checked.forEach(el => (el.checked = false));
}

// Search by range
// const setRangeState = (type, min, max) => {
//   range[type] = { min, max };
// };

// const setRangeValue = (name, min, max) => {
//   const slider = document.querySelectorAll(`.range_${name}`);
//   slider[0].value = min;
//   slider[1].value = max;
// };

// export const filterByRange = () => {
//   const entries = Object.entries(range);
//   updatedProducts = entries.reduce((acc, item) => {
//     const [key, value] = item;
//     acc = checkRange(acc, key, Number(value.min), Number(value.max));
//     return acc;
//   }, updatedProducts);
// };

// const checkRange = (acc, name, min, max) => {
//   return acc.filter(item => {
//     return item[name] >= min && item[name <= max];
//   });
// };

// Add/delete products
// export const addProductToCart = (prod: IProduct) => {
// let cartProducts = setCart(prod);
// const existProduct = cartProducts.find(el => el.id === prod.id);
// // const duplicates = cartProducts.reduce((acc, el) => {
// //   acc[el] = (acc[el] || 0) + 1;
// //   return acc;
// // }, 0);
// // console.log('duplicates', duplicates);
// if (existProduct) {
//   if (forceUpdate) {
//     cartProducts = cartProducts.map(el =>
//       el.id === existProduct.id ? prod : el
//     );
//   }
// } else {
//   cartProducts = [...cartProducts, prod];
// }
// setCartProducts(cartProducts);
// };

export const toggleBuyBtns = (btn: HTMLButtonElement) => {
  // btn.dataset.added ? (btn.dataset.added = true) : (btn.dataset.added = false);
  // btn.textContent === 'Add'
  //   ? (btn.textContent = 'Delete') | (btn.dataset.added = true)
  //   : (btn.textContent = 'Add') | (btn.dataset.added = false);
};
