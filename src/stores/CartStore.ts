import { makeAutoObservable } from 'mobx'
import api from '../api/axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import { AxiosResponse } from 'axios'
import { useRootStore } from '../App'
import { CartItem, LineItem } from '../types/interfaces'

interface ApiResponse {
  id: string
  name: string
  lineItems: LineItem[]
}

class CartStore {
  isLoading = false
  cartItems: CartItem[] = []
  cartId!: string
  //promoCode!: string; 
  //discount = 0;

  constructor() {
    makeAutoObservable(this)
  }

  async getCart(): Promise<string> {
    try {
      const response: AxiosResponse = await api.get(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts`
      )
      console.log()
      return response.data.results[0].id
    } catch (error) {
      console.error('Ошибка при получении текущего состояния корзины:', error)
      throw error
    }
  }
  async createCart() {
    try {
      this.isLoading = true
      this.cartId = await this.getCart()
      this.isLoading = false
      localStorage.setItem('cartId', this.cartId)
    } catch (error) {
      this.isLoading = false
      const requestData = {
        country: 'US',
        currency: 'USD',
      }
      const response = await api.post(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts`,
        requestData
      )
      this.cartId = response.data.id
      localStorage.setItem('cartId', response.data.id)
    }
  }

  async addToCart(productId: string): Promise<void> {
    try {
      this.isLoading = true

      const cartId: string = localStorage.getItem('cartId')!

      const currentCartState = await this.getCurrentCartState(cartId)

      const requestData = {
        version: currentCartState.version,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            quantity: 1,
          },
        ],
      }

      const response: AxiosResponse<ApiResponse> = await api.post(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts/${cartId}`,
        requestData
      )

      console.log('Товар успешно добавлен в корзину:', response.data)

      const lineItem = response.data.lineItems.find((item) => item.productId === productId)
      if (localStorage.getItem('cartItem') !== null) {
        const items = localStorage.getItem('cartItem')!
        const cartItemsLocal: CartItem[] = JSON.parse(items)
        this.cartItems = cartItemsLocal
      }
      if (lineItem) {
        this.cartItems.push({
          productId,
          quantity: lineItem.quantity,
          price: lineItem.price.value.centAmount,
          totalPrice: lineItem.totalPrice.centAmount,
        })
        localStorage.setItem('cartItem', JSON.stringify(this.cartItems))
      }

      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      console.error('Произошла ошибка при добавлении товара в корзину:', error)
    }
  }

  async getCurrentCartState(cartId: string): Promise<{ version: number }> {
    try {
      
      const response: AxiosResponse<{ version: number }> = await api.get(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts/${cartId}`
      )

      return { version: response.data.version }
    } catch (error) {
      console.error('Ошибка при получении текущего состояния корзины:', error)
      throw error
    }
  }

  async removeFromCart(productId: string) {
    try {
      this.isLoading = true

      await api.delete(`${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/${productId}`)

      this.cartItems = this.cartItems.filter((item) => item.productId !== productId)

      const rootStore = useRootStore()
      rootStore.headerStore.decrementCartCount()

      this.isLoading = false
    } catch (error) {
      this.isLoading = false
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number) {
    try {
      this.isLoading = true

      await api.put(`${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/${productId}`, { quantity })
const updatedCartItems = this.cartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity }
        }
        return item
      })

      this.cartItems = updatedCartItems
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
    }
  }
  /*setPromoCode(code: string) {
    this.promoCode = code;
  }

  async  applyPromoCode(promoCode: string) {
  try {
    const response: AxiosResponse = await api.get(`/${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/discount-codes/${promoCode}`
    );

      const data = response.data;
    return {
      success: true,
      discount: data.cartDiscount,
    };
  } catch (error) {
    console.error('Ошибка при применении промокода:', error);
    return {
      success: false,
      error: 'Произошла ошибка при применении промокода',
    };
  }
}*/
}
export default CartStore;