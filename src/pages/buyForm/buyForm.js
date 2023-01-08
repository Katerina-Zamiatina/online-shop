const visa = document.querySelector(".iconVisa");
const master = document.querySelector(".iconMastercard");
const payPal = document.querySelector(".iconPaypal");
const form = document.querySelector('.formBuy');
const fields = form.querySelectorAll('.input');
const login = document.getElementById('name');
const tel = document.getElementById('tel');
const address = document.getElementById('address');
const email = document.getElementById('email');
const cardNumber = document.getElementById('cardNumber');
const validCard = document.getElementById('validCard');
const cvv = document.getElementById('cvv');
const wrapperBackground = document.querySelector('.wrapperBackground')
const listenerForm = document.getElementById('clickForm')

listenerForm.addEventListener('click', function(){
    wrapperBackground.style.display = "grid";
})

cardNumber.addEventListener("input", function() {
    function lim(cardNumber){
                    let max_chars = 16;
                    
                    if(cardNumber.value.length = max_chars) {
                        cardNumber.value = cardNumber.value.substr(0, max_chars);
                    }
                };
                lim(cardNumber);

                const elem = document.getElementById("cardNumber").value[0];
                if(elem == 5){
                    payPal.classList.remove('activeCard');
                    visa.classList.remove('activeCard');
                    master.classList.add('activeCard'); 
                }
                else if(elem == 4){
                    master.classList.remove('activeCard'); 
                    payPal.classList.remove('activeCard');
                    visa.classList.add('activeCard');
                }
                else{
                    master.classList.remove('activeCard'); 
                    payPal.classList.add('activeCard');
                    visa.classList.remove('activeCard');
                };
        });

validCard.addEventListener("input", function() {
const element = document.getElementById("validCard");
              function addSlash(){ 
                  if(element.value.length == 4){
                      let sss = Array.from( element.value);
                      let mm =sss.slice(0, 2).join('');
                      let yy =sss.slice(2, 4).join('');
                      let mmyy = mm +'/'+ yy;
                      element.value = mmyy;
                  }
                  element.onkeydown =function(event) {
                      switch (event.keyCode) {
                          case 8:
                              element.value = "";
                              break;
                          case 46:
                              element.value = "";
                              break;
                      }
                  };
              };
              addSlash()
              function limit(element){
                  let max_chars = 5;
                  
                  if(element.value.length = max_chars) {
                      element.value = element.value.substr(0, max_chars);
                  }
              }
              limit(element);
    });

cvv.addEventListener("input", function() {
const elm = document.getElementById("cvv");
                function limi(elm){
                    let max_chars = 3;
                    if(elm.value.length = max_chars) {
                        elm.value = elm.value.substr(0, max_chars);
                    }
                };
                limi(elm);
    });
function checkInputs() {
//Получаем строку из инпута
const loginValue = login.value.trim();
const telValue = tel.value.trim();
const addressValue = address.value.trim();
const emailValue = email.value.trim();
const cardNumberValue = cardNumber.value.trim();
const validCardValue = validCard.value.trim();
const cvvValue = cvv.value.trim();

// Делаем валидацию значений инпутов
const checkLogin = /^([a-zA-Z]{3,})+[\s*]+([a-zA-Z]{3,}[\s]{0,})+$/.test(loginValue);
const checkTel = /^((\+)+([0-9]){9,})$/.test(telValue);
const checkAddress = /^([a-zA-Z]{5,})+[\s*]+([a-zA-Z]{5,})+[\s*]+([a-zA-Z]{5,}[\s]{0,})+$/.test(addressValue);
const checkEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailValue);
const checkCardNumber = /^([0-9]{16})+$/.test(cardNumberValue.substr(0, 16));
const checkValidCard = /^(0?0[1-9]|1[012])+[/]+(18|19|20|21|22|23|24|25|26|27|28)$/.test(validCardValue.substr(0, 5));
const checkCvv = /^[1-9]{3}$/.test(cvvValue.substr(0, 3));
const btnvalidation = document.getElementById('#btnvalidation');

// Для скрытия предупреждений
  setErrorFor(login, '');
  setErrorFor(tel, '');
  setErrorFor(address, '');
  setErrorFor(email, '');
  setErrorFor(cardNumber, '');
  setErrorFor(validCard, '');
  setErrorFor(cvv, '');

