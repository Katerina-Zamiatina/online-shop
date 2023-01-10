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

export default Search;
