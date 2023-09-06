import { makeAutoObservable } from 'mobx';
import { Category, Product, } from '../types/interfaces';
import { fetchCategoriesWithHierarchy, fetchProductOfCategories } from '../utils/commercetoolsApi';

class CategoryStore {
  mainCategories: Category[] = [];
  selectedCategory: Category | null = null;
  productCategory: Product[] | null = null;

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

  getProductById(productId: string): Category | undefined {
    return this.mainCategories.find((product) => product.id === productId);
  }

  async setCategoriesProducts(categoryId: string) { 
    try {
      const productsOfCategory = await fetchProductOfCategories(categoryId);
      this.productCategory = productsOfCategory; 
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  setSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }
}

export default CategoryStore;