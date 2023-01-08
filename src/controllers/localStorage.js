export function getCartProducts() {
  const cartProducts = localStorage.getItem('productsInCart')
    ? JSON.parse(localStorage.getItem('productsInCart'))
    : [];
  return cartProducts;
}

export function setCartProducts(cartProducts) {
  localStorage.setItem('productsInCart', JSON.stringify(cartProducts));
}

export function cleanCart() {
  localStorage.removeItem('productsInCart');
}

