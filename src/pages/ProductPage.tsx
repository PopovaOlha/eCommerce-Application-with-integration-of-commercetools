import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'

const ProductPage: React.FC = () => {
  const { catalogStore } = useRootStore()

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Box mt={10}>
          <Grid container spacing={isMobile ? 2 : 3}>
            {catalogStore.products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default observer(ProductPage)
