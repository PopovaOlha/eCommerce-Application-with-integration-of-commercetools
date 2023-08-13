
import axios, { AxiosResponse } from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'

interface AuthResponseData {
  token: string
  user: string
}

export const registerUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<AuthResponseData> = await apiClient.post(
      `/${commercetoolsConfig.projectKey}/customers`,
      {
        email,
        password,
      }
    )

    if (response.status === 200) {
      const token = response.data.token
      const user = response.data.user
      console.log(token, user)
      // Сохранение токена и данных пользователя в состоянии/хранилище.

      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${commercetoolsConfig.host}/api/register`, {
      email,
      password,
    })

    if (response.status === 400) {
      // Регистрация прошла успешно.
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}