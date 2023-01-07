import { searchProduct } from '../../../controllers/apiService';
import Products from '../products/products';

const Search = {
  render: () => {
    return `<form id="searchWrapper" class="form_search" action="#">
            <input
              type="text"
              id="searchBar"
              class="inputText"
              placeholder="Search product"
              name="name"
              value=""
            />
          </form>`;
  },
};

export const handleSearchInput = async e => {
  event.preventDefault();
  const searchString = e.target.value.toUpperCase();
  const searched = await searchProduct(searchString);

  const filteredCards = searched.products.filter(card => {
    return (
      card.title.toUpperCase().includes(searchString) ||
      card.brand.toUpperCase().includes(searchString) ||
      card.price.toString().includes(searchString) ||
      card.discountPercentage.toString().includes(searchString) ||
      card.stock.toString().includes(searchString)
    );
  });
  document.getElementById('foundNum').innerHTML = filteredCards.length;

  return filteredCards.length === 0
    ? `<h2>Nothing found. Try Another search</h2>`
    : await Products.render(filteredCards);
};

export default Search;
