const Select = {
  render: () => {
    return `<select id="sortSelect" class="sortSelect">
            <option _ngcontent-fnt-c31="" value="sort-title" disabled="" selected="" class="sort-name">
            Sort options:
            </option>
            <option class="sortOption" id="priceDESK" value="priceDESK">
              Sort by price DESK
            </option>
            <option class="sortOption" id="priceASK" value="priceASK">
              Sort by price ASK
            </option>
            <option class="sortOption" id="discountDESK" value="discountDESK">
              Sort by discount DESK
            </option>
            <option class="sortOption" id="discountASK" value="discountASK">
              Sort by discount ASK
            </option>
            <option class="sortOption" id="stockDESK" value="stockDESK">
              Sort by stock DESK
            </option>
            <option class="sortOption" id="stockASK" value="stockASK">
              Sort by stock ASK
            </option>
          </select>`;
  },
};

export default Select;
