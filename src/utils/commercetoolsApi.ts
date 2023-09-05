import axios from 'axios';
import { commercetoolsConfig } from '../commercetoolsConfig';
const URL_API = 'https://api.europe-west1.gcp.commercetools.com';

interface Category {
  id: string;
  name: { 'en-US': string };
  parent?: {
    id: string;
  };
}

interface RawCategory {
  id: string;
  name: { 'en-US': string };
  parent: string;
}

export async function fetchCategoriesWithHierarchy(): Promise<{ mainCategories: Category[]; subCategories: Category[] }> {
  try {
    const authDataString = localStorage.getItem('authData');
    const token = JSON.parse(authDataString!);

    const response = await axios.get(`${URL_API}/${commercetoolsConfig.projectKey}/categories`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const categories: Category[] = response.data.results.map((rawCategory: RawCategory) => ({
      id: rawCategory.id,
      name: rawCategory.name,
      parent: rawCategory.parent,
    }));

    const mainCategories: Category[] = categories.filter((category) => !category.parent);
    const subCategories: Category[] = categories.filter((category) => !!category.parent);

    return { mainCategories, subCategories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchProductOfCategories(categoryId: string) {
  try {
    const authDataString = localStorage.getItem('authData');
      const token = JSON.parse(authDataString!);
      const response = await axios.get(`${URL_API}/${commercetoolsConfig.projectKey}/product-projections/search?filter=categories.id:"${categoryId}"`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
  });
  const productDetails = response.data.results; 
  console.log(productDetails);
  return productDetails
} catch (error) {
  console.error('Error fetching products:', error);
  return [];
}
}
