import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRootStore } from '../App'
import { observer } from 'mobx-react-lite'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Box, Typography, Button, useMediaQuery, useTheme, Container } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const { catalogStore } = useRootStore()
  const selectedProduct = catalogStore.getProductById(productId!)

  useEffect(() => {
    catalogStore.loadStateFromLocalStorage()
    return () => {
      catalogStore.saveStateToLocalStorage()
    }
  }, [catalogStore])

  if (!selectedProduct) {
    return <div>Loading...</div>
  }

  const currentLocale = 'en-US'

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const productImageStyle: React.CSSProperties = {
    width: '20%',
    maxHeight: isMobile ? 'auto' : 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const backButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#555',
    marginBottom: '1rem',
  }

  const backButtonIconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
  }

  return (
    <Container maxWidth="md">
      <Box mt={15}>
        <Link to="/catalog" style={backButtonStyle}>
          <ArrowBackIcon style={backButtonIconStyle} /> Back to catalog
        </Link>
        <Header subcategories={[]} />
        <Typography variant="h4">{selectedProduct.name[currentLocale]}</Typography>
        <img src={selectedProduct.imageUrl[0]} alt={selectedProduct.name[currentLocale]} style={productImageStyle} />
        <Typography variant="body1">
          {selectedProduct.description ? selectedProduct.description[currentLocale] : 'No description available'}
        </Typography>
        <Typography variant="body2" fontSize="15px" fontWeight={'bold'} sx={{ marginTop: '0.5rem' }}>
          Price: {selectedProduct.price.map((price) => (price / 100).toFixed(2)).join(', ')} usd
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Add to Cart
        </Button>
      </Box>
    </Container>
  )
}

export default observer(ProductDetailPage)
