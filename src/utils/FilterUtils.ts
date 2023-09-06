import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'

const apiUrl = 'https://api.europe-west1.gcp.commercetools.com'
interface Product {
  masterData: {
    current: {
      name: { 'en-US': string }
      staged: {
        description: { 'en-US': string }
      }
      masterVariant: {
        images: {
          url: string
        }[]
        prices: {
          value: {
            centAmount: number;
          };
          discounted?: {
            value: {
              centAmount: number;
            };
          };
        }[];
        attributes: {
          name: string
          value: string
        }[]
      }
    }
  }
}

interface UniqueAttributes {
  uniqueManufacturerValues: string[]
  uniqueSizeValues: string[]
  uniqueColorValues: string[]
}

export async function getUniqueAttributes(): Promise<UniqueAttributes> {
  try {
    const response = await apiClient.get(`${apiUrl}/${commercetoolsConfig.projectKey}/products?limit=30`)
    const products: Product[] = response.data.results

    const uniqueManufacturerValues: string[] = []
    const uniqueSizeValues: string[] = []
    const uniqueColorValues: string[] = []

    products.forEach((product) => {
      const manufacturerAttr = product.masterData.current.masterVariant.attributes.find(
        (attr) => attr.name === 'manufacturer'
      )
      if (manufacturerAttr && manufacturerAttr.value) {
        uniqueManufacturerValues.push(manufacturerAttr.value)
      }

      const sizeAttr = product.masterData.current.masterVariant.attributes.find((attr) => attr.name === 'size')
      if (sizeAttr && sizeAttr.value) {
        uniqueSizeValues.push(sizeAttr.value)
      }

      const colorAttr = product.masterData.current.masterVariant.attributes.find((attr) => attr.name === 'color')
      if (colorAttr && colorAttr.value) {
        uniqueColorValues.push(colorAttr.value)
      }

      const discountedPrice = product.masterData.current.masterVariant.prices.find(price => price.discounted);
      if (discountedPrice && discountedPrice.discounted) {
        product.masterData.current.masterVariant.prices.forEach(price => {
          if (price.discounted) {
            price.discounted = discountedPrice.discounted;
          }
        });
      }
    })

    const uniqueManufacturerSet = new Set(uniqueManufacturerValues)
    const uniqueSizeSet = new Set(uniqueSizeValues)
    const uniqueColorSet = new Set(uniqueColorValues)
    console.log([...uniqueManufacturerSet], [...uniqueSizeSet], [...uniqueColorSet])

    return {
      uniqueManufacturerValues: [...uniqueManufacturerSet],
      uniqueSizeValues: [...uniqueSizeSet],
      uniqueColorValues: [...uniqueColorSet],
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      uniqueManufacturerValues: [],
      uniqueSizeValues: [],
      uniqueColorValues: [],
    }
  }
}
// localStorage.clear()
