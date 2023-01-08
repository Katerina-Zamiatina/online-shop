import { parseRequestUrl } from '../../../controllers/utils';
import ProductItem from './ProductItem';

const Products = {
  render: prods => {
    // console.log('PRODS', prods);
    const request = parseRequestUrl();
    return `<ul class="wrapperProductCards" id="wrapperProductCards">
     ${prods.map(prod => ProductItem.render(prod)).join('\n')}
    </ul>`;
  },
};

export default Products;
