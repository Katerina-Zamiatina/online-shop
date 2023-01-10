import ProductItem from '../mainPage/products/ProductItem';
import { rerender, parseRequestUrl } from '../../controllers/utils';
import { getProductById } from '../../controllers/localApi';
import { IProduct } from '../../types';
import { products } from '../../data/data';

const ProductDetails = {
  afterRender: async () => {
    // Refs
    const btnsMore = document.querySelectorAll('.description');
    const container = <HTMLElement>document.querySelector('.oneFoto');
    const images = document.querySelectorAll('.fotoAllProducts');
    const btnsAdd = document.querySelectorAll('.addProduct');
    const btnBuy = <HTMLButtonElement>document.querySelector('.btnBuy');
    const wrapperBackground = <HTMLElement>(
      document.querySelector('.wrapperBackground')
    );

    const request = parseRequestUrl();

    // Open product description
    btnsMore.forEach(b => {
      b.addEventListener('click', () => {
        request.id = b.id;
        const item = products.filter((i: IProduct) => i.id.toString() === b.id);
        document.location.hash = `/product/${request.id}`;
      });
    });

    //добавляем клик на картинку
    images.forEach(img =>
      img.addEventListener('click', e => {
        // Получаем элемент, по которому был совершен клик
        const clickedElement = e.target as HTMLImageElement;
        // Проверяем, что клик был совершен по изображению
        if (clickedElement.tagName === 'IMG') {
          container.innerHTML = '';
          container.innerHTML = `<img class="fotoOneproduct" src="${clickedElement.src}" alt="${clickedElement.alt}">`;
        }
      })
    );

    // Add product to Cart
    wrapperBackground.style.display = 'none';
    btnBuy.addEventListener('click', function () {
      wrapperBackground.style.display = 'grid';
    });
  },

  render: async () => {
    const request = parseRequestUrl();
    const id = Number(request.id);
    const product = getProductById(id);
    let productItems = product[0].images;
    return `
    <div class="wrapper">
      <div class="wrapperOneCard">
      <ul class="wrapperUl">
        <li class="back-to-result"><a class="a" href="/#/">STORE</a></li>
        <li>>></li>
        <li>${product[0].category.toUpperCase()}</li>
        <li>>></li>
        <li>${product[0].brand.toUpperCase()}</li>
        <li>>></li>
        <li>${product[0].title.toUpperCase()}</li>
      </ul>
      <div class="cardOne">
        <div class="cardOneTitle">${product[0].title.toUpperCase()}</div>
        <div class="cardOneDetails">
          <div class="allFoto" ${productItems
            .map(
              el =>
                `<li> <img class="fotoAllProducts" alt="${product[0].title}" src=${el}> </li> `
            )
            .join('')}></div>

          <div class="oneFoto"><img class="fotoOneproduct" src="${
            product[0].images[0]
          }" alt="fotoProduct"></div>
          <div class="allDetails">
            <ul>
              <li class="liDescription descriptionOneCard"><div class="titleLi">Description</div>${
                product[0].description
              }</li>
              <li class="liDescription discountOneCard"><div class="titleLi">Discount Percentage</div>${
                product[0].discountPercentage
              }</li>
              <li class="liDescription ratingOneCard"><div class="titleLi">Rating</div>${
                product[0].rating
              }</li>
              <li class="liDescription stockOneCard"><div class="titleLi">Stock</div>${
                product[0].stock
              }</li>
              <li class="liDescription brandOnecard"><div class="titleLi">Brand</div>${
                product[0].brand
              }</li>
              <li class="liDescription categoryOneCard"><div class="titleLi">Category</div>${
                product[0].category
              }</li>
            </ul>
          </div>
          <div class="priceAndButton">
            <div class="priceOneCard">${product[0].price}€</div>
            <button class="buttonOneCard dropFromCarr"><a href="/#/cart">ADD CART</a></button>
            <button class="buttonOneCard buyNowOneCard btnBuy"><a href="/#/cart
            ">BUY NOW</a></button>
          </div>
        </div>

      </div>
    </div>
  </div>
    `;
  },
};

export default ProductDetails;
