import { useState, useEffect } from 'react'
import { getUniqueAttributes } from '../utils/FilterUtils'
import '../styles/FilterComponent.scss'
import apiClient from '../api/axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
const apiUrl = 'https://api.europe-west1.gcp.commercetools.com'
interface SelectedFilters {
  manufacturer: string[]
  size: string[]
  color: string[]
}

interface UniqueAttributes {
  uniqueManufacturerValues: string[]
  uniqueSizeValues: string[]
  uniqueColorValues: string[]
}

interface FilterComponentProps {
  onFilterChange: (filters: Product[]) => Promise<void>
}
export interface Product {
  id: string
  key: string
  name: { 'en-US': string }
  description: { 'en-US': string }
  imageUrl: string[]
  price: number[]
}
export interface ProductRaw {
  id: string
  key: string
  name: { 'en-US': string }
  description: { 'en-US': string }

  masterVariant: {
    images: {
      url: string
    }[]
    prices: {
      value: {
        centAmount: number
      }
      discounted?: {
        value: {
          centAmount: number
        }
      }
    }[]
  }
}
function FilterComponent({ onFilterChange }: FilterComponentProps) {
  const [uniqueAttributes, setUniqueAttributes] = useState<UniqueAttributes>({
    uniqueManufacturerValues: [],
    uniqueSizeValues: [],
    uniqueColorValues: [],
  })

  useEffect(() => {
    async function fetchData() {
      const attributes = await getUniqueAttributes()
      setUniqueAttributes(attributes)
    }

    fetchData()
  }, [])

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    manufacturer: [],
    size: [],
    color: [],
  })

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  async function handleFilterButtonClick(): Promise<Product[]> {
    try {
      const filters: string[] = []

      // Добавляем фильтры в зависимости от выбранных чекбоксов
      if (selectedFilters.manufacturer.length > 0) {
        const manufacturerFilter = `variants.attributes.manufacturer:"${selectedFilters.manufacturer.join('","')}"`
        filters.push(manufacturerFilter)
      }
      if (selectedFilters.size.length > 0) {
        const sizeFilter = `variants.attributes.size:"${selectedFilters.size.join('","')}"`
        filters.push(sizeFilter)
      }
      if (selectedFilters.color.length > 0) {
        const colorFilter = `variants.attributes.color:"${selectedFilters.color.join('","')}"`
        filters.push(colorFilter)
      }

      const params = {
        filter: filters,
      }

      const response = await apiClient.get<{ results: ProductRaw[] }>(
        `${apiUrl}/${commercetoolsConfig.projectKey}/product-projections/search`,
        {
          params,
        }
      )

      console.log(response.data.results)
      const filteredProducts = response.data.results.map((rawProduct) => ({
        id: rawProduct.id,
        key: rawProduct.key,
        name: rawProduct.name,
        description: rawProduct.description || 'No description available',
        imageUrl: rawProduct.masterVariant.images.map((image) => image.url),
        price: rawProduct.masterVariant.prices.map((price) => price.value.centAmount),
        discount: rawProduct.masterVariant.prices.find((price) => price.discounted)
          ? rawProduct.masterVariant.prices.find((price) => price.discounted)!.discounted!.value.centAmount
          : null,
      }))
      onFilterChange(filteredProducts)
      return filteredProducts
    } catch (error) {
      return []
    }
  }
  const toggleCategory = (category: string) => {
    setActiveCategory((prevCategory) => (prevCategory === category ? null : category))
  }

  const handleFilterChange = (category: keyof SelectedFilters, value: string) => {
    const updatedFilters = { ...selectedFilters }
    if (updatedFilters[category].includes(value)) {
      updatedFilters[category] = updatedFilters[category].filter((item) => item !== value)
    } else {
      updatedFilters[category].push(value)
    }
    setSelectedFilters(updatedFilters)
  }
  return (
    <div className="filter-wrapper">
      {' '}
      {/* Применяем класс для обертки фильтров */}
      <h2>Filters</h2>
      <div>
        <button className="filter-category-button" onClick={() => toggleCategory('manufacturer')}>
          Search by manufacturer
        </button>
        {activeCategory === 'manufacturer' && (
          <div className="filter-category-content">
            {' '}
            {/* Применяем класс для содержимого аккордеона */}
            {uniqueAttributes.uniqueManufacturerValues.map((manufacturer) => (
              <label key={manufacturer} className="filter-checkbox-label">
                {' '}
                {/* Применяем класс для чекбоксов */}
                <input
                  type="checkbox"
                  value={manufacturer}
                  checked={selectedFilters.manufacturer.includes(manufacturer)}
                  onChange={() => handleFilterChange('manufacturer', manufacturer)}
                />
                {manufacturer}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <button className="filter-category-button" onClick={() => toggleCategory('size')}>
          Search by size
        </button>
        {activeCategory === 'size' && (
          <div className="filter-category-content">
            {' '}
            {/* Применяем класс для содержимого аккордеона */}
            {uniqueAttributes.uniqueSizeValues.map((size) => (
              <label key={size} className="filter-checkbox-label">
                {' '}
                {/* Применяем класс для чекбоксов */}
                <input
                  type="checkbox"
                  value={size}
                  checked={selectedFilters.size.includes(size)}
                  onChange={() => handleFilterChange('size', size)}
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <button className="filter-category-button" onClick={() => toggleCategory('color')}>
          Search by color
        </button>
        {activeCategory === 'color' && (
          <div className="filter-category-content">
            {' '}
            {/* Применяем класс для содержимого аккордеона */}
            {uniqueAttributes.uniqueColorValues.map((color) => (
              <label key={color} className="filter-checkbox-label">
                {' '}
                {/* Применяем класс для чекбоксов */}
                <input
                  type="checkbox"
                  value={color}
                  checked={selectedFilters.color.includes(color)}
                  onChange={() => handleFilterChange('color', color)}
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <button className="filter-button" onClick={handleFilterButtonClick}>
          Filter
        </button>
      </div>
    </div>
  )
}

export default FilterComponent
