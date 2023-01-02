import {
  getProducts,
  getProductById,
  searchProduct,
  getCategories,
  getCategory,
  getBrands,
  getPriceMax,
  getPriceMin,
} from '../../../controllers/apiService';

const productsData = await getProducts();
const productsArr = productsData.products;
let productById = await getProductById(2);

class Product {
  renderOneProduct() {
    let oneProduct = '';
    oneProduct += `
              <ul class="wrapperProductCards">
                <li class="card">
                    <div class="card_info">
                      <div class="wrapperImg">
                        <img class="imagesProduct" src=${productById.images[0]} alt="foto_product">
                      </div>
                      <h3 class="nameProduct">${productById.title}</h3>
                      <span class="nameBrand">Brand: ${productById.brand}</span>
                      <div class="price-wrapper">
                          <span class="price">€&nbsp; ${productById.price}</span>
                          <span class="discount"> -${productById.discountPercentage} % </span>
                      </div>

                      <span class="stock">In stock: ${productById.stock}</span>
                    </div>
                    <div class="buttonsCard">
                      <button class="addProduct">ADD TO BASKET</button>
                      <button class="description">DESCRIPTION</button>
                    </div>
                </li>
              </ul>
            `;
    const ROOT_PRODUCT_CARD = document.getElementById('productCard');
    ROOT_PRODUCT_CARD.innerHTML = oneProduct;
    console.log(oneProduct);
  }

  renderAllProducts() {
    let catalog = '';

    productsArr.forEach(
      ({ title, brand, price, discountPercentage, images, stock }) => {
        let nameUpperCase = title.toUpperCase();
        let brandUpperCase = brand.toUpperCase();
        catalog += `
        <li class="card" data-discount="${discountPercentage}" data-stock="${stock}">
            <div class="card_info">
                <div class="wrapperImg">
                  <img class="imagesProduct" src=${images[0]} alt="foto_product">
                </div>
                <h3 class="nameProduct">${nameUpperCase}</h3>
                <span class="nameBrand">brand: ${brandUpperCase}</span>
                <div class="price-wrapper">
                      <span class="price">€&nbsp; ${productById.price}</span>
                      <span class="discount"> -${productById.discountPercentage} % </span>
                      </div>
                      <span class="stock">In stock: ${stock}</span>
            </div>
            <div class="buttonsCard">
              <button class="addProduct"><i class="fa-solid fa-cart-arrow-down iconAdd"></i></button>
              <button class="description">More</button>
            </div>
        </li>`;
      }
    );
    const card = `
        <ul class="wrapperProductCards" id="wrapperProductCards">
             ${catalog}
        </ul>
    `;

    const ROOT_PRODUCT_CARD = document.getElementById('productCard');
    ROOT_PRODUCT_CARD.innerHTML = card;
  }

  renderFilteredProducts(products) {
    let catalog = '';
    products.forEach(
      ({ title, brand, price, discountPercentage, images, stock }) => {
        catalog += `
        <li class="card">
        <div class="card_info">
            <div class="wrapperImg">
                  <img class="imagesProduct" src=${images[0]} alt="foto_product">
                </div>
                <h3 class="nameProduct">${title}</h3>
                <span class="nameBrand">Brand: ${brand}</span>
                <div class="price-wrapper">
                      <span class="price">€&nbsp; ${productById.price}</span>
                      <span class="discount"> -${productById.discountPercentage} % </span>
                </div>
                      <span class="stock">In stock: ${stock}</span>
            </div>
            <div class="buttonsCard">
              <button class="addProduct"><i class="fa-solid fa-cart-arrow-down iconAdd"></i></button>
              <button class="description">More</button>
            </div>
        </li>
        `;
      }
    );
    const card = `
        <ul class="wrapperProductCards" id="wrapperProductCards">
             ${catalog}
        </ul>
    `;

    const ROOT_PRODUCT_CARD = document.getElementById('productCard');
    ROOT_PRODUCT_CARD.innerHTML = card;
  }
}
const productElement = new Product();
productElement.renderAllProducts();

export default Product;
