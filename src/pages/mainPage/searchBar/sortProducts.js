import { products } from '../../../controllers/apiService';
import Products from '../products/products';

const data = products;

const Select = {
  render: async () => {
    return `<select id="sortSelect" class="sortSelect">
            <option _ngcontent-fnt-c31="" value="sort-title" disabled="" selected="" class="sort-name">
            Sort options:
            </option>
            <option class="sortOption" id="priceDESK" value="priceDESK">
              Sort by price DESK
            </option>
            <option class="sortOption" id="priceASK" value="priceASK">
              Sort by price ASK
            </option>
            <option class="sortOption" id="discountDESK" value="discountDESK">
              Sort by discount DESK
            </option>
            <option class="sortOption" id="discountASK" value="discountASK">
              Sort by discount ASK
            </option>
            <option class="sortOption" id="stockDESK" value="stockDESK">
              Sort by stock DESK
            </option>
            <option class="sortOption" id="stockASK" value="stockASK">
              Sort by stock ASK
            </option>
          </select>`;
  },
};

export async function handleSelect(e, items) {
  event.preventDefault();
  let optionValue = e.target.value;
  let sortedProducts;
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
      let priceDESK = data.sort(comparePriceDESK);
      // priceDESK.reverse();
      sortedProducts = priceDESK.reverse();
      // sortedProducts = await Products.render(priceDESK);
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
      let priceASK = data.sort(comparePriceASK);
      sortedProducts = await Products.render(priceASK);
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
      let discountDESK = data.sort(compareDiscountDESK);
      discountDESK.reverse();
      sortedProducts = await Products.render(discountDESK);
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
      let discountASK = data.sort(compareDiscountASK);
      sortedProducts = await Products.render(discountASK);
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
      let stockDESK = data.sort(compareStockDESK);
      stockDESK.reverse();
      sortedProducts = await Products.render(stockDESK);
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
      let stockASK = data.sort(compareStockASK);
      sortedProducts = await Products.render(stockASK);
      break;
  }
  return sortedProducts;
}

export default Select;
