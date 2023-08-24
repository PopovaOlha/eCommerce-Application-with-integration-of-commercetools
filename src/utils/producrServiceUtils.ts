// src/services/ProductService.ts
import apiProduct from '../api/axios'
import { commercetoolsConfig } from '../commercetoolsConfig';
import { Product, RawProduct } from '../types/interfaces';

export async function fetchProducts(): Promise<Product[]> {
  try {
  const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';
    const response = await apiProduct.get<{ results: RawProduct[] }>(
      `${apiUrl}/${commercetoolsConfig.projectKey}/products`
    );

    return response.data.results.map((rawProduct) => ({
      id: rawProduct.id,
      name: rawProduct.name,
      description: rawProduct.description || 'No description available',
      imageUrl: rawProduct.masterVariant.images[0]?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

