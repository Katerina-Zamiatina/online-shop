import './sass/index.scss';

const baseUrl = 'https://dummyjson.com/products';

async function getAllProducts() {
  try {
    const products = await fetch(`${baseUrl}?limit=100`);
    console.log(products);
  } catch (error) {
    console.error('Error message', error);
  }
}


getAllProducts()