// import axios from 'axios';
import { commercetoolsConfig } from '../commercetoolsConfig'
import { Product, RawProductList } from '../types/interfaces'
const URL_API = 'https://api.europe-west1.gcp.commercetools.com'
import apiClient from '../api/axios'

interface Category {
  id: string
  name: { 'en-US': string }
  parent?: {
    id: string
  }
}
interface RawCategory {
  id: string
  name: { 'en-US': string }
  parent: string
}

export async function fetchCategoriesWithHierarchy(): Promise<{
  mainCategories: Category[]
  subCategories: Category[]
}> {
  try {
    // const authDataString = localStorage.getItem('authData')
    // const token = JSON.parse(authDataString!)

    const response = await apiClient.get(`${URL_API}/${commercetoolsConfig.projectKey}/categories`, {
      // headers: {
      //   Authorization: `Bearer ${token.accessToken}`,
      // },
    })

    const categories: Category[] = response.data.results.map((rawCategory: RawCategory) => ({
      id: rawCategory.id,
      name: rawCategory.name,
      parent: rawCategory.parent,
    }))

    const mainCategories: Category[] = categories.filter((category) => !category.parent)
    const subCategories: Category[] = categories.filter((category) => !!category.parent)

    return { mainCategories, subCategories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function fetchProductOfCategories(categoryId: string): Promise<Product[]> {
  try {
    // const authDataString = localStorage.getItem('authData');
    // const token = JSON.parse(authDataString!);
    const response = await apiClient.get(
      `${URL_API}/${commercetoolsConfig.projectKey}/product-projections/search?filter=categories.id:"${categoryId}"`
    )
    return response.data.results.map((rawProduct: RawProductList) => {
      const discountedPrice = rawProduct.masterVariant.prices.find((price) => price.discounted)
      const discount = discountedPrice ? discountedPrice.discounted!.value.centAmount : null

      return {
        id: rawProduct.id,
        key: rawProduct.key,
        name: rawProduct.name,
        description: rawProduct.description || 'No description available',
        imageUrl: rawProduct.masterVariant.images.map((image) => image.url),
        price: rawProduct.masterVariant.prices.map((price) => price.value.centAmount),
        discount: discount,
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
