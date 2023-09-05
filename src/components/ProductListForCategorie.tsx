import { useState, useEffect } from 'react'
import { fetchProductOfCategories } from '../utils/commercetoolsApi'
import { Product } from '../types/interfaces'
import ProductCard from './ProductCard'

function ProductListForCategory({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productDetails = await fetchProductOfCategories(categoryId)
        setProducts(productDetails)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    loadProducts()
  }, [categoryId])

  return (
    <div>
      <h2>Products for Category</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductListForCategory
