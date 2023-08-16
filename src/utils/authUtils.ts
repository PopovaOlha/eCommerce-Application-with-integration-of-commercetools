import { AxiosResponse } from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'
import { AuthResponseData, LoginData } from '../types/interfaces'

export const authenticateUser = async (
  email: string,
  password: string,
  navigate: (path: string) => void 
  ): Promise<boolean> => {

    const loginData: LoginData = {
      email,
      password,
    }

  const apiUrl = `/${commercetoolsConfig.projectKey}/login`;

  try {
    const response: AxiosResponse<AuthResponseData> = await apiClient.post(apiUrl, loginData);

    if (response.status === 200) {
      navigate('/')
      const token = response.data.token
      const user = response.data.user
      console.log('результат', token, user);

      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
};

export interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses: {
    billing: Address;
    shipping: Address;
  };
}

 export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  billingAddress: Address,
  shippingAddress: Address,
  navigate: (path: string) => void, 
): Promise<boolean> => {
  const requestData: CustomerData = {
    firstName,
    lastName,
    email,
    password,
    addresses: {
      billing: billingAddress,
      shipping: shippingAddress,
    },
  };
 
  const apiUrl = `/${commercetoolsConfig.projectKey}/customers`;

  try {
    const response = await apiClient.post(apiUrl, requestData);
   
    if (response.status === 200) {
      navigate('/')
      console.log('User registered:', response);
      return true
    } else {
      return false
    }
   } catch (error) {
    throw error
  }
};