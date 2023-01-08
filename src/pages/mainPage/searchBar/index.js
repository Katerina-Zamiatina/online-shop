import Select from './sortProducts';
import Search from './searchProduct';

const select = await Select.render();
const search = await Search.render()

const SearchWrapper = {
  render: () => {
    return `<div class="wrapperSearch">${select}<div class="found" id="found">
            Found:
            <span class="foundNum" id="foundNum">100</span>
          </div>
          ${search}
          <div class="changeDisplay">
            <button id="display2x2" class="display2x2">
              <i class="fa-solid fa-table-cells-large iconDisplay2x2"></i>
            </button>
            <button id="display3x3" class="display3x3">
              <i class="fa-solid fa-table-cells iconDisplay6x6"></i>
            </button>
          </div>
          </div>`;
  },
};

export default SearchWrapper;
