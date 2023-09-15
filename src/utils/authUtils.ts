import { AxiosResponse } from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'
import { Address, AuthResponseData, CustomerData, CustomerResponseData, LoginData } from '../types/interfaces'
import axios from 'axios'
export const authenticateUser = async (email: string, password: string, navigate: (path: string) => void) => {
  const loginData: LoginData = {
    email,
    password,
  }

  const apiUrl = `/${commercetoolsConfig.projectKey}/me/login`
  try {
    const response: AxiosResponse<AuthResponseData> = await apiClient.post(apiUrl, loginData)

    if (response.status === 200) {
      const authData = JSON.parse(localStorage.getItem('authData')!)
      // authData.accessToken = response.data.token;
      localStorage.setItem('user', JSON.stringify(response.data))
      console.log('user: ', response.data)
      console.log('результат', authData)
      const responselogin = await axios.post(
        'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerceapl/customers/token',
        `grant_type=password&username=${loginData.email}&password=${loginData.password}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: '4kLyKQZdTuzWnVXZ49PHdL2w',
            password: 'KhoW4Or8xc53f3e9x0lUUdeCdBm4mm1H',
          },
        }
      )
      const expDate = new Date(responselogin.data.expires_in)
      localStorage.setItem(
        'authData',
        JSON.stringify({
          accessToken: responselogin.data.access_token,
          expDate: expDate,
          tokenType: responselogin.data.token_type,
          refreshToken: responselogin.data.refresh_token,
        })
      )
      navigate('/')
      return true

      console.log('work now')
    } else if (response.status === 400) {
      alert('Account with the given credentials not found.')
    } else {
      return false
    }
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  birthday: string,
  email: string,
  password: string,
  addresses: Address[],
  isDefaultShippingAddress: boolean,
  isDefaultBillingAddress: boolean,
  isSameAsBillingAndShippingAddress: boolean,
  navigate: (path: string) => void
) => {
  const requestData: CustomerData = {
    firstName,
    lastName,
    birthday,
    email,
    password,
    addresses,
    shippingAddresses: [0],
    billingAddresses: [1],
  }
  if (isDefaultShippingAddress && isSameAsBillingAndShippingAddress) {
    requestData.defaultShippingAddress = 0
    requestData.defaultBillingAddress = 0
    requestData.addresses = [addresses[0]]
    requestData.billingAddresses = [0]
  }
  if (isDefaultShippingAddress) {
    requestData.defaultShippingAddress = 0
  }
  if (isDefaultBillingAddress) {
    requestData.defaultBillingAddress = 1
  }

  const apiUrl = `/${commercetoolsConfig.projectKey}/me/signup`
  

  try {
    const response: AxiosResponse<CustomerResponseData> = await apiClient.post(apiUrl, requestData)
    if (response.status === 201) {
      localStorage.setItem('user', JSON.stringify(response.data))
      const responselogin = await axios.post(
        'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerceapl/customers/token',
        `grant_type=password&username=${requestData.email}&password=${requestData.password}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: '4kLyKQZdTuzWnVXZ49PHdL2w',
            password: 'KhoW4Or8xc53f3e9x0lUUdeCdBm4mm1H',
          },
        }
      )
      const expDate = new Date(responselogin.data.expires_in)
      localStorage.setItem(
        'authData',
        JSON.stringify({
          accessToken: responselogin.data.access_token,
          expDate: expDate,
          tokenType: responselogin.data.token_type,
          refreshToken: responselogin.data.refresh_token,
        })
      )
      navigate('/')
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('ERROR: ', error)
  }
}
