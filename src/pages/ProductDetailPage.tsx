import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Container, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { useRootStore } from '../App'
import { fetchProductWithImages } from '../utils/productServiceUtils'
import ImageModal from '../components/ImageModal'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'

const ProductDetailPage: React.FC = () => {
  const location = useLocation()
  const productDiscount = location.state?.productDiscount
  const { productId } = useParams<{ productId: string }>()
  const { catalogStore } = useRootStore()
  const selectedProduct = catalogStore.getProductById(productId!)

  const [isImageModalOpen, setImageModalOpen] = useState(false)
  const [enlargedImageUrl, setEnlargedImageUrl] = useState('')

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProduct) {
        try {
          const productDetails = await fetchProductWithImages(selectedProduct.key)
          catalogStore.setSelectedProduct(productDetails)
        } catch (error) {
          console.error('Error fetching product details:', error)
        }
      }
    }

    fetchProductDetails()
  }, [selectedProduct])

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
    cursor: 'pointer',
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

  const openImageModal = (imageUrl: string) => {
    setEnlargedImageUrl(imageUrl)
    setImageModalOpen(true)
  }

  const closeImageModal = () => {
    setImageModalOpen(false)
    setEnlargedImageUrl('')
  }

  return (
    <Container maxWidth="md">
      <Box mt={15}>
        <Link to="/catalog" style={backButtonStyle}>
          <ArrowBackIcon style={backButtonIconStyle} /> Back to catalog
        </Link>
        <Header subcategories={[]} />
        <Typography variant="h4">{selectedProduct.name[currentLocale]}</Typography>
        <Carousel showThumbs={false} dynamicHeight>
          {selectedProduct.imageUrl.map((imageUrl, index) => (
            <div key={index} onClick={() => openImageModal(imageUrl)}>
              <img src={imageUrl} alt={`Product Image ${index}`} style={productImageStyle} />
            </div>
          ))}
        </Carousel>
        <Typography variant="body1">
          {selectedProduct.description ? selectedProduct.description[currentLocale] : 'No description available'}
        </Typography>
        <Typography variant="body2" fontSize="15px" fontWeight={'bold'} sx={{ marginTop: '0.5rem' }}>
          Price: {selectedProduct.price.map((price) => (price / 100).toFixed(2)).join(', ')} usd
        </Typography>
        {productDiscount !== undefined && productDiscount > 0 && (
          <Typography variant="body2" fontSize="15px" fontWeight={'bold'} sx={{ color: 'red' }}>
            Discount: {`${(productDiscount / 100).toFixed(2)} usd`}
          </Typography>
        )}
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Add to Cart
        </Button>
      </Box>

      <ImageModal isOpen={isImageModalOpen} onClose={closeImageModal} imageUrl={enlargedImageUrl} />
    </Container>
  )
}

export default observer(ProductDetailPage)
