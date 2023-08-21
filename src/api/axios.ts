import axios from 'axios'
const API_URL = 'https://api.europe-west1.gcp.commercetools.com'
// const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com'

const api = axios.create({
  baseURL: API_URL,
})
api.interceptors.request.use(
  async (config) => {
    const authData = JSON.parse(localStorage.getItem('authData')!)
    //  const authData = JSON.parse(authDataRaw!)
    if (authData === null || authData.expDate < new Date()) {
      try {
        const response = await axios.post(
          'https://auth.europe-west1.gcp.commercetools.com/oauth/token',
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
          })
        )
        config.headers['Authorization'] = `Bearer ${response.data.access_token}`
      } catch (error) {
        console.log(error)
      }
    } else {
      config.headers['Authorization'] = `Bearer ${authData.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
