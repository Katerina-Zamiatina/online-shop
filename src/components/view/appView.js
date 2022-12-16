import Filter from './filter/filter';

class AppView {
  constructor() {
    this.categoryFilter = new Filter();
  }

    drawCategoryFilter(data) {
        const values = data ? data : []
        this.categoryFilter.draw(values)
    }
}


export default AppView;