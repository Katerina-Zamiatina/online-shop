// import AppView from '../pages/mainPage/appView';
// import { getAllCategories, getBrandsName } from '../controllers/apiService';
import { getFilteredItems } from '../controllers/getFilteredItem';
import { drawAside } from '../pages/mainPage/aside/filter';

class App {
  async start() {
    drawAside();
    getFilteredItems();
  }
}



// class App {
//   constructor() {
//     this.view = new AppView();
//   }

//   async start() {
//     const categories = await getAllCategories();
//     this.view.drawCategoryFilter(categories);

//     const brands = await getBrandsName();
//     this.view.drawBrandFilter(brands);

//     getFilteredItems();
//   }
// }

export default App;
