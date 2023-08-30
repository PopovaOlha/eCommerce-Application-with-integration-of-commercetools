import { makeAutoObservable } from 'mobx';
import { fetchProducts } from '../utils/productServiceUtils';
import { Product } from '../types/interfaces';

class CatalogStore {
  products: Product[] = [];
  isLoading: boolean = false;
  authToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadStateFromLocalStorage();
  }

  async fetchProducts() {
    if (this.products.length === 0) {
      this.isLoading = true;
      try {
        const fetchedProducts = await fetchProducts();
        this.products = fetchedProducts;
        localStorage.clear()
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  
  setAuthToken(token: string) {
    this.authToken = token;
    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage() {
    localStorage.setItem('catalogStore', JSON.stringify({
      products: this.products,
      authToken: this.authToken,
    }));
  }
 
  loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('catalogStore');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.products = parsedState.products;
      this.authToken = parsedState.authToken;
    }
  }

  getProductById(productId: string): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }
}

export default CatalogStore;