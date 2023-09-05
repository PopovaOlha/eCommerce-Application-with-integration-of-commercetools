import { useState } from 'react'

import { fetchProductOfCategories } from '../utils/commercetoolsApi'
import { Category, Product } from '../types/interfaces'

function CategoryList({ categories }: { categories: Category[] }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  // Функция для загрузки продуктов для выбранной категории
  const loadProductsForCategory = async (categoryId: string) => {
    try {
      const productDetails = await fetchProductOfCategories(categoryId)
      setProducts(productDetails)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Обработчик клика на категорию
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    loadProductsForCategory(categoryId)
  }

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => handleCategoryClick(category.id)}>{category.name['en-US']}</button>
          </li>
        ))}
      </ul>
      {selectedCategoryId && (
        <div>
          <h2>Products for Category</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name['en-US']}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryList
