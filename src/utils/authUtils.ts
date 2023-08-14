
import { AxiosResponse } from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'
import { useNavigate } from 'react-router-dom'


interface AuthResponseData {
  token: string
  user: string
}

export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<AuthResponseData> = await apiClient.post(
      `/oauth/${commercetoolsConfig.projectKey}/customers/token`,
      {
        email,
        password,
      }
    )

    if (response.status === 200) {
      const navigate = useNavigate();
      navigate('/')
      const token = response.data.token
      const user = response.data.user
      console.log('результат',token, user)
      // Сохранение токена и данных пользователя в состоянии/хранилище.

      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface CustomerResponseData {
  id: string;
  email: string;
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<CustomerResponseData> => {
  const apiUrl = `${commercetoolsConfig.host}/${commercetoolsConfig.projectKey}/customers/token?grant_type=password&username=&password=`;

  const requestData: CustomerData = {
    firstName,
    lastName,
    email,
    password,
  };

  try {
    const response: AxiosResponse<CustomerResponseData> = await apiClient.post(apiUrl, requestData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error;
  }
};
