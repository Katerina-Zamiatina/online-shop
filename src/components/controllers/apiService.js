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

export async function getProductById(id) {
  try {
    const res = await fetch(`${prod}/${id}`);
    return res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function searchProduct(query) {
  try {
    const res = await fetch(`${prod}/search?q=${query}`);
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

export async function getProductsByCategory(category) {
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
    return [...new Set(data.products.map(({ brand }) => brand))];
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getPriceMax() {
  try {
    const data = await getProducts();
    return Math.max(...data.products.map(({ price }) => price));
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getPriceMin() {
  try {
    const data = await getProducts();
    return Math.min(...data.products.map(({ price }) => price));
  } catch (error) {
    console.error('Error:', error);
  }
}
