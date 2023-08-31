import React, { useEffect, useRef } from 'react'
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

  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current
      if (scrollHeight - (scrollTop + clientHeight) < 1000) {
        catalogStore.fetchProducts()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const repeatedGrid = (
    <Grid container spacing={isMobile ? 2 : 3}>
      {catalogStore.products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <div>
      <Header subcategories={[]} />
      <Container maxWidth="lg">
        <Box mt={10} ref={containerRef}>
          {repeatedGrid}
        </Box>
      </Container>
    </div>
  )
}

export default observer(ProductPage)
