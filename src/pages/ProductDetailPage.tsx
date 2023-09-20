import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  Container,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
} from '@mui/material'
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
  const { catalogStore, cartStore, headerStore } = useRootStore()
  const selectedProduct = catalogStore.getProductById(productId!)

  const [isImageModalOpen, setImageModalOpen] = useState(false)
  const [enlargedImageUrl, setEnlargedImageUrl] = useState('')

  const [isAddedToCart, setIsAddedToCart] = useState(false)
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

  const handleAddToCart = async (productId: string) => {
    if (!isAddedToCart) {
      console.log('productId:', productId)
      await cartStore.createCart()
      cartStore.addToCart(productId)
      const cartItem = JSON.parse(localStorage.getItem('cartItem')!)
      console.log(cartItem)
      if (cartItem === null || !cartItem.some((item: { productId: string }) => item.productId === productId)) {
        headerStore.setCartCount(headerStore.cartCount + 1)
      }
      setIsAddedToCart(true)
    }
  }

  const currentLocale = 'en-US'

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const productImageStyle: React.CSSProperties = {
    width: '50%',
    maxHeight: isMobile ? '80vh' : '80vh',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  }

  const backButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
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
    <div>
      <Header subcategories={[]} />
      <Container maxWidth="md">
        <Box mt={isMobile ? 2 : 15}>
          <Link to="/categories" style={backButtonStyle}>
            <ArrowBackIcon style={backButtonIconStyle} /> Back to catalog
          </Link>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {selectedProduct.name[currentLocale]}
              </Typography>
              <Carousel showThumbs={false}>
                {selectedProduct.imageUrl.map((imageUrl, index) => (
                  <div key={index} onClick={() => openImageModal(imageUrl)}>
                    <img src={imageUrl} alt={`Product Image ${index}`} style={productImageStyle} />
                  </div>
                ))}
              </Carousel>
              <Typography variant="body1" paragraph>
                {selectedProduct.description ? selectedProduct.description[currentLocale] : 'No description available'}
              </Typography>
              <Typography variant="body2" fontSize="15px" fontWeight="bold" sx={{ marginTop: '0.5rem' }}>
                Price: {selectedProduct.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
              </Typography>
              {productDiscount !== undefined && productDiscount > 0 && (
                <Typography variant="body2" fontSize="15px" fontWeight="bold" sx={{ color: 'red' }}>
                  Discount: {`${(productDiscount / 100).toFixed(2)} USD`}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleAddToCart(selectedProduct.id)}
                style={{ marginBottom: '30px' }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Box>

        <ImageModal isOpen={isImageModalOpen} onClose={closeImageModal} imageUrl={enlargedImageUrl} />
      </Container>
    </div>
  )
}

export default observer(ProductDetailPage)
