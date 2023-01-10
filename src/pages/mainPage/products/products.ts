import ProductItem from './ProductItem';
import { IData } from '../../../types';

const Products = {
  render: (prods: IData) => {
    return `<ul class="wrapperProductCards" id="wrapperProductCards">
     ${prods.map(prod => ProductItem.render(prod)).join('\n')}
    </ul>`;
  },
};
export default Products;
