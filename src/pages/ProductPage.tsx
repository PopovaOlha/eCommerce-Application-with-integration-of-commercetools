import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import FilterComponent from '../components/Filters'
import { Product } from '../components/Filters'

const ProductPage: React.FC = () => {
  const { catalogStore } = useRootStore()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(catalogStore.products)

  const handleFilterButtonClick = async (filters: Product[]) => {
    setFilteredProducts(filters) // Обновляем состояние с отфильтрованными товарами
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const containerRef = useRef<HTMLDivElement>(null)

  const repeatedGrid = (
    <Grid container spacing={isMobile ? 2 : 3}>
      {filteredProducts.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <div>
      <Header subcategories={[]} />
      <FilterComponent onFilterChange={handleFilterButtonClick} />
      <Container maxWidth="lg">
        <Box mt={10} ref={containerRef}>
          {repeatedGrid}
        </Box>
      </Container>
    </div>
  )
}

export default observer(ProductPage)
