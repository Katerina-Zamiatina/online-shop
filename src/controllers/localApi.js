import { products } from '../data/data';
import { IProduct } from '../types';

const initialProducts = products;
export let updatedProducts = products;

const checkFilters = {
  brand: [],
  category: [],
};

const range = {
  price: { min: '10', max: '1749' },
  stock: { min: '2', max: '150' },
};

export const getProductById = id => {
  return products.filter(item => item.id === id);
};

// Search by query
export function searchProducts(query) {
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

export function sortProducts(e) {
  const optionValue = e.target.value;
  switch (optionValue) {
    case 'priceDESK':
      function comparePriceDESK(a, b) {
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
      function comparePriceASK(a, b) {
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
      function compareDiscountDESK(a, b) {
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
      function compareDiscountASK(a, b) {
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
      function compareStockDESK(a, b) {
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
      function compareStockASK(a, b) {
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
function getCheckboxesValue(checkboxes) {
  const values = [];
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
  checkFilters.category = getUnique(checkFilters.category).filter(el =>
    values.includes(el)
  );
  checkFilters.brand = getUnique(checkFilters.brand).filter(el =>
    values.includes(el)
  );

  return values;
}

const getUnique = arr => arr.filter((el, i) => i === arr.indexOf(el));

export function updateFilteredProducts(checkboxes) {
  const checkedValues = getCheckboxesValue(Array.from(checkboxes));
  if (checkedValues.length >= 0) {
    updatedProducts = filterProducts();
  }
  if (checkedValues < 0) {
    updatedProducts = [...products];
  }
  return updatedProducts;
}

function filterProducts() {
  const filterKeys = Object.keys(checkFilters);
  return products.filter(item => {
    return filterKeys.every(key => {
      if (!checkFilters[key].length) return true;
      return checkFilters[key].find(filter => {
        return filter === item[key];
      });
    });
  });
}

export function clearCheckbox(checked) {
  updatedProducts = [...products];
  checked.forEach(el => (el.checked = false));
}

// Search by range
const setRangeState = (type, min, max) => {
  range[type] = { min, max };
};

const setRangeValue = (name, min, max) => {
  const slider = document.querySelectorAll(`.range_${name}`);
  slider[0].value = min;
  slider[1].value = max;
};

export const filterByRange = () => {
  const entries = Object.entries(range);
  updatedProducts = entries.reduce((acc, item) => {
    const [key, value] = item;
    acc = checkRange(acc, key, Number(value.min), Number(value.max));
    return acc;
  }, updatedProducts);
};

const checkRange = (acc, name, min, max) => {
  return acc.filter(item => {
    return item[name] >= min && item[name <= max];
  });
};

// Add/delete products
export const addProductToCart = prod => {
  let cartProducts = setCart();
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
};

export const toggleBuyBtns = btn => {
  // btn.dataset.added ? (btn.dataset.added = true) : (btn.dataset.added = false);
  btn.textContent === 'Add'
    ? (btn.textContent = 'Delete') | (btn.dataset.added = true)
    : (btn.textContent = 'Add') | (btn.dataset.added = false);
};

// export const drawFilteredProducts = (query, e) => {
//   updatedProducts = filterByCheckbox();
//   updatedProducts = filterBySearchQuery(query);
//   updateDoubleRange(updatedProducts, rangeSliders, setRangeState());
//   filterByRange();
//   const sorted = sortProducts(e);
//   return sorted;
// };
