import { parseRequestUrl } from '../../../controllers/utils';

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
  }) => {
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
              <button class="addProduct" id='${id}'><i class="fa-solid fa-cart-arrow-down iconAdd"></i></button>
              <a href='#/product/${id}'><button class="description" id='${id}'>More</button>
              </a>

             </div>
         </li>
         `;
  },
};

export default ProductItem;
