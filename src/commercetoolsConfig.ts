import fetch from 'node-fetch';
  import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
  } from '@commercetools/sdk-client-v2';
  
  // Configure authMiddlewareOptions
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'ecommerceapl',
    credentials: {
      clientId: "uyxE2Sj_PgpVze3tv0xHhMVW",
      clientSecret: "vsAIz45S5JP0Yeleta2Cffq-rsly10Nr",
    },
    scopes: ['manage_my_quote_requests:ecommerceapl view_published_products:ecommerceapl manage_my_profile:ecommerceapl manage_my_business_units:ecommerceapl manage_my_quotes:ecommerceapl manage_my_payments:ecommerceapl view_categories:ecommerceapl manage_my_orders:ecommerceapl view_products:ecommerceapl manage_my_shopping_lists:ecommerceapl create_anonymous_token:ecommerceapl'],
    fetch,
  };
  
  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };
  
  // Export the ClientBuilder
  export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
