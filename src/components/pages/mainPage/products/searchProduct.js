const productCard = document.getElementById('productCard');
const searchBar = document.getElementById('searchBar');



if (window.localStorage) {
  let elements = document.querySelectorAll('[name]');
 
  for (let i = 0, length = elements.length; i < length; i++) {
    (function(element) {
      let name = element.getAttribute('name');
 
      element.value = localStorage.getItem(name) || '';
 
      element.onkeyup = function() {
        localStorage.setItem(name, element.value);
      };
    })(elements[i]);
  }
}



   searchBar.addEventListener('input', (e) => {
  
    const searchString = e.target.value.toUpperCase();
    console.log(searchString);
    const baseUrl = 'https://dummyjson.com/';
    const prod = baseUrl + 'products';
    
    async function searchProduct() {
      try {
        const res = await fetch(`${prod}?limit=100`);
        let d = await res.json();
         sd = await d.products;

        const filteredCards = sd.filter((card) => {
          return (
              card.title.toUpperCase().includes(searchString) ||
              card.brand.toUpperCase().includes(searchString) ||
              card.price.toString().includes(searchString) ||
              card.discountPercentage.toString().includes(searchString) ||
              card.stock.toString().includes(searchString)
          );
      });

      function countSerch(){
        let countNum = filteredCards.length
        const numerSerch = `
        <div class="foundNum" id="foundNum"> ${countNum}</div>
        `;
        const counter = document.getElementById("foundNum");
              counter.innerHTML = numerSerch;
      }
      countSerch();


     function renderSerchedProducts() {
        let catalog = '';

        filteredCards.forEach(({title, brand, price, discountPercentage, images, stock}) =>{
          let nameUpperCase = title.toUpperCase();
          let brandUpperCase = brand.toUpperCase();
        catalog += `
        <li class="card">
            <div class="wrapperImg">
              <img class="imagesProduct" src=${images[0]} alt="foto_product">
            </div>
            <h3 class="nameProduct">${nameUpperCase}</h3>
            <span class="nameBrand">brand: ${brandUpperCase}</span>
            <span class="price">price: ${price}</span>
            <span class="discount">discount: ${discountPercentage}</span>
            <span class="stock">stock: ${stock}</span>
            <div class="buttonsCard">
              <button class="addProduct">add to basket</button>
              <button class="description">description</button>
            </div>
        </li>
        `
        });
        const card = `
        <ul class="wrapperProductCards" id="wrapperProductCards">
             ${catalog}
        </ul>
    `;

    const ROOT_PRODUCT_CARD = document.getElementById("productCard");
          ROOT_PRODUCT_CARD.innerHTML = card;
    };  
    renderSerchedProducts();
 
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
   searchProduct(searchString);

  });




