import { IProduct } from '../types';

const baseUrl = 'https://dummyjson.com/';
const prod = baseUrl + 'products';

export async function getProducts(limit = 100) {
  try {
    const res = await fetch(`${prod}?limit=${limit}`);
    return res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getProductById(id: number) {
  try {
    const res = await fetch(`${prod}/${id}`);
    return res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function searchProduct(query: string) {
  try {
    const res = await fetch(`${prod}/search?q=${query}&limit=100`);
    return res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${prod}/categories`);
    return res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const res = await fetch(`${prod}/category/${category}`);
    return res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getBrandsName() {
  try {
    const data = await getProducts();
    return [...new Set(data.products.map((prod: IProduct) => prod.brand))];
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getProductsByBrand(checkedBrand: string) {
  try {
    const data = await getProducts();
    return [
      ...new Set(
        data.products.filter((prod: IProduct) => prod.brand === checkedBrand)
      ),
    ];
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getPriceMax() {
  try {
    const data = await getProducts();
    return Math.max(...data.products.map((prod: IProduct) => prod.price));
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getPriceMin() {
  try {
    const data = await getProducts();
    return Math.min(...data.products.map((prod: IProduct) => prod.price));
  } catch (error) {
    console.error('Error:', error);
  }
}
