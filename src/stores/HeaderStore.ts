import { makeAutoObservable } from 'mobx'

class HeaderStore {
  cartCount = JSON.parse(localStorage.getItem('cartItem') || '[]').length

  constructor() {
    makeAutoObservable(this)
  }

  setCartCount(count: number) {
    this.cartCount = count
  }

  decrementCartCount() {
    if (this.cartCount > 0) {
      this.cartCount -= 1
    }
  }
}

export default HeaderStore
