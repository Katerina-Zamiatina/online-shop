import AppView from '../view/appView';
import { getAllCategories } from '../controllers/apiService';

class App {
  constructor() {
    this.view = new AppView();
  }

  async start() {
    const categories = await getAllCategories();
    this.view.drawCategoryFilter(categories);
  }
}

export default App;
