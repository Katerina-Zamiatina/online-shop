import { parseRequestUrl } from '../../../controllers/utils';
import ProductItem from './ProductItem';

// let productById = await getProductById(2);

const Products = {
  render: async prods => {
    const request = parseRequestUrl();
    return `<ul class="wrapperProductCards" id="wrapperProductCards">
     ${prods.map(prod => ProductItem.render(prod)).join('\n')}
    </ul>`;
  },
};

export default Products;
