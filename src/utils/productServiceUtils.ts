import apiProduct from '../api/axios';
import axios from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig';
import { Product, RawProduct } from '../types/interfaces';

const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const authDataString = localStorage.getItem('authData');
      const token = JSON.parse(authDataString!);
    const response = await axios.get<{ results: RawProduct[]}>(
      `${apiUrl}/${commercetoolsConfig.projectKey}/products`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
  });
console.log(response.data.results.map(rawProduct=> rawProduct))
    return response.data.results.map((rawProduct) => ({
      id: rawProduct.id,
      key: rawProduct.key,
      name: rawProduct.masterData.current.name,
      description: rawProduct.masterData.staged.description || 'No description available',
      imageUrl: rawProduct.masterData.current.masterVariant.images.map(image => image.url),
      price: rawProduct.masterData.current.masterVariant.prices.map(price => price.value.centAmount),
    }));

  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductWithImages(productId: string) {
  const response = await apiProduct.get(`${apiUrl}/${commercetoolsConfig.projectKey}/products/key=${productId}`);
  const productDetails = response.data.results.map((rawProduct: { key: string; })=> rawProduct); 
  console.log(productDetails)
  return productDetails;
}

