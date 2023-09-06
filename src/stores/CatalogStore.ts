import { fetchProducts } from '../utils/productServiceUtils';
import { Product } from '../types/interfaces';
import { makeAutoObservable, runInAction } from 'mobx'

class CatalogStore {
  selectedProduct: Product | null = null;
  products: Product[] = [];
  isLoading: boolean = false;
  authToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadStateFromLocalStorage();
  }

  async fetchProducts() {
    if (this.products.length === 0) {
      this.isLoading = true
      try {
        const fetchedProducts = await fetchProducts()
        runInAction(() => {
          this.products = fetchedProducts
        })
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        runInAction(() => {
          this.isLoading = false
        })
      }
    }
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
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