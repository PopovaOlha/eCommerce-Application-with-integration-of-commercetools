import { makeAutoObservable } from 'mobx'
import api from '../api/axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import { AxiosResponse } from 'axios'

interface CartItem {
  productId: string;
  quantity: number; 
}

interface ApiResponse {
  id: string;
  name: string;
}

class CartStore {
  isLoading = false;
  cartItems: CartItem[] = [];
  cartId!: string;

  constructor() {
    makeAutoObservable(this);
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

  async addToCart(productId: string, quantity: number): Promise<void> {
    try {
      this.isLoading = true;

      const cartId: string = localStorage.getItem('cartId')!;

      const currentCartState = await this.getCurrentCartState(cartId);

      const requestData = {
        version: currentCartState.version,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            quantity: quantity,
          },
        ],
      };

      const response: AxiosResponse<ApiResponse> = await api.post(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts/${cartId}`,
        requestData
      );

      console.log('Товар успешно добавлен в корзину:', response.data);

      this.cartItems.push({ productId, quantity }); 

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error('Произошла ошибка при добавлении товара в корзину:', error);
    }
  }

  async getCurrentCartState(cartId: string): Promise<{ version: number }> {
    try {
      const response: AxiosResponse<{ version: number }> = await api.get(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts/${cartId}`
      );

      return { version: response.data.version };
    } catch (error) {
      console.error('Ошибка при получении текущего состояния корзины:', error);
      throw error;
    }
  }

  async removeFromCart(productId: string) {
    try {

    
      this.isLoading = true;

      await api.delete(`${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/${productId}`);

      this.cartItems = this.cartItems.filter((item) => item.productId !== productId);

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number) {
    try {
      this.isLoading = true;

      await api.put(`/${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/${productId}`, { quantity });

      const updatedCartItems = this.cartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      this.cartItems = updatedCartItems;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }
}

export default CartStore;
