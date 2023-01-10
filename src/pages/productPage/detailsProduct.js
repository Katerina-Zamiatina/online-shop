import ProductItem from '../mainPage/products/ProductItem';
import { rerender, parseRequestUrl } from '../../controllers/utils';
import { getProductById } from '../../controllers/localApi';

const ProductDetails = {
  afterRender: async () => {
    // Open product description
    const request = parseRequestUrl();
    const btnsMore = document.querySelectorAll('.description');
    btnsMore.forEach(b => {
      b.addEventListener('click', () => {
        // console.log('!!!!!', b);
        request.id = b.id;
        item = products.filter(i => i.id === b.id);
        // console.log(item);
        document.location.hash = `/product/${request.id}`;
        // ProductDetails.render(item);
      });
    });


    function showImage(event) {
    // Получаем элемент, по которому был совершен клик
      const clickedElement = event.target;
      const img = document.querySelectorAll('.fotoAllProducts');
    // Проверяем, что клик был совершен по изображению
      if (clickedElement.tagName === 'IMG') {

        const container = document.querySelector(".oneFoto");
        container.innerHTML = '';
        container.innerHTML = `<img class="fotoOneproduct" src="${clickedElement.src}" alt="${clickedElement.alt}">`;
      }
    }
    //добавляем клик на картинку
      const images = document.querySelectorAll('.fotoAllProducts');
      images.forEach(img => img.addEventListener('click', ()=>{
        showImage(event)
      }));


    // Add product to Cart
    const btnsAdd = document.querySelectorAll('.addProduct');
    const btnBuy = document.querySelector('.btnBuy');
    const wrapperBackground = document.querySelector('.wrapperBackground');
          wrapperBackground.style.display = "none";

      btnBuy.addEventListener('click', function(){
      wrapperBackground.style.display = "grid";

})
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
          <div class="allFoto" ${ productItems.map((el) => `<li> <img  class="fotoAllProducts" src=${el}> </li> ` ).join("")}></div>

          <div class="oneFoto"><img class="fotoOneproduct" src="${product[0].images[0]}" alt="fotoProduct"></div>
          <div class="allDetails">
            <ul>
              <li class="liDescription descriptionOneCard"><div class="titleLi">Description</div>${product[0].description}</li>
              <li class="liDescription discountOneCard"><div class="titleLi">Discount Percentage</div>${product[0].discountPercentage}</li>
              <li class="liDescription ratingOneCard"><div class="titleLi">Rating</div>${product[0].rating}</li>
              <li class="liDescription stockOneCard"><div class="titleLi">Stock</div>${product[0].stock}</li>
              <li class="liDescription brandOnecard"><div class="titleLi">Brand</div>${product[0].brand}</li>
              <li class="liDescription categoryOneCard"><div class="titleLi">Category</div>${product[0].category}</li>
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
