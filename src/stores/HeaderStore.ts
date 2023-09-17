import { makeAutoObservable } from 'mobx';

class HeaderStore {
  cartCount = 0;

  constructor() {
    makeAutoObservable(this);

  }

  setCartCount(count: number) {
    this.cartCount = count;
  } 

  decrementCartCount() {
    if (this.cartCount > 0) {
      this.cartCount -= 1;
    }
  }
}

export default HeaderStore;