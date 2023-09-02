import axios from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig';
import { Product, RawProduct } from '../types/interfaces';

const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const authDataString = localStorage.getItem('authData');
    const token = JSON.parse(authDataString!);
    const response = await axios.get<{ results: RawProduct[] }>(
      `${apiUrl}/${commercetoolsConfig.projectKey}/products`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    return response.data.results.map((rawProduct) => {
      const discountedPrice = rawProduct.masterData.current.masterVariant.prices.find(price => price.discounted);
      const discount = discountedPrice ? discountedPrice.discounted!.value.centAmount : null;

      return {
        id: rawProduct.id,
        key: rawProduct.key,
        name: rawProduct.masterData.current.name,
        description: rawProduct.masterData.staged.description || 'No description available',
        imageUrl: rawProduct.masterData.current.masterVariant.images.map(image => image.url),
        price: rawProduct.masterData.current.masterVariant.prices.map(price => price.value.centAmount),
        discount: discount,
      };
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductWithImages(productId: string) {
  try {
    const authDataString = localStorage.getItem('authData');
      const token = JSON.parse(authDataString!);
      const response = await axios.get(`${apiUrl}/${commercetoolsConfig.projectKey}/products/key=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
  });
  const productDetails = response.data.results; 
  return productDetails
} catch (error) {
  console.error('Error fetching products:', error);
  return [];
}
}