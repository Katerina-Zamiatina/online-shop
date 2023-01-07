import './sass/index.scss';
import App from './app/app';
import { products } from './data/data';

const app = new App();
app.start();

export const getProductById = id => {
  return products.filter(item => item.id === id);
};



let query = 'apple';
let updatedProducts = products;
let checkFilters = {
  brand: [],
  category: [],
};

let range = {
  price: { min: '10', max: '1749' },
  stock: { min: '2', max: '150' },
};

// Search by query

function filterBySearchQuery() {
  if (query !== '') {
    return products.filter(item => {
      return chooseSearchFields(item, query);
    });
  } else {
    return products;
  }
}

function chooseSearchFields(product, query) {
  const rg = new RegExp('\\b' + query.toLowerCase() + '\\b');
  const res = Object.entries(product).some(item => {
    if (item[0] === 'id' || item[0] === 'thumbnail' || item[0] === 'images')
      return false;
    return rg.test(item[1].toString().toLowerCase());
  }, []);
  return res;
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

const filterByRange = () => {
  const entries = Object.entries(range);
  products = entries.reduce((acc, item) => {
    const [key, value] = item;
    acc = this.checkRange(acc, key, Number(value.min), Number(value.max));
    return acc;
  }, products);
};

const drawFilteredProducts = callback => {
  filterByCheckbox();
  filterBySearchQuery();
  updateDoubleRange(products, rangeSliders, setRangeState.bind(this));
  filterByRange();
  const sorted = sortProductList();
  return sorted.map(callback);
};

// const checkIsOrdered = id => {
//   const keys = Object.keys(this.orderState.orderList);
//   return keys.includes(id.toString());
// };

export const getProductCard = id => {
  const item = getProductById(id);
  return item;
  //   return item ? { ...item, ordered: checkIsOrdered(id) } : null;
};

// console.log('getProductCard', getProductCard(1));
// console.log(checkProp(products[0], 'apple'));
// console.log('SEARCH', filterBySearchQuery());
