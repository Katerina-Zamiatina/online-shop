import { CheckBoxData } from '../../../types';

const Aside = {
  render: (categories: CheckBoxData, brands: CheckBoxData) => {
    return `<aside class="filter" id="aside-container">
    <div class="filter_btns">
          <button type="button" class="filter_btn" id="clear-checked">Clear Filters</button>
          <button type="button" class="filter_btn" id="copy">Copy link</button>
        </div>
        <h3 class="filter_title">Category</h3>
        <form class="category-filter" id="category">

        ${categories
          .map(
            cat => `<div class="filter_item">
            <input class="filter_item" type="checkbox" name="category" value="${cat.name}" id="${cat.name}"/>
            <label class="filter_item-name" name="category" for="${cat.name}">${cat.name}</label>
            <span class="stock">${cat.count}/${cat.found}</span></div>`
          )
          .join('')}

        </form>
        <h3 class="filter_title">Brand</h3>
        <form class="brand-filter" id="brand">

        ${brands
          .map(
            brand => `<div class="filter_item"><input class="filter_item" type="checkbox" name="brand" value="${brand.name}" id="${brand.name}"/>
                    <label class="filter_item-name" name="category" for="${brand.name}">${brand.name}</label>
                    <span class="stock">${brand.count}/${brand.found}</span></div>`
          )
          .join('')}
        </form>
        <h3 class="filter_title">Price</h3>
        <div class="price-slider">
          <div class="price-input" id='priceInfo'>
            <span class="input-min price-info price-min">10</span>
            <div class="separator">price</div>
            <span class="input-max price-info price-max">1749</span>
            </div>
            <div class="slider">
                <div class="progress" id="priceProgress"></div>
            </div>
            <fieldset class="range-input" req="" gid="" id="priceDual">
                <input type="range" class="range-min range_price" min="10" max="1749" value="10" step="100" evt="change" handlers="doubles">
                <input type="range" class="range-max range_price" min="10" max="1749" value="1749" step="100" evt="change" handlers="doubles">
            </fieldset>
        </div>
        <h3 class="filter_title">Stock</h3>
        <div class="stock-slider"> <div class="rating-input" id='ratingInfo'>
        <span class="input-min rating-info stock-min">2</span>
        <div class="separator">stock</div>
        <span class="input-max rating-info stock-max">150</span>
        </div>
        <div class="slider">
            <div class="progress" id="ratingProgress"></div>
        </div>
        <fieldset class="range-input" req="" gid="" id="ratingDual">
            <input type="range" class="range-min range_stock" min="2" max="150" value="2" step="1" evt="change" handlers="doubles">
            <input type="range" class="range-max range_stock" min="2" max="150" value="150" step="1" evt="change" handlers="doubles">
        </fieldset>
        </div>
        </aside>`;
  },
};

export default Aside;
