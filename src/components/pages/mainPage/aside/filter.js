import {
  getBrandsName,
  getAllCategories,
} from '../../../controllers/apiService';

const categoriesName = await getAllCategories();
const brandsName = await getBrandsName();

const filterByCat = categoriesName
  .map(cat => {
    const el = cat.toLowerCase().replace(/ /g, '').slice(0, 20);
    return `<input class="filter_item" type="checkbox" name="category" value="${cat}" id=""/>
          <label class="filter_item-name" name="category" for="${cat}">${cat}</label>
          <span class="stock">5/5</span>`;
  })
  .join('');

const filterByBrand = brandsName
  .map(brand => {
    const el = brand.toLowerCase().replace(/ /g, '').slice(0, 20);
    return `<input class="filter_item" type="checkbox" name="brand" value="${brand}" id=""/>
          <label class="filter_item-name" name="category" for="${brand}">${brand}</label>
          <span class="stock">5/5</span>`;
  })
  .join('');

export async function drawAside() {
  const filterCat = document.querySelector('.category-filter');
  const brandFilter = document.querySelector('.brand-filter');
  filterCat.innerHTML = filterByCat;
  brandFilter.innerHTML = filterByBrand;
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
