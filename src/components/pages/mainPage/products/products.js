//import {getProducts, getProduct, searchProduct, getCategories, getCategory, getBrands, getPriceMax, getPriceMin} from '../productAPI';
//const data = getProducts(100);
//const dataStart = getProduct(1);
//const search = searchProduct('phone');
//const categoryes = getCategories();
//const smartphones = getCategory('smartphones');
//const brand = getBrands();
//const PriceMax = getPriceMax();
//const PriceMin = getPriceMin();
//
//console.log(PriceMin)
//console.log(PriceMax)
//console.log(data);
//console.log(smartphones);
//import  productsData from './allProducts';
//
//const productsArr = productsData.products;
//console.log(productsArr);
//
//class Products {
//
//    render() {
//        productsArr.forEach((element) =>{
//            console.log(element);
//        })
//    }
//}
//
//const productElem = new Products();
//productElem.render();
//
//export default Products;

///Правильный код
import productsData from './allProducts';

const productsArr = productsData.products;

class Products {
  render() {
    let catalog = '';

    productsArr.forEach(
      ({ title, brand, price, discountPercentage, images, stock }) => {
        catalog += `
       <li class="card">
           <div class="wrapperImg">
             <img class="imagesProduct" src=${images[0]} alt="foto_product">
           </div>
           <h3 class="nameProduct">${title}</h3>
           <span class="nameBrand">Brand: ${brand}</span>
           <span class="price">Price: ${price}</span>
           <span class="discount">Discount: ${discountPercentage}</span>
           <span class="stock">Stock: ${stock}</span>
           <button class="addProduct">Add product</button>
           <button class="description">Description</button>
       </li>
       `;
      }
    );

    const card = `
           <ul class="wrapperProductCards">
                ${catalog}
           </ul>
       `;

    const ROOT_PRODUCT_CARD = document.getElementById('productCard');
    ROOT_PRODUCT_CARD.innerHTML = card;
  }
}

// const productElem = new Products();
// productElem.render();

export default Products;
