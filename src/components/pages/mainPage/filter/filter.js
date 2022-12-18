class Filter {
  draw(data, filter) {
    const fragment = document.createDocumentFragment();
    const filterItemTemp = document.querySelector('#filter-temp');

    data.forEach(item => {
      const filterClone = filterItemTemp.content.cloneNode(true);
      filterClone.querySelector('.filter_item-name').textContent = item;
      filterClone.querySelector('.filter_item').name = item;
      filterClone.querySelector('.filter_item').value = item;

      fragment.append(filterClone);
    });

    document.querySelector(`.${filter}`).append(fragment);
  }
}

export default Filter;
