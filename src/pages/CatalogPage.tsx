import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../utils/producrServiceUtils'
import ProductCard from '../components/ProductCard'
import { Product } from '../types/interfaces'

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchData() {
      const products = await fetchProducts()
      setProducts(products)
    }
    fetchData()
  }, [])

  return (
    <div className="catalog-page">
      <h1>Catalog</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default CatalogPage
