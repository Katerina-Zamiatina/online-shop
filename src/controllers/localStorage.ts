import { OrderType, BtnsType } from '../types';

export enum LocalStorage {
  cartList = 'cart_list',
  cartCount = 'cart_count',
  btns = 'btn_state',
}

export function updateCart(id: string, count: string, stock: string) {
  const store = getCart();
  if (store) {
    if (count === '0') delete store[id];
    else
      store[id] = {
        ...store[id],
        count:
          Math.floor(Number(count)) < Math.floor(Number(stock)) ? count : stock,
      };
    setCart(store);
  }
}

export function addToCart(id: string, count: number, price: string) {
  const store = getCart();
  const length = Object.entries(store).length;
  let newStore = store;
  if (store[id]) {
    if (count > 0) {
      newStore = store
        ? {
            ...store,
            [id]: {
              count: store[id]
                ? (Number(store[id].count) + count).toString()
                : count.toString(),
              price,
            },
          }
        : { [id]: { count: count.toString(), price } };
    } else {
      delete newStore[id];
      setCartCount(length !== 0 ? length - 1 : 0);
    }
  } else {
    newStore[id] = { count: count.toString(), price };
    setCartCount(length + 1);
  }
  setCart(newStore);
}

export function setCart<T>(list: T) {
  localStorage.setItem(LocalStorage.cartList, JSON.stringify(list));
}

export function getCart() {
  const str = localStorage.getItem(LocalStorage.cartList);
  if (str === null) return {};
  const list = JSON.parse(str) as Record<string, OrderType>;
  return list ? list : {};
}

export function setCartCount<T>(count: T) {
  localStorage.setItem(LocalStorage.cartCount, JSON.stringify(count));
}

export function getCartCount() {
  const str = localStorage.getItem(LocalStorage.cartCount);
  if (str === null) return 0;
  const count = JSON.parse(str);
  return count ? count : 0;
}

export function getCartSum() {
  const cartValues = Object.values(getCart());
  return cartValues.length
    ? cartValues.reduce((acc, val) => {
        return acc + Math.floor(Number(val.count));
      }, 0)
    : 0;
}

export function updateBtnsState(id: string, state: string) {
  const btns = getBtnState();
}

export function setBtnState<T>(btn: T) {
  // console.log(btn);
  localStorage.setItem(LocalStorage.cartCount, JSON.stringify(btn));
}

export function getBtnState() {
  const str = localStorage.getItem(LocalStorage.btns);
  if (str === null) return {};
  const btns = JSON.parse(str) as Record<string, BtnsType>;
  return btns ? btns : {};
}

export function clearCart() {
  setCartCount(0);
  setCart({});
}
