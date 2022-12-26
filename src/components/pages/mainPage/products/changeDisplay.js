import './products'
import './sortProducts'

const conteinerCards = document.getElementById("wrapperProductCards");
console.log(conteinerCards);
const button3x3 = document.getElementById("display3x3");
const button2x2 = document.getElementById("display2x2");

function changeDisplay(){
    button2x2.addEventListener('click', () => {
        conteinerCards.classList.add('wrapperProductCards') ;
        conteinerCards.classList.remove('changeDisplayCard') ;
    })
    button3x3.addEventListener('click', () => {
        conteinerCards.classList.remove('wrapperProductCards') ;
        conteinerCards.classList.add('changeDisplayCard') ;
    })  
    
}
changeDisplay();
