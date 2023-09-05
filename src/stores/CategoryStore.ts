import { makeAutoObservable } from 'mobx';
import { Category } from '../types/interfaces';
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi';

class CategoryStore {
  mainCategories: Category[] = [];
  selectedCategory: Category | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadCategories() {
    try {
      const { mainCategories } = await fetchCategoriesWithHierarchy();
      this.mainCategories = mainCategories;
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  setSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }
}

export default CategoryStore;