//login
  if (loginValue === '') {
    setErrorFor(login, 'Поле "Имя" обязательно для заполнения');
  }else if(checkLogin === false){
    setErrorFor(login, 'Введите имя и фамилия. Два слова минимум по три буквы');
  }else {
    setSuccessFor(login);
  }
//tel
  if (telValue === '') {
    setErrorFor(tel, 'Поле "Телефон" обязательно для заполнения');
  }else if(checkTel === false){
    setErrorFor(tel, 'Введите телефон в формате +1234567890');
  }else {
    setSuccessFor(tel);
  }
//address
  if (addressValue === '') {
      setErrorFor(address, 'Поле "Адрес" обязательно для заполнения');
    }else if(checkAddress === false){
      setErrorFor(address, 'Введите адрес латинскими буквами. Минимум три слова по пять букв');
    }else {
      setSuccessFor(address);
    }
//email
  if (emailValue === '') {
      setErrorFor(email, 'Поле "E-mail" обязательно для заполнения');
    }else if(checkEmail === false){
      setErrorFor(email, 'Введите корректный E-mail');
    }else {
      setSuccessFor(email);
  }
//cardNumber
  if (cardNumberValue === '') {
      setErrorFor(cardNumber, 'Поле "Номер карты" обязательно для заполнения');
    }else if(checkCardNumber === false){
      setErrorFor(cardNumber, 'Минимум 16 цифр');
    }else {
      setSuccessFor(cardNumber);
  }
//validData
  if (validCardValue === '') {
      setErrorFor(validCard, 'Поле "Срок действия карты" обязательно для заполнения');
    }else if(checkValidCard === false){
      setErrorFor(validCard, 'Введите число в формате мм/гг. Корректные года карты с 18 до 28');
    }else {
      setSuccessFor(validCard);
  }
//cvv
  if (cvvValue === '') {
      setErrorFor(cvv, 'Поле "СVV" обязательно для заполнения');
    }else if(checkCvv === false){
      setErrorFor(cvv, 'Введите три цифры CVV');
    }else {
      setSuccessFor(cvv);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const span = formControl.querySelector('.wrapperInput');
  formControl.className = 'form-conrol error';
  span.innerHTML = message;
  formControl.className = 'error';
  formControl.style.color = 'rgb(244, 123, 123)';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-conrol success';
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
    const loginValue = login.value.trim();
    const telValue = tel.value.trim();
    const addressValue = address.value.trim();
    const emailValue = email.value.trim();
    const cardNumberValue = cardNumber.value.trim();
    const validCardValue = validCard.value.trim();
    const cvvValue = cvv.value.trim();

    const checkLogin = /^([a-zA-Z]{3,})+[\s*]+([a-zA-Z]{3,}[\s]{0,})+$/.test(loginValue);
    const checkTel = /^((\+)+([0-9]){9,})$/.test(telValue);
    const checkAddress = /^([a-zA-Z]{5,})+[\s*]+([a-zA-Z]{5,})+[\s*]+([a-zA-Z]{5,}[\s]{0,})+$/.test(addressValue);
    const checkEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailValue);
    const checkCardNumber = /^([0-9]{16})+$/.test(cardNumberValue.substr(0, 16));
    const checkValidCard = /^(0?0[1-9]|1[012])+[/]+(18|19|20|21|22|23|24|25|26|27|28)$/.test(validCardValue.substr(0, 5));
    const checkCvv = /^[1-9]{3}$/.test(cvvValue.substr(0, 3));
    let arrResults = [checkLogin, checkTel, checkAddress, checkEmail, checkCardNumber, checkValidCard, checkCvv];
 
// проверка на корректный ввод всех инпутов  
    let arrResultSuccess = [];
    for(let item of arrResults) {
        if(item === true){
            arrResultSuccess.push(item);
        }
    }
    if(arrResultSuccess.length === 7){
        const wrapperSpanSuccsess = document.getElementById('wrapperSpanSuccsess');
    let spanString = '';
        spanString = ` 
          <span class="spanSuccess">Данные успешно внесены. Благодарим за покупку.</span>
          `;
          wrapperSpanSuccsess.innerHTML = spanString;
          function check_disable(){
            let input = document.getElementsByTagName('input');
            for( let i = 0; i < input.length; i++ ){
                input[i].setAttribute('disabled', 'disabled');
            }
          }
          check_disable();
          setTimeout(() => {
            wrapperBackground.style.display = "none"; /// cюда вставить роутинг в "Корзину"

          }, "3000")
        }else{


        console.log("ok");
    }
});
