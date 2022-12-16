class Filter {
  draw(data) {
    const fragment = document.createDocumentFragment();
    const filterItemTemp = document.querySelector('#filter-temp');

    data.forEach(item => {
      const filterClone = filterItemTemp.content.cloneNode(true);
      filterClone.querySelector('.filter_item-name').textContent = item;
      filterClone.querySelector('.filter_item').name = item;

      fragment.append(filterClone);
    });

    document.querySelector('.category-filter').append(fragment);
  }
}

export default Filter;
