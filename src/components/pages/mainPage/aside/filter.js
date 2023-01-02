import {
  getBrandsName,
  getAllCategories,
} from '../../../controllers/apiService';

const categoriesName = await getAllCategories();
const brandsName = await getBrandsName();

const filterByCat = categoriesName
  .map(cat => {
    const el = cat.toLowerCase().replace(/ /g, '').slice(0, 20);
    return `<div class="filter_item"><input  type="checkbox" name="category" value="${cat}" id=""/>
          <label class="filter_item-name" name="category" for="${cat}">${cat}</label>
          <span class="stock">5/5</span></div>`;
  })
  .join('');

const filterByBrand = brandsName
  .map(brand => {
    const el = brand.toLowerCase().replace(/ /g, '').slice(0, 20);
    return `<div class="filter_item"><input class="filter_item" type="checkbox" name="brand" value="${brand}" id=""/>
          <label class="filter_item-name" name="category" for="${brand}">${brand}</label>
          <span class="stock">5/5</span></div>`;
  })
  .join('');

const priceSlider = (min = 10, max = 1749) => {
  return `
    <div class="price-input" id='priceInfo'>
      <span class="input-min price-info">${min}</span>
      <div class="separator">price</div>
      <span class="input-max price-info">${max}</span>
    </div>
  <div class="slider">
    <div class="progress" id="priceProgress"></div>
  </div>
  <fieldset class="range-input" req="" gid="" id="priceDual">
    <input type="range" class="range-min" min="{${min}" max="${max}" value="${min}" step="100" evt="change" handlers="doubles">
    <input type="range" class="range-max" min="${min}" max="${max}" value="${max}" step="100" evt="change" handlers="doubles">
  </fieldset>`;
};

const stockSlider = (min = 2, max = 150) => {
  return ` <div class="rating-input" id='ratingInfo'>
      <span class="input-min rating-info">${min}</span>
      <div class="separator">stock</div>
      <span class="input-max rating-info">${max}</span>
    </div>
  <div class="slider">
    <div class="progress" id="ratingProgress"></div>
  </div>
  <fieldset class="range-input" req="" gid="" id="ratingDual">
    <input type="range" class="range-min" min="{${min}" max="${max}" value="${min}" step="1" evt="change" handlers="doubles">
    <input type="range" class="range-max" min="${min}" max="${max}" value="${max}" step="1" evt="change" handlers="doubles">
  </fieldset>`;
};

export async function drawAside() {
  const filterCat = document.querySelector('.category-filter');
  const brandFilter = document.querySelector('.brand-filter');
  const priceDualSlider = document.querySelector('.price-slider');
  const stockDualSlider = document.querySelector('.stock-slider');
  filterCat.innerHTML = filterByCat;
  brandFilter.innerHTML = filterByBrand;
  priceDualSlider.innerHTML = priceSlider();
  stockDualSlider.innerHTML = stockSlider();
}

// class Filter {
//   draw(data, filter) {
//     const fragment = document.createDocumentFragment();
//     const filterItemTemp = document.querySelector('#filter-temp');

//     data.forEach(item => {
//       const filterClone = filterItemTemp.content.cloneNode(true);
//       filterClone.querySelector('.filter_item-name').textContent = item;
//       filterClone.querySelector('.filter_item').name = item;
//       filterClone.querySelector('.filter_item').value = item;

//       fragment.append(filterClone);
//     });

//     document.querySelector(`.${filter}`).append(fragment);
//   }
// }

// export default Filter;
