import React, { useEffect, useState } from 'react'
import '../index.css'
import { Product } from '../types/interfaces'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'
import { observer } from 'mobx-react-lite'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const currentLocale = 'en-US'
  const { catalogStore } = useRootStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const handleViewDetails = async () => {
    await catalogStore.getProductById(product.id)
    navigate(`/product/${product.id}`, { state: { productDiscount: product.discount } })
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const mediaStyle: React.CSSProperties = {
    width: '40%',
    alignSelf: 'center',
  }

  return (
    <Card
      sx={{
        display: 'flex',
        paddingTop: '20px',
        flexDirection: 'column',
        maxWidth: 300,
        height: 400,
        margin: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        overflow: 'hidden',
        '&:hover': {
          transition: 'transform 0.3s',
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia component="div" sx={mediaStyle}>
        <Carousel selectedItem={selectedImageIndex} showThumbs={false} dynamicHeight onClickItem={handleImageClick}>
          {product.imageUrl &&
            product.imageUrl.map((imageUrl, index) => (
              <div key={index}>
                <img src={imageUrl} alt={`Product Image ${index}`} className="product" />
              </div>
            ))}
        </Carousel>
      </CardMedia>
      <CardContent sx={{ padding: '1rem', textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={'bold'} fontSize={'15px'}>
          {product.name[currentLocale]}
        </Typography>
        <Typography variant="body2" fontSize={'10px'}>
          {product.description ? product.description[currentLocale] : 'No description available'}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: '0.5rem' }}>
          <Typography variant="body2" fontSize="12px" fontWeight={'bold'}>
            Price:{' '}
          </Typography>
          {product.discount === null ? (
            <Typography variant="body2" fontSize="12px">
              {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
            </Typography>
          ) : (
            <>
              <Typography variant="body2" fontSize="12px" className="text-decoration">
                {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
              </Typography>
              <Typography variant="body2" fontSize="12px" color={'red'} marginLeft={'5px'}>
                {product.discount !== null ? (product.discount! / 100).toFixed(2) : ''} USD
              </Typography>
            </>
          )}
        </Box>
        <MuiLink component={Button} color="primary" sx={{ marginTop: '0.1rem' }} onClick={handleViewDetails}>
          View Details
        </MuiLink>
      </CardContent>
    </Card>
  )
}

export default observer(ProductCard)
