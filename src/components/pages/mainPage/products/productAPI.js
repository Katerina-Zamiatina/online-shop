//const base = 'https://dummyjson.com/';
//const prod = base + 'products';
//
//export const getProducts = async (limit = 100) => {
//  const res = await fetch(`${prod}?limit=${limit}`);
//  return res.json();
//}
//
//export const getProduct = async (id) => {
//  const res = await fetch(`${prod}/${id}`);
//  return res.json();
//}
//
//export const searchProduct = async (str) => {
//  const res = await fetch(`${prod}/search?q=${str}`);
//  return res.json();
//}
//
//export const getCategories = async () => {
//  const res = await fetch(`${prod}/categories`);
//  return res.json();
//}
//
//export const getCategory = async (category) => {
//  const res = await fetch(`${prod}/category/${category}`);
//  return res.json();
//}
//
//export const getBrands = async () => {
//  const arr = await getProducts();
//  return  [...new Set(arr.products.map(({brand}) => brand))];
//}
//
//export const getPriceMax = async () => {
//  const arrPriceMax = await getProducts();
//  return  Math.max(...arrPriceMax.products.map(({price}) => price));
//}
//export const getPriceMin = async () => {
//  const arrPriceMin = await getProducts();
//  return  Math.min(...arrPriceMin.products.map(({price}) => price));
//}