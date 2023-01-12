import { parseRequestUrl } from '../../../controllers/utils';
import { IProduct } from '../../../types';

const ProductItem = {
  render: ({
    id,
    title,
    brand,
    price,
    discountPercentage,
    thumbnail,
    images,
    stock,
  }: IProduct) => {
    const request = parseRequestUrl();
    const btns = document.querySelectorAll('addProduct');
    // console.log(btns)
    btns.forEach(b => {
      console.log(b);
      b.addEventListener('click', () => {
        console.log('!!!!!', b);
        document.location.hash = `/#/product/${request.id}`;
      });
    });
    return `<li class="card">
         <div class="card_info">
             <div class="wrapperImg">
                   <img class="imagesProduct" src=${thumbnail} alt="foto_product">
                 </div>
                 <h3 class="nameProduct">${title}</h3>
                 <span class="nameBrand">Brand: ${brand}</span>
                 <div class="price-wrapper">
                       <span class="price">€&nbsp; ${price}</span>
                       <span class="discount"> -${discountPercentage} % </span>
                 </div>
                       <span class="stock">In stock: ${stock}</span>
             </div>
             <div class="buttonsCard">
              <button class="addProduct" id="${id}" data-id="${id}">Add</button>

              <a href='#/product/${id}'><button class="description" id='${id}'>More</button>
              </a>

              <button class="hide buy">Buy Now</button>
             </div>
         </li>
         `;
  },
};

export default ProductItem;
