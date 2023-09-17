import React, { useState, useEffect } from 'react'
import { fetchProductOfCategories } from '../utils/commercetoolsApi'
import { Category, Product } from '../types/interfaces'
import { useRootStore } from '../App'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface CategoryListProps {
  categories: Category[]
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const { catalogStore } = useRootStore()
  const navigate = useNavigate()
  const [selectedCategoryId] = useState<string | null>(null)
  const [, setProducts] = useState<Product[]>([])
  const [, setIsProductListOpen] = useState(false)
  // console.log(setSelectedCategoryId)

  useEffect(() => {
    if (selectedCategoryId) {
      loadProductsForCategory(selectedCategoryId)
      setIsProductListOpen(true)
    }
  }, [selectedCategoryId])

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const loadProductsForCategory = async (categoryId: string) => {
    try {
      const productDetails = await fetchProductOfCategories(categoryId)
      setProducts(productDetails)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    const subcategoryUrl = `/subcategory/${categoryId}`
    navigate(subcategoryUrl)
  }

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} style={{ listStyleType: 'none' }}>
            <button onClick={() => handleCategoryClick(category.id)}>{category.name['en-US']}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
