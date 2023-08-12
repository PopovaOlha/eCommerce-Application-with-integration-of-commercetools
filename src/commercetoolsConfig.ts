import { ClientBuilder, Client, AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk'

export const projectKey = 'ecommerceapl'
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerceapl',
  credentials: {
    clientId: '4kLyKQZdTuzWnVXZ49PHdL2w',
    clientSecret: 'KhoW4Or8xc53f3e9x0lUUdeCdBm4mm1H',
  },
  scopes: ['manage_project:ecommerceapl'],
  fetch,
}

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
}

export const client: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()

export const getApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(client)
}

export const commercetoolsConfig = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerceapl',
  credentials: {
    clientId: '4kLyKQZdTuzWnVXZ49PHdL2w',
    clientSecret: 'KhoW4Or8xc53f3e9x0lUUdeCdBm4mm1H',
  },
}
