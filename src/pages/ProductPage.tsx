import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import FilterComponent from '../components/Filters'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar' // Импортируем компонент SearchBar
import { Product } from '../types/interfaces'

const ProductPage: React.FC = () => {
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)
  const { catalogStore } = useRootStore()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(catalogStore.products)

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

  const handleFilterButtonClick = async (filters: Product[]) => {
    setFilteredProducts(filters)
  }

  const handleSearch = (query: string) => {
    const found = catalogStore.products.find((product) => product.name['en-US'].toLowerCase() === query.toLowerCase())
    const filteredResults = catalogStore.products.filter((product) =>
      product.name['en-US'].includes(query.toLowerCase())
    )

    setFoundProduct(found || null)

    setFilteredProducts(filteredResults)
  }

  return (
    <div style={pageStyle}>
      <Header subcategories={[]} />

      <Link to="/categories" style={backButtonStyle}>
        <ArrowBackIcon style={backButtonIconStyle} /> Back to categories
      </Link>
      <SearchBar onSearch={handleSearch} />
      <FilterComponent onFilterChange={handleFilterButtonClick} />
      {foundProduct ? (
        <div>
          <h2>Found Product</h2>
          <ProductCard product={foundProduct} />
        </div>
      ) : (
        <div>
          <p>No product found with the specified name.</p>
        </div>
      )}
      <Container maxWidth="lg">
        <Box mt={10}>
          <Grid container spacing={isMobile ? 2 : 3}>
            {filteredProducts.map((product) => (
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
