import { AxiosResponse } from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'
import { Address, AuthResponseData, CustomerData, CustomerResponseData, LoginData } from '../types/interfaces'

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
    const response: AxiosResponse<AuthResponseData> = await apiClient.post(apiUrl, loginData)

    if (response.status === 200) {
      navigate('/')
      const token = response.data.token
      const user = response.data.user
      console.log('результат', token, user)
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: Address,
  navigate: (path: string) => void
): Promise<boolean> => {

  const requestData: CustomerData = {
    firstName,
    lastName,
    email,
    password,
    addresses: [address],
  }

  const apiUrl = `/${commercetoolsConfig.projectKey}/customers`;

  try {
    const response: AxiosResponse<CustomerResponseData> = await apiClient.post(apiUrl, requestData)
  
    if (response.status === 201) {
      navigate('/')
      const customerId = response.data.id
      const customerVersion = response.data.version
      console.log('результат', customerId, customerVersion);
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}
  