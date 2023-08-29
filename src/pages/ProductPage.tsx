import React from 'react'
import { observer } from 'mobx-react-lite'
import '../index.css'
import { useRootStore } from '../App'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { useEffect } from 'react'

const ProductPage: React.FC = () => {
  const { catalogStore } = useRootStore()

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  return (
    <div>
      <Header />
      <div className="catalog-page">
        <div className="product-list">
          {catalogStore.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default observer(ProductPage)
