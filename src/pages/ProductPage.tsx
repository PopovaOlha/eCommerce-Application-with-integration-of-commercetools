import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { Box, Container, Grid, useMediaQuery, useTheme, CircularProgress, LinearProgress } from '@mui/material'
import FilterComponent from '../components/Filters'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { Product } from '../types/interfaces'
import Breadcrumb from '../components/Breadcrumb'
import { fetchProducts } from '../utils/productServiceUtils'

const ProductPage: React.FC = () => {
  const { catalogStore } = useRootStore()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(catalogStore.products)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)
  const [loadedProductsCount, setLoadedProductsCount] = useState(0)
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (scrollY + windowHeight >= documentHeight - 100) {
      loadMoreProducts()
    }
  }

  const loadMoreProducts = async () => {
    if (isLoadingMore || !hasMoreProducts) return

    setIsLoadingMore(true)

    try {
      const response = await fetchProducts()

      if (Array.isArray(response) && response.length === 0) {
        setHasMoreProducts(false)
      } else if (Array.isArray(response)) {
        setFilteredProducts((prevProducts) => [...prevProducts, ...response])
        setLoadedProductsCount(loadedProductsCount + response.length)
      }
    } catch (error) {
      console.error('Произошла ошибка при загрузке продуктов:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }
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
    background: '#fff',
    minHeight: 'calc(100vh - 70px - 64px)',
    paddingTop: '10px',
  }

  const handleFilterButtonClick = async (filters: Product[]) => {
    setFilteredProducts(filters)
  }

  const handleSearch = (query: string) => {
    const found = catalogStore.products.find(
      (product) => product.name && product.name['en-US'] && product.name['en-US'].toLowerCase() === query.toLowerCase()
    )

    const filteredResults = catalogStore.products.filter(
      (product) => product.name && product.name['en-US'] && product.name['en-US'].includes(query.toLowerCase())
    )

    setFoundProduct(found || null)

    setFilteredProducts(filteredResults)
  }

  return (
    <div style={pageStyle}>
      <Header subcategories={[]} />
      <Breadcrumb categories={[]} isSearchPage={false} />
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
            {filteredProducts.map((product, index) => (
              <Grid key={`${product.id}-${index}`} item xs={12} sm={6} md={4} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {isLoadingMore ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
          <LinearProgress color="secondary" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} />
        </div>
      ) : hasMoreProducts ? (
        <button onClick={loadMoreProducts}>Load More</button>
      ) : (
        <p>No more products to load.</p>
      )}
    </div>
  )
}

export default observer(ProductPage)
