import ProductItem from '../mainPage/products/ProductItem';
import { rerender, parseRequestUrl } from '../../controllers/utils';
import { getProductCard, getProductById } from '../../index';

// console.log(getProductById("2"))

const ProductDetails = {
  afterRender: async () => {
    // Open product description
    const request = parseRequestUrl();
    const btnsMore = document.querySelectorAll('.description');
    console.log(btnsMore);
    btnsMore.forEach(b => {
      b.addEventListener('click', () => {
        console.log('!!!!!', b);
        request.id = b.id;
        item = products.filter(i => i.id === b.id);
        console.log(item);
        document.location.hash = `/product/${request.id}`;
        // ProductDetails.render(item);
      });
    });
    // Add product to Cart
    const btnsAdd = document.querySelectorAll('.addProduct');
  },
  render: async () => {
    const request = parseRequestUrl();
    const id = Number(request.id);
    const product = getProductById(id);
    return `<div class="back-to-result">
        <a href="/#/">Back to shopping </a>
      </div>
      <div class="productMore">${await ProductItem.render(product[0])}</div>
    `;
  },
};
export default ProductDetails;
