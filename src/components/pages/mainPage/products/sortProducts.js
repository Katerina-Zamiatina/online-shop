import {getProducts} from '../../../controllers/apiService';
const productsData = await getProducts();
const data = productsData.products;
const select = document.getElementById("sortSelect");     
 //data.map((el)=>{console.log(el.)});


select.addEventListener("change", function(){
    event.preventDefault();
let optionValue = this.options[this.selectedIndex].value

    switch(optionValue){
        case 'priceDESK':
            function comparePriceDESK( a, b ) {
                if ( a.price < b.price ){
                  return -1;
                }
                if ( a.price > b.price ){
                  return 1;
                }
                return 0;
              }
             let priceDESK =  data.sort( comparePriceDESK);
             priceDESK.reverse();
             renderAllProducts(priceDESK)
            break;
        case 'priceASK':
            function comparePriceASK( a, b ) {
                if ( a.price < b.price ){
                  return -1;
                }
                if ( a.price > b.price ){
                  return 1;
                }
                return 0;
              }
              let priceASK = data.sort( comparePriceASK );
              renderAllProducts(priceASK)
            break;
        case 'discountDESK':
           function compareDiscountDESK( a, b ) {
               if ( a.discountPercentage < b.discountPercentage ){
                 return -1;
               }
               if ( a.discountPercentage > b.discountPercentage ){
                 return 1;
               }
               return 0;
             }
            let discountDESK =  data.sort( compareDiscountDESK );
               discountDESK.reverse()
            renderAllProducts(discountDESK);
            break;
        case 'discountASK': 
            function compareDiscountASK( a, b ) {
                if ( a.discountPercentage < b.discountPercentage ){
                  return -1;
                }
                if ( a.discountPercentage > b.discountPercentage ){
                  return 1;
                }
                return 0;
              }
              let discountASK = data.sort( compareDiscountASK );
              renderAllProducts(discountASK)
                        break;
        case 'stockDESK':
            function compareStockDESK( a, b ) {
                if ( a.stock < b.stock ){
                  return -1;
                }
                if ( a.stock > b.stock ){
                  return 1;
                }
                return 0;
              }
             let stockDESK =  data.sort( compareStockDESK );
             stockDESK.reverse()
             renderAllProducts(stockDESK);
                        break;
        case 'stockASK':
            function compareStockASK( a, b ) {
                if ( a.stock < b.stock ){
                  return -1;
                }
                if ( a.stock > b.stock ){
                  return 1;
                }
                return 0;
              }
              let stockASK = data.sort( compareStockASK );
              renderAllProducts(stockASK)
            break;
        }

      function  renderAllProducts(data) {
            let catalog = '';
               data.forEach(({title, brand, price, discountPercentage, images, stock}) =>{
              let nameUpperCase = title.toUpperCase();
              let brandUpperCase = brand.toUpperCase();
            catalog += `
            <li class="card" data-price="${price}" data-discount="${discountPercentage}" data-stock="${stock}">
                <div class="wrapperImg">
                  <img class="imagesProduct" src=${images[0]} alt="foto_product">
                </div>
                <h3 class="nameProduct">${nameUpperCase}</h3>
                <span class="nameBrand">brand: ${brandUpperCase}</span>
                <span class="price">price: ${price}</span>
                <span class="discount">discount: ${discountPercentage}</span>
                <span class="stock">stock: ${stock}</span>
                <div class="buttonsCard">
                  <button class="addProduct">Add to basket</button>
                  <button class="description">Description</button>
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

});

(function(){
        if (localStorage.selectedIndex !== undefined) {
            select.selectedIndex = localStorage.selectedIndex;
        }
        select.onchange = function() {
            localStorage.selectedIndex = this.selectedIndex;
        }
    })()
    



