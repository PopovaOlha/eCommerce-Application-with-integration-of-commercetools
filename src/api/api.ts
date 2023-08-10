import dotenv from 'dotenv';
dotenv.config();

let accessToken: string;

export const authHost = 'https://auth.europe-west1.gcp.commercetools.com';
export const apiHost = 'https://api.europe-west1.gcp.commercetools.com';
export const projectKey = 'ecommerceapl';
export const clientId = "uyxE2Sj_PgpVze3tv0xHhMVW";
export const clientSecret = "vsAIz45S5JP0Yeleta2Cffq-rsly10Nr";
export const tokenEndpoint = `${authHost}/${projectKey}/oauth/token}`

async function fetchAccessToken(): Promise<string> {
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const formData = new URLSearchParams();
    formData.append('grand_type', 'client_credentials');
    formData.append('scope', 'view_products manage_orders');

    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });

    const tokenData = await response.json();
    accessToken = tokenData.access_token;

    return accessToken;
    
}

fetchAccessToken().then((accessToken) => {
    console.log('Access Token', accessToken);
}).catch((error)=> {
    console.error('Error fetching access token:', error);
});

async function fetchProducts(): Promise<any> {
    const productsEndpoint = `${apiHost}/${projectKey}/products`;
  
    // Проверим наличие токена
    if (!accessToken) {
      throw new Error('Access token not available.');
    }
  
    const response = await fetch(productsEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    const productsData = await response.json();
    return productsData;
  }


