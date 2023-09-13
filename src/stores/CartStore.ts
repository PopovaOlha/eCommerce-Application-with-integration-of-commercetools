import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import api from '../api/axios'
import { commercetoolsConfig } from '../commercetoolsConfig';
import { AxiosResponse } from 'axios'; 

interface CartItem {
  productId: string;
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

  async createCart() {
    try {
      if (!this.cartId) {
        const requestData = {
          currency: 'USD',
        };
        this.isLoading = true;
  
        const response = await api.post(`${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/carts`, requestData);
        this.cartId = response.data.id;
      }
  
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  async addToCart(productId: string, quantity: number): Promise<void> {
    try {
      this.isLoading = true;
      
      const cartId: string = this.cartId;
  
      const requestData = {
        version : 1,
        actions: [
            {
        action: 'addLineItem',
        productId: productId,
        quantity: quantity,
            }
        ]
    }
      const response: AxiosResponse<ApiResponse> = await api.post(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/carts/${cartId}`,
        requestData,
      );
  
      console.log('Товар успешно добавлен в корзину:', response.data);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error('Произошла ошибка при добавлении товара в корзину:', error);
    }
  }

  async removeFromCart(productId: string) {
    try {
      this.isLoading = true;

      await axios.delete(`/api/remove-from-cart/${productId}`);

      this.cartItems = this.cartItems.filter((item) => item.productId !== productId);

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number) {
    try {
      this.isLoading = true;

      await axios.put(`/api/update-cart-item-quantity/${productId}`, { quantity });

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