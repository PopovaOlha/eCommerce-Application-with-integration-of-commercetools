import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import FilterComponent from '../components/Filters'
import { Product } from '../components/Filters'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

const ProductPage: React.FC = () => {
  const { catalogStore } = useRootStore()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(catalogStore.products)

  const handleFilterButtonClick = async (filters: Product[]) => {
    setFilteredProducts(filters)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const backButtonStyle: React.CSSProperties = {
    marginTop: '80px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#555',
    marginBottom: '1rem',
  }

  const backButtonIconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
  }

  const pageStyle: React.CSSProperties = {
    background: 'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)',
    minHeight: 'calc(100vh - 70px - 64px)',
    paddingTop: '10px',
  }

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
    <div style={pageStyle}>
      <Header subcategories={[]} />
      <Link to="/" style={backButtonStyle}>
        <ArrowBackIcon style={backButtonIconStyle} /> Back to main page
      </Link>
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
