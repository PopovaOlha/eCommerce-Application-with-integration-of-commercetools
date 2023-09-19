import axios from 'axios'
const API_URL = 'https://api.europe-west1.gcp.commercetools.com'
// const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(async (config) => {
  const authData = JSON.parse(localStorage.getItem('authData')!)
  if (authData === null) {
    const response = await axios.post(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerceapl/anonymous/token',
      'grant_type=client_credentials&scope=manage_project:ecommerceapl',
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
    const expDate = new Date(response.data.expires_in)
    localStorage.setItem(
      'authData',
      JSON.stringify({
        accessToken: response.data.access_token,
        expDate: expDate,
        tokenType: response.data.token_type,
        refreshToken: response.data.refresh_token,
      })
    )
    config.headers['Authorization'] = `Bearer ${response.data.access_token}`
    return config
  } else {
    config.headers['Authorization'] = `Bearer ${authData.accessToken}`
    return config
  }
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    // console.log(error.response.status)
    const originalRequest = error.config
    if (error.response.status == 401) {
      try {
        const authData = JSON.parse(localStorage.getItem('authData')!)
        const response = await axios.post(
          'https://auth.europe-west1.gcp.commercetools.com/oauth/token',
          `grant_type=refresh_token&refresh_token=${authData.refreshToken}`,
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
        const expDate = new Date(response.data.expires_in)
        localStorage.setItem(
          'authData',
          JSON.stringify({
            accessToken: response.data.access_token,
            expDate: expDate,
            tokenType: response.data.token_type,
            // refreshToken: response.data.refresh_token,
          })
        )
        return api.request(originalRequest)
      } catch (e) {
        console.log('Нету токена')
        localStorage.clear()
        return api.request(originalRequest)
      }
    }
  }
)
export default api
