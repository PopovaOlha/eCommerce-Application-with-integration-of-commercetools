import { makeAutoObservable } from 'mobx';

class HeaderStore {
  cartCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setCartCount(count: number) {
    this.cartCount = count;
  }
}

export default HeaderStore;