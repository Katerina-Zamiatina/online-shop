import {getProducts, getProductById, searchProduct, getCategories, getCategory, getBrands, getPriceMax, getPriceMin} from '../../../controllers/apiService';


const productsData = await getProducts();
const productsArr = productsData.products;

let productById = await getProductById(2);


class Product {


    renderOneProduct(){
        let oneProduct = '';

            oneProduct += `
              <ul class="wrapperProductCards">
                <li class="card">
                    <div class="wrapperImg">
                      <img class="imagesProduct" src=${productById.images[0]} alt="foto_product">
                    </div>
                    <h3 class="nameProduct">${productById.title}</h3>
                    <span class="nameBrand">Brand: ${productById.brand}</span>
                    <span class="price">Price: ${productById.price}</span>
                    <span class="discount">Discount: ${productById.discountPercentage}</span>
                    <span class="stock">Stock: ${productById.stock}</span>
                    <div class="buttonsCard">
                      <button class="addProduct">ADD TO BASKET</button>
                      <button class="description">DESCRIPTION</button>
                    </div>
                </li>
              </ul>
            `
            const ROOT_PRODUCT_CARD = document.getElementById("productCard");
                  ROOT_PRODUCT_CARD.innerHTML = oneProduct;
            console.log(oneProduct);
    };

    renderAllProducts() {
        let catalog = '';

        productsArr.forEach(({title, brand, price, discountPercentage, images, stock}) =>{
        
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
            <div class="buttonsCard">
              <button class="addProduct">ADD TO BASKET</button>
              <button class="description">DESCRIPTION</button>
            </div>
        </li>
        `
        });
        const card = `
        <ul class="wrapperProductCards">
             ${catalog}
        </ul>
    `;
    
    const ROOT_PRODUCT_CARD = document.getElementById("productCard");
          ROOT_PRODUCT_CARD.innerHTML = card;
    };    
}


      


const productElement = new Product();
productElement.renderAllProducts();

export default Product;