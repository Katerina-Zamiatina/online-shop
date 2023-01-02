export function getCartProducts() {
  const cartProducts = localStorage.getItem('cartProducts')
    ? JSON.parse(localstorage.getItem('cartProducts'))
    : [];
  return cartProducts;
}

export function setCartProducts(cartProducts) {
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

export function cleanCart() {
  localStorage.removeItem('cartProducts');
}